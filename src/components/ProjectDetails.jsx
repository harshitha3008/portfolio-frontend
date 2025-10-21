import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Code, Layers, Box } from "lucide-react";
import "../css/ProjectDetails.css"; // add your CSS file

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [animateLeft, setAnimateLeft] = useState(false);
  const [animateRight, setAnimateRight] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id === projectId);
        setProject(found);
      });
  }, [projectId]);

  // trigger animation on page load after project is loaded
  useEffect(() => {
    if (project) {
      setTimeout(() => setAnimateLeft(true), 100); // left column
      setTimeout(() => setAnimateRight(true), 200); // right column
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-8 text-gray-400">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 hover:border-orange-400 hover:text-orange-400 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-gray-600">/</span>
          <span className="hover:text-orange-400 transition-colors duration-300 cursor-pointer">Projects</span>
          <span className="text-gray-600">/</span>
          <span className="text-white">{project.title}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className={`${animateLeft ? "animate-slideInLeft" : "opacity-0"} space-y-6`}>
            {/* Title & Tagline */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                {project.title}
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-orange-400 to-yellow-400 mb-6"></div>
              <p className="text-gray-300 text-lg leading-relaxed">{project.tagline}</p>
            </div>

            {/* Stats */}
            <div className="flex gap-4 pt-4 pb-2">
              <div className="flex items-center gap-3 bg-gray-900 border border-orange-400/30 rounded-lg px-4 py-3 hover:border-orange-400 hover:shadow-[0_0_15px_rgba(255,165,0,0.2)] transition-all duration-300 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-orange-400/10 border border-orange-400/30 flex items-center justify-center">
                  <Code className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-400">{project.technologiesUsed.length}</p>
                  <p className="text-xs text-gray-400">Total Technology</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-900 border border-orange-400/30 rounded-lg px-4 py-3 hover:border-orange-400 hover:shadow-[0_0_15px_rgba(255,165,0,0.2)] transition-all duration-300 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-orange-400/10 border border-orange-400/30 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-400">{project.keyFeatures.length}</p>
                  <p className="text-xs text-gray-400">Key Features</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-orange-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 hover:shadow-[0_0_20px_rgba(255,165,0,0.3)] transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-orange-400 text-orange-400 px-6 py-3 rounded-lg font-semibold hover:bg-orange-400 hover:text-black hover:shadow-[0_0_20px_rgba(255,165,0,0.3)] transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
            </div>

            {/* Technologies Used */}
            <div className="bg-gray-900/50 border border-orange-400/30 rounded-xl p-6 hover:border-orange-400 hover:shadow-[0_0_15px_rgba(255,165,0,0.2)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-orange-400/10 border border-orange-400/30 flex items-center justify-center">
                  <Box className="w-4 h-4 text-orange-400" />
                </div>
                <h2 className="text-xl font-semibold text-orange-400">Technologies Used</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologiesUsed.map((tech, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1 bg-orange-400/10 border border-orange-400/30 rounded-full text-sm text-gray-300 hover:bg-orange-400/20 hover:border-orange-400 transition-all duration-300 cursor-pointer"
                  >
                    <Box className="w-3 h-3 text-orange-400" /> {/* Cube icon */}
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className={`${animateRight ? "animate-slideInRight" : "opacity-0"} space-y-6`}>
            {/* Project Image */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-orange-400/30 rounded-xl p-4 shadow-[0_0_30px_rgba(255,165,0,0.15)] hover:border-orange-400 hover:shadow-[0_0_40px_rgba(255,165,0,0.25)] transition-all duration-300">
              <img
                src={`https://portfolio-frontend-c2zz.onrender.com${project.imageUrl}`}
                alt={project.title}
                className="w-full h-auto rounded-lg object-cover hover:scale-[1.02] transition-transform duration-300"
              />
            </div>

            {/* Key Features */}
            <div className="bg-gray-900/50 border border-orange-400/30 rounded-xl p-6 hover:border-orange-400 hover:shadow-[0_0_15px_rgba(255,165,0,0.2)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-orange-400/10 border border-orange-400/30 flex items-center justify-center">
                  <Layers className="w-4 h-4 text-orange-400" />
                </div>
                <h2 className="text-xl font-semibold text-orange-400">Key Features</h2>
              </div>
              <ul className="space-y-3">
                {project.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-300">
                    <span className="text-orange-400 mt-1">●</span>
                    <span className="text-gray-300">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
