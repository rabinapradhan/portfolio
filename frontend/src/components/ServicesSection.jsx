import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "Full-Stack Development",
  },
  {
    number: "02",
    title: "API Development",
  },
  {
    number: "03",
    title: "Frontend Development",
  },
  {
    number: "04",
    title: "UI Implementation",
  },
  {
    number: "05",
    title: "Responsive Web Development",
  },
  {
    number: "06",
    title: "Technical SEO",
  },
  {
    number: "07",
    title: "Automation Development",
  },
];

const ServicesSection = () => {
  return (
    <main className="overflow-hidden  pt-8">
      <section>
        <div className="mx-auto  max-w-6xl items-center gap-12 px-6 ">
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
      </section>
    </main>
  );
};

export default ServicesSection;
