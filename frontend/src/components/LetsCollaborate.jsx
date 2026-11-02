import { FaArrowRight } from "react-icons/fa6";

const LetsCollaborate = ({ isHome = false }) => {
  return (
    <section className="scroll-mt-16 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <p className="tracking-[.22em] font-sans uppercase text-muted-foreground text-[.72rem] font-semibold">
          04 · Let’s collaborate
        </p>
        <h2 className="mt-5 font-instrument text-4xl sm:text-5xl">
          Have a project
          <em className="text-lavender">in mind?</em>
        </h2>
        <p className="mx-auto mt-6 max-w-md font-sans text-muted-foreground">
          Let’s work together to bring your ideas to life. Reach out and let’s
          create something amazing!
        </p>
        <a
          href={isHome ? "#booking" : "/contact"}
          className="inline-flex font-sans items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors   bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 mt-8 rounded-full"
        >
          {isHome ? "Book a conversation" : "Start a project"}
          <FaArrowRight size={14} />
        </a>
      </div>
    </section>
  );
};

export default LetsCollaborate;
