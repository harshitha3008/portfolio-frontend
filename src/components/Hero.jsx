// src/components/Hero.jsx
import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";
import useInView from "../hooks/useInView";
import "../css/Hero.css";

const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const [waveRef, waveVisible] = useInView({ threshold: 0.4 });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/home`)
      .then((res) => res.json())
      .then((data) => setHeroData(data))
      .catch((err) => console.error("Error fetching hero data:", err));
  }, []);

  if (!heroData) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-orange-400 animate-pulse">Loading...</p>
      </section>
    );
  }

  const roleWords = heroData.role.split(" ");
  const mainRole = roleWords.slice(0, -1).join(" ");
  const lastWord = roleWords[roleWords.length - 1];

  return (
    <>
    <section
      id="home"
      className="min-h-screen flex flex-col md:flex-row items-center bg-black text-white px-6 pt-20 relative"
    >
      {/* Left Section */}
      <div className="flex-1 md:pl-6 lg:pl-20 text-center md:text-left space-y-6 md:space-y-10">
        <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-orange-400/40 bg-white/10 shadow-lg backdrop-blur-sm text-orange-300 text-sm sm:text-base font-semibold mb-4 animate-slideUp delay-100">
          ✨ Ready to Innovate
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight animate-slideUp delay-300">
          <span className="block text-white">{mainRole}</span>
          <span className="block bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            {lastWord}
          </span>
        </h2>

        <TypeAnimation
          sequence={heroData.typingTitles.flatMap((title) => [title, 2000])}
          wrapper="span"
          speed={10}
          repeat={Infinity}
          cursor={true}
          className="block text-xl sm:text-2xl md:text-3xl text-white animate-slideUp delay-500"
        />

        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl mx-auto md:mx-0 animate-slideUp delay-700 opacity-80">
          {heroData.tagline}
        </p>

        {/* Social Links */}
        <div className="flex gap-4 sm:gap-6 justify-center md:justify-start mt-4 text-2xl sm:text-3xl md:text-4xl animate-slideUp delay-900">
          {heroData.links?.github && (
            <a
              href={heroData.links?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-yellow-200 transition-all duration-200"
            >
              <FaGithub />
            </a>
          )}
          {heroData.links?.leetcode && (
            <a
              href={heroData.links?.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-yellow-200 transition-all duration-200"
            >
              <SiLeetcode />
            </a>
          )}
          {heroData.links?.gfg && (
            <a
              href={heroData.links?.gfg}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-yellow-200 transition-all duration-200"
            >
              <SiGeeksforgeeks />
            </a>
          )}
          {heroData.links?.linkedin && (
            <a
              href={heroData.links?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-yellow-200 transition-all duration-200"
            >
              <FaLinkedin />
            </a>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex justify-center mt-8 md:mt-0 animate-slideRight">
        <DotLottieReact
          src="https://lottie.host/a67be489-597a-4be5-857b-9c8dea659665/3943sX2NdY.lottie"
          loop
          autoplay
          className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] transform -translate-x-4 sm:-translate-x-8 md:-translate-x-20 transition-transform duration-1000 ease-out"
        />
      </div>
    </section>
    <div ref={waveRef} className="w-screen overflow-hidden bg-black">
        <svg
          className="w-screen h-32"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveStrokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFA500" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
            <filter id="waveLineShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#FFA500" floodOpacity="0.3" />
            </filter>
          </defs>

          <path
            d="M0,160 
              C240,80 480,240 720,160 
              C960,80 1200,240 1440,160"
            stroke="url(#waveStrokeGradient)"
            strokeWidth="6"
            fill="none"
            filter="url(#waveLineShadow)"
            className={`${waveVisible ? "animate-drawWave" : "opacity-0"}`}
          />
        </svg>
      </div>
      </>
  );
};

export default Hero;
