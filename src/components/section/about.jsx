'use client';
import React, { useState, useEffect } from "react";
// 1. Import the JSON data file
import data from "@/lib/data.json"; 
import LogoLoop from "@/components/ui/LogoLoop";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";

// 2. Create a lookup object to map string names in JSON to actual React-Icons components
const TechIconMap = {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    // Add other icons if needed
};

// 3. Destructure data for cleaner use
const { profile, external, skills, mockData } = data;
const GITHUB_USERNAME = profile.githubUsername;
const PROFILE_IMAGE_URL = profile.profileImageUrl;

// 4. Construct the heatmap URL using the template and username
const heatmapUrl = external.heatmapUrlTemplate.replace(
    "{GITHUB_USERNAME}",
    GITHUB_USERNAME
);

// 5. Transform the JSON techLogos array into JSX nodes for LogoLoop
const techLogos = skills.techLogos.map(item => {
    const IconComponent = TechIconMap[item.icon];
    return {
        ...item,
        node: IconComponent ? <IconComponent /> : null,
    };
});

// The imageLogos array is used as is if you need it, but the LogoLoop uses techLogos here.
// const imageLogos = skills.imageLogos; 

export default function About() {
  // --- Data State ---
  const [totalContributions, setTotalContributions] = useState("...");
  const [contributionStatus, setContributionStatus] = useState({
    worked: "...",
    cursor: "...",
  });
  
  // Helper function for rendering markdown/bold text (since text is now in JSON)
  const renderIntroText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.substring(2, part.length - 2)}</strong>;
      }
      return part;
    });
  };

  useEffect(() => {
    // Mock async data fetching for GitHub contributions
    const fetchContributions = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
        setTotalContributions(mockData.totalContributions); // Use data from JSON
      } catch (error) {
        console.error("Error fetching total contributions:", error);
        setTotalContributions(mockData.totalContributions); // Fallback
      }
    };

    const updateContributionStatus = () => {
      // Mocking a professional status summary with time and online state
      setContributionStatus({
        worked: mockData.workedToday, // Use data from JSON
        // Randomly set status for a dynamic feel
        cursor: Math.random() > 0.5 ? "Online" : "Offline",
      });
    };

    fetchContributions();
    updateContributionStatus();
  }, []);

  // Helper function used in the image error fallback
  const isDarkThemeActive = () => {
    if (typeof document !== "undefined") {
      return (
        document.documentElement.classList.contains("dark") ||
        document.body.classList.contains("dark")
      );
    }
    return true; // Default to dark for SSR/Server
  };

  return (
    // ... (JSX remains largely the same, but uses imported data)
    <div
      className={`font-sans antialiased transition-colors duration-500 text-gray-900 dark:text-white`}
    >
      <div className="w-full relative">
        {/* Main Title Structure: Me / About */}
        <div className="mb-12 text-left pt-2">
          <p
            className={`text-[10px] text-base font-semibold uppercase tracking-widest text-gray-700 dark:text-blue-200`}
          >
            About
          </p>
          <h1
            className={`text-2xl sm:text-6xl font-extrabold mt-1 text-gray-900 dark:text-white`}
          >
            Me
          </h1>
        </div>

        {/* Main Layout: Description and Technologies */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="w-full md:w-3/4 ">
            <div
              className={`rounded-xl backdrop-blur-md transition duration-300`}
            >
              {/* Introduction */}
              <section id="about-me" className="mb-8 text-left">
                <h3
                  className={`text-md font-bold mb-4 text-gray-700 dark:text-gray-400`}
                >
                  Introduction
                </h3>
                <p
                  className={`text-[12px] text-base text-gray-600 dark:text-gray-400 leading-relaxed`}
                >
                  {renderIntroText(profile.introduction)} {/* Use imported text */}
                </p>
              </section>

              {/* Technologies (Skills) */}
              <div id="technologies" className="text-left">
                <h4
                  className={`text-md font-bold mb-4 text-gray-700 dark:text-gray-400`}
                >
                  Skills
                </h4>
                <div
                  style={{
                    height: "100px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <LogoLoop
                    logos={techLogos}
                    speed={120}
                    direction="left"
                    logoHeight={48}
                    gap={40}
                    pauseOnHover
                    scaleOnHover
                    fadeOut
                    fadeOutColor="#ffffff"
                    ariaLabel="Technology partners"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Contribution Overview Section --- */}
        <section
          id="contributions-text-summary"
          className={`rounded-xl text-left backdrop-blur-md transition duration-300 mt-12`}
        >
          <h3
            className={`text-sm font-bold text-gray-700 dark:text-gray-400 mb-4`}
          >
            GitHub Activity Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
            {/* 1. Total Contributions (This Year) */}
            <div className="ounded-lg">
              <span
                className={`text-[10px] block text-gray-700 dark:text-gray-400`}
              >
                {totalContributions} {/* Still uses state, but state is set from JSON */}
              </span>
              <p
                className={`uppercase tracking-wider mt-1 text-gray-600 dark:text-gray-400`}
              >
                Commits This Year
              </p>
            </div>

            {/* 2. Worked Time Today */}
            <div className="rounded-lg">
              <span
                className={`text-[10px] block text-gray-700 dark:text-gray-400`}
              >
                {contributionStatus.worked} {/* Still uses state, but state is set from JSON */}
              </span>
              <p
                className={`uppercase tracking-wider mt-1 text-gray-600 dark:text-gray-400`}
              >
                Worked Today
              </p>
            </div>

            {/* 3. Cursor Status */}
            <div className="rounded-lg">
              <span
                className={`text-[10px] block text-gray-700 dark:text-gray-400 flex items-center`}
              >
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-3 ${
                    contributionStatus.cursor === "Online"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                ></span>
                {contributionStatus.cursor}
              </span>
              <p
                className={` uppercase tracking-wider mt-1 text-gray-600 dark:text-gray-400`}
              >
                Cursor Status
              </p>
            </div>
          </div>
        </section>
      </div>
      
      {/* --- One Year Contribution Chart (Full Width/Full Bleed) --- */}
      <div className="flex w-full overflow-hidden mb-16 mt-12">
        <img
          src={heatmapUrl}
          alt="GitHub Contribution Activity Heatmap"
          className="w-full h-auto max-w-full"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = isDarkThemeActive()
              ? "https://placehold.co/1200x320/1e293b/ffffff?text=Error:+Activity+Graph+Not+Loading"
              : "https://placehold.co/1200x320/f1f5f9/1e293b?text=Error:+Activity+Graph+Not+Loading";
            console.error("Error loading Heatmap image.");
          }}
        />
      </div>
    </div>
  );
}