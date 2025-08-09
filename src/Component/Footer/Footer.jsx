import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../Logo/Logo";

function Footer() {
  const linkStyle = {
    color: "#7c2d12",
    transition: "color 0.2s ease-in-out",
  };

  const activeStyle = {
    color: "#fb923c",
  };

  return (
    <footer
      className="py-8 mt-12"
      style={{
        background: "#fff7ed",
        color: "#7c2d12",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 flex flex-col items-center md:items-start">
          <Logo style={{ height: 40, marginBottom: 4 }} />
          <span
            className="text-xl font-bold"
            style={{ color: "#f97316" }}
          >
            MegaBlog
          </span>
          <p className="text-sm mt-1" style={{ color: "#7c2d12" }}>
            © {new Date().getFullYear()} MegaBlog. All rights reserved.
          </p>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/about"
                style={({ isActive }) =>
                  isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                style={({ isActive }) =>
                  isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/privacy"
                style={({ isActive }) =>
                  isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                }
              >
                Privacy Policy
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
