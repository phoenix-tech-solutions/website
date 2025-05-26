import React from "react";
import LandingPage from "./pages/home/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import WorkWithUsPage from "./pages/WorkWithUsPage";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/work" element={<WorkWithUsPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
