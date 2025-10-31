"use client";
import { useState } from "react";
// Using a placeholder for Link. In a real project, this would be 'next/link' or 'react-router-dom/Link'.
const Link = ({ to, children, className }) => <a href={to} className={className}>{children}</a>; 

import { Dot, Github, Link as LinkIcon, ChevronRight } from 'lucide-react'; 
import Image from "next/image";

// 1. IMPORT DATA: Assuming projectsData is exported as a named export
import { projects } from '@/lib/data.json'; // Adjust path to your data.js file
const projectsData = projects


// --- ICON IMPORTS & MAP (Keep these imports for the rendering logic) ---
import NextJsIcon from "@/app/assets/React.svg";
import TypeScriptIcon from"@/app/assets/React.svg";
import ReactIcon from "@/app/assets/React.svg";
import TailwindIcon from"@/app/assets/React.svg";
import PrismaIcon from "@/app/assets/React.svg";
import PostgresIcon from "@/app/assets/React.svg";
import StripeIcon from "@/app/assets/React.svg";
import FramerIcon from "@/app/assets/React.svg";
import StorybookIcon from "@/app/assets/React.svg";

const IconMap = {
    "Next.js": NextJsIcon,
    "TypeScript": TypeScriptIcon,
    "React": ReactIcon,
    "Tailwind CSS": TailwindIcon,
    "Prisma": PrismaIcon,
    "PostgreSQL": PostgresIcon,
    "Stripe": StripeIcon,
    "Framer Motion": FramerIcon,
    "Storybook": StorybookIcon,
};
// --- End Icon Map ---

// --- Helper Component: Status Badge (Unchanged) ---
const StatusBadge = ({ status }) => {
    let dotColor = 'bg-gray-500';
    let textColor = 'text-gray-700 dark:text-gray-400';
    let statusText = status;

    if (status === 'Operational') {
        dotColor = 'bg-green-500';
        textColor = 'text-green-700 dark:text-green-400';
    } else if (status === 'Under Development') {
        dotColor = 'bg-red-500';
        textColor = 'text-red-700 dark:text-red-400';
        statusText = 'WIP'; 
    } else if (status === 'Archived') {
        dotColor = 'bg-gray-500';
        textColor = 'text-gray-700 dark:text-gray-400';
    }

    return (
        <span className={`inline-flex items-center text-xs font-semibold ${textColor}`}>
            <Dot className={`w-6 h-6 -ml-2 ${dotColor} rounded-full`} style={{ width: '8px', height: '8px' }} />
            {statusText}
        </span>
    );
};
// --- End Status Badge ---


export default function Projects({ limit }) {
    // 2. USE IMPORTED DATA
    const allProjects = projectsData; 
    
    const visibleProjects = limit ? allProjects.slice(0, limit) : allProjects;
    // Note: The original component had inconsistent grid logic based on limit.
    // I'm simplifying it based on the original intent:
    const gridClasses = "grid-cols-1 md:grid-cols-2"; 

    return (
        <section id="projects" className=" py-12 max-w-6xl">
            <p className="text-sm text-blue dark:text-blue-200 leading-relaxed flex-1 -mb-2">Featured</p>

            <h2 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">
                {limit ? "Projects" : "My Work"}
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1 mb-5">My project registry to showcase my work on different domains.</p>
            
            <div className={`grid gap-4 ${gridClasses}`}>
                {/* 3. MAP OVER VISIBLE PROJECTS */}
                {visibleProjects.map((project) => (
                    <div
                        key={project.id}
                        className="
                            overflow-hidden rounded-xl 
                            bg-white dark:bg-[#1f1f1f] 
                            flex flex-col
                        "
                    >
                        {/* Project Image */}
                        <div className="aspect-video overflow-hidden rounded-t-xl">
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={600}
                                height={300}
                                className="w-full h-full object-cover" 
                            />
                        </div>

                        {/* --- Content Area --- */}
                        <div className="flex flex-col flex-1 p-4 md:p-5">
                            
                            {/* 1. Title & Links */}
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {project.title}
                                </h3>
                                
                                <div className="flex items-center gap-2">
                                    {/* Live Link Icon */}
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Live Link"
                                        className="text-gray-500 dark:text-gray-400 hover:text-sky-500 transition"
                                    >
                                        <LinkIcon className="w-4 h-4" />
                                    </a>

                                    {/* GitHub Icon */}
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="GitHub Repository"
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-300 transition"
                                    >
                                        <Github className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                            
                            {/* 2. Status */}
                            <div className="mb-2 ml-4">
                                <StatusBadge status={project.status} />
                            </div>

                            {/* 3. Description */}
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1 mb-4">
                                {project.description}
                            </p>
                            
                            {/* 4. Tech Stack */}
                            <div className="mt-auto pb-2 ">
                                <div className="flex flex-wrap gap-2">
                                    {/* MAP OVER TECHNOLOGIES */}
                                    {project.technologies.map((tech) => {
                                        const TechIcon = IconMap[tech];
                                        if (!TechIcon) return null;

                                        return (
                                            <div 
                                                key={tech}
                                                title={tech}
                                                className="p-1 rounded bg-gray-100/50 dark:bg-gray-700/30 ring-1 ring-gray-300/50 dark:ring-gray-600/50"
                                            >
                                                <TechIcon className="w-5 h-5 opacity-80" />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            {/* View All Projects Link */}
            {limit && visibleProjects.length < allProjects.length && (
                <div className="flex justify-center mt-8">
                    <Link
                        to="/projects"
                        className="
                            px-6 py-3 rounded-md font-semibold text-sm sm:text-base
                            bg-gray-200/30 dark:bg-gray-800/30
                            text-gray-900 dark:text-gray-100
                            hover:bg-gray-300/40 dark:hover:bg-gray-700/40
                            backdrop-blur-md transition-all duration-300
                        "
                    >
                        View All Projects ({allProjects.length})
                    </Link>
                </div>
            )}
        </section>
    );
}