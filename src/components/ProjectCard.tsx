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
        `group w-full bg-[#1a1a2e] border border-white/10 rounded-2xl overflow-hidden shadow-xl shadow-black/20 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_40px_-10px_rgba(192,132,245,0.15)] border-l-[3px]`,
        "flex flex-col lg:flex-row h-[44vh] max-h-[500px]",
        className
      )}
      style={{ borderLeftColor: accentColor }}
    >
      {/* Image Side */}
      <div className="relative w-full lg:w-[50%] h-full overflow-hidden flex-shrink-0 bg-black/20">
        {!imgError ? (
          <Image
            src={image}
            alt={title}
            width={1200}
            height={800}
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}66)`,
            }}
          />
        )}
      </div>

      {/* Content Side */}
      <div className="w-full lg:w-1/2 p-5 lg:p-8 flex flex-col justify-center gap-2 lg:gap-3">
        {/* Category + Year */}
        <div className="flex items-center gap-2">
          {category && (
            <span className="px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#c084f5] bg-[#c084f5]/10 rounded-full border border-[#c084f5]/20">
              {category}
            </span>
          )}
          {year && (
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">
              {year}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl lg:text-2xl font-bold text-white leading-snug group-hover:text-[#c084f5] transition-colors duration-300 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs lg:text-sm text-white/70 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[10px] font-medium bg-white/5 text-white/60 rounded-lg border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center gap-2 mt-1">
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <button className="bg-white text-gray-950 h-8 px-4 rounded-lg font-semibold inline-flex items-center justify-center gap-1.5 shadow-sm transition-all hover:shadow-md hover:shadow-purple-500/10 text-xs">
                <span>Live Demo</span>
                <ArrowUpRightIcon className="size-3" />
              </button>
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <button className="h-8 w-8 rounded-lg border border-white/10 text-white/50 inline-flex items-center justify-center transition-all hover:border-white/30 hover:text-white hover:bg-white/5">
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
