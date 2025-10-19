// src/components/Contact.jsx
import React, { useState } from "react";
import useInView from "../hooks/useInView";
import { Send } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); 


  const [sectionRef, sectionVisible] = useInView({ threshold: 0.3 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, mobile, email, message }),
      });

      if (res.ok) {
        setStatus("success");
        setName(""); setMobile(""); setEmail(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative bg-black text-white py-20 px-6 overflow-hidden`}
      style={{ backgroundColor: "#000" }} // ensures solid black before animation
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br from-black/80 via-black to-black/80 transition-opacity duration-700 ${
          sectionVisible ? "opacity-50" : "opacity-0"
        }`}
      />
      <div className="relative max-w-4xl mx-auto z-10 space-y-12">
        {/* Header */}
        <div className="text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent ${sectionVisible ? "animate-slideUp delay-100" : "opacity-0"}`}>
            Contact Me
          </h2>
          <p className={`text-gray-300 text-lg max-w-2xl mx-auto ${sectionVisible ? "animate-slideUp delay-300" : "opacity-0"}`}>
            Got a project or just want to say hi? Fill the form below and I'll get back to you.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`grid grid-cols-1 gap-6 ${sectionVisible ? "animate-slideUp delay-500" : "opacity-0"}`}
        >
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-4 rounded-lg bg-black/70 border border-orange-500 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="p-4 rounded-lg bg-black/70 border border-orange-500 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 rounded-lg bg-black/70 border border-orange-500 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
          <textarea
            placeholder="Message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-4 rounded-lg bg-black/70 border border-orange-500 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            rows={5}
          ></textarea>

          <button
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-yellow-500 px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-all duration-200 disabled:opacity-50"
            disabled={status === "loading"}
          >
            <Send className="w-5 h-5" /> {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {/* Status Messages */}
          {status === "success" && <p className="text-green-400">Thanks! Your message has been sent.</p>}
          {status === "error" && <p className="text-red-400">Oops! Something went wrong. Try again.</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
