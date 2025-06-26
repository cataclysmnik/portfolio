"use client"

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import TextPressure from '../TextAnimations/TextPressure/TextPressure';
import ScrollReveal from '../TextAnimations/ScrollReveal/ScrollReveal';
import ScrollFloat from '../TextAnimations/ScrollFloat/ScrollFloat';
import ChromaGrid from '../Components/ChromaGrid/ChromaGrid';
import Link from "next/link";
import Lenis from "@studio-freight/lenis";

export default function Home() {
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

  const stackItems = [
    {
      image: "./stack/html.svg",
      title: "Sarah Johnson",
      subtitle: "Frontend Developer",
      handle: "@sarahjohnson",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "https://github.com/sarahjohnson"
    },
    {
      image: "./stack/css.svg",
      title: "Mike Chen",
      subtitle: "Backend Engineer",
      handle: "@mikechen",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://linkedin.com/in/mikechen"
    }
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
      { threshold: 0.5 }
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

  return (
    <div className="scroll-smooth bg-black">
      <div className="flex py-96 md:py-0 md:pb-16 flex-col px-4 min-h-screen min-w-full">
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
      <div className="sticky top-0 py-4 z-50 flex flex-row bg-black px-8 lg:px-36 relative" id="navbar" style={{ position: "sticky", top: 0 }}>
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

      <div className="flex py-96 flex-col md:flex-row align-middle justify-center px-4 min-h-screen min-w-full" id="about">
        <div className="lg:pl-50 flex flex-col md:w-6xl" ref={containerRef}>
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
            containerClassName="lg:w-[80%] md:w-[100%]"
            textClassName="text-sm"
          >
            I'm a front-end developer with a passion for building clean, responsive, and interactive web experiences. I enjoy turning ideas into polished interfaces, whether it's a landing page, a dynamic portfolio, or a full-featured web app. My workflow often includes crafting custom components, fine-tuning animations, and optimizing for performance across devices. When I’m not coding, you’ll find me creating 3D digital art, stargazing, or exploring the intersection of design and technology. Let’s build something amazing together.
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
      <div className="flex py-96 md:py-0 md:pb-16 flex-col px-4 min-h-screen min-w-full" id="stack">
        <h1>Stack</h1>
        <div style={{ height: '600px', position: 'relative' }}>
          <ChromaGrid
            items={stackItems}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </div>
      </div>
      <div className="flex py-96 md:py-0 md:pb-16 flex-col px-4 min-h-screen min-w-full" id="projects">
        <h1>Projects</h1>
      </div>
      <div className="flex py-96 md:py-0 md:pb-16 flex-col px-4 min-h-screen min-w-full" id="contact">
        <h1>Contact</h1>
      </div>
    </div>
  );
}
