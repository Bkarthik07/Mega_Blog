import React from "react";
import { Container, Logo, Logout } from "../index";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="bg-[#fff7ed] text-[#7c2d12] py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <Logo />
          {/* <span className="text-xl font-bold text-[#f97316]">MegaBlog</span> */}
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-6 items-center">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `text-[#7c2d12] hover:text-[#fb923c] transition font-medium ${
                        isActive ? "text-[#fb923c]" : ""
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}

            {/* Logout Button */}
            {authStatus && (
              <li>
                <Logout />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
