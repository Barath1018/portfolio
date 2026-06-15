"use client";

import Image from "next/image";
import { useState } from "react";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { twMerge } from "tailwind-merge";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags?: string[];
  year?: string;
  category?: string;
  liveUrl?: string;
  githubUrl?: string;
  accentColor?: string;
  className?: string;
}

export const ProjectCard = ({
  title,
  description,
  image,
  tags = [],
  year,
  category,
  liveUrl,
  githubUrl,
  accentColor = "#c084f5",
  className,
}: ProjectCardProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={twMerge(
        "group bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-xl shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_20px_-5px_rgba(192,132,245,0.2)] min-h-[430px]",
        className
      )}
    >
      <div className="relative h-44 w-full overflow-hidden rounded-t-2xl">
        {!imgError ? (
          <Image
            src={image}
            alt={title}
            width={800}
            height={450}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(135deg, ${accentColor}33, ${accentColor}88)`,
            }}
          />
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        {(category || year) && (
          <div className="flex items-center gap-2 mb-2">
            {category && (
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#c084f5]">
                {category}
              </span>
            )}
            {category && year && (
              <span className="text-white/20 text-[8px]">&bull;</span>
            )}
            {year && (
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">
                {year}
              </span>
            )}
          </div>
        )}

        <h3 className="font-heading text-base font-bold text-white leading-tight line-clamp-1">
          {title}
        </h3>

        <p className="text-xs text-white/50 mt-1.5 flex-grow leading-relaxed">
          {description}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-mono bg-white/10 text-white/70 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex-grow" />

        <div className="flex items-center gap-2 mt-4">
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <button className="bg-white text-gray-950 h-7 px-3 rounded-lg font-semibold inline-flex items-center justify-center gap-1.5 shadow-sm shadow-purple-500/20 transition-transform hover:-translate-y-0.5 text-xs">
                <span>Live Demo</span>
                <ArrowUpRightIcon className="size-2.5" />
              </button>
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <button className="bg-transparent border border-white/30 text-white/80 h-7 px-3 rounded-lg font-semibold inline-flex items-center justify-center gap-1.5 transition-all hover:border-white hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
