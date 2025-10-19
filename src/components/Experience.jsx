import React, { useEffect, useState } from "react";
import { FaBriefcase, FaMapMarkerAlt, FaCode } from "react-icons/fa";
import useInView from "../hooks/useInView";

const Experience = () => {
  const [experienceData, setExperienceData] = useState(null);
  const [expRef, expVisible] = useInView({ threshold: 0.3 });
  const [waveRef, waveVisible] = useInView({ threshold: 0.4 });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/experience`) // backend endpoint
      .then((res) => res.json())
      .then((data) => setExperienceData(data))
      .catch((err) => console.error("Error fetching experience data:", err));
  }, []);

  if (!experienceData) {
    return (
      <section className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-orange-400 animate-pulse">Loading experience...</p>
      </section>
    );
  }

  return (
    <>

      {/* Experience Section */}
      <section
        id="experience"
        ref={expRef}
        className="min-h-screen bg-black text-white px-6 py-20"
      >
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Heading */}
          <h2
            className={`text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent
            ${expVisible ? "animate-slideUp delay-100" : "opacity-0"}`}
          >
            Experience
          </h2>

          {/* Experience Cards */}
          {experienceData.map((exp, idx) => {
            const cardAnimation = expVisible
              ? `animate-slideUp delay-${300 + idx * 200}`
              : "opacity-0";

            return (
              <div
                key={idx}
                className={`mt-12 bg-gradient-to-b from-black/80 to-black/60 border border-orange-400/70 rounded-2xl shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-1 p-6 md:p-8 space-y-6 ${cardAnimation}`}
              >
                {/* Header: Role + Company */}
                <div className={`flex flex-col md:flex-row md:items-center md:justify-between`}>
                  <div className={`${expVisible ? "animate-slideUp delay-500" : "opacity-0"}`}>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      <FaBriefcase className="text-orange-400" />
                      {exp.role}
                    </h3>
                    <p className="text-lg text-gray-300">{exp.company}</p>
                  </div>
                  <div className={`text-sm text-gray-400 mt-2 md:mt-0 text-right ${expVisible ? "animate-slideUp delay-600" : "opacity-0"}`}>
                    <p>{exp.duration}</p>
                    <p className="flex items-center gap-1 justify-end">
                      <FaMapMarkerAlt className="text-orange-400" /> Guntur, India
                    </p>
                  </div>
                </div>

                {/* Projects */}
                <div className="space-y-6">
                  {exp.projects.map((project, i) => (
                    <div
                      key={i}
                      className={`border-l-4 border-orange-400 pl-4 space-y-2 ${expVisible ? "animate-slideUp delay-" + (700 + i * 200) : "opacity-0"}`}
                    >
                      <h4 className="text-xl font-semibold text-white">{project.title}</h4>
                      <p className="text-gray-300">{project.description}</p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech, t) => (
                          <span
                            key={t}
                            className="bg-black/60 border border-orange-400/30 px-3 py-1 rounded-full text-sm text-orange-300 flex items-center gap-2"
                          >
                            <FaCode className="text-yellow-400" />
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Role-Based Features */}
                      {project.roleBasedFeatures && (
                        <ul className="list-disc list-inside mt-2 text-gray-400 text-sm space-y-1">
                          <li>
                            <span className="font-semibold text-white">DEO:</span> {project.roleBasedFeatures.DEO}
                          </li>
                          <li>
                            <span className="font-semibold text-white">AR:</span> {project.roleBasedFeatures.AR}
                          </li>
                          <li>
                            <span className="font-semibold text-white">Registrar:</span> {project.roleBasedFeatures.Registrar}
                          </li>
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
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

export default Experience;
