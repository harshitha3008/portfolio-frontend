import React, { useEffect, useState } from "react";
import useInView from "../hooks/useInView";
import "../css/Skills.css";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [skillsRef, skillsVisible] = useInView({ threshold: 0.3, triggerOnce: true });
  const [waveRef, waveVisible] = useInView({ threshold: 0.4 });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/skills`)
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error("Error fetching skills:", err));
  }, []);

  useEffect(() => {
    if (skillsVisible && skills.length > 0) {
      setAnimate(true);
    }
  }, [skillsVisible, skills]);

  return (
    <>
      <section
        id="skills"
        ref={skillsRef}
        className="min-h-screen bg-black text-white flex flex-col items-center py-16"
      >
        <h2
          className={`text-4xl md:text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent
          ${animate ? "animate-slideUpLeft delay-100" : "opacity-0"}`}
        >
          My Skills
        </h2>

        {skills.length > 0 && (
          <div className="skills-grid">
            {skills.map((skill, idx) => {
              const animation = idx % 2 === 0 ? "animate-slideUpLeft" : "animate-slideUpRight";
              const delayClass = `delay-${(idx % 9 + 1) * 100}`;
              return (
                <div
                  key={skill.id}
                  className={`skill-card ${animate ? `${animation} ${delayClass}` : "opacity-0"}`}
                >
                  <div className="skill-image-wrapper group">
                    <img
                      src={`https://portfolio-frontend-c2zz.onrender.com${skill.logoUrl}`}
                      alt={skill.name}
                      className="w-16 h-16 mb-3 object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(255,165,0,0.7)]"
                    />
                  </div>
                  <p className="text-lg font-medium text-orange-300">{skill.name}</p>
                </div>
              );
            })}
          </div>
        )}
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

export default Skills;
