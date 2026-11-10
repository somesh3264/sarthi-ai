import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Competency from "./pages/Competency";
import Projects from "./pages/Projects";
import Careers from "./pages/Careers";
import CareersApply from "./pages/CareersApply";
import Newsletter from "./pages/Newsletter";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import Placeholder from "./pages/Placeholder";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="competency" element={<Competency />} />
        <Route path="projects" element={<Projects />} />
        <Route path="careers" element={<Careers />} />
        <Route path="careers/apply" element={<CareersApply />} />
        <Route path="newsletter" element={<Newsletter />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Legal doc="privacy" />} />
        <Route path="terms" element={<Legal doc="terms" />} />
        <Route path="recruitment-privacy" element={<Legal doc="recruitment-privacy" />} />
        <Route
          path="*"
          element={
            <Placeholder
              eyebrow="404"
              title="Page not found"
              note="The page you are looking for doesn't exist or has moved."
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
