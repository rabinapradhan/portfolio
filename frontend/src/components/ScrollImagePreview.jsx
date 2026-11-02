import { useRef, useState } from "react";

const ScrollImagePreview = ({ src, alt }) => {
  const imageRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    const image = imageRef.current;
    const container = image?.parentElement;

    if (!image || !container) return;

    const imageHeight = image.getBoundingClientRect().height;
    const containerHeight = container.clientHeight;

    setScrollDistance(Math.max(0, imageHeight - containerHeight));
    setIsHovered(true);
  };

  return (
    <div
      className="h-[280px] sm:h-[420px] w-full overflow-hidden relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        onLoad={handleMouseEnter}
        className="block w-full h-auto"
        style={{
          transform: isHovered
            ? `translateY(-${scrollDistance}px)`
            : "translateY(0)",
          transition: `transform ${Math.max(4, scrollDistance / 40)}s linear`,
        }}
      />
    </div>
  );
};

export default ScrollImagePreview;
