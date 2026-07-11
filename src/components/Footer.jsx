import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

// Social media links
const socialLinks = [
  {
    href: "https://www.linkedin.com/in/sajan-thakuri/",
    icon: <FaLinkedin />,
    label: "LinkedIn",
  },
  {
    href: "https://x.com/Sajan_St",
    icon: <FaXTwitter />,
    label: "X (Twitter)",
  },
  {
    href: "https://github.com/sajansinghthakuri",
    icon: <FaGithub />,
    label: "GitHub",
  },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-[#5542ff] py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        {/* Copyright */}
        <p className="text-center text-sm font-light md:text-left">
          © {new Date().getFullYear()} Sajan. All rights reserved.
        </p>

        {/* Social icons */}
        <div className="flex justify-center gap-4 md:justify-start">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Privacy link */}
        <a
          href="#privacy-policy"
          className="text-center text-sm font-light hover:underline md:text-right"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;