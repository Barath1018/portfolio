"use client";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import bookImage from "@/assets/images/book-cover.png";
import Image from "next/image";
import JavaScriptIcon from "@/assets/icons/square-js.svg";
import HTMLIcon from "@/assets/icons/html5.svg";
import CSSIcon from "@/assets/icons/css3.svg";
import ReactIcon from "@/assets/icons/react.svg";
import GitHubIcon from "@/assets/icons/github.svg";
import AdobeAfterEffectsIcon from "@/assets/icons/aftereffects.svg";
import CanvaIcon from "@/assets/icons/canva-svgrepo-com.svg";
import { CardHeader } from "@/components/CardHeader";
import { ToolboxItems } from "@/components/ToolboxItems";
import { LeetCode } from "@/components/LeetCode";
// Removed GitHub calendar per user request; restored a "Beyond the Code" card instead.
import GitHubCalendar from "react-github-calendar";

const toolboxItems = [
  {
    title: "JavaScript",
    iconType: JavaScriptIcon,
  },
  {
    title: "HTML5",
    iconType: HTMLIcon,
  },
  {
    title: "CSS3",
    iconType: CSSIcon,
  },
  {
    title: "React",
    iconType: ReactIcon,
  },
  {
    title: "GitHub",
    iconType: GitHubIcon,
  },
  {
    title: "Adobe After Effects",
    iconType: AdobeAfterEffectsIcon,
  },
  {
    title: "Canva",
    iconType: CanvaIcon,
  },
];

export const AboutSection = () => {
  return (
    <div className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="About Me"
          title="A Glimpse Into My World"
          description="Learn more about who I am, what I do, and what inspires me."
        />
        <div className="mt-20 flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] md:col-span-2 lg:col-span-1">
              <CardHeader
                title="My Reads"
                description="Explore the books shaping my perspectives."
              />
              <div className="w-40 mx-auto mt-2 md:mt-0">
                <Image src={bookImage} alt="Book cover" />
              </div>
            </Card>
            <Card className="h-[320px] md:col-span-3 lg:col-span-2">
              <CardHeader
                title="My Toolbox"
                description="Explore the technologies and tools I use to craft exceptional
                digital experiences."
                className=""
              />
              <ToolboxItems
                items={toolboxItems}
                className=""
                itemsWrapperClassName="animate-move-left"
              />
              <ToolboxItems
                items={toolboxItems}
                className="mt-6"
                itemsWrapperClassName="animate-move-right [animation-duration:2s]"
              />
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-8">
            {/* GitHub Calendar */}
            <Card className="h-[420px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
              <CardHeader
                title="GitHub Calendar"
                description="Days I Code"
              />
              <div className="flex-1 px-3 pb-4 mt-2 overflow-auto">
                <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-3">
                  <GitHubCalendar
                    username="Barath1018"
                    blockSize={15}
                    blockMargin={5}
                    fontSize={16}
                    colorScheme="dark"
                    theme={{
                      light: ["#e5e7eb", "#c084f5"],
                      dark: ["#1f2937", "#c084f5"],
                    }}
                  />
                </div>
              </div>
            </Card>
            {/* LeetCode Stats Card (kept) */}
            <Card className="h-[420px] p-0 md:col-span-2 lg:col-span-1">
              <LeetCode />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
