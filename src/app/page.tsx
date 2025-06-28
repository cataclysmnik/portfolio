"use client"

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TextPressure from '../TextAnimations/TextPressure/TextPressure';
import ScrollReveal from '../TextAnimations/ScrollReveal/ScrollReveal';
import ScrollFloat from '../TextAnimations/ScrollFloat/ScrollFloat';
import FlowingMenu from "../Components/FlowingMenu/FlowingMenu";
import Link from "next/link";
import Lenis from "lenis";
import SpotlightCard from "@/Components/SpotlightCard/SpotlightCard";
import Silk from "@/Backgrounds/Silk/Silk";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const demoItems = [
    { link: 'https://en.wikipedia.org/wiki/HTML', text: 'HTML', image: './stack/html.svg' },
    { link: 'https://en.wikipedia.org/wiki/CSS', text: 'CSS', image: './stack/css.svg' },
    { link: 'https://en.wikipedia.org/wiki/JavaScript', text: 'Javascript', image: './stack/js.svg' },
    { link: 'https://www.typescriptlang.org/', text: 'Typescript', image: './stack/ts.svg' },
    { link: 'https://react.dev/', text: 'ReactJS', image: './stack/react.svg' },
    { link: 'https://reactnative.dev/', text: 'React Native', image: './stack/rn.svg' },
    { link: 'https://tailwindcss.com/', text: 'Tailwind', image: './stack/tailwind.svg' },
    { link: 'https://getbootstrap.com/', text: 'Bootstrap', image: './stack/bootstrap.svg' },
    { link: 'https://gsap.com/', text: 'GSAP', image: './stack/gsap-black.svg' },
    { link: 'https://nextjs.org/', text: 'nextJS', image: './stack/next.svg' },
    { link: 'https://git-scm.com/', text: 'Git', image: './stack/git.svg' },
    { link: 'https://www.c-language.org/', text: 'C', image: './stack/c.svg' },
    { link: 'https://isocpp.org/', text: 'C++', image: './stack/cpp.svg' },
    { link: 'https://www.python.org/', text: 'Python', image: './stack/python.svg' },
  ];

  // Scroll progress bar logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) : 0;
      setScrollProgress(progress);

      // Section highlighting logic
      const sections = ["about", "stack", "projects", "contact"];
      let current = "about";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Timeline fade-in logic
  const timelineRefs = [useRef(null), useRef(null), useRef(null)];
  const [visible, setVisible] = useState([false, false, false]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    timelineRefs.forEach((ref, idx) => {
      if (!ref.current) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => {
              const updated = [...prev];
              updated[idx] = true;
              return updated;
            });
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(ref.current);
      observers.push(observer);
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, [timelineRefs]);

  // Timeline fade-in/out logic for the whole timeline
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const [timelineVisible, setTimelineVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setTimelineVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (timelineContainerRef.current) {
      observer.observe(timelineContainerRef.current);
    }
    return () => {
      if (timelineContainerRef.current) {
        observer.unobserve(timelineContainerRef.current);
      }
    };
  }, []);

  // Refs for social icons
  const githubRef = useRef<HTMLDivElement>(null);
  const linkedinRef = useRef<HTMLDivElement>(null);
  const mailRef = useRef<HTMLDivElement>(null);
  const instagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate in on mount using the Web Animations API
    const icons = [githubRef, linkedinRef, mailRef, instagramRef];
    icons.forEach((ref, i) => {
      if (ref.current) {
        ref.current.animate(
          [
            { opacity: 0, transform: "translateY(40px) scale(0.7)" },
            { opacity: 1, transform: "translateY(0px) scale(1)" }
          ],
          {
            duration: 900,
            delay: i * 120,
            easing: "cubic-bezier(.23,1.32,.57,1)",
            fill: "forwards"
          }
        );
      }
    });

    // Add hover effect using the Web Animations API
    icons.forEach((ref) => {
      const el = ref.current;
      if (!el) return;
      let hoverAnimation: Animation | null = null;

      const onEnter = () => {
        hoverAnimation?.cancel();
        hoverAnimation = el.animate(
          [
            { transform: "scale(1)" },
            { transform: `scale(1.18)` }
          ],
          {
            duration: 350,
            easing: "cubic-bezier(.23,1.32,.57,1)",
            fill: "forwards"
          }
        );
      };

      const onLeave = () => {
        hoverAnimation?.cancel();
        hoverAnimation = el.animate(
          [
            { transform: el.style.transform || "scale(1.18) rotate(0deg)" },
            { transform: "scale(1) rotate(0deg)" }
          ],
          {
            duration: 350,
            easing: "cubic-bezier(.23,1.32,.57,1)",
            fill: "forwards"
          }
        );
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      // Cleanup listeners on unmount
      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    });
  }, []);

  // Socials fade-in/out logic
  const socialsContainerRef = useRef<HTMLDivElement>(null);
  const [socialsVisible, setSocialsVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setSocialsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (socialsContainerRef.current) {
      observer.observe(socialsContainerRef.current);
    }
    return () => {
      if (socialsContainerRef.current) {
        observer.unobserve(socialsContainerRef.current);
      }
    };
  }, []);

  // Toast state for email copy
  const [showToast, setShowToast] = useState(false);

  // Email copy handler
  const handleEmailClick = () => {
    const email = "sagnik.singha@outlook.com";
    navigator.clipboard.writeText(email).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1800);
    });
  };

  // Arrow fade-in/out logic
  const arrowRef = useRef<SVGSVGElement>(null);
  const [arrowVisible, setArrowVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide arrow after user scrolls down 100px
      setArrowVisible(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tooltip state for cursor
  const [cursorTooltip, setCursorTooltip] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  // Custom cursor logic with tooltip
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a,button,[role=button]");
      if (el) {
        cursor.classList.add("ring");
        // Tooltip logic for socials
        if (el instanceof HTMLAnchorElement) {
          if (el.href.includes("github.com")) setCursorTooltip("GitHub");
          else if (el.href.includes("linkedin.com")) setCursorTooltip("LinkedIn");
          else if (el.href.includes("instagram.com")) setCursorTooltip("Instagram");
          else if (el.href.startsWith("mailto:")) setCursorTooltip("Email");
          else setCursorTooltip(null);
        } else {
          setCursorTooltip(null);
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a,button,[role=button]");
      if (el) {
        cursor.classList.remove("ring");
        setCursorTooltip(null);
      }
    };

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  // Smooth scroll for navbar links
  useEffect(() => {
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        const href = target.getAttribute("href")!;
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          // Adjust offset if you have a sticky navbar (change 80 if needed)
          const y = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    };
    const navbar = document.getElementById("navbar");
    if (navbar) {
      navbar.addEventListener("click", handleNavClick);
    }
    return () => {
      if (navbar) {
        navbar.removeEventListener("click", handleNavClick);
      }
    };
  }, []);

  return (
    <div className="bg-black cursor-none" ref={scrollContainerRef}>
      {/* Custom Cursor - hidden on mobile */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-3 h-3 rounded-full bg-white transition-all duration-200 hidden sm:block"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
          transition: "box-shadow 0.2s, background 0.2s, border 0.2s",
          mixBlendMode: "difference",
        }}
      />
      {/* Floating Tooltip - hidden on mobile */}
      {cursorTooltip && (
        <div
          className="fixed z-[10000] px-3 py-1 bg-white text-black text-xs font-semibold pointer-events-none transition-all duration-150 hidden sm:block"
          style={{
            left: cursorPos.x + 18,
            top: cursorPos.y + 18,
            transform: "translateY(-50%)",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 8px 0 #0002",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {cursorTooltip}
        </div>
      )}
      <style>{`
        .ring {
          box-shadow:
            0 0 0 0px #fff,
            0 0 0 8px #fff,
            0 0 16px 8px #fff6;
          background: #fff;
        }
      `}</style>
      <div className="flex py-96 md:py-0 md:pb-16 flex-col px-4 min-h-screen min-w-full relative">
        {/* Responsive SVG arrow as background, subtle gray, sharp corners, animated */}
        <svg
          ref={arrowRef}
          className={`absolute z-0 pointer-events-none w-full h-24 bottom-24 md:bottom-0 left-0 md:inset-0 md:h-full transition-opacity duration-700 ${arrowVisible ? "opacity-100" : "opacity-0"}`}
          viewBox="0 0 100 40"
          preserveAspectRatio="xMidYMin meet"
          aria-hidden="true"
        >
          <polyline
            points="15,15 50,35 85,15"
            fill="none"
            stroke="#111"
            strokeWidth="2"
            strokeLinejoin="miter"
            strokeLinecap="butt"
          />
        </svg>
        <TextPressure
          text="Frontend"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#ffffff"
          strokeColor="#ff0000"
          minFontSize={36}
        />
        <TextPressure
          text="Developer"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#ffffff"
          strokeColor="#ff0000"
          minFontSize={36}
        />
      </div>
      <div className="top-0 py-4 z-50 flex flex-row bg-black px-8 lg:px-36 relative" id="navbar" style={{ position: "sticky", top: 0 }}>
        <Link
          href={"#about"}
          className={`mx-2 px-3 py-1 rounded transition-colors duration-300 ${activeSection === "about" ? "text-white" : "text-gray-400"
            }`}
        >
          About
        </Link>
        <Link
          href={"#stack"}
          className={`mx-2 px-3 py-1 rounded transition-colors duration-300 ${activeSection === "stack" ? "text-white" : "text-gray-400"
            }`}
        >
          Stack
        </Link>
        <Link
          href={"#projects"}
          className={`mx-2 px-3 py-1 rounded transition-colors duration-300 ${activeSection === "projects" ? "text-white" : "text-gray-400"
            }`}
        >
          Projects
        </Link>
        <Link
          href={"#contact"}
          className={`mx-2 px-3 py-1 rounded transition-colors duration-300 ${activeSection === "contact" ? "text-white" : "text-gray-400"
            }`}
        >
          Contact
        </Link>
        {/* Progress Bar attached to navbar */}
        <div className="absolute left-0 bottom-0 w-full h-1 bg-transparent">
          <div
            className="h-full bg-white"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      <div className="flex md:py-48 py-10 flex-col md:flex-row align-middle justify-center px-4 min-w-full" id="about">
        <div className="lg:pl-50 flex flex-col md:w-6xl lg:w-6xl mx-4" ref={containerRef}>
          <ScrollFloat
            animationDuration={1}
            ease='back.inOut(2)'
            scrollStart='center bottom+=50%'
            scrollEnd='bottom bottom-=40%'
            stagger={0.03}
          >
            I am Sagnik Singha
          </ScrollFloat>
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={0}
            blurStrength={10}
            textClassName=""
            containerClassName="lg:w-[80%] md:w-[100%]"
          >
            I&apos;m a front-end developer with a passion for building clean, responsive, and interactive web experiences. I enjoy turning ideas into polished interfaces, whether it&apos;s a landing page, a dynamic portfolio, or a full-featured web app. My workflow often includes crafting custom components, fine-tuning animations, and optimizing for performance across devices. When I&apos;m not coding, you&apos;ll find me creating 3D digital art, stargazing, or exploring the intersection of design and technology. Let&apos;s build something amazing together.
          </ScrollReveal>
        </div>
        {/* Timeline */}
        <div
          ref={timelineContainerRef}
          className={`flex-1 flex justify-center md:justify-start mt-12 md:ml-12 transition-opacity duration-700 pl-4 ${timelineVisible ? "opacity-100" : "opacity-0"}`}
        >
          <ol className="relative border-l-4 border-white/20 ml-6 md:ml-0 h-fit">
            {/* Timeline Item 1 */}
            <li className="mb-12 ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-white rounded-full ring-8 ring-black"></span>
              <div
                ref={timelineRefs[0]}
                className={`transition-all duration-700 ease-out ${visible[0]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: "0.1s" }}
              >
                <h3 className="font-semibold text-white text-base">B.Tech in CSE</h3>
                <p className="text-gray-300 text-sm">Vellore Institute of Technology</p>
                <p className="text-gray-300 text-sm">GPA: 8.XX</p>
                <p className="text-gray-300 text-sm">2024 - 2028</p>
              </div>
            </li>
            {/* Timeline Item 2 */}
            <li className="mb-12 ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-white rounded-full ring-8 ring-black"></span>
              <div
                ref={timelineRefs[1]}
                className={`transition-all duration-700 ease-out ${visible[1]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: "0.2s" }}
              >
                <h3 className="font-semibold text-white text-base">Higher Secondary Education (ISC)</h3>
                <p className="text-gray-300 text-sm">Vidyasagar Shishu Niketan</p>
                <p className="text-gray-300 text-sm">Percentage: 95%</p>
                <p className="text-gray-300 text-sm">2024</p>
              </div>
            </li>
            {/* Timeline Item 3 */}
            <li className="ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-white rounded-full ring-8 ring-black"></span>
              <div
                ref={timelineRefs[2]}
                className={`transition-all duration-700 ease-out ${visible[2]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: "0.3s" }}
              >
                <h3 className="font-semibold text-white text-base">Secondary Education (ICSE)</h3>
                <p className="text-gray-300 text-sm">Vidyasagar Shishu Niketan</p>
                <p className="text-gray-300 text-sm">Percentage: 97%</p>
                <p className="text-gray-300 text-sm">2022</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
      <div className="flex py-10 md:pb-16 flex-col px-4 min-w-full" id="stack">
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=40%'
          stagger={0.03}
        >
          Tech Stack
        </ScrollFloat>
        <div>
          <div style={{ height: '800px', position: 'relative' }}>
            <FlowingMenu items={demoItems} />
          </div>
        </div>
        <div>
        </div>
      </div>
      <div className="flex py-10 md:pb-16 flex-col px-4 min-w-full" id="projects">
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=40%'
          stagger={0.03}
        >
          Projects
        </ScrollFloat>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mt-8">
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.2)">
            <div>
              <h1 className="font-semibold text-lg md:text-2xl">Planora</h1>
              <p>An AI based travel itinerary planner.</p>
              <div className="mt-4">
                <span className="bg-white text-gray-800 p-1 mr-1">nextJS</span>
                <span className="bg-white text-gray-800 p-1 mr-1">react</span>
                <span className="bg-white text-gray-800 p-1 mr-1">typescript</span>
                <span className="bg-white text-gray-800 p-1 mr-1">tailwindCSS</span>
              </div>
              <div className="mt-4">
                <Link target="blank" href={"https://github.com/cataclysmnik/planora"}><span className="mr-4 underline text-gray-300 transition-colors duration-300 hover:text-white">Github</span></Link>
                {/* <Link target="blank" href={"https://lightworks.vercel.app/"}><span className="underline text-gray-300 transition-colors duration-300 hover:text-white">Live View</span></Link> */}
              </div>
            </div>
          </SpotlightCard>
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.2)">
            <div>
              <h1 className="font-semibold text-lg md:text-2xl">Theta</h1>
              <p>A weather app for Android.</p>
              <div className="mt-4">
                <span className="bg-white text-gray-800 p-1 mr-1">react native</span>
                <span className="bg-white text-gray-800 p-1 mr-1">typescript</span>
              </div>
              <div className="mt-4">
                <Link target="blank" href={"https://github.com/cataclysmnik/thetaweather-mobile"}><span className="mr-4 underline text-gray-300 transition-colors duration-300 hover:text-white">Github</span></Link>
                {/* <Link target="blank" href={"https://lightworks.vercel.app/"}><span className="underline text-gray-300 transition-colors duration-300 hover:text-white">Live View</span></Link> */}
              </div>
            </div>
          </SpotlightCard>
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.2)">
            <div>
              <h1 className="font-semibold text-lg md:text-2xl">Retrofy</h1>
              <p>A retro image editor for Windows.</p>
              <div className="mt-4">
                <span className="bg-white text-gray-800 p-1 mr-1">python</span>
              </div>
              <div className="mt-4">
                <Link target="blank" href={"https://github.com/cataclysmnik/retrofy"}><span className="mr-4 underline text-gray-300 transition-colors duration-300 hover:text-white">Github</span></Link>
                {/* <Link target="blank" href={"https://lightworks.vercel.app/"}><span className="underline text-gray-300 transition-colors duration-300 hover:text-white">Live View</span></Link> */}
              </div>
            </div>
          </SpotlightCard>
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.2)">
            <div>
              <h1 className="font-semibold text-lg md:text-2xl">Lightworks</h1>
              <p>My photography portfolio.</p>
              <div className="mt-4">
                <span className="bg-white text-gray-800 p-1 mr-1">html</span>
                <span className="bg-white text-gray-800 p-1 mr-1">css</span>
                <span className="bg-white text-gray-800 p-1 mr-1">javascript</span>
                <span className="bg-white text-gray-800 p-1 mr-1">gsap</span>
              </div>
              <div className="mt-4">
                <Link target="blank" href={"https://github.com/cataclysmnik/lightworks"}><span className="mr-4 underline text-gray-300 transition-colors duration-300 hover:text-white">Github</span></Link>
                <Link target="blank" href={"https://lightworks.vercel.app/"}><span className="underline text-gray-300 transition-colors duration-300 hover:text-white">Live View</span></Link>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
      <div className="md:py-0 md:pb-16 flex-col px-4 min-w-full" id="contact">
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=40%'
          stagger={0.03}
        >
          Contact Me
        </ScrollFloat>
        <div className="h-80 relative">
          {/* Toast */}
          <div
            className={`fixed left-1/2 bottom-16 z-50 px-6 py-3 bg-white text-black font-semibold shadow-lg pointer-events-none transition-all duration-500
              ${showToast ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}
            style={{ transform: "translateX(-50%)" }}
          >
            Email copied!
          </div>
          <div
            ref={socialsContainerRef}
            className={`absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none p-32 transition-opacity duration-700 ${socialsVisible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex flex-row items-center justify-center gap-6 pointer-events-auto mb-4">
              <div ref={githubRef} className="transition-transform duration-200 hover:scale-110">
                <Link target="_blank" href="https://github.com/cataclysmnik" aria-label="Github">
                  <Image src="./connect/github.svg" width={150} height={150} className="md:h-[50px] md:w-[50px]" alt="Github" />
                </Link>
              </div>
              <div ref={linkedinRef} className="transition-transform duration-200 hover:scale-110">
                <Link target="_blank" href="https://linkedin.com/in/sagnik-singha-vit/" aria-label="LinkedIn">
                  <Image src="./connect/linkedin.svg" width={150} height={150} className="md:h-[50px] md:w-[50px]" alt="LinkedIn" />
                </Link>
              </div>
              <div ref={instagramRef} className="transition-transform duration-200 hover:scale-110">
                <Link target="_blank" href="https://instagram.com/_.lightworks._" aria-label="Instagram">
                  <Image src="./connect/instagram.svg" width={150} height={150} className="md:h-[50px] md:w-[50px]" alt="Instagram" />
                </Link>
              </div>
              <div ref={mailRef} className="transition-transform duration-200 hover:scale-110">
                <Link target="_blank" href="mailto:sagnik.singha@outlook.com" aria-label="Email">
                  <Image src="./connect/mail2.svg" width={150} height={150} className="md:h-[50px] md:w-[50px]" alt="Email" />
                </Link>
              </div>
            </div>
            <button
              onClick={handleEmailClick}
              className="text-lg text-gray-200 hover:text-white underline pointer-events-auto transition-colors duration-300"
              style={{ outline: "none" }}
              aria-label="Copy email to clipboard"
            >
              sagnik.singha@outlook.com
            </button>
          </div>
          <Silk
            speed={5}
            scale={1}
            color="#333333"
            noiseIntensity={1.5}
            rotation={0}
          />
        </div>
      </div>
    </div>
  );
}