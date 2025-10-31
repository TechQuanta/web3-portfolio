"use client";
import React, { useState } from 'react';
import { MapPin, Link as LinkIcon, ChevronDown, ChevronUp, Briefcase, BookOpen } from 'lucide-react'; 

// --- MOCK DATA IMPORT ---
// IMPORTANT: You must create the file './lib/data.json' with the structure provided in step 1.
// We change the import to a relative path and import the JSON object directly.
import timelineData from '@/lib/data.json'; 

// We remove all the broken image imports:
// import NextJsIcon from "@/app/assets/React.svg"; 
// etc.

// Extract the array from the imported object
const timelineItems = timelineData.timelineItems;

// --------------------------------------------------------
// --- 1. Technology Icons (Self-Contained Inline SVGs) ---
// --------------------------------------------------------

const TechnologyIcon = ({ name, className }) => {
    // Mapping of technology names to their corresponding inline SVG elements
    // NOTE: The SVG designs below are simplified representations for demonstration.
    const iconMap = {
        'TypeScript': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}><path d="M18.823 6.649C18.36 6.36 17.78 6.2 17.152 6.2H6.848C6.22 6.2 5.64 6.36 5.177 6.649C4.71 6.94 4.35 7.37 4.125 7.89L2.002 14.39C1.932 14.61 1.9 14.84 1.9 15.08V17.9H22.1V15.08C22.1 14.84 22.068 14.61 21.998 14.39L19.875 7.89C19.65 7.37 19.29 6.94 18.823 6.649Z" fill="#3178C6"/><path d="M12.92 11.8H15.82L17.5 16.2H16.08L14.7 12.86H11.58V16.2H10.16V9.8H12.92V11.8Z" fill="#FFFFFF"/></svg>,
        'React': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}><circle cx="12" cy="12" r="2.5" fill="#61DAFB"/><path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" stroke="#61DAFB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/><ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" transform="rotate(-60 12 12)"/></svg>,
        'Next.js': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M8 8V16H16V8H8ZM14.5 14.5H9.5V13.5H14.5V14.5ZM14.5 11.5H9.5V10.5H14.5V11.5Z" fill="white"/></svg>,
        'PostgreSQL': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C13.9 4 15.65 4.54 17.02 5.48C15.9 6.28 14.54 6.8 13 6.8C11.46 6.8 10.1 6.28 8.98 5.48C10.35 4.54 12.1 4 14 4V4ZM12 19.5C9.79 19.5 8 17.71 8 15.5C8 13.29 9.79 11.5 12 11.5C14.21 11.5 16 13.29 16 15.5C16 17.71 14.21 19.5 12 19.5ZM12 12.5C10.89 12.5 10 13.39 10 14.5C10 15.61 10.89 16.5 12 16.5C13.11 16.5 14 15.61 14 14.5C14 13.39 13.11 12.5 12 12.5Z" fill="#336791"/></svg>,
        'Node.js': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}><path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 19.6C7.869 19.6 4.4 16.131 4.4 12C4.4 7.869 7.869 4.4 12 4.4C16.131 4.4 19.6 7.869 19.6 12C19.6 16.131 16.131 19.6 12 19.6Z" fill="#68A063"/><path d="M11.96 15.75L12.75 14.1L13.54 15.75H16L12.75 9L9.5 15.75H16L11.21 14.1L10.42 15.75H8L11.25 9L14.5 15.75H12V15.75Z" fill="#FFFFFF"/></svg>,
        'Tailwind CSS': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}><path d="M12 4C6.477 4 2 8.477 2 14C2 19.523 6.477 24 12 24C17.523 24 22 19.523 22 14C22 8.477 17.523 4 12 4ZM12 21.6C7.869 21.6 4.4 18.131 4.4 14C4.4 9.869 7.869 6.4 12 6.4C16.131 6.4 19.6 9.869 19.6 14C19.6 18.131 16.131 19.6 12 21.6Z" fill="#38BDF8"/><path d="M12 8.5C10.74 8.5 9.7 9.54 9.7 10.8V16.8H14.3V10.8C14.3 9.54 13.26 8.5 12 8.5Z" fill="#FFFFFF"/></svg>,
        'Prisma': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}><path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 19.6C7.869 19.6 4.4 16.131 4.4 12C4.4 7.869 7.869 4.4 12 4.4C16.131 4.4 19.6 7.869 19.6 12C19.6 16.131 16.131 19.6 12 19.6Z" fill="#000000"/><path d="M14.5 9.5V14.5H9.5V9.5H14.5Z" fill="#FFFFFF"/></svg>,
        'Stripe': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}><path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 19.6C7.869 19.6 4.4 16.131 4.4 12C4.4 7.869 7.869 4.4 12 4.4C16.131 4.4 19.6 7.869 19.6 12C19.6 16.131 16.131 19.6 12 19.6Z" fill="#635BFF"/><path d="M15.5 8.5V15.5H8.5V8.5H15.5Z" fill="#FFFFFF"/></svg>,
        'Framer': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}><path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 19.6C7.869 19.6 4.4 18.131 4.4 14C4.4 9.869 7.869 6.4 12 6.4C16.131 6.4 19.6 9.869 19.6 14C19.6 18.131 16.131 19.6 12 21.6Z" fill="currentColor"/><path d="M12 6.5C10.74 6.5 9.7 7.54 9.7 8.8V15.2C9.7 16.46 10.74 17.5 12 17.5C13.26 17.5 14.3 16.46 14.3 15.2V8.8C14.3 7.54 13.26 6.5 12 6.5Z" fill="#FFFFFF"/></svg>,
        'Storybook': <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}><path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 19.6C7.869 19.6 4.4 16.131 4.4 12C4.4 7.869 7.869 4.4 12 4.4C16.131 4.4 19.6 7.869 19.6 12C19.6 16.131 16.131 19.6 12 19.6Z" fill="#FF4785"/><path d="M12 6.5C10.74 6.5 9.7 7.54 9.7 8.8V15.2C9.7 16.46 10.74 17.5 12 17.5C13.26 17.5 14.3 16.46 14.3 15.2V8.8C14.3 7.54 13.26 6.5 12 6.5Z" fill="#FFFFFF"/></svg>,
    };

    const Icon = iconMap[name];
    // Render the SVG or a fallback element
    return Icon ? Icon : <span className="text-gray-700 dark:text-gray-300 font-bold">{name[0]}</span>;
};
// --- End Technology Icon Component ---


// ----------------------------------------------
// --- 2. Technologies Icon Tag Component ---
// ----------------------------------------------
const TechStackIcon = ({ name, status }) => {
    const isCurrent = status === 'current';
    
    // Now using TechnologyIcon component instead of a placeholder emoji
    const IconComponent = <TechnologyIcon 
        name={name} 
        // Style the icon size and color based on status
        className={`w-3.5 h-3.5 mr-1 ${isCurrent ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
    />; 
    
    // Classes for the tag container
    const classes = `text-xs font-mono px-2 py-0.5 rounded-full ${
        isCurrent 
            ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200 border border-blue-300 dark:border-blue-700' 
            : 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
    } flex items-center transition-colors`;

    return (
        <span className={classes}>
            {IconComponent} 
            <span className="">{name}</span>
        </span>
    );
};
// --- End Technology Icon Component ---

// ----------------------------------------------------
// --- 3. Reusable Navigation Button Component ---
// ----------------------------------------------------
const NavigationButton = ({ currentView, setView }) => {
    const isExperienceView = currentView === 'experience';
    
    const label = isExperienceView 
        ? 'Education History' 
        : 'Professional History';

    const Icon = isExperienceView ? BookOpen : Briefcase;
    
    const targetView = isExperienceView ? 'education' : 'experience';

    // Formal Grayish Design
    const classes= `bg-transparent  hover:bg-gray-200 dark:bg-black  dark:hover-border-2 transition-colors rounded-sm inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide 
    text-black
        transition duration-200 rounded-lg  
        dark:text-white`;

    return (
        <button 
            onClick={() => setView(targetView)} 
            className={classes}
            aria-label={`Switch to ${targetView} view`}
        >
            <Icon className="w-4 h-4 mr-2" />
            {label}
        </button>
    );
};

// ----------------------------------------------------
// --- 4. Timeline Item Component ---
// ----------------------------------------------------
const TimelineItem = ({ item }) => {
    const isExperience = item.type === 'experience';
    const isCurrent = isExperience && item.date.includes('Present');
    
    // State to control expansion of the detail section
    const [isExpanded, setIsExpanded] = useState(isCurrent); 

    // --- BLUR LOGIC ---
    // Identify if the current item should be blurred (i.e., the "Current Employer" placeholder)
    const isBlurred = isExperience && item.company === 'Current Employer';
    
    // Conditional classes for the company/institution name header
    const companyClasses = `text-lg font-semibold ${
        isBlurred 
            // Apply Tailwind's filter and blur classes. 
            ? 'text-gray-900 dark:text-white filter blur-md select-none' 
            : 'text-gray-900 dark:text-white'
    }`;
    // ------------------

    // Dynamically set icon styling based on type
    const iconClasses = `
        w-8 h-8 flex items-center justify-center text-xl flex-shrink-0 mr-4 rounded-sm
        ${isExperience 
            ? `${item.color} bg-gray-50 dark:bg-gray-900` // Experience colors
            : 'text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-700' // Education default colors
        }
    `;
    
    // Function to render description as bullet points
    const renderDescriptionBullets = (description) => {
        const lines = description.split('\n').filter(line => line.trim() !== '');
        if (lines.length === 0) return null;

        return (
            <ul className="list-disc ml-5 space-y-1 pt-2"> 
                {lines.map((line, index) => (
                    // Using text-gray-700/text-gray-300 for professional contrast
                    <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
                        {line.trim()}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="w-full"> 
            <div className="flex w-full"> 
                <div className={iconClasses}>
                    {/* The icon prop is likely an emoji or a Lucide icon component name (string) */}
                    {item.icon} 
                </div>
                
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center">
                            
                            {/* Company or Institution Name - Now with conditional blur */}
                            <h4 className={companyClasses}> 
                                {isExperience ? item.company : item.institution}
                            </h4>
                            
                            {/* Current Role Tag (Only for Experience) */}
                            {isCurrent && (
                                <span className="ml-3 text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-200 uppercase tracking-widest font-medium relative flex items-center">
                                    <span className="relative flex h-2 w-2 mr-1">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    Current
                                </span>
                            )}

                            {/* Social URL Link (Only for Experience) */}
                            {isExperience && item.socialUrl && (
                                <a 
                                    href={item.socialUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    title={`Visit ${isExperience ? item.company : item.institution}`}
                                    className="ml-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition"
                                >
                                    <LinkIcon className="w-4 h-4" />
                                </a>
                            )}
                            
                            {/* Expand/Collapse Button */}
                            <button 
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="ml-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition p-1 rounded-full"
                                title={isExpanded ? 'Collapse Details' : 'Expand Details'}
                            >
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                        </div>
                        
                        {/* Position or Degree */}
                        <p className="text-base text-gray-900 dark:text-gray-300 text-right font-medium">
                            {isExperience ? item.position : item.degree}
                        </p>
                    </div>
                    
                    {/* Location and Date */}
                    <div className="flex justify-between items-end mt-0.5 mb-1"> 
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                            <MapPin className="w-3.5 h-3.5 mr-1" />
                            {item.location}
                        </p>
                        
                        <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            {item.date}
                        </p>
                    </div>
                </div>
            </div> 

            {/* --- EXPANDABLE DETAILS CONTENT --- */}
            {isExpanded && (
                <div className="mt-3 pt-2">
                    {/* Tech Stack (Only for Experience) */}
                    {isExperience && item.technologies && (
                        <>
                            {/* 1. CURRENTLY WORKING ON TECH */}
                            {item.technologies.workingOn && item.technologies.workingOn.length > 0 && (
                                <div className="mb-3">
                                    <span className="text-sm text-gray-700 dark:text-gray-300 block mb-1 font-medium">
                                        Working on:
                                    </span>
                                    <div className="flex flex-wrap items-center gap-2">
                                        {item.technologies.workingOn.map((tech) => (
                                            <TechStackIcon key={tech} name={tech} status="current" />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 2. WORKED ON TECH */}
                            {item.technologies.workedOn && item.technologies.workedOn.length > 0 && (
                                <div className="mb-3">
                                    <span className="text-sm text-gray-700 dark:text-gray-300 block mb-1 font-medium">
                                        Worked on:
                                    </span>
                                    <div className="flex flex-wrap items-center gap-2">
                                        {item.technologies.workedOn.map((tech) => (
                                            <TechStackIcon key={tech} name={tech} status="past" />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* Full Description - WITH BULLET POINTS (For both) */}
                    <div className="pt-2">
                        {renderDescriptionBullets(item.description)}
                    </div>
                </div>
            )}
        </div>
    );
};


// ----------------------------------------------------
// --- 5. Main Timeline Component ---
// ----------------------------------------------------
export default function Timeline() {
    const allExperiences = timelineItems.filter(item => item.type === 'experience');
    const education = timelineItems.filter(item => item.type === 'education');

    // State to simulate the current "route" or view
    const [currentView, setCurrentView] = useState('experience'); 

    return (
        <div className="w-full font-sans pb-10"> 
            
            {/* --- EXPERIENCE VIEW (Conditional) --- */}
            {currentView === 'experience' && (
                <section id="experience" className="mb-16">
                    <p className="text-[10px] uppercase tracking-wider text-blue-600 dark:text-blue-200 mb-1">
                        Professional
                    </p>
                    
                    <h3 className="text-3xl mb-8 text-gray-900 dark:text-white font-bold">
                        Experience
                    </h3>

                    {allExperiences.map((item, idx) => (
                        <div 
                            key={idx} 
                            // Conditional border separation, keeping the final item clean
                            className={idx < allExperiences.length - 1 
                                ? ' pb-6 mb-6' 
                                : 'mb-6' 
                            }
                        >
                            <TimelineItem item={item} />
                        </div>
                    ))}
                    
                    {/* NAVIGATION BUTTON PLACED BELOW EXPERIENCE CONTENT */}
                    <div className="mt-8 w-full flex justify-center"> 
                        <NavigationButton 
                            currentView={currentView} 
                            setView={setCurrentView} 
                        />
                    </div>
                </section>
            )}

            {/* --- EDUCATION VIEW (Conditional) --- */}
            {currentView === 'education' && (
                <section id="education">
                    <p className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
                        Academic Background
                    </p>
                    <h3 className="text-3xl mb-8 text-gray-900 dark:text-white font-bold">
                        Education
                    </h3>
                    
                    {education.map((item, idx) => (
                        <div 
                            key={idx} 
                            // Conditional border separation, keeping the final item clean
                            className={idx < education.length - 1 
                                ? ' pb-6 mb-6' 
                                : 'mb-6' 
                            }
                        >
                            <TimelineItem item={item} />
                        </div>
                    ))}
                    
                    {/* NAVIGATION BUTTON PLACED BELOW EDUCATION CONTENT */}
                    <div className="mt-8 w-full flex justify-center">
                        <NavigationButton 
                            currentView={currentView} 
                            setView={setCurrentView} 
                        />
                    </div>
                </section>
            )}
        </div>
    );
}