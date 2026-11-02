import { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const initialForm = {
  name: "",
  email: "",
  projectType: "",
  budget: "Not sure yet",
  timeline: "",
  message: "",
  botcheck: "",
};

const inputClasses =
  "w-full rounded-2xl border border-border bg-background px-5 py-3.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-lavender";

const labelClasses = "mb-2 block text-sm font-medium text-foreground";

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    type: "",
    message: "",
  });
  useEffect(() => {
    if (result.type !== "success") return;

    const timeout = setTimeout(() => {
      setResult({
        type: "",
        message: "",
      });
    }, 5000);

    return () => clearTimeout(timeout);
  }, [result]);
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!ACCESS_KEY) {
      setResult({
        type: "error",
        message: "Form configuration is missing. Please contact me directly.",
      });
      return;
    }

    setLoading(true);
    setResult({ type: "", message: "" });

    try {
      const payload = {
        access_key: ACCESS_KEY,
        subject: `New project inquiry from ${form.name}`,
        from_name: "Portfolio Website",
        name: form.name,
        email: form.email,
        project_type: form.projectType,
        budget: form.budget,
        timeline: form.timeline || "Not specified",
        message: form.message,
        botcheck: form.botcheck,
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult({
          type: "success",
          message: "Thanks for reaching out! I'll get back to you soon.",
        });

        setForm(initialForm);
      } else {
        throw new Error(data.message || "Something went wrong.");
      }
    } catch (error) {
      setResult({
        type: "error",
        message:
          error.message ||
          "Unable to send your message. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-[28px] border border-border bg-card p-6 shadow-sm sm:p-8"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClasses}>
              Name <span className="text-lavender ">*</span>
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              className={inputClasses}
              maxLength={80}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>
              Email <span className="text-lavender">*</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className={inputClasses}
              maxLength={120}
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="projectType" className={labelClasses}>
            Project type <span className="text-lavender">*</span>
          </label>

          <select
            id="projectType"
            name="projectType"
            value={form.projectType}
            onChange={handleChange}
            className={inputClasses}
            required
          >
            <option value="" disabled>
              Select...
            </option>
            <option value="Website development">Website development</option>
            <option value="Full-stack web application">
              Full-stack web application
            </option>
            <option value="Frontend development">Frontend development</option>
            <option value="Backend development">Backend development</option>
            <option value="Website redesign">Website redesign</option>
            <option value="Portfolio website">Portfolio website</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Maintenance / improvements">
              Maintenance / improvements
            </option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="budget" className={labelClasses}>
              Budget{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </label>

            <select
              id="budget"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="Not sure yet">Not sure yet</option>
              <option value="Under NPR 15,000">Under NPR 15,000</option>
              <option value="NPR 15,000 – 30,000">NPR 15,000 – 30,000</option>
              <option value="Discuss budget">I'd like to discuss</option>
            </select>
          </div>

          <div>
            <label htmlFor="timeline" className={labelClasses}>
              Timeline{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </label>

            <input
              id="timeline"
              name="timeline"
              type="text"
              placeholder="e.g. by March"
              value={form.timeline}
              onChange={handleChange}
              className={inputClasses}
              maxLength={100}
            />
          </div>
        </div>

        {/* Project message */}
        <div className="mt-6">
          <label htmlFor="message" className={labelClasses}>
            About your project <span className="text-lavender">*</span>
          </label>

          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="What are you building, and who will use it?"
            value={form.message}
            onChange={handleChange}
            className={`${inputClasses} min-h-[150px] resize-y`}
            maxLength={5000}
            required
          />
        </div>

        {/* Honeypot spam protection */}
        <input
          type="checkbox"
          name="botcheck"
          checked={Boolean(form.botcheck)}
          onChange={handleChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {result.message && (
          <p
            role="status"
            aria-live="polite"
            className={`mt-4 text-sm ${
              result.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {result.message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#1c1c2b] px-6 py-4 text-sm font-medium text-white transition-all hover:bg-[#2c2c3d] hover:shadow-md cursor-pointer"
        >
          {loading ? "Sending message..." : "Send message"}

          {!loading && <FiSend size={18} strokeWidth={1.6} />}
        </button>
      </form>
    </section>
  );
};

export default Contact;
