import { useState } from "react";

export default function Projects() {
  const [showMore, setShowMore] = useState(false);

  const allProjects = [
    {
      id: 1,
      title: "Chat Collect",
      period: "Jan 2024 - Feb 2024",
      description:
        "With the release of the OpenAI GPT Store, I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.",
      image: "/project1.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 2,
      title: "Magic UI",
      period: "June 2023 - Present",
      description:
        "Designed, developed and sold animated UI components for developers.",
      image: "/project2.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 3,
      title: "AI Content Generator",
      period: "Mar 2023 - May 2023",
      description:
        "A powerful SaaS application that uses AI to generate content for various use cases. Built with modern tech stack and optimized for performance.",
      image: "/project3.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 4,
      title: "Design System",
      period: "Sep 2022 - Dec 2022",
      description:
        "Comprehensive design system with reusable components and documentation. Helping teams maintain design consistency across projects.",
      image: "/project4.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  const visibleProjects = showMore ? allProjects : allProjects.slice(0, 4);

  return (
    <section id="projects" className="px-4 md:px-8 py-16 max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-12 text-gray-900 dark:text-white">
        Projects
      </h2>

      {/* Responsive 2-column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {visibleProjects.map((project) => (
          <div
            key={project.id}
            className="
              overflow-hidden rounded-md 
              bg-gray-200/20 dark:bg-gray-800/30 
              border border-gray-400/20 dark:border-gray-600/20 
              backdrop-blur-md transition-all duration-300
              flex flex-col
            "
          >
            {/* Project Image */}
            <div className="aspect-video overflow-hidden rounded-t-md">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {project.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {project.period}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1 mb-5">
                {project.description}
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <a
                  href={project.liveUrl}
                  className="
                    px-4 py-2 rounded-md text-sm font-medium
                    border border-gray-500/30 dark:border-gray-400/20
                    backdrop-blur-md
                    bg-gray-200/30 dark:bg-gray-800/30
                    text-gray-900 dark:text-gray-100
                    hover:bg-gray-300/40 dark:hover:bg-gray-700/40
                    transition-all duration-300
                  "
                >
                  🔗 Live
                </a>
                <a
                  href={project.githubUrl}
                  className="
                    px-4 py-2 rounded-md text-sm font-medium
                    border border-gray-500/30 dark:border-gray-400/20
                    backdrop-blur-md
                    bg-gray-200/30 dark:bg-gray-800/30
                    text-gray-900 dark:text-gray-100
                    hover:bg-gray-300/40 dark:hover:bg-gray-700/40
                    transition-all duration-300
                  "
                >
                  💻 GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {allProjects.length > 4 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowMore(!showMore)}
            className="
              px-6 py-3 rounded-md font-semibold text-sm sm:text-base
              border border-gray-500/30 dark:border-gray-400/20
              bg-gray-200/30 dark:bg-gray-800/30
              text-gray-900 dark:text-gray-100
              hover:bg-gray-300/40 dark:hover:bg-gray-700/40
              backdrop-blur-md transition-all duration-300
            "
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </section>
  );
}
