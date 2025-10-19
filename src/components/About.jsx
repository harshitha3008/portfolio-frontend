import React, { useEffect, useState } from "react";
import { User, GraduationCap, Medal, ArrowRight } from "lucide-react"; 
import "../css/About.css";
import useInView from "../hooks/useInView";
import { useNavigate } from "react-router-dom";


// Icon map
const iconMap = {
  "Leadership & Extracurricular": (
    <User className="w-10 h-10 text-orange-400 drop-shadow-[0_0_8px_rgba(255,165,0,0.8)] transition-transform duration-300 group-hover:scale-110" />
  ),
  Education: (
    <GraduationCap className="w-10 h-10 text-yellow-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.8)] transition-transform duration-300 group-hover:scale-110" />
  ),
  "Achievements & Certifications": (
    <Medal className="w-10 h-10 text-orange-300 drop-shadow-[0_0_8px_rgba(255,200,0,0.8)] transition-transform duration-300 group-hover:scale-110" />
  ),
};


const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [aboutRef, aboutVisible] = useInView({ threshold: 0.3 });
  const [waveRef, waveVisible] = useInView({ threshold: 0.4 });
  
  const navigate = useNavigate();
  // Track which cards have animated individually
  const [animatedCards, setAnimatedCards] = useState([false, false, false]);

  useEffect(() => {
  // If there's a hash in the URL (like #Certifications), remove it on load
  if (window.location.hash) {
    window.history.replaceState(null, "", window.location.pathname);
  }
}, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/about`)
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch((err) => console.error("Error fetching about data:", err));
  }, []);

  // Trigger staggered animations when About section is visible
  useEffect(() => {
    if (aboutVisible && aboutData) {
      setTimeout(() => setAnimatedCards([true, false, false]), 100);  // left
      setTimeout(() => setAnimatedCards([true, true, false]), 300);   // middle
      setTimeout(() => setAnimatedCards([true, true, true]), 500);    // right
    }
  }, [aboutVisible, aboutData]);

  if (!aboutData) {
    return (
      <section className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-300 text-lg">Loading...</p>
      </section>
    );
  }

  return (
    <>
      {/* === ABOUT SECTION === */}
      <section
        id="about"
        ref={aboutRef}
        className="min-h-100vh bg-black text-white px-6 py-16"
      >
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Heading */}
          <h2
            className={`text-4xl md:text-5xl font-extrabold text-center
              bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent
              ${aboutVisible ? "animate-slideUp delay-100" : "opacity-0"}`}
          >
            About Me
          </h2>

          {/* Bio */}
          <p
            className={`text-gray-300 text-lg md:text-xl max-w-3xl mx-auto text-center
              ${aboutVisible ? "animate-slideLeft delay-300" : "opacity-0"}`}
          >
            {aboutData.bio}
          </p>

          {/* Buttons */}
          <div
            className={`flex flex-col sm:flex-row justify-center gap-4 mt-4 ${
              aboutVisible ? "animate-slideUp delay-500" : "opacity-0"
            }`}
          >
            <a
              href="/Harshitha_Lingamaneni.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              Download Resume
            </a>
            <a
              href="#projects"
              className="bg-transparent border-2 border-orange-400 text-orange-400 px-6 py-2 rounded-full font-semibold hover:bg-orange-400 hover:text-black transition-all duration-200"
            >
              View Projects
            </a>
          </div>

          {/* === Dynamic Cards === */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 cursor-pointer">
            {aboutData.sections.map((section, idx) => {
              let cardAnimation = "opacity-0";
              if (animatedCards[idx]) {
                if (idx === 0) cardAnimation = "animate-slideLeft";
                else if (idx === 1) cardAnimation = "animate-slideUp";
                else if (idx === 2) cardAnimation = "animate-slideRight";
              }

              return (
                <div
                  key={idx}
                  onClick={() => {
                    const map = {
                      "Education": "Education",
                      "Leadership & Extracurricular": "Leadership",
                      "Achievements & Certifications": "Certifications",
                    };
                    const tab = map[section.title] || "Education";

                    // Update hash in the URL (optional)
                    window.history.replaceState(null, "", `#${tab}`);

                    // Dispatch custom event to trigger tab change in Journey
                    window.dispatchEvent(new CustomEvent("scrollToJourney", { detail: { tab } }));

                    // Smooth scroll to Journey section
                    const journeySection = document.getElementById("journey");
                    if (journeySection) {
                      journeySection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`bg-gradient-to-b from-black/80 to-black/60 backdrop-blur-md rounded-xl p-4
                              shadow-[0_4px_15px_rgba(0,0,0,0.95)] border border-orange-400/90
                              flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(255,165,0,0.4)]
                              cursor-pointer ${cardAnimation}`}
                >
                  {/* Icon + Count */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="group bg-gradient-to-br from-orange-500/20 to-yellow-400/10 border border-orange-400/30 rounded-full p-4 flex items-center justify-center shadow-[0_0_15px_rgba(255,165,0,0.2)] hover:shadow-[0_0_25px_rgba(255,200,0,0.4)] transition-all duration-300">
                      {iconMap[section.title] || <User className="w-8 h-8 text-gray-400" />}
                    </div>
                    <p className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                      {section.count}
                    </p>
                  </div>

                  {/* Title + Tagline + Arrow */}
                  <div className="flex justify-between items-center mt-5">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                      <p className="text-sm text-gray-400">{section.tagline}</p>
                    </div>
                    <ArrowRight className="text-orange-400 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === WAVE LINE === */}
      <div className="w-screen overflow-hidden bg-black" ref={waveRef}>
        <svg
          className="w-screen h-16"
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
            d="M0,160 C240,80 480,240 720,160 C960,80 1200,240 1440,160"
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

export default About;
