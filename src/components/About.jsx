import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  // Reference to the About component.
// GSAP uses this to scope selectors so animations only affect
// elements inside this component.
const containerRef = useRef(null);

useGSAP(
  () => {
    // Create a timeline controlled by ScrollTrigger.
    // The timeline expands the clipped image as the user scrolls.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5, // Sync animation progress with scroll
        pin: true,  // Keep the section fixed during the animation
      },
    });

    // Animate the clipped image to fill the viewport.
    // ease: "none" is recommended for scrub animations because
    // the scroll position controls the timing.
    tl.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      ease: "none",
    });
  },
  {
    // Restrict GSAP selectors to this component only.
    scope: containerRef,
  }
);

  return (
    // Scope all GSAP selectors to this component
    <section
      ref={containerRef}
      id="about"
      className="min-h-screen w-screen"
    >
      {/* =========================
          Section Heading
      ========================== */}
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">

        {/* Small section label */}
        <p className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Zentry
        </p>

        {/* Animated title */}
        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
          containerClass="mt-5 text-center !text-black"
        />

        {/* Subtitle */}
        <div className="about-subtext">
          <p>
            The Game of Games begins—your life, now an epic MMORPG
          </p>

          <p className="text-gray-500">
            Zentry unites every player from countless games and
            platforms, both digital and physical, into a unified
            Play Economy.
          </p>
        </div>
      </div>

      {/* =========================
          Image Reveal Section
      ========================== */}
      <div
        id="clip"
        className="h-dvh w-screen"
      >
        {/* This container is animated by GSAP.
            It expands from its clipped shape
            to cover the entire viewport. */}
        <div className="mask-clip-path about-image">

          <img
            src="img/about.webp"
            alt="Zentry fantasy landscape"
            className="absolute left-0 top-0 size-full object-cover"
          />

        </div>
      </div>
    </section>
  );
};

export default About;