import { useEffect, useRef, useState } from "react";
import { StarLoader } from "../components/PageStates";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS3DRenderer } from "three/addons/renderers/CSS3DRenderer.js";

import { createMonitorScreen } from "./monitorScreen";
import "./KeyboardScene.css";

const DEBUG_HITBOXES = false;

const keyboardRoutes = {
  H: "/",
  A: "/about",
  P: "/projects",
  S: "/services",
  C: "/contact",
};

// --------------------------------------------------
// Normalize and center a GLB model
// --------------------------------------------------

function normalizeModel(model, targetWidth) {
  const box = new THREE.Box3().setFromObject(model);

  const size = new THREE.Vector3();
  const center = new THREE.Vector3();

  box.getSize(size);
  box.getCenter(center);

  const scale = targetWidth / size.x;

  model.scale.multiplyScalar(scale);
  model.position.sub(center.multiplyScalar(scale));

  const finalBox = new THREE.Box3().setFromObject(model);
  const finalSize = new THREE.Vector3();

  finalBox.getSize(finalSize);

  return finalSize;
}

// --------------------------------------------------
// Desk mat
// --------------------------------------------------

function createDeskMat() {
  const geometry = new THREE.BoxGeometry(7.8, 0.1, 6.8);

  const material = new THREE.MeshStandardMaterial({
    color: "#c8c2e8",
    roughness: 1,
    metalness: 0,
  });

  const mat = new THREE.Mesh(geometry, material);

  mat.position.set(0, -0.12, 0.35);
  mat.receiveShadow = true;

  return mat;
}

// --------------------------------------------------
// Create a keyboard key indicator
// --------------------------------------------------

function createKeyIndicator({
  letter,
  x,
  z,
  keyboardSize,
  keyboardRoot,
  hitboxes,
}) {
  /*
    IMPORTANT:

    keyboardSize.y / 2 is the highest point of the
    entire keyboard model, not necessarily the top
    surface of the individual keycaps.

    Use a lower surface height so the indicators
    sit closer to the physical keys.
  */

  const keySurfaceY = keyboardSize.y * 0.43;

  // Size of the clickable area.
  const keyWidth = 0.22;
  const keyDepth = 0.22;

  // ------------------------------------------------
  // Invisible clickable hitbox
  // ------------------------------------------------

  const hitboxMaterial = new THREE.MeshBasicMaterial({
    color: "#b1b0ef",
    transparent: true,
    opacity: DEBUG_HITBOXES ? 0.3 : 0,
    depthWrite: false,
  });

  const hitbox = new THREE.Mesh(
    new THREE.BoxGeometry(keyWidth, 0.12, keyDepth),
    hitboxMaterial,
  );

  hitbox.position.set(
    x * keyboardSize.x,
    keySurfaceY + 0.045,
    z * keyboardSize.z,
  );

  hitbox.userData.route = keyboardRoutes[letter];
  hitbox.userData.letter = letter;

  keyboardRoot.add(hitbox);
  hitboxes.push(hitbox);

  // ------------------------------------------------
  // Create label texture
  // ------------------------------------------------

  const canvas = document.createElement("canvas");

  canvas.width = 256;
  canvas.height = 256;

  const context = canvas.getContext("2d");

  // Lavender rounded background.
  context.fillStyle = "#b1b0ef";

  context.beginPath();
  context.roundRect(20, 20, 216, 216, 45);
  context.fill();

  // Letter.
  context.fillStyle = "#292735";
  context.font = "bold 112px Arial";
  context.textAlign = "center";
  context.textBaseline = "middle";

  context.fillText(letter, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);

  texture.colorSpace = THREE.SRGBColorSpace;

  // ------------------------------------------------
  // Flat label plane
  // ------------------------------------------------

  const labelMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const label = new THREE.Mesh(
    new THREE.PlaneGeometry(0.14, 0.14),
    labelMaterial,
  );

  // Rotate plane to lie flat on the keyboard.
  label.rotation.x = -Math.PI / 2;

  // Place the label just above the keycap surface.
  label.position.set(hitbox.position.x, keySurfaceY + 0.012, hitbox.position.z);

  label.renderOrder = 10;

  keyboardRoot.add(label);

  // Link the label to its clickable hitbox.
  hitbox.userData.label = label;

  return hitbox;
}

// --------------------------------------------------
// Main scene
// --------------------------------------------------

export default function KeyboardScene() {
  const containerRef = useRef(null);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    let disposed = false;
    let animationFrameId;

    const scene = new THREE.Scene();

    scene.background = new THREE.Color("#f8f7fc");

    // ------------------------------------------------
    // Camera
    // ------------------------------------------------

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);

    camera.position.set(0, 4.8, 9.5);

    // ------------------------------------------------
    // WebGL renderer
    // ------------------------------------------------

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    container.appendChild(renderer.domElement);

    // ------------------------------------------------
    // CSS3D renderer for monitor HTML
    // ------------------------------------------------

    const cssRenderer = new CSS3DRenderer();

    cssRenderer.domElement.style.position = "absolute";
    cssRenderer.domElement.style.inset = "0";
    cssRenderer.domElement.style.width = "100%";
    cssRenderer.domElement.style.height = "100%";
    cssRenderer.domElement.style.pointerEvents = "none";
    cssRenderer.domElement.style.zIndex = "2";

    container.appendChild(cssRenderer.domElement);

    // ------------------------------------------------
    // Orbit controls
    // ------------------------------------------------

    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.enableZoom = true;

    controls.minDistance = 5;
    controls.maxDistance = 16;

    controls.minPolarAngle = 0.35;
    controls.maxPolarAngle = Math.PI / 2.05;

    controls.target.set(0, 0.65, 0);

    // ------------------------------------------------
    // Lighting
    // ------------------------------------------------

    scene.add(new THREE.AmbientLight("#ffffff", 1.8));

    const mainLight = new THREE.DirectionalLight("#ffffff", 3);

    mainLight.position.set(-4, 7, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.set(1024, 1024);

    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight("#d9d5ff", 1.4);

    fillLight.position.set(5, 3, -4);

    scene.add(fillLight);

    // ------------------------------------------------
    // Desk mat
    // ------------------------------------------------

    const deskMat = createDeskMat();

    scene.add(deskMat);

    const deskMatTop = deskMat.position.y + 0.05;

    // ------------------------------------------------
    // Model loader
    // ------------------------------------------------

    const loadingManager = new THREE.LoadingManager(() => {
      if (!disposed) {
        setIsLoading(false);
      }
    });

    const loader = new GLTFLoader(loadingManager);

    const hitboxes = [];

    let monitorScreen = null;

    // ------------------------------------------------
    // Keyboard
    // ------------------------------------------------

    loader.load(
      "/models/keyboard.glb",

      (gltf) => {
        if (disposed) return;

        const keyboard = gltf.scene;

        // Normalize keyboard width.
        const keyboardSize = normalizeModel(keyboard, 4.5);

        const keyboardRoot = new THREE.Group();

        keyboardRoot.position.set(
          0,
          deskMatTop + keyboardSize.y / 2 + 0.005,
          0.75,
        );

        keyboardRoot.add(keyboard);

        scene.add(keyboardRoot);

        keyboard.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // --------------------------------------------
        // Key positions
        // --------------------------------------------

        /*
          These coordinates are relative to the
          centered, normalized keyboard model.

          X = left / right
          Z = back / front

          Adjust these values individually to move
          each label onto its physical keycap.
        */

        const keys = [
          { letter: "A", x: -0.27, z: 0.04 },
          { letter: "S", x: -0.22, z: 0.04 },
          { letter: "H", x: 0.022, z: 0.04 },
          { letter: "P", x: 0.172, z: -0.18 },
          { letter: "C", x: -0.084, z: 0.17 },
        ];

        keys.forEach((key) => {
          createKeyIndicator({
            ...key,
            keyboardSize,
            keyboardRoot,
            hitboxes,
          });
        });
      },

      undefined,

      (error) => {
        console.error("Keyboard loading error:", error);
      },
    );

    // ------------------------------------------------
    // Monitor
    // ------------------------------------------------

    loader.load(
      "/models/monitor.glb",

      (gltf) => {
        if (disposed) return;

        const monitor = gltf.scene;

        const monitorSize = normalizeModel(monitor, 3.4);

        const monitorRoot = new THREE.Group();

        monitorRoot.scale.set(1, 1.18, 1);

        monitorRoot.position.set(
          0,
          deskMatTop + (monitorSize.y * 1.18) / 2,
          -1.55,
        );

        monitorRoot.add(monitor);

        scene.add(monitorRoot);

        monitor.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // --------------------------------------------
        // HTML screen
        // --------------------------------------------

        const modelScale = 3.4 / 0.65462431;

        const screenWorldWidth = 0.565 * modelScale;
        const screenWorldHeight = 0.345 * modelScale;

        const screen = createMonitorScreen({
          width: 900,
          height: 580,
          worldWidth: screenWorldWidth,
          worldHeight: screenWorldHeight,
        });

        monitorScreen = screen;

        screen.object.position.set(
          0,
          0.057 * modelScale,
          0.072 * modelScale + 0.008,
        );

        screen.object.rotation.set(0, 0, 0);

        monitorRoot.add(screen.object);
      },

      undefined,

      (error) => {
        console.error("Monitor loading error:", error);
      },
    );

    // ------------------------------------------------
    // Mouse
    // ------------------------------------------------

    loader.load(
      "/models/mouse.glb",

      (gltf) => {
        if (disposed) return;

        const mouse = gltf.scene;

        // Preserve the current orientation.
        mouse.rotation.set(0, Math.PI, 0);

        const mouseSize = normalizeModel(mouse, 0.62);

        const mouseRoot = new THREE.Group();

        mouseRoot.position.set(2.75, deskMatTop + mouseSize.y / 2 + 0.01, 0.65);

        mouseRoot.add(mouse);

        scene.add(mouseRoot);

        mouse.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
      },

      undefined,

      (error) => {
        console.error("Mouse loading error:", error);
      },
    );

    // --------------------------------------------------
    // Desk plant
    // --------------------------------------------------

    loader.load(
      "/models/plant.glb",

      (gltf) => {
        if (disposed) return;

        const plant = gltf.scene;

        // Keep the original upright orientation.
        plant.rotation.set(0, 0, 0);

        // Make the plant a natural desk-accessory size.
        const plantSize = normalizeModel(plant, 1.0);

        const plantRoot = new THREE.Group();

        // Place it at the back-left of the desk mat.
        plantRoot.position.set(
          -2.86,
          deskMatTop + plantSize.y / 2 + 0.005,
          -1.65,
        );

        plantRoot.add(plant);

        scene.add(plantRoot);

        plant.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
      },

      undefined,

      (error) => {
        console.error("Plant loading error:", error);
      },
    );

    // ------------------------------------------------
    // Keyboard interactions
    // ------------------------------------------------

    const raycaster = new THREE.Raycaster();

    const pointer = new THREE.Vector2();

    let hoveredHitbox = null;

    function updatePointer(event) {
      const rect = renderer.domElement.getBoundingClientRect();

      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;

      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
    }

    // --------------------------------------------
    // Click keyboard key
    // --------------------------------------------

    function handlePointerDown(event) {
      if (event.button !== undefined && event.button !== 0) {
        return;
      }

      updatePointer(event);

      const intersections = raycaster.intersectObjects(hitboxes, false);

      if (intersections.length > 0) {
        const route = intersections[0].object.userData.route;

        if (route) {
          navigate(route);
        }
      }
    }

    // --------------------------------------------
    // Hover keyboard key
    // --------------------------------------------

    function handlePointerMove(event) {
      updatePointer(event);

      const intersections = raycaster.intersectObjects(hitboxes, false);

      const nextHitbox = intersections.length ? intersections[0].object : null;

      if (hoveredHitbox !== nextHitbox) {
        // Reset previous label.
        if (hoveredHitbox?.userData.label) {
          hoveredHitbox.userData.label.scale.set(1, 1, 1);
        }

        hoveredHitbox = nextHitbox;

        // Enlarge current label.
        if (hoveredHitbox?.userData.label) {
          hoveredHitbox.userData.label.scale.set(1.2, 1.2, 1);
        }
      }

      renderer.domElement.style.cursor = hoveredHitbox ? "pointer" : "grab";
    }

    function handlePointerLeave() {
      if (hoveredHitbox?.userData.label) {
        hoveredHitbox.userData.label.scale.set(1, 1, 1);
      }

      hoveredHitbox = null;
      renderer.domElement.style.cursor = "grab";
    }

    renderer.domElement.addEventListener("pointerdown", handlePointerDown);

    renderer.domElement.addEventListener("pointermove", handlePointerMove);

    renderer.domElement.addEventListener("pointerleave", handlePointerLeave);

    // ------------------------------------------------
    // Physical keyboard navigation
    // ------------------------------------------------

    function handleKeyDown(event) {
      const target = event.target;

      const isTyping =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

      if (
        isTyping ||
        event.repeat ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey
      ) {
        return;
      }

      const key = event.key.toUpperCase();

      if (keyboardRoutes[key]) {
        navigate(keyboardRoutes[key]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    // ------------------------------------------------
    // Responsive sizing
    // ------------------------------------------------

    function resizeScene() {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) return;

      const aspect = width / height;

      camera.aspect = aspect;

      if (aspect < 0.85) {
        // Mobile portrait.
        camera.fov = 38;
        camera.position.set(0, 5.2, 11);

        controls.target.set(0, 0.85, 0);
        controls.minDistance = 5;
        controls.maxDistance = 16;
      } else if (aspect < 1.3) {
        // Tablet.
        camera.fov = 43;
        camera.position.set(0, 5, 10.5);

        controls.target.set(0, 0.65, 0);
        controls.minDistance = 6;
        controls.maxDistance = 16;
      } else {
        // Desktop.
        camera.fov = 38;
        camera.position.set(0, 4.8, 9.5);

        controls.target.set(0, 0.65, 0);
        controls.minDistance = 5;
        controls.maxDistance = 16;
      }

      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      cssRenderer.setSize(width, height);

      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, aspect < 0.85 ? 1.25 : 1.75),
      );

      controls.update();
    }

    const resizeObserver = new ResizeObserver(resizeScene);

    resizeObserver.observe(container);

    resizeScene();

    // ------------------------------------------------
    // Animation
    // ------------------------------------------------

    function animate() {
      if (disposed) return;

      animationFrameId = requestAnimationFrame(animate);

      controls.update();

      // Hide the HTML screen when viewing the back of the monitor.
      if (monitorScreen?.object) {
        const screenPosition = new THREE.Vector3();
        const screenNormal = new THREE.Vector3();
        const cameraDirection = new THREE.Vector3();

        monitorScreen.object.getWorldPosition(screenPosition);

        monitorScreen.object.getWorldDirection(screenNormal);

        cameraDirection.subVectors(camera.position, screenPosition).normalize();

        const facingCamera = screenNormal.dot(cameraDirection);

        monitorScreen.element.style.visibility =
          facingCamera > 0.05 ? "visible" : "hidden";
      }

      renderer.render(scene, camera);
      cssRenderer.render(scene, camera);
    }
    animate();

    // ------------------------------------------------
    // Cleanup
    // ------------------------------------------------

    return () => {
      disposed = true;

      cancelAnimationFrame(animationFrameId);

      resizeObserver.disconnect();

      window.removeEventListener("keydown", handleKeyDown);

      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);

      renderer.domElement.removeEventListener("pointermove", handlePointerMove);

      renderer.domElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );

      controls.dispose();

      monitorScreen?.dispose();

      scene.traverse((object) => {
        if (!object.isMesh) return;

        object.geometry?.dispose();

        if (Array.isArray(object.material)) {
          object.material.forEach((material) => {
            material.map?.dispose();
            material.dispose();
          });
        } else {
          object.material?.map?.dispose();
          object.material?.dispose();
        }
      });

      renderer.dispose();

      renderer.domElement.remove();
      cssRenderer.domElement.remove();
    };
  }, [navigate]);

  return (
    <div ref={containerRef} className="keyboard-scene">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#f8f7fc]">
          <StarLoader />
        </div>
      )}
    </div>
  );
}
