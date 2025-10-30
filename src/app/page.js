'use client'
import About from "@/components/section/about";
import Footer from "@/components/section/footer";
import Hero from "@/components/section/hero";
import { Navbar } from "@/components/section/navbar";


import Projects from "@/components/section/project";
import GitHubHeatmap from "@/components/ui/githubstats";


export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-1000">
     
   
      {/* Main Container */}
      <main className="max-w-2xl mx-auto px-4 py-12 sm:px-6">
        
        {/* Hero Section */}
       <Hero/>
       <Navbar/>
        {/* Projects Section */}
       <Projects/>
        {/* About Section */}
        <About/>
       {/* <GitHubHeatmap/> */}

       
      </main>

      
  <Footer/>
    </div>
  );
}

