import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

// Reusable image wrapper
const ImageClipBox = ({ src, clipClass, alt = "" }) => (
  <div className={clipClass}>
    <img src={src} alt={alt} loading="lazy" />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        
        {/* Left decorative images */}
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-1.webp"
            alt="Contact decoration"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/contact-2.webp"
            alt="Contact decoration"
            clipClass="contact-clip-path-2 translate-y-60 lg:translate-y-40"
          />
        </div>

        {/* Swordman images */}
        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/swordman-partial.webp"
            alt="Swordman"
            clipClass="absolute md:scale-125"
          />
          <ImageClipBox
            src="/img/swordman.webp"
            alt="Swordman"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Join Zentry
          </p>

          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether."
            className="special-font w-full !text-5xl !font-black !leading-[.9] font-zentry !md:text-[6.2rem]"
          />

          <Button
            title="Contact Us"
            containerClass="mt-10 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;