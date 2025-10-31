import { useState } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiFirebase,
  SiPrisma,
  SiExpress,
  SiVercel,
  SiDocker,
  SiGraphql,
} from "react-icons/si";
import { FaMobileAlt, FaPaw } from "react-icons/fa"; // ✅ React Native & Zustand replacements

export default function TechCarousel() {
  const [isPaused, setIsPaused] = useState(false);

  const techs = [
    { name: "React", icon: SiReact, color: "text-sky-400" },
    { name: "Next.js", icon: SiNextdotjs, color: "text-gray-900 dark:text-white" },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
    { name: "Zustand", icon: FaPaw, color: "text-amber-500" }, // 🐻 replaced here
    { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
    { name: "Express", icon: SiExpress, color: "text-gray-700 dark:text-gray-300" },
    { name: "MongoDB", icon: SiMongodb, color: "text-green-600" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "text-sky-600" },
    { name: "React Native", icon: FaMobileAlt, color: "text-sky-400" },
    { name: "TailwindCSS", icon: SiTailwindcss, color: "text-cyan-400" },
    { name: "Prisma", icon: SiPrisma, color: "text-gray-700 dark:text-gray-300" },
    { name: "Firebase", icon: SiFirebase, color: "text-amber-500" },
    { name: "GraphQL", icon: SiGraphql, color: "text-pink-500" },
    { name: "Docker", icon: SiDocker, color: "text-blue-400" },
    { name: "Vercel", icon: SiVercel, color: "text-gray-900 dark:text-white" },
  ];

  const displayItems = [...techs, ...techs];

  return (
    <div
      className="overflow-hidden rounded-lg"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative px-4 md:px-8 h-32">
        <div
          className={`flex absolute h-full ${isPaused ? "animation-paused" : ""}`}
          style={{
            animation: isPaused ? "none" : "scroll 15s linear infinite", 
          }}
        >
          {displayItems.map((tech, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-40 h-32 flex flex-col items-center justify-center gap-3 hover:scale-110 transition-transform duration-300 cursor-pointer"
            >
              <tech.icon className={`w-12 h-12 ${tech.color}`} />
              <span className="text-gray-700 dark:text-gray-300 font-semibold text-sm">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        {/* Smooth fading edges for both themes */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 
         to-transparent 
          dark:from-gray-900 dark:via-gray-900/70 dark:to-transparent 
          pointer-events-none z-10"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 
         to-transparent 
          dark:from-gray-900 dark:via-gray-900/70 dark:to-transparent 
          pointer-events-none z-10"
        />
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-160px * ${techs.length}));
          }
        }
        .animation-paused {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
}
