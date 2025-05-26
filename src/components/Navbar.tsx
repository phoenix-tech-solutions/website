import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Landing", path: "/" },
  { name: "About us", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Work With Us", path: "/work" },
];

const Navbar = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [heroBottom, setHeroBottom] = useState<number | null>(null);
  const [minimized, setMinimized] = useState(false);
  const [navVisible, setNavVisible] = useState(true);

  const updateHeroBottom = useCallback(() => {
    const hero = document.getElementById("hero-section");
    if (hero) {
      const rect = hero.getBoundingClientRect();
      setHeroBottom(rect.bottom + window.scrollY);
    }
  }, []);

  useEffect(() => {
    if (!isLanding) {
      setScrolled(false);
      setHeroBottom(null);
      return;
    }
    updateHeroBottom();

    const handleScroll = () => {
      if (heroBottom !== null) {
        const scrollY = window.scrollY + 1;
        setScrolled(scrollY >= heroBottom);
      }
    };

    const handleResize = () => {
      updateHeroBottom();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    updateHeroBottom();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isLanding, updateHeroBottom, heroBottom]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (isLanding && scrolled && minimized) {
      timeout = setTimeout(() => setNavVisible(false), 400);
    } else {
      setNavVisible(true);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [minimized, isLanding, scrolled]);

  const NavLinks = () => (
    <ul
      className={`flex gap-6 md:gap-10 font-semibold tracking-wide transition-all duration-500
        ${isLanding && scrolled ? "text-sm font-mono text-white" : "text-base md:text-lg text-white"}
      `}
    >
      {navItems.map(({ name, path }) => {
        const isActive = location.pathname === path;
        return (
          <li key={path} className="relative group flex items-center">
            <Link
              to={path}
              className={`relative px-4 py-1.5 rounded-full transition-all duration-300 ease-in-out
                ${isActive ? "text-white" : "text-white/80 hover:text-white"}
                group-hover:scale-[1.04]
              `}
            >
              <span className="relative z-10">{name}</span>

              {/* Glimmer hover */}
              <span
                className="absolute inset-0 z-0 rounded-full opacity-0 group-hover:opacity-100 group-hover:blur-sm transition duration-500 bg-gradient-to-r from-indigo-500/20 via-fuchsia-400/30 to-pink-500/20"
              ></span>

              {/* Underline if active */}
              {isActive && (
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-[80%] h-0.5 rounded-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 transition-all duration-500" />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  // === FULL PAGE NAVBAR (Unscrolled, all pages) ===
  if (!scrolled) {
    return (
      <nav className="absolute top-0 left-0 w-full z-50 py-3 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center pt-2">
          <img
            src="/PTS_LOGO_WEBSITE_VERSION.png"
            alt="PTS Logo"
            className="h-12 md:h-14 lg:h-16 transition-all duration-700 drop-shadow-[0_8px_30px_rgba(190,24,93,0.5)]"
          />
          <ul className="flex gap-6 md:gap-10 font-semibold tracking-wide text-white text-base md:text-lg">
            {navItems.map(({ name, path }) => {
              const isActive = location.pathname === path;
              return (
                <li key={path} className="relative group flex items-center">
                  <Link
                    to={path}
                    className={`relative px-4 py-1.5 rounded-full transition-all duration-300 ease-in-out
                      ${isActive ? "text-white" : "text-white/80 hover:text-white"}
                      group-hover:scale-[1.04]
                    `}
                  >
                    <span className="relative z-10">{name}</span>
                    <span
                      className="absolute inset-0 z-0 rounded-full opacity-0 group-hover:opacity-100 group-hover:blur-sm transition duration-500 bg-gradient-to-r from-indigo-500/20 via-fuchsia-400/30 to-pink-500/20"
                    ></span>
                    {isActive && (
                      <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-[80%] h-0.5 rounded-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 transition-all duration-500" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    );
  }

  // === SCROLLED NAVBAR ===
  return (
    <nav
      className={`fixed z-50 transition-all duration-500 ease-in-out overflow-hidden
        ${isLanding && scrolled
          ? "top-10 left-[13%] -translate-x-0 px-6 py-3 bg-black/30 backdrop-blur-lg border border-white/10 rounded-full shadow-2xl before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/40 before:to-black/60 before:rounded-full before:z-[-1] h-14 md:h-16"
          : "w-full top-0 left-0 bg-black/80 backdrop-blur-xl shadow-xl py-4"}
        ${minimized ? "opacity-60" : ""}
      `}
      style={{
        fontFamily: isLanding && scrolled ? "monospace, sans-serif" : undefined,
        transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <div
        className={`flex items-center justify-between transition-all duration-500 ${
          isLanding && scrolled ? "gap-6" : "max-w-7xl mx-auto px-6"
        }`}
        style={
          isLanding && scrolled
            ? {
                height: "100%",
                minHeight: "100%",
                maxHeight: "100%",
              }
            : undefined
        }
      >
        {/* Logo */}
        <img
          src="/PTS_LOGO_WEBSITE_VERSION.png"
          alt="PTS Logo"
          className={`transition-all duration-500 ${
            isLanding && scrolled ? "h-10" : "h-14 md:h-16"
          }`}
          style={{
            filter: isLanding && scrolled
              ? "drop-shadow(0 2px 10px #6366f1)"
              : "drop-shadow(0 6px 30px #a21caf)",
          }}
        />

        {/* Nav Links */}
        <div
          className="overflow-hidden transition-all duration-500 flex items-center"
          style={{
            minHeight: isLanding && scrolled ? "100%" : undefined,
            height: isLanding && scrolled ? "100%" : undefined,
            maxHeight: isLanding && scrolled ? "100%" : undefined,
            maxWidth:
              isLanding && scrolled
                ? minimized
                  ? 0
                  : "36rem" // 576px, tailwind's max-w-3xl
                : undefined,
            opacity:
              isLanding && scrolled
                ? minimized
                  ? 0
                  : 1
                : 1,
            marginRight:
              isLanding && scrolled && minimized ? 0 : undefined,
            marginLeft:
              isLanding && scrolled && minimized ? 0 : undefined,
            transition:
              isLanding && scrolled
                ? minimized
                  ? "opacity 200ms cubic-bezier(0.4,0,0.2,1), max-width 300ms cubic-bezier(0.4,0,0.2,1) 200ms"
                  : "max-width 400ms cubic-bezier(0.4,0,0.2,1), opacity 300ms cubic-bezier(0.4,0,0.2,1)"
                : undefined,
          }}
        >
          {navVisible && (
            <ul
              className={`flex gap-6 md:gap-10 font-semibold tracking-wide transition-all duration-500
                ${isLanding && scrolled ? "text-sm font-mono text-white" : "text-base md:text-lg text-white"}
              `}
              style={{
                minHeight: isLanding && scrolled ? "100%" : undefined,
                height: isLanding && scrolled ? "100%" : undefined,
                maxHeight: isLanding && scrolled ? "100%" : undefined,
                opacity:
                  isLanding && scrolled && minimized ? 0 : 1,
                transition:
                  isLanding && scrolled && minimized
                    ? "opacity 200ms cubic-bezier(0.4,0,0.2,1)"
                    : "opacity 300ms cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              {navItems.map(({ name, path }) => {
                const isActive = location.pathname === path;
                return (
                  <li key={path} className="relative group flex items-center">
                    <Link
                      to={path}
                      className={`relative px-4 py-1.5 rounded-full transition-all duration-300 ease-in-out
                        ${isActive ? "text-orange-200" : "text-white/60 hover:text-white"}
                        group-hover:scale-[1.04]
                      `}
                    >
                      <span className="relative z-10">{name}</span>
                      <span
                        className="absolute inset-0 z-0 rounded-full opacity-0 group-hover:opacity-100 group-hover:blur-sm transition duration-500 bg-gradient-to-r from-indigo-500/20 via-fuchsia-400/30 to-pink-500/20"
                      ></span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Minimize Button */}
        {isLanding && scrolled && (
          <button
            onClick={() => setMinimized((m) => !m)}
            className="ml-4 p-1.5 rounded-full text-white transition-all duration-300 text-base font-bold"
            aria-label={minimized ? "Expand navbar" : "Minimize navbar"}
            type="button"
            style={{
              transition: "transform 400ms cubic-bezier(0.4,0,0.2,1)",
              transform: minimized ? "rotate(0deg)" : "rotate(0deg)"
            }}
          >
            {minimized ? ">" : "<"}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
