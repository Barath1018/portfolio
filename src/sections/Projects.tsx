"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";

interface Project {
  company?: string;
  year?: string;
  title: string;
  description: string;
  link?: string;
  repo?: string;
  image: string;
  tags?: string;
}

export const ProjectsSection = ({ projects }: { projects: Project[] }) => {
  const accentColors = ["#c084f5", "#38bdf8", "#34d399", "#fb923c", "#f472b6", "#a78bfa"];

  return (
    <section className="pb-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Real-world Results"
          title="Featured Projects"
          description="See how I transformed concepts into engaging digital experiences."
        />
      </div>

      <div className="mt-12 lg:mt-20 relative">
        {projects.map((project, index) => (
          <div
            key={index}
            className="sticky flex items-center justify-center px-4 mb-6"
            style={{ zIndex: index + 1, top: `${80 + index * 40}px` }}
          >
            <div className="w-full max-w-7xl mx-auto">
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags ? project.tags.split(',').map(t => t.trim()).filter(Boolean) : []}
                year={project.year}
                category={project.company}
                liveUrl={project.link}
                githubUrl={project.repo}
                accentColor={accentColors[index % accentColors.length]}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
