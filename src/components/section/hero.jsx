import Image from "next/image";
import ShinyText from "../ui/ShinyText";
import ElectricBorder from "../ui/ElectricBorder";
import { Download,RocketIcon } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="px-4 md:px-8 py-12">
      {/* Layout: side-by-side on lg+, stacked on md and below */}
      <div className="flex flex-col-reverse md:flex-col lg:flex-row items-center lg:items-stretch justify-between gap-10 lg:gap-16">
        
        {/* LEFT SECTION — Text */}
        <div className="flex flex-col justify-center items-start flex-1 text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            <ShinyText
              text="Hi, I'm Pratik — A Full Stack Developer."
              disabled={false}
              speed={3}
              className="custom-class"
            />
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-loose mb-8 max-w-2xl">
            I build interactive web apps using{" "}
            <span className="inline-block bg-gray-800 dark:bg-gray-700 text-white px-3 py-1 rounded text-sm font-semibold mx-1">
              TypeScript
            </span>
            <span className="inline-block bg-gray-800 dark:bg-gray-700 text-white px-3 py-1 rounded text-sm font-semibold mx-1">
              React
            </span>
            <span className="inline-block bg-gray-800 dark:bg-gray-700 text-white px-3 py-1 rounded text-sm font-semibold mx-1">
              Next.js
            </span>
            and{" "}
            <span className="inline-block bg-gray-800 dark:bg-gray-700 text-white px-3 py-1 rounded text-sm font-semibold mx-1">
              PostgreSQL
            </span>
            . With a focus on{" "}
            <span className="font-bold text-gray-900 dark:text-white">UI</span>{" "}
            design. Enthusiastic about{" "}
            <span className="font-bold text-gray-900 dark:text-white">SAAS</span>
            , driven by a keen eye for building product.
          </p>
        </div>

        {/* RIGHT SECTION — Image + Buttons */}
        <div className="flex flex-col items-center lg:items-end justify-center gap-6 w-full lg:w-auto">
          {/* Electric border around image */}
          <ElectricBorder
            color="#7df9ff"
            speed={1}
            chaos={0.5}
            thickness={2}
            style={{ borderRadius: 0 }}
          >
            <div className="bg-white dark:bg-gray-900">
              <Image
                src="/ippo.jpeg"
                alt="Profile photo"
                height={250}
                width={250}
                className="object-cover rounded-none"
              />
            </div>
          </ElectricBorder>

          {/* Buttons below image */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-4 w-full">
            <button
              className="
                px-6 py-3 rounded-xl
                text-sm sm:text-base font-semibold
                border border-gray-500/30 dark:border-gray-400/20
                backdrop-blur-md
                bg-gray-200/30 dark:bg-gray-800/30
                text-gray-900 dark:text-gray-100
                hover:bg-gray-300/40 dark:hover:bg-gray-700/40
                transition-all duration-300 shadow-lg
              "
            >
              Download CV
            </button>
            <button
              className="
                px-6 py-3 rounded-xl
                text-sm sm:text-base font-semibold
                border border-gray-500/30 dark:border-gray-400/20
                backdrop-blur-md
                bg-gray-200/30 dark:bg-gray-800/30
                text-gray-900 dark:text-gray-100
                hover:bg-gray-300/40 dark:hover:bg-gray-700/40
                transition-all duration-300 shadow-lg
              "
            >
            Connect 🚀 
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
