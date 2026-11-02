import { CSS3DObject } from "three/addons/renderers/CSS3DRenderer.js";
import { projects } from "../data/projects.js";

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });
}

export function createMonitorScreen({
  width = 900,
  height = 520,
  worldWidth = 2.5,
  worldHeight = 1.45,
}) {
  // --------------------------------------------------
  // Create HTML screen
  // --------------------------------------------------

  const screen = document.createElement("div");

  screen.className = "monitor-screen";

  Object.assign(screen.style, {
    width: `${width}px`,
    height: `${height}px`,
    background: "#171721",
    color: "#ffffff",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif",
    pointerEvents: "auto",
    boxSizing: "border-box",

    // Hide reversed screen.
    backfaceVisibility: "hidden",
    webkitBackfaceVisibility: "hidden",

    // Keep the screen as a flat surface.
    transformStyle: "flat",
  });

  let typingInterval = null;

  // --------------------------------------------------
  // Stop code animation
  // --------------------------------------------------

  function stopTyping() {
    if (typingInterval) {
      clearInterval(typingInterval);
      typingInterval = null;
    }
  }

  // --------------------------------------------------
  // Welcome screen
  // --------------------------------------------------

  function renderWelcome() {
    stopTyping();

    screen.innerHTML = `
      <div class="monitor-welcome">

        <div class="monitor-topbar">
          <span>● ● ●</span>
          <span>rabina.dev</span>
        </div>

        <div class="monitor-welcome-content">

          <p class="monitor-eyebrow">
            HELLO, WORLD!
          </p>

          <h1>
            Welcome to my workspace.
          </h1>

          <p>
            I'm a full-stack developer who enjoys building
            thoughtful digital experiences.
          </p>

          <div class="monitor-actions">

            <button data-action="projects">
              Explore Projects
            </button>

            <button data-action="code">
              View Code
            </button>

          </div>

        </div>

        <div class="monitor-footer">
          FULL-STACK DEVELOPER · RABINA.DEV
        </div>

      </div>
    `;
  }

  // --------------------------------------------------
  // Projects screen
  // --------------------------------------------------

  function renderProjects() {
    stopTyping();

    const cards = projects
      .map(
        (project) => `
          <button
            class="monitor-project-card"
            data-action="project"
            data-id="${escapeHTML(project.id)}"
          >
            <span>
              ${escapeHTML(project.category)}
            </span>

            <strong>
              ${escapeHTML(project.title)}
            </strong>

            <p>
              ${escapeHTML(project.description)}
            </p>

            <small>
              View project →
            </small>
          </button>
        `,
      )
      .join("");

    screen.innerHTML = `
      <div class="monitor-page">

        <div class="monitor-topbar">
          <span>MY PROJECTS</span>
          <button data-action="home">Home</button>
        </div>

        <div class="monitor-content">

          <p class="monitor-eyebrow">
            MY WORK
          </p>

          <h2>
            Featured Projects
          </h2>

          <div class="monitor-project-grid">
            ${cards}
          </div>

        </div>

      </div>
    `;
  }

  // --------------------------------------------------
  // Project details
  // --------------------------------------------------

  function renderProject(id) {
    stopTyping();

    const project = projects.find((item) => String(item.id) === String(id));

    if (!project) return;

    const technologies = project.technologies
      .map(
        (tech) => `
          <span>${escapeHTML(tech)}</span>
        `,
      )
      .join("");

    screen.innerHTML = `
      <div class="monitor-page">

        <div class="monitor-topbar">
          <button data-action="projects">
            ← Projects
          </button>

          <button data-action="home">
            Home
          </button>
        </div>

        <div class="monitor-content">

          <p class="monitor-eyebrow">
            ${escapeHTML(project.category)}
          </p>

          <h2>
            ${escapeHTML(project.title)}
          </h2>

          <p>
            ${escapeHTML(project.description)}
          </p>

          <div class="monitor-technologies">
            ${technologies}
          </div>

          <div class="monitor-actions">

            <button
              data-action="github"
              data-url="${escapeHTML(project.github)}"
            >
              GitHub
            </button>

            <button
              data-action="demo"
              data-url="${escapeHTML(project.demo)}"
            >
              Live Demo
            </button>

          </div>

        </div>

      </div>
    `;
  }

  // --------------------------------------------------
  // Code screen
  // --------------------------------------------------

  function renderCode() {
    stopTyping();

    const code = `const developer = {
  name: "Rabina Pradhan",
  role: "Full-Stack Developer",
  skills: [
    "React",
    "Node.js",
    "Express",
    "PostgreSQL"
  ],
  passion: "Building for the web"
};

console.log(developer);`;

    screen.innerHTML = `
      <div class="monitor-page">

        <div class="monitor-topbar">
          <span>PORTFOLIO.JS</span>
          <button data-action="home">Home</button>
        </div>

        <div class="monitor-content">

          <p class="monitor-eyebrow">
            A LITTLE BIT OF CODE
          </p>

          <h2>
            Building things for the web.
          </h2>

          <pre class="monitor-code"><code></code></pre>

        </div>

      </div>
    `;

    const codeElement = screen.querySelector("code");

    let index = 0;

    typingInterval = setInterval(() => {
      if (index >= code.length) {
        stopTyping();
        return;
      }

      codeElement.textContent += code[index++];
    }, 30);
  }

  // --------------------------------------------------
  // Screen button interactions
  // --------------------------------------------------

  screen.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");

    if (!button) return;

    switch (button.dataset.action) {
      case "home":
        renderWelcome();
        break;

      case "projects":
        renderProjects();
        break;

      case "code":
        renderCode();
        break;

      case "project":
        renderProject(button.dataset.id);
        break;

      case "github":
      case "demo": {
        const url = button.dataset.url;

        if (url && /^https?:\/\//i.test(url)) {
          window.open(url, "_blank", "noopener,noreferrer");
        }

        break;
      }

      default:
        break;
    }
  });

  // Initial screen
  renderWelcome();

  // --------------------------------------------------
  // Create CSS3D object
  // --------------------------------------------------

  const object = new CSS3DObject(screen);

  object.scale.set(worldWidth / width, worldHeight / height, 1);

  // Hide the reversed side.
  object.element.style.backfaceVisibility = "hidden";
  object.element.style.webkitBackfaceVisibility = "hidden";

  return {
    object,
    element: screen,

    dispose() {
      stopTyping();
      screen.remove();
    },
  };
}
