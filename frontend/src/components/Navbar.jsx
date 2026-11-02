import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const getLinkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
      isActive
        ? "bg-[#f0eafd] text-[#292631]"
        : "text-[#777382] hover:text-[#292631]"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-[#fdfaff] transition-all duration-300">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <NavLink
          to="/"
          onClick={() => setIsOpen(false)}
          className="font-display text-2xl tracking-tight text-[#292631]"
        >
          rabina<span className="text-[#b9a9f5]">.dev</span>
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink to={item.path} className={getLinkClass}>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#292631] transition-colors hover:bg-[#f0eafd] md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X size={21} strokeWidth={1.8} />
          ) : (
            <Menu size={21} strokeWidth={1.8} />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-[#e9e3ef] bg-[#fdfaff] px-[18px] py-5 md:hidden">
          <ul className="mx-auto flex w-full flex-col gap-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex w-full items-center rounded-full px-5 py-[17px] text-[18px] leading-none transition-colors duration-200 ${
                      isActive
                        ? "bg-[#f0eafd] text-[#292631]"
                        : "text-[#777382] hover:bg-[#f7f3fc] hover:text-[#292631]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;
