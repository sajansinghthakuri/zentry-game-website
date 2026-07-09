import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";

// Navigation menu items
const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const NavBar = () => {
  /* -------------------------------------------------------------------------- */
  /*                                   State                                    */
  /* -------------------------------------------------------------------------- */

  // Controls background music and indicator animation
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                    Refs                                    */
  /* -------------------------------------------------------------------------- */

  // Audio element reference
  const audioElementRef = useRef(null);

  // Navbar container reference
  const navContainerRef = useRef(null);

  // Stores the previous scroll position without causing re-renders
  const lastScrollY = useRef(0);

  /* -------------------------------------------------------------------------- */
  /*                             Audio Toggle                                   */
  /* -------------------------------------------------------------------------- */

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  /* -------------------------------------------------------------------------- */
  /*                         Audio Play / Pause                                 */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const audio = audioElementRef.current;

    if (!audio) return;

    if (isAudioPlaying) {
      audio.play().catch(() => {
        // Ignore autoplay restrictions.
      });
    } else {
      audio.pause();
    }
  }, [isAudioPlaying]);

  /* -------------------------------------------------------------------------- */
  /*                        Navbar Scroll Animation                             */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const nav = navContainerRef.current;

    if (!nav) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar at the very top
      if (currentScrollY === 0) {
        nav.classList.remove("floating-nav");

        gsap.to(nav, {
          y: 0,
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // Hide navbar while scrolling down
      else if (currentScrollY > lastScrollY.current) {
        nav.classList.add("floating-nav");

        gsap.to(nav, {
          y: -100,
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // Show navbar while scrolling up
      else {
        nav.classList.add("floating-nav");

        gsap.to(nav, {
          y: 0,
          opacity: 1,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      // Save current scroll position
      lastScrollY.current = currentScrollY;
    };

    // Listen for scroll events
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Run once on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                   JSX                                      */
  /* -------------------------------------------------------------------------- */

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav
          className="flex size-full items-center justify-between p-4"
          aria-label="Main Navigation"
        >
          {/* ---------------------------------------------------------------- */}
          {/* Logo & Product Button                                            */}
          {/* ---------------------------------------------------------------- */}

          <div className="flex items-center gap-7">
            <img
              src="/img/logo.png"
              alt="Zentry Logo"
              className="w-10"
            />

            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="hidden items-center justify-center gap-1 bg-blue-50 md:flex"
            />
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Navigation Links & Audio Toggle                                  */}
          {/* ---------------------------------------------------------------- */}

          <div className="flex h-full items-center">
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Audio Toggle */}
            <button
              type="button"
              onClick={toggleAudioIndicator}
              aria-label={
                isAudioPlaying
                  ? "Pause background music"
                  : "Play background music"
              }
              aria-pressed={isAudioPlaying}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />

              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isAudioPlaying,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;