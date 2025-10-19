import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ProjectDetails from "./components/ProjectDetails"; 
import Journey from "./components/Journey";
import Contact from "./components/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="bg-gray-900">
              <Header />
              <Hero />
              <About />
              <Experience />
              <Skills />
              <Projects />
              <Journey />
              <Contact /> 
            </div>
          }
        />
        <Route path="/project/:projectId" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
}
export default App;