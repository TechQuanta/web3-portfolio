'use client';
import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Github, Mail, Moon, Sun } from 'lucide-react';
import { Dock, DockIcon } from "@/components/ui/dock";
import { FaXTwitter } from "react-icons/fa6";
export function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Initialize theme
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove('dark');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      setIsDark(true);
    }
  };

  // Smooth scroll handler
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50">
      <Dock
        direction="middle"
        className="
          bg-gray-200/40 dark:bg-gray-900/40 
          backdrop-blur-md border border-gray-400/20 dark:border-gray-700/30
          rounded-2xl px-3 py-2 
          flex gap-2 
          transition-all duration-300
        "
      >
        {/* Nav Items */}
        <DockIcon onClick={() => handleScroll('home')} title="Home">
          <Home className="w-full h-full text-gray-900 dark:text-gray-100 cursor-pointer" />
        </DockIcon>
        <DockIcon onClick={() => handleScroll('about')} title="About">
          <User className="w-full h-full text-gray-900 dark:text-gray-100 cursor-pointer" />
        </DockIcon>
        <DockIcon onClick={() => handleScroll('projects')} title="Projects">
          <Briefcase className="w-full h-full text-gray-900 dark:text-gray-100 cursor-pointer" />
        </DockIcon>

        {/* Divider */}
        <span className="w-px h-5 bg-gray-400/30 dark:bg-gray-600/30 mx-1"></span>

        {/* Social Icons */}
        <DockIcon as="a" href="https://x.com/pratikwtfudo" target="_blank" rel="noopener noreferrer" title="Twitter">
          <FaXTwitter className="w-5 h-6 text-gray-900 dark:text-gray-100  cursor-pointer" />
        </DockIcon>
        <DockIcon as="a" href="https://github.com/PratikAjbe01" target="_blank" rel="noopener noreferrer" title="GitHub">
          <Github className="w-full h-full text-gray-900 dark:text-gray-100 cursor-pointer" />
        </DockIcon>
       

        {/* Divider */}
        <span className="w-px h-5 bg-gray-400/30 dark:bg-gray-600/30 mx-1"></span>

        {/* Theme Toggle */}
        <DockIcon onClick={toggleTheme} title="Toggle Theme">
          {isDark ? (
            <Sun className="w-full h-full text-gray-900 dark:text-gray-100 cursor-pointer" />
          ) : (
            <Moon className="w-full h-full text-gray-900 dark:text-gray-100 cursor-pointer" />
          )}
        </DockIcon>
      </Dock>
    </div>
  );
}
