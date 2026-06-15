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
  return (
    <section className="pb-16 lg:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Real-world Results"
          title="Featured Projects"
          description="See how I transformed concepts into engaging digital experiences."
        />

        <div className="mt-12 lg:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 items-stretch">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags ? project.tags.split(',').map(t => t.trim()).filter(Boolean) : []}
              year={project.year}
              category={project.company}
              liveUrl={project.link}
              githubUrl={project.repo}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
