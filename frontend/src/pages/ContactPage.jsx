import { MdOutlineMail } from "react-icons/md";
import Contact from "../components/Contact";
import LetsCollaborate from "../components/LetsCollaborate";
import BookingSection from "../components/BookingSection";

import Seo from "../components/Seo";
const ContactPage = () => {
  return (
    <>
      <Seo
        title="Contact Rabina Pradhan | Web Developer"
        description="Get in touch with Rabina Pradhan for freelance web development projects, collaborations, and software engineering opportunities."
      />
      <main className="pt-16">
        <section className="py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
            <div>
              <div className="mb-10 max-w-2xl">
                <p className="tracking-[0.22em] uppercase text-muted-foreground text-[0.72rem] font-semibold">
                  Before we talk
                </p>
                <h2 className="mt-3 font-instrument text-4xl sm:text-5xl">
                  Tell me what you’re imagining.
                </h2>
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  A rough idea is enough to begin. Whether you’re building a new
                  website, improving an existing application, or exploring a
                  collaboration, a little context helps make our conversation
                  more useful.
                </p>
              </div>
              <a
                href="mailto:hello@rabina.dev"
                className="inline-flex items-center justify-center gap-2  text-sm font-medium cursor-pointer border border-border  shadow-sm hover:bg-lavender  h-9 px-4 py-2 rounded-full"
              >
                Or, email me directly
                <MdOutlineMail size={16} />
              </a>
            </div>
            {/* form */}
            <Contact />
          </div>
        </section>
        <LetsCollaborate />
        <BookingSection />
      </main>
    </>
  );
};

export default ContactPage;
