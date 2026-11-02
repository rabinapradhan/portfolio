import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/40 py-10">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link to="/" className="font-instrument text-2xl active">
            rabina.dev
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Full-stack developer crafting thoughtful, user-friendly web
            experiences and digital solutions.
          </p>
        </div>
        <div>
          <p className="tracking-[0.22em] uppercase text-muted-foreground text-[0.72rem] font-semibold">
            Navigate
          </p>
          <ul className="mt-4 space-y-2 text-sm px-2 text-muted-foreground">
            <li>
              <Link className="hover:text-foreground active">Home</Link>
            </li>
            <li to="/about">
              <Link className="hover:text-foreground ">About</Link>
            </li>
            <li to="/projects">
              <Link className="hover:text-foreground ">Projects</Link>
            </li>
            <li to="/services">
              <Link className="hover:text-foreground ">Services</Link>
            </li>

            <li to="/contact">
              <Link className="hover:text-foreground">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="tracking-[0.22em] uppercase text-muted-foreground text-[0.72rem] font-semibold">
            SOCIALS
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href=""
              target="_blank"
              aria-label="GitHub"
              rel="noopener noreferrer"
              className="rounded-full border border-border bg-card p-2.5 hover:bg-secondary"
            >
              <FiGithub size={16} />
            </a>
            <a
              href=""
              target="_blank"
              aria-label="LinkedIn"
              rel="noopener noreferrer"
              className="rounded-full border border-border bg-card p-2.5 hover:bg-secondary"
            >
              <FiLinkedin size={16} />
            </a>
            <a
              href="mailto:rabinaprd27@gmail.com"
              target="_blank"
              aria-label="Email"
              rel="noopener noreferrer"
              className="rounded-full border border-border bg-card p-2.5 hover:bg-secondary"
            >
              <MdOutlineEmail size={16} />
            </a>
          </div>
        </div>

        <p className="border-t text-sm border-border text-center pt-6  text-muted-foreground md:col-span-3">
          &copy; 2026 Rabina Pradhan. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
