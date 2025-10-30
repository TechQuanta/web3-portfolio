export default function About() {
  const experiences = [
    {
      company: "Atomic Finance",
      position: "Bitcoin Protocol Engineer",
      date: "May 2021 - Oct 2022",
      description: "Contributed to Bitcoin protocol development and blockchain infrastructure.",
      icon: "🅐",
      color: "bg-blue-500"
    },
    {
      company: "Shopify",
      position: "Software Engineer",
      date: "January 2021 - April 2021",
      description: "Developed and maintained e-commerce platform features and integrations.",
      icon: "🛍",
      color: "bg-green-500"
    },
    {
      company: "Nvidia",
      position: "Software Engineer",
      date: "January 2020 - April 2020",
      description: "Worked on GPU computing and parallel processing systems.",
      icon: "🎮",
      color: "bg-gray-700"
    },
    {
      company: "Splunk",
      position: "Software Engineer",
      date: "January 2019 - April 2019",
      description: "Built data visualization and analytics platform features.",
      icon: "📊",
      color: "bg-red-500"
    }
  ];

  const education = [
    {
      institution: "Buildspace",
      degree: "s3, s4, sf1, s5",
      date: "2023 - 2024",
      description: "Intensive coding bootcamp focused on full-stack development and startup skills.",
      icon: "🏗"
    },
    {
      institution: "University of Waterloo",
      degree: "Bachelor's Degree of Computer Science (BCS)",
      date: "2016 - 2021",
      description: "Comprehensive computer science education with focus on software engineering and algorithms.",
      icon: "🎓"
    }
  ];

  return (
    <div className="px-4 md:px-8 py-12">
      {/* About Me Description */}
      <section id="about" className="mb-16 ">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">About Me</h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
          I'm a passionate full-stack developer with a strong background in blockchain technology and software engineering. 
          I love building scalable web applications and exploring new technologies. When I'm not coding, you'll find me 
          contributing to open-source projects or experimenting with Three.js to create interactive web experiences.
        </p>
      </section>

      {/* Work Experience */}
      <section className="mb-16">
        <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900 dark:text-white">Work Experience</h3>
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <div key={idx} className="flex gap-4">
              <div className={`${exp.color} w-12 h-12 rounded-full flex items-center justify-center text-white text-xl flex-shrink-0 font-bold`}>
                {exp.icon}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{exp.company}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{exp.position}</p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{exp.date}</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-900 dark:text-white">Education</h3>
        <div className="space-y-6">
          {education.map((edu, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-2xl flex-shrink-0">
                {edu.icon}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{edu.institution}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{edu.degree}</p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{edu.date}</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}