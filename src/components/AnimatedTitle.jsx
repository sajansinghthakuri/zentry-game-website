import { useMemo, useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
  // Reference to this component.
  // GSAP uses it to scope selectors so animations only
  // affect elements inside AnimatedTitle.
  const containerRef = useRef(null);

  // Parse the title only when it changes.
  // This avoids splitting the string on every render.
  const lines = useMemo(() => {
    return title.split("<br />");
  }, [title]);

    useGSAP(
    () => {
      // Create a timeline so we can easily add more
      // animations in the future if needed.
      const titleTimeline = gsap.timeline({
        scrollTrigger: {
          // Start the animation when this component
          // enters the viewport.
          trigger: containerRef.current,

          // Start when the top of the component reaches
          // 100px above the bottom of the viewport.
          start: "100 bottom",

          // Finish when the center of the component
          // reaches the bottom of the viewport.
          end: "center bottom",

          // Play when scrolling down,
          // reverse when scrolling back up.
          toggleActions: "play none none reverse",
        },
      });

      // Animate every word individually.
      titleTimeline.to(
        ".animated-word",
        {
          // Fade words into view.
          opacity: 1,

          // Move each word back to its original position.
          y: 0,

          // Restore rotations to their normal values.
          rotateX: 0,
          rotateY: 0,

          // Animate words one after another.
          stagger: 0.02,

          // Smooth easing for the reveal.
          ease: "power2.out",

          // Let GSAP optimize transform performance.
          force3D: true,
        },
        0 // Start immediately at the beginning of the timeline.
      );
    },
    {
      // Scope all selectors like ".animated-word"
      // so they only affect elements inside this component.
      scope: containerRef,
    }
  );

    return (
    // Root container.
    // GSAP uses this ref to scope all animations inside this component.
    <div
      ref={containerRef}
      className={clsx("animated-title", containerClass)}
    >
      {/* Split the title into multiple lines.
          Example:
          "Hello <br /> World"

          becomes

          ["Hello", "World"]
      */}
      {lines.map((line, lineIndex) => (
        <div
          key={lineIndex}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {/* Split each line into individual words.
              Every word receives its own animation.
          */}
          {line.split(" ").map((word, wordIndex) => (
            <span
              key={`${lineIndex}-${wordIndex}`}

              // GSAP targets these elements
              className="animated-word"

              // Allows HTML tags like:
              // Disc<b>o</b>ver
              dangerouslySetInnerHTML={{
                __html: word,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;