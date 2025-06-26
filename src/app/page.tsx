"use client"

import { useEffect } from "react";
import Image from "next/image";
import TextPressure from '../TextAnimations/TextPressure/TextPressure';
import GooeyNav from '../Components/GooeyNav/GooeyNav'
import Link from "next/link";
import Lenis from "@studio-freight/lenis";

export default function Home() {
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

  return (
    <div className="scroll-smooth">
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
      <div className="sticky top-0 py-4 z-50 flex flex-row backdrop-blur-sm px-8 lg:px-36" id="navbar">
        <Link href={"#about"}>About</Link>
        <Link href={"#stack"}>Stack</Link>
        <Link href={"#projects"}>Projects</Link>
        <Link href={"#contact"}>Contact</Link>
      </div>

      <div className="flex py-96 md:py-0 md:pb-16 flex-col px-4 min-h-screen min-w-full" id="about">
        <h1>About</h1>
      </div>
      <div className="flex py-96 md:py-0 md:pb-16 flex-col px-4 min-h-screen min-w-full" id="stack">
        <h1>Stack</h1>
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
