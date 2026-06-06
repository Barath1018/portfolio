"use client";

import Image from "next/image";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import React, { useEffect, useState } from 'react';

interface Project {
  company?: string;
  year?: string;
  title: string;
  description: string;
  link?: string;
  repo?: string;
  image: string;
}

export const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch projects:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return (
    <section className="pb-16 lg:py-24">
      <div className="container">
        <SectionHeader 
          eyebrow="Real-world Results"
          title="Featured Projects" 
          description="See how I transformed concepts into engaging digital experiences." 
        />
        
        <div className="mt-12 lg:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {projects.map((project, index) => (
            <Card key={index} className="p-0 flex flex-col overflow-hidden min-h-[32rem] lg:min-h-[35rem] h-full">
              <div className="relative h-52 lg:h-60 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                {(project.company || project.year) && (
                  <div className="bg-gradient-to-r from-[#c084f5] to-sky-400 inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
                    {project.company && <span>{project.company}</span>}
                    {project.company && project.year && <span>&bull;</span>}
                    {project.year && <span>{project.year}</span>}
                  </div>
                )}
                <h3 className="font-heading text-xl mt-2 text-white">{project.title}</h3>
                <p className="text-sm text-white/50 mt-3 flex-grow">{project.description}</p>
                <div className="mt-5 flex items-center gap-3">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <button className="bg-white text-gray-950 h-9 px-4 rounded-lg font-semibold inline-flex items-center justify-center gap-2 shadow-sm shadow-purple-500/20 transition-transform hover:-translate-y-0.5">
                        <span>Live Demo</span>
                        <ArrowUpRightIcon className="size-3" />
                      </button>
                    </a>
                  )}
                  {project.repo && (
                    <a href={project.repo} target="_blank" rel="noopener noreferrer">
                      <button className="bg-transparent border border-white/30 text-white/80 h-9 px-4 rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition-all hover:border-white hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                      </button>
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};