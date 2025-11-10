"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export const Header = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileLinksOpen, setMobileLinksOpen] = useState(false);
  const clickScrollLock = useRef(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (clickScrollLock.current) return;
      const sections = ["home", "projects", "about", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initialize active section on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside (only active while open)
  useEffect(() => {
    if (!mobileLinksOpen) return;
    const handleWindowClick = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setMobileLinksOpen(false);
      }
    };
    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, [mobileLinksOpen]);

  const handleClick = (section: string) => {
    clickScrollLock.current = true;
    setActiveSection(section);
    // Scroll to the section smoothly with slight offset for fixed header
    const element = document.getElementById(section);
    if (element) {
      const headerOffset = 80; // adjust if header height changes
      const targetTop = Math.max(0, element.offsetTop - headerOffset);
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    }
    // release the lock shortly after the smooth scroll finishes
    window.setTimeout(() => {
      clickScrollLock.current = false;
    }, 700);
  };

  const getButtonClass = (section: string) => {
    // Extra-compact on mobile; scale up progressively on larger screens
    const base =
      "px-1 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-1.5 rounded-full font-medium transition-all duration-500 ease-in-out flex items-center gap-1";
    const size = "text-[9px] sm:text-xs md:text-sm";
    if (activeSection === section) {
      return `${base} ${size} text-gray-900 bg-gradient-to-r from-purple-400 to-purple-700`;
    }
    return `${base} ${size} text-white/80 hover:bg-white/15 hover:text-white`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50">
      <div className="w-full relative bg-white/10 backdrop-blur-sm shadow-md">
        <div className="flex justify-between items-center px-4 py-3 relative">
          {/* Left side: mobile toggle logo & desktop refresh logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Mobile toggle (logo) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileLinksOpen((s) => !s);
              }}
              className="md:hidden rounded-full -ml-2 md:ml-0 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-expanded={mobileLinksOpen}
              aria-label="Toggle social links"
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={28}
                height={28}
                className="rounded-full shadow-sm shadow-purple-500/30 hover:shadow-purple-500/60 transition-shadow"
                priority
              />
            </button>
            {/* Desktop logo (also toggles links) */}
            <button
              type="button"
              title="Open links"
              aria-label="Open links"
              onClick={(e) => {
                e.stopPropagation();
                setMobileLinksOpen((s) => !s);
              }}
              className="hidden md:inline-flex items-center justify-center rounded-full w-9 h-9 hover:scale-[1.02] transition-transform focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <Image
                src="/logo.png"
                alt="Site Logo"
                width={32}
                height={32}
                className="rounded-full shadow-sm shadow-purple-500/30"
                priority
              />
            </button>
          </div>

          {/* Center wrapper: on small screens this centers nav in flow; on larger screens it stays centered as well */}
          <div className="flex-1 flex justify-center">
            {/* Centered Navigation: compact on mobile so all buttons are visible without clipping */}
            <nav className="flex gap-0.5 sm:gap-1 p-0.5 flex-nowrap justify-center">
              <button
                onClick={() => handleClick("home")}
                className={getButtonClass("home")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 hidden sm:inline"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </button>
              <button
                onClick={() => handleClick("projects")}
                className={getButtonClass("projects")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 hidden sm:inline"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                Projects
              </button>
              <button
                onClick={() => handleClick("about")}
                className={getButtonClass("about")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 hidden sm:inline"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                About
              </button>
              <button
                onClick={() => handleClick("contact")}
                className={getButtonClass("contact")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 hidden sm:inline"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact
              </button>
            </nav>
          </div>

          {/* Right side: social media icons only */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden md:flex items-center gap-2">
              <a
                href="https://github.com/Barath1018"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full text-gray-300 hover:text-white hover:-translate-y-1 transition-all duration-300"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com/in/barath-senthil-933b03294/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full text-gray-300 hover:text-blue-600 hover:-translate-y-1 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
              </a>

              <a
                href="https://instagram.com/_barath_ob1t0"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full text-gray-300 hover:text-pink-500 hover:-translate-y-1 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://discord.com/users/barath_codex4"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full text-gray-300 hover:text-indigo-500 hover:-translate-y-1 transition-all duration-300"
                aria-label="Discord"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                </svg>
              </a>

              <a
                href="mailto:barath.senthil1602@gmail.com"
                className="p-1.5 rounded-full text-gray-300 hover:text-red-400 hover:-translate-y-1 transition-all duration-300"
                aria-label="Email"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Popover with links (shown when logo button is clicked) */}
          {mobileLinksOpen && (
            <div
              ref={mobileMenuRef}
              onClick={(e) => e.stopPropagation()}
              className="absolute left-3 top-full mt-2 min-w-[160px] bg-gray-900/90 text-gray-100 backdrop-blur-xl rounded-xl p-2 flex flex-col gap-1.5 z-[100] shadow-lg ring-1 ring-white/10"
            >
              <a
                href="https://github.com/Barath1018"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-gray-200 hover:bg-white/5"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/barath-senthil-933b03294/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-gray-200 hover:bg-white/5"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com/_barath_ob1t0"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-gray-200 hover:bg-white/5"
              >
                Instagram
              </a>
              <a
                href="https://discord.com/users/barath_codex4"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-gray-200 hover:bg-white/5"
              >
                Discord
              </a>
              <a
                href="mailto:barath.senthil1602@gmail.com"
                className="p-2 rounded-md text-gray-200 hover:bg-white/5"
              >
                Email
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
