import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import KeyboardScene from "../three/KeyboardScene";

const HeroSection = () => {
  const keyboardGuide = [
    { key: "H", label: "Home" },
    { key: "A", label: "About" },
    { key: "P", label: "Projects" },
    { key: "S", label: "Services" },
    { key: "C", label: "Contact" },
  ];

  return (
    <section
      id="home"
      className="relative scroll-mt-16 overflow-hidden pt-28 pb-16 md:pt-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-soft" />

      <div className="relative mx-auto  grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1fr_1.15fr]">
        {/* Hero Content */}
        <div>
          {/* Availability Badge */}
          <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-1.5 text-sm shadow-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#b1b0ef] opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-[#b1b0ef]" />
            </span>
            Open to opportunities · Freelance & Full-time
          </span>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Full-stack developer
          </p>

          <h1 className="mt-5 font-instrument text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Building <em className="text-lavender">thoughtful</em> experiences
            for the web.
          </h1>

          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            I build modern, responsive web applications using React, Next.js,
            Node.js, Express and PostgreSQL.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Explore My Projects
              <FaArrowRight size={14} />
            </Link>

            <Link
              to="/contact"
              className="inline-flex h-10 items-center justify-center rounded-full border border-border bg-card px-8 text-sm shadow-sm transition-colors hover:bg-lavender"
            >
              Contact Me
            </Link>
          </div>

          <div className="mt-8 flex gap-2">
            <a
              href="https://github.com/rabinapradhan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-full border border-border   bg-card p-2.5 transition-colors hover:bg-secondary"
            >
              <FiGithub size={16} />
            </a>

            <a
              href="https://www.linkedin.com/in/rabinapradhan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-full border border-border bg-card p-2.5 transition-colors hover:bg-secondary"
            >
              <FiLinkedin size={16} />
            </a>
          </div>
        </div>

        {/* Interactive 3D desk */}
        <div className="relative  min-w-0">
          <div className="h-[420px] w-full sm:h-[540px] md:h-[620px] lg:h-[720px]">
            <KeyboardScene />
          </div>

          {/* Keyboard guide */}
          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:gap-3">
            {keyboardGuide.map((item) => (
              <div
                key={item.key}
                className="flex items-center gap-2 rounded-full border border-[#e8e5f2] bg-white px-3 py-2 shadow-sm"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#eeedff] text-sm font-bold text-[#8986d6]">
                  {item.key}
                </span>

                <span className="text-xs text-[#777582]">{item.label}</span>
              </div>
            ))}
          </div>

          <p className="mt-3 text-center text-xs text-[#9996a8]">
            Click a highlighted key to explore my portfolio
          </p>

          <p className="mt-1 text-center text-xs text-[#9996a8]">
            Drag to rotate · Pinch or scroll to zoom
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
