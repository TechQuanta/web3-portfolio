"use client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import About from "@/components/section/about";
import Footer from "@/components/section/footer";
import Hero from "@/components/section/hero";
import { Navbar } from "@/components/section/navbar";
import Projects from "@/components/section/project";
import Chatbox from "@/components/section/chatbot";
import Timeline from "@/components/section/experience";


const HomePageContent = () => (
  <>
    <Hero />
    <Projects limit={2} />
    <About />
    <Timeline/>
  </>
);

const ProjectsPageContent = () => (
  <>
    <Projects />
  </>
);

export default function Home() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-black transition-colors duration-1000">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 py-12 sm:px-6">
          <Routes>
            <Route path="/" element={<HomePageContent />} />
            <Route path="/projects" element={<ProjectsPageContent />} />
            <Route
              path="*"
              element={
                <div className="text-center py-20">
                  <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                    404
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Page Not Found.
                    <Link to="/" className="text-blue-500 hover:underline">
                      Go Home
                    </Link>
                  </p>
                </div>
              }
            />
          </Routes>
        </main>
        <Chatbox />
      </div>
    </BrowserRouter>
  );
}