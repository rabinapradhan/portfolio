import { FiLayers } from "react-icons/fi";
import { IoCodeSlashOutline } from "react-icons/io5";
import { GoDatabase } from "react-icons/go";
import { BsStars } from "react-icons/bs";
import image from "../assets/images/rabina.jpeg";
import LetsCollaborate from "../components/LetsCollaborate";
import Seo from "../components/Seo";

const AboutPage = () => {
  return (
    <>
      <Seo
        title="About Rabina Pradhan | Full-Stack Developer"
        description="Learn about Rabina Pradhan, a developer from Nepal passionate about React, Next.js,  JavaScript, Automation, and full-stack web development."
      />
      <main className="pt-16">
        <section className="scroll-mt-16 py-16">
          <div className="mx-auto grid max-w-6xl md:gap-12 gap-6 px-6 md:grid-cols-2">
            <div className="md:mb-12 ">
              <p className="tracking-[0.22em] uppercase text-muted-foreground text-[0.72rem] font-semibold">
                01 · About
              </p>
              <h2 className="mt-3 font-instrument text-4xl tracking-tight sm:text-5xl">
                {" "}
                A little about me
              </h2>

              <div className="mt-8  flex flex-col gap-4 sm:flex-row sm:items-center ">
                <img
                  src={image}
                  alt="Rabina Pradhan"
                  className="h-38 w-38 shrink-0 rounded-full border-2 border-lavender object-cover object-center"
                />

                <div className="space-y-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-lavender bg-card px-3 py-1 text-xs font-medium shadow-sm">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-lavender opacity-60" />
                      <span className="relative inline-flex size-2 rounded-full bg-lavender" />
                    </span>
                    Open to opportunities
                  </span>

                  <h3 className="text-lg font-semibold">Rabina Pradhan</h3>

                  <p className="text-sm text-muted-foreground">
                    Full-stack Developer
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Open to full-time roles & freelance projects
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Hi, I'm Rabina. I enjoy building creative, well-designed web
                applications, from the interfaces people interact with to the
                APIs and databases behind them. I care about writing clean,
                maintainable code, paying attention to details and continuously
                learning new technologies to build better digital experiences.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                <li className="rounded-full border border-border bg-card px-4 py-2 text-sm">
                  Frontend development
                </li>
                <li className="rounded-full border border-border   bg-card px-4 py-2 text-sm">
                  Backend development
                </li>
                <li className="rounded-full border border-border bg-card px-4 py-2 text-sm">
                  Database Design
                </li>
                <li className="rounded-full border border-border bg-card px-4 py-2 text-sm">
                  Building real-word projects
                </li>
                <li className="rounded-full border border-border bg-card px-4 py-2 text-sm">
                  Continous learning
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 max-w-2xl">
              <p class="tracking-[0.22em] uppercase text-muted-foreground text-[0.72rem] font-semibold">
                My toolkit
              </p>
              <h2 class="mt-3 font-instrument text-4xl sm:text-5xl">
                From the first pixel to the data.
              </h2>
              <p class="mt-5 leading-relaxed  text-muted-foreground">
                I'm interested in the whole application, not just one layer.
                These are the technologies I work with across the stack.
              </p>
            </div>
            <div className="grid gap-10 md:grid-cols-3">
              <div>
                <FiLayers size={28} className=" text-lavender" />
                <h3 class="mt-5 text-lg font-semibold">The interface</h3>
                <p class="mt-3 leading-relaxed  text-muted-foreground">
                  React, Next.js, JavaScript, TypeScript, HTML, CSS, Tailwind
                  CSS, and shadcn/ui — building responsive, accessible
                  interfaces with thoughtful user experiences.
                </p>
              </div>
              <div>
                <IoCodeSlashOutline size={28} className=" text-lavender" />
                <h3 class="mt-5 text-lg font-semibold">Behind the scenes</h3>
                <p class="mt-3 leading-relaxed text-muted-foreground">
                  Node.js, Express.js, Prisma, PostgreSQL, and Docker — building
                  scalable application logic, architecting secure RESTful APIs,
                  implementing JWT authentication, and containerizing services
                  for seamless deployment.
                </p>
              </div>
              <div>
                <GoDatabase size={28} className=" text-lavender" />
                <h3 class="mt-5 text-lg font-semibold">The data</h3>
                <p class="mt-3 leading-relaxed  text-muted-foreground">
                  PostgreSQL and SQL — designing relational database schemas,
                  writing optimized queries, ensuring data integrity, and
                  managing migrations to back scalable applications.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary/30 py-16">
          <div className="mx-auto grid max-w-6xl md:gap-12 gap-6 px-6 md:grid-cols-2">
            <div className="mb-10 max-w-2xl">
              <p className="tracking-[0.22em] uppercase text-muted-foreground text-[0.72rem] font-semibold">
                What matters to me
              </p>
              <h2 class="mt-3 font-instrument text-4xl sm:text-5xl">
                Useful first. Thoughtful always.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
                I believe good software is more than just working code. It's
                about solving real problems, creating intuitive experiences, and
                building applications that are reliable, maintainable, and
                meaningful to the people who use them.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-card border border-border">
                  <span className=" text-center text-lavender">
                    <BsStars size={18} />
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Think clearly. Build thoughtfully.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="border-b border-border pb-6">
                <h3 class="text-lg font-semibold">Clarity</h3>
                <p class="mt-3 leading-relaxed text-muted-foreground">
                  A good interface should make the next step feel natural. I
                  care about readable layouts, clear navigation, and small
                  details that help people use a product.
                </p>
              </div>
              <div class="border-b border-border pb-6">
                <h3 class="text-lg font-semibold">Maintainability</h3>
                <p class="mt-3 leading-relaxed text-muted-foreground">
                  I value clean code and a sensible structure so a project can
                  grow without becoming harder to work on.
                </p>
              </div>
              <div class="border-b border-border pb-6">
                <h3 class="text-lg font-semibold">Continuous learning</h3>
                <p class="mt-3 leading-relaxed text-muted-foreground">
                  Building real-world projects is how I explore new ideas and
                  deepen my understanding of modern web development. Docker is
                  part of what I’m learning next.
                </p>
              </div>
            </div>
          </div>
        </section>
        <LetsCollaborate />
      </main>
    </>
  );
};

export default AboutPage;
