import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Competency from "./pages/Competency";
import Contact from "./pages/Contact";
import Placeholder from "./pages/Placeholder";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="competency" element={<Competency />} />
        <Route
          path="projects"
          element={
            <Placeholder
              eyebrow="Projects"
              title="Projects, case studies and applications"
              description="How Sarthi AI applies geospatial, environmental and AI-enabled capabilities."
            />
          }
        />
        <Route
          path="careers"
          element={
            <Placeholder
              eyebrow="Careers"
              title="Build Your Future with Sarthi AI"
              description="Be part of a team combining geospatial intelligence, artificial intelligence and technology to solve real-world challenges."
            />
          }
        />
        <Route
          path="careers/apply"
          element={
            <Placeholder
              eyebrow="Careers"
              title="Apply to Sarthi AI"
              description="The online application form will be available here soon."
            />
          }
        />
        <Route
          path="newsletter"
          element={
            <Placeholder
              eyebrow="Sarthi Newsletter"
              title="Insights from a world shaped by location and data"
              description="Explore perspectives, technology updates and practical applications across geospatial intelligence, remote sensing, AI and sustainable development."
            />
          }
        />
        <Route path="contact" element={<Contact />} />
        <Route
          path="privacy"
          element={
            <Placeholder
              eyebrow="Legal"
              title="Privacy Policy"
              note="Our privacy policy is being finalised and will be published here."
            />
          }
        />
        <Route
          path="terms"
          element={
            <Placeholder
              eyebrow="Legal"
              title="Terms of Use"
              note="Our terms of use are being finalised and will be published here."
            />
          }
        />
        <Route
          path="recruitment-privacy"
          element={
            <Placeholder
              eyebrow="Legal"
              title="Recruitment Privacy Notice"
              note="Our recruitment privacy notice is being finalised and will be published here."
            />
          }
        />
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
