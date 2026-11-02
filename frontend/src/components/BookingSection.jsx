import { FaRegCalendarAlt } from "react-icons/fa";
import { InlineWidget } from "react-calendly";
import { StarLoader } from "./PageStates";
const CalendlyLoader = () => (
  <div className="flex h-[600px] w-full items-center justify-center bg-white">
    <StarLoader />
  </div>
);
const BookingSection = () => {
  return (
    <section className="scroll-mt-16 bg-secondary/40">
      <div id="booking" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-8 text-center">
          <FaRegCalendarAlt className="mx-auto size-6 text-lavender" />
          <h2 className="my-4 font-instrument text-3xl sm:text-4xl">
            Book a conversation.
          </h2>
        </div>
        {/* Calendly Container */}
        <div>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <InlineWidget
              url="https://calendly.com/rabinapradhan/free-project-discovery-call"
              LoadingSpinner={CalendlyLoader}
              styles={{
                height: "600px",
                minWidth: "320px",
                width: "100%",
              }}
              pageSettings={{
                backgroundColor: "ffffff",
                textColor: "172554",
                primaryColor: "a78bfa",
                hideEventTypeDetails: false,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
