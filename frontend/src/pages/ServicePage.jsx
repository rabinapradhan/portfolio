import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";
import Seo from "../components/Seo";

const services = [
  {
    number: "01",
    title: "Full-Stack Development",
    description:
      "Connect the interface, application logic, and data into one coherent web application.",
    features: [
      "React interfaces",
      "Node.js and Express APIs",
      "PostgreSQL integration",
    ],
  },
  {
    number: "02",
    title: "API Development",
    description:
      "Build the connections that let your application exchange and manage data.",
    features: [
      "REST endpoint design",
      "Input validation and error handling",
      "Frontend integration",
    ],
  },
  {
    number: "03",
    title: "Frontend Development",
    description:
      "Turn a design or product idea into a clear, interactive web interface.",
    features: [
      "Reusable React components",
      "Interactive page states",
      "Accessible navigation and forms",
    ],
  },
  {
    number: "04",
    title: "UI Implementation",
    description:
      "Transform designs and visual references into polished web interfaces.",
    features: [
      "Figma-to-React implementation",
      "Reusable UI components",
      "Pixel-conscious styling",
    ],
  },
  {
    number: "05",
    title: "Responsive Web Development",
    description:
      "Create websites that feel intuitive across phones, tablets, and desktops.",
    features: [
      "Mobile-first layouts",
      "Touch-friendly controls",
      "Cross-device testing",
    ],
  },
  {
    number: "06",
    title: "Technical SEO",
    description:
      "Build a solid technical foundation to help search engines discover your website.",
    features: [
      "Page titles and descriptions",
      "Semantic HTML and metadata",
      "Sitemap and robots.txt setup",
    ],
  },
  {
    number: "07",
    title: "Automation Development",
    description:
      "Connect applications and automate repetitive tasks to improve productivity.",
    features: [
      "API-based workflow automation",
      "Third-party integrations",
      "Automated notifications",
    ],
  },
];

const ServicePage = () => {
  return (
    <>
      <Seo
        title="Web Development Services | Rabina Pradhan"
        description="Explore web development services including responsive websites, React applications, and full-stack development."
      />
      <main className="overflow-hidden pt-16">
        <section className="scroll-mt-16 py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
            {/* code editor */}
            <CodeEditor />
            <div>
              <div className="mb-12">
                <p className="tracking-[0.22em] uppercase text-muted-foreground text-[0.72rem] font-semibold">
                  03 · Services
                </p>
                <h2 className="mt-3 font-instrument text-3xl tracking-tight sm:text-4xl">
                  Services offered.
                </h2>
              </div>

              <ul className="border-t border-border">
                {services.map((service) => (
                  <li key={service.number} className="border-b border-border">
                    <Link
                      to="/contact"
                      className="group flex items-center justify-between gap-4 py-4 text-base transition-colors hover:text-lavender"
                    >
                      <span className="flex min-w-0 items-center gap-4">
                        <span className=" text-sm text-lavender ">
                          {service.number}.
                        </span>

                        <span className="text-base">{service.title}</span>
                      </span>

                      <FiArrowUpRight
                        className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        size={18}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t border-border py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 max-w-2xl">
              <p className="tracking-[0.22em] uppercase text-muted-foreground text-[0.72rem] font-semibold">
                What we can build
              </p>
              <h2 className="mt-3 font-instrument text-4xl sm:text-5xl">
                A closer look at each service.
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Every project starts with a different challenge. Whether you
                need a complete web application, a new feature or improvements
                to an existing website, we can find the right approach together.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.number}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border p-5 transition-all duration-300 hover:-translate-y-1 hover:border-lavender/50 hover:bg-secondary/40 sm:p-6 lg:p-7"
                >
                  {/* Subtle hover accent */}
                  <div className="absolute left-0 top-0 h-0.5 w-0 bg-lavender transition-all duration-300 group-hover:w-full" />

                  <div className="flex items-start justify-between gap-4">
                    <span className="font-instrument text-lg tracking-wider text-lavender">
                      {service.number}
                    </span>

                    <FiArrowUpRight
                      className="text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lavender"
                      size={20}
                    />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold tracking-tight">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-3 border-t border-border pt-5">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-lavender" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-7">
                    <Link
                      to="/contact"
                      className="inline-flex min-h-10 items-center gap-2 text-sm font-medium transition-colors hover:text-lavender"
                    >
                      Discuss your project
                      <FiArrowUpRight
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        size={16}
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary/30 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 max-w-2xl">
              <p className="tracking-[0.22em] uppercase text-muted-foreground text-[0.72rem] font-semibold">
                A starting point
              </p>
              <h2 className="mt-3 font-instrument text-4xl sm:text-5xl">
                From an idea to a clear plan.
              </h2>
            </div>
            <ol className="grid gap-8 md:grid-cols-3">
              <li>
                <p className="font-instrument text-4xl text-lavender">01</p>
                <h3 className="mt-4 text-lg font-semibold">
                  Talk about the goal
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Share what you’re building, who it’s for, and the problem you
                  want to solve.
                </p>
              </li>
              <li>
                <p className="font-instrument text-4xl text-lavender">02</p>
                <h3 className="mt-4 text-lg font-semibold">Define the scope</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Identify the important pages, features, integrations, and
                  priorities before deciding on the work.
                </p>
              </li>
              <li>
                <p className="font-instrument text-4xl text-lavender">03</p>
                <h3 className="mt-4 text-lg font-semibold">
                  Agree on the next steps
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Discuss deliverables and a suitable timeline together, based
                  on the actual requirements.
                </p>
              </li>
            </ol>
          </div>
        </section>
      </main>
    </>
  );
};

export default ServicePage;
