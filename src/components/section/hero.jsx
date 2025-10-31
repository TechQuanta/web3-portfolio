import Image from "next/image";
import ShinyText from "../ui/ShinyText";
import ElectricBorder from "../ui/ElectricBorder";

// Import all necessary icons from lucide-react and local SVGs
import { Download, RocketIcon } from "lucide-react";
import TypeScriptIcon from "@/app/assets/TypeScript.svg";
import ReactIcon from "@/app/assets/React.svg";
import NextJSIcon from "@/app/assets/Next.js.svg";
import PostgreSQlIcon from "@/app/assets/PostgresSQL.svg";

// 1. IMPORT DATA: Assume the entire JSON object is exported from 'data.js'
// Note: You would need to ensure the export name matches (e.g., export const portfolioData = {...})
import { hero } from '@/lib/data.json'; // Adjust path as necessary

// 2. ICON MAP: Maps icon_name strings from JSON to actual imported components
const IconMap = {
    TypeScriptIcon: TypeScriptIcon,
    ReactIcon: ReactIcon,
    NextJSIcon: NextJSIcon,
    PostgreSQlIcon: PostgreSQlIcon,
    Download: Download,
    RocketIcon: RocketIcon,
};


export default function Hero() {
    const { greeting, name_and_title, description, technologies, image_card, call_to_actions } = hero;

    // Helper function to render the description with dynamic tech list and bold text
    const renderDescription = () => {
        // 1. Generate JSX for the list of technologies
        const techListJSX = technologies.map((tech) => {
            const IconComponent = IconMap[tech.icon_name];
            if (!IconComponent) return null;

            return (
                <span 
                    key={tech.name}
                    className="inline-flex items-center bg-gray-100 dark:bg-gray-100 text-gray-900 dark:text-gray-900 px-1 rounded text-sm font-semibold mx-1 border border-dashed border-gray-400 text-shadow-lg"
                >
                    <IconComponent className="w-4 h-4 mr-1 opacity-75" />
                    {tech.name}
                </span>
            );
        });

        // 2. Insert separators (commas and 'and') into the tech list
        const techListWithSeparators = techListJSX.flatMap((item, i) => {
            if (i === 0) return [item];
            if (i === techListJSX.length - 1) return [<span key="and-sep">{" and "}</span>, item];
            return [<span key={`comma-sep-${i}`}>{", "}</span>, item];
        });

        // 3. Split the main description string by the placeholder and insert the tech list
        const parts = description.split("[TECH_LIST]");
        
        // This array now contains [string, tech list JSX, string]
        const output = [
            parts[0],
            ...techListWithSeparators,
            parts[1]
        ];

        // 4. Replace bolded keywords (**UI**, **SAAS**) in the final output
        const finalOutput = output.flatMap((item, index) => {
            if (typeof item === 'string') {
                return item.split('**UI**').flatMap(sub => 
                    sub.split('**SAAS**').flatMap((final, fIndex) => {
                        if (fIndex > 0) return [<span key={`saas-${index}-${fIndex}`} className="font-bold text-gray-900 dark:text-white">SAAS</span>, final];
                        return final;
                    }).map((item, sIndex) => {
                        if (sIndex > 0) return [<span key={`ui-${index}-${sIndex}`} className="font-bold text-gray-900 dark:text-white">UI</span>, item];
                        return item;
                    })
                );
            }
            return item;
        });

        return finalOutput;
    };


    return (
        <section id="home" className="">
            {/* Greeting */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight pt-10">
                <ShinyText
                    text={greeting}
                    disabled={false}
                    speed={3}
                    className="custom-class"
                />
            </h1>
            {/* Name and Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
                <ShinyText
                    text={name_and_title}
                    disabled={false}
                    speed={3}
                    className="custom-class"
                />
            </h1>

            <div className="flex flex-col-reverse md:flex-col lg:flex-row items-center lg:items-stretch justify-between gap-10 lg:gap-16">
                
                {/* LEFT SECTION — Description */}
                <div className="flex flex-col justify-center items-start flex-1 text-left lg:max-w-[70%]">
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-loose mb-8 max-w-2xl">
                        {renderDescription()}
                    </p>
                </div>

                {/* RIGHT SECTION — Image Card and Buttons */}
                <div className="flex flex-col items-center lg:items-end justify-center gap-6 w-full lg:w-auto">
                    <ElectricBorder
                        color={image_card.electric_border.color}
                        speed={image_card.electric_border.speed}
                        chaos={image_card.electric_border.chaos}
                        thickness={image_card.electric_border.thickness}
                        style={{ borderRadius: 0 }}
                    >
                        <div className="bg-white dark:bg-gray-900">
                            <Image
                                src={image_card.src}
                                alt={image_card.alt}
                                height={image_card.height}
                                width={image_card.width}
                                className="object-cover rounded-none shadow-inner"
                            />
                        </div>
                    </ElectricBorder>

                    {/* Buttons below image */}
                    <div className="flex flex-wrap justify-center lg:justify-end gap-4 w-full">
                        {call_to_actions.map((action) => {
                            const IconComponent = IconMap[action.icon_name];
                            if (!IconComponent) return null;
                            
                            // Determine icon position
                            const iconClass = action.label === 'Connect' ? 'ml-2' : 'mr-2';

                            return (
                                <button
                                    key={action.label}
                                    className="px-6 py-3 rounded-xl text-sm sm:text-base font-semibold border border-gray-500/30 dark:border-gray-400/20 backdrop-blur-md bg-gray-200/30 dark:bg-gray-800/30 text-gray-900 dark:text-gray-100 hover:bg-gray-300/40 dark:hover:bg-gray-700/40 transition-all duration-300 shadow-lg"
                                >
                                    {/* Place icon before text for 'Download CV', after for 'Connect' */}
                                    {action.label !== 'Connect' && <IconComponent className={`inline w-4 h-4 ${iconClass}`} />}
                                    {action.label}
                                    {action.label === 'Connect' && <IconComponent className={`inline w-4 h-4 ${iconClass}`} />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}