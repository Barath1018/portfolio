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
  categoryTop?: string;
  categoryLeft?: string;
  titleTop?: string;
  titleLeft?: string;
  descTop?: string;
  descLeft?: string;
  tagsTop?: string;
  tagsLeft?: string;
  buttonsTop?: string;
  buttonsLeft?: string;
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
  categoryTop,
  categoryLeft,
  titleTop,
  titleLeft,
  descTop,
  descLeft,
  tagsTop,
  tagsLeft,
  buttonsTop,
  buttonsLeft,
  className,
}: ProjectCardProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={twMerge(
        `group w-full bg-[#1a1a2e] border border-white/20 rounded-2xl overflow-hidden shadow-xl shadow-black/20 transition-all duration-500 hover:border-white/30 hover:shadow-[0_0_40px_-10px_rgba(192,132,245,0.15)] border-l-[3px]`,
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
      <div className="w-full lg:w-1/2 p-4 lg:p-6 flex flex-col gap-1.5 lg:gap-2 overflow-hidden">
        {/* Category + Year */}
        <div className="flex items-center gap-2">
          {category && (
            <span
              className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded-full"
              style={{
                position: "relative",
                ...(categoryTop && { top: categoryTop }),
                ...(categoryLeft && { left: categoryLeft }),
                color: category === "ONGOING" ? "#f87171" : "#c084f5",
                backgroundColor: category === "ONGOING" ? "rgba(248,113,113,0.1)" : "rgba(192,132,245,0.1)",
                border: `1px solid ${category === "ONGOING" ? "rgba(248,113,113,0.2)" : "rgba(192,132,245,0.2)"}`,
              }}
            >
              {category}
            </span>
          )}
          {year && (
            <span
              className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded-full"
              style={{
                position: "relative",
                ...(categoryTop && { top: categoryTop }),
                ...(categoryLeft && { left: categoryLeft }),
                color: year === "ONGOING" ? "#f87171" : "#c084f5",
                backgroundColor: year === "ONGOING" ? "rgba(248,113,113,0.1)" : "rgba(192,132,245,0.1)",
                border: `1px solid ${year === "ONGOING" ? "rgba(248,113,113,0.2)" : "rgba(192,132,245,0.2)"}`,
              }}
            >
              {year}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="font-heading text-xl font-bold text-white leading-snug group-hover:text-[#c084f5] transition-colors duration-300 line-clamp-2"
          style={{ position: "relative", ...(titleTop && { top: titleTop }), ...(titleLeft && { left: titleLeft }) }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="text-[13px] text-xl text-white/50 leading-relaxed"
          style={{ position: "relative", ...(descTop && { top: descTop }), ...(descLeft && { left: descLeft }) }}
        >
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div
            className="flex flex-wrap gap-1"
            style={{ position: "relative", ...(tagsTop && { top: tagsTop }), ...(tagsLeft && { left: tagsLeft }) }}
          >
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[9px] font-medium bg-white/5 text-white/60 rounded-md border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div
          className="flex items-center gap-2 mt-auto"
          style={{ position: "relative", ...(buttonsTop && { top: buttonsTop }), ...(buttonsLeft && { left: buttonsLeft }) }}
        >
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              <button className="bg-white text-gray-950 h-7 px-3 rounded-lg font-semibold inline-flex items-center justify-center gap-1 shadow-sm transition-all hover:shadow-md hover:shadow-purple-500/10 text-[11px]">
                <span>Live Demo</span>
                <ArrowUpRightIcon className="size-2.5" />
              </button>
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <button className="h-7 w-7 rounded-lg border border-white/10 text-white/50 inline-flex items-center justify-center transition-all hover:border-white/30 hover:text-white hover:bg-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
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
