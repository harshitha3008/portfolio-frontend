import React, { useState, useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useInView from "../hooks/useInView";
import "../css/Projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [animatedCards, setAnimatedCards] = useState([]);
  const [projectsRef, projectsVisible] = useInView({ threshold: 0.3 });
  const [waveRef, waveVisible] = useInView({ threshold: 0.4 });

  const navigate = useNavigate();

  // Fetch projects from backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  // Trigger staggered animation when in view
  useEffect(() => {
    if (projectsVisible && visibleProjects.length > 0) {
      visibleProjects.forEach((_, idx) => {
        setTimeout(() => {
          setAnimatedCards((prev) => {
            const updated = [...prev];
            updated[idx] = true;
            return updated;
          });
        }, idx * 200);
      });
    }
  }, [projectsVisible, showAll, projects]);

  // Animation direction logic
  const getAnimationClass = (idx) => {
    if (idx % 3 === 0) return "animate-slideLeft";
    if (idx % 3 === 1) return "animate-slideUp";
    if (idx % 3 === 2) return "animate-slideRight";
    return "animate-slideUp";
  };

  return (
    <>
    <section id="projects" ref={projectsRef} className="bg-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className={`text-4xl md:text-5xl font-extrabold mb-16 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent
          ${projectsVisible ? "animate-slideUp delay-100" : "opacity-0"}`}
        >
          Projects
        </h2>

        {/* === Projects Grid === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {visibleProjects.map((project, idx) => {
            const cardAnimation = animatedCards[idx] ? getAnimationClass(idx) : "opacity-0";

            return (
              <div
                key={project.id}
                className={`bg-gradient-to-b from-black/70 to-black/50 border border-orange-400/80 
                  backdrop-blur-lg rounded-2xl p-5 shadow-[0_4px_15px_rgba(255,165,0,0.2)]
                  hover:shadow-[0_6px_25px_rgba(255,165,0,0.4)] hover:-translate-y-2 transition-all duration-300 ${cardAnimation}`}
              >
                <img
                  src={`https://portfolio-frontend-c2zz.onrender.com${project.imageUrl}`}
                  alt={project.title}
                  className="rounded-lg w-full h-48 object-cover mb-4"
                />
                <h3 className="text-xl font-bold mb-2 text-orange-400">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4 project-tagline">
                  {project.tagline}
                </p>

                <div className="flex justify-center gap-4">
                  {/* Live Demo button */}
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold bg-orange-500 text-black px-4 py-2 rounded-full flex items-center gap-2 hover:bg-orange-400 transition-all"
                    >
                      Live Demo <FaExternalLinkAlt className="text-xs" />
                    </a>
                  )}


                  {/* Details button */}
                  <button
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="text-sm font-semibold border border-orange-400 text-orange-400 px-4 py-2 rounded-full hover:bg-orange-400 hover:text-black transition-all"
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* === Show More Button === */}
        <div className="mt-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-transparent border-2 border-orange-400 text-orange-400 px-6 py-2 rounded-full font-semibold hover:bg-orange-400 hover:text-black transition-all duration-300"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
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

export default Projects;
