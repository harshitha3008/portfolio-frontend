// src/components/Journey.jsx
import React, { useEffect, useState } from "react";
import { GraduationCap, Award, Users, ArrowRight, ExternalLink } from "lucide-react";
import useInView from "../hooks/useInView";
import "../css/Journey.css";
import { useLocation } from "react-router-dom";


const Journey = () => {
  const [tab, setTab] = useState("Education");
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [leadership, setLeadership] = useState([]);
  const [loading, setLoading] = useState(true);
  const [waveRef, waveVisible] = useInView({ threshold: 0.4 });
  
  const location = useLocation();
  // Intersection Observer to detect when the section is in view
  const [sectionRef, sectionVisible] = useInView({ threshold: 0.3 });

  // Track which cards have animated individually
  const [animatedCards, setAnimatedCards] = useState([]);

  useEffect(() => {
  const handleScrollToJourney = (e) => {
    const { tab } = e.detail;
    if (["Education", "Certifications", "Leadership"].includes(tab)) {
      setTab(tab);
    }
  };

  window.addEventListener("scrollToJourney", handleScrollToJourney);
  return () => window.removeEventListener("scrollToJourney", handleScrollToJourney);
}, []);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [eduRes, certRes, leadRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/education`),
          fetch(`${import.meta.env.VITE_API_URL}/api/certifications`),
          fetch(`${import.meta.env.VITE_API_URL}/api/leadership`),
        ]);

        if (eduRes.ok) setEducation(await eduRes.json());
        if (certRes.ok) setCertifications(await certRes.json());
        if (leadRes.ok) setLeadership(await leadRes.json());
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const tabs = [
    { name: "Education", icon: <GraduationCap className="w-6 h-6" /> },
    { name: "Certifications", icon: <Award className="w-6 h-6" /> },
    { name: "Leadership", icon: <Users className="w-6 h-6" /> },
  ];


  useEffect(() => {
    if (location.hash) {
      const hashTab = location.hash.replace("#", "");
      if (["Education", "Certifications", "Leadership"].includes(hashTab)) {
        setTab(hashTab);

        // Optional: Smooth scroll to the section
        const section = document.getElementById("journey");
        if (section) {
          setTimeout(() => section.scrollIntoView({ behavior: "smooth" }), 300);
        }
      }
    }
  }, [location]);

  const getCurrentData = () => {
    switch (tab) {
      case "Education": return education;
      case "Certifications": return certifications;
      case "Leadership": return leadership;
      default: return [];
    }
  };

  // Trigger staggered animations when section is visible or tab changes
  useEffect(() => {
    if (sectionVisible) {
      const data = getCurrentData();
      const delays = data.map((_, idx) => idx * 200); // 0ms, 200ms, 400ms, ...
      const animated = data.map(() => false);
      setAnimatedCards(animated);

      data.forEach((_, idx) => {
        setTimeout(() => {
          setAnimatedCards((prev) => {
            const updated = [...prev];
            updated[idx] = true;
            return updated;
          });
        }, delays[idx]);
      });
    }
  }, [sectionVisible, tab, education, certifications, leadership]);

  const getCurrentContent = () => {
    const data = getCurrentData();
    if (loading) return <p className="col-span-full text-gray-400">Loading...</p>;
    if (data.length === 0) return <p className="col-span-full text-gray-400">No data available</p>;

    return data.map((item, idx) => {
      // Determine animation direction: left, right, or up
      let animationClass = "animate-slideUp";
      if (idx % 3 === 0) animationClass = "animate-slideLeft";
      else if (idx % 3 === 2) animationClass = "animate-slideRight";

      // Apply delay for staggered effect
      const delayClass = `delay-${(idx + 1) * 100}`;

      return (
        <div
          key={idx}
          className={`group relative bg-gradient-to-br from-black/70 via-black/50 to-black/70 
            border-2 border-orange-400/60 rounded-2xl overflow-hidden 
            hover:border-orange-400/80 transition-all duration-300 
            ${animatedCards[idx] ? animationClass + " " + delayClass : "opacity-0"}`}
        >
          {/* Hover gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-yellow-500/0 
            group-hover:from-orange-500/10 group-hover:via-orange-500/5 group-hover:to-yellow-500/10 
            transition-all duration-300" />

          {/* Image */}
          <div className="relative w-full aspect-[16/9] overflow-hidden mb-4 flex items-center justify-center">
            {item.image ? (
              <a
                href={item.image.startsWith("http") ? item.image : `https://portfolio-backend-51mc.onrender.com${item.image}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full block"
              >
                <img
                  src={item.image.startsWith("http") ? item.image : `http://localhost:8080${item.image}`}
                  alt={item.title || item.institution}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </a>
            ) : (
              <div className="text-gray-600 group-hover:text-orange-400 transition-colors duration-300">
                {tab === "Education" ? (
                  <GraduationCap className="w-16 h-16 mx-auto opacity-40 group-hover:opacity-60" />
                ) : (
                  <Award className="w-16 h-16 mx-auto opacity-40 group-hover:opacity-60" />
                )}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="relative px-6 pb-6">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
              {item.title || item.institution}
            </h3>
            {tab === "Certifications" ? (
              <>
                <p className="text-orange-200 text-sm mb-1">{item.tagline}</p>
                <p className="text-gray-400 text-sm mb-4">{item.description}</p>
              </>
            ) : (
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {item.description || item.degree || item.issuer}
              </p>
            )}

            {/* Info Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {item.year && (
                <span className="px-3 py-1 text-xs font-medium bg-orange-500/20 text-orange-300 rounded-full border border-orange-500/30">
                  {item.year}
                </span>
              )}
              {item.percentage && (
                <span className="px-3 py-1 text-xs font-medium bg-yellow-500/20 text-yellow-300 rounded-full border border-yellow-500/30">
                  {item.percentage}
                </span>
              )}
              {item.place && (
                <span className="px-3 py-1 text-xs font-medium bg-orange-600/20 text-orange-400 rounded-full border border-orange-600/30">
                  {item.place}
                </span>
              )}
            </div>

            {/* Action Links */}
            <div className="flex gap-3 pt-4 border-t border-orange-400/20">
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors duration-300 text-sm font-medium"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {item.details && (
                <a
                  href={item.details}
                  className="ml-auto flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-300 text-sm font-medium"
                >
                  <span>Details</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              boxShadow: "inset 0 0 20px rgba(255,165,0,0.1), 0 0 40px rgba(255,165,0,0.15)",
            }}
          />
        </div>
      );
    });
  };

  return (
    <>
    <section
      id="journey"
      ref={sectionRef}
      className="relative bg-black text-white py-20 px-6 overflow-hidden"
    >
      {/* Gradient overlay (always on top of black background) */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black to-black/80 opacity-50" />

      <div
        className={`relative max-w-7xl mx-auto z-10 ${
          sectionVisible ? "animate-fadeIn" : ""
        }`}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent
              ${sectionVisible ? "animate-slideUp delay-100" : "opacity-0"}`}
          >
            My Journey
          </h2>
          <p
            className={`text-white-400 text-lg max-w-2xl mx-auto
              ${sectionVisible ? "animate-slideUp delay-300" : "opacity-0"}`}
          >
            Explore my journey through education, certifications, and leadership. Each section is a milestone in my learning path.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.name}
              onClick={() => setTab(t.name)}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border ${
                tab === t.name
                  ? "bg-gradient-to-r from-orange-500/80 to-yellow-500/80 border-orange-400/60 text-white shadow-[0_0_30px_rgba(255,165,0,0.4)]"
                  : "bg-black/50 border-orange-700/50 text-gray-300 hover:border-orange-400/30 hover:bg-black/40"
              }`}
            >
              <span className={tab === t.name ? "text-orange-200" : "text-gray-500"}>{t.icon}</span>
              {t.name}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCurrentContent()}
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

export default Journey;
