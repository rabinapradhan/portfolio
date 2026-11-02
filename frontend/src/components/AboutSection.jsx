const AboutSection = () => {
  return (
    <section className="scroll-mt-16 py-16">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            01 · About Me
          </p>
          <h2 className="mt-3 font-instrument text-4xl tracking-tight sm:text-5xl">
            A little about me
          </h2>
        </div>

        <div>
          <p className="md:text-lg text-base leading-relaxed font-sans text-muted-foreground">
            Hi, I'm Rabina. I'm a full-stack developer passionate about building
            thoughtful, user-friendly web applications. I enjoy working across
            the stack — crafting intuitive interfaces, developing reliable
            backend APIs, and designing structured databases. I value clean,
            maintainable code, thoughtful problem-solving, and creating
            solutions that make a real difference.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            <li className="rounded-full border border-border bg-card px-4 py-2 text-sm">
              Frontend development
            </li>
            <li className="rounded-full border border-border     bg-card px-4 py-2 text-sm">
              Backend development
            </li>
            <li className="rounded-full border border-border bg-card px-4 py-2 text-sm">
              Database Design
            </li>
            <li className="rounded-full border border-border bg-card px-4 py-2 text-sm">
              Building real-world projects
            </li>
            <li className="rounded-full border border-border bg-card px-4 py-2 text-sm">
              Continuous learning
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
