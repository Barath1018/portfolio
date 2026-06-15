"use client";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { CardHeader } from "@/components/CardHeader";
import { ToolboxItems } from "@/components/ToolboxItems";
import ProfileCard from "@/components/ProfileCard";
import GitHubCalendar from "react-github-calendar";
import { FaPaintBrush } from "react-icons/fa";
import { TbRobot, TbMovie } from "react-icons/tb";

const toolboxItems = [
  { title: "HTML",          iconSrc: "/icons/tools/html5-color.svg" },
  { title: "CSS",           iconSrc: "/icons/tools/css3-color.svg" },
  { title: "JavaScript",    iconSrc: "/icons/tools/js.png" },
  { title: "React",         iconSrc: "/icons/tools/react.png" },
  { title: "Python",        iconSrc: "/icons/tools/python.png" },
  { title: "GitHub",        iconSrc: "/icons/tools/github.svg" },
  { title: "VS Code",       iconSrc: "/icons/tools/vscode.png" },
  { title: "Figma",         iconSrc: "/icons/figma.webp", iconSize: 48 },
  { title: "After Effects", iconSrc: "/icons/tools/after-effects.png" },
  { title: "Blender",       iconSrc: "/icons/tools/blender.png" },
  { title: "n8n",           iconSrc: "/icons/tools/n8n.webp" },
  { title: "Canva",         iconSrc: "/icons/tools/canva.svg", iconSize: 48 },
];

const interestItems = [
  { icon: TbMovie,      label: "Video Editing & Motion", color: "#9999FF" },
  { icon: TbRobot,      label: "AI & Automation",        color: "#EA4B71" },
  { icon: FaPaintBrush, label: "SaaS Building",           color: "#F24E1E" },
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
          <div className="grid grid-cols-1 gap-8 md:grid-cols-6 lg:grid-cols-4">
            {/* Beyond the Code */}
            <Card className="h-[340px] md:col-span-2 lg:col-span-1 flex flex-col">
              <CardHeader
                title="Beyond the Code"
                description="What keeps me going outside work."
              />
              <div className="flex flex-col gap-2.5 px-5 pb-5">
                {interestItems.map(({ icon: Icon, label, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-3 py-2 hover:bg-white/10 transition-colors"
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}15` }}
                    >
                      <Icon className="size-3.5" style={{ color }} />
                    </div>
                    <span className="text-xs text-white/80 font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Tools & Technologies */}
            <Card className="h-[340px] md:col-span-4 lg:col-span-3 overflow-hidden">
              <CardHeader
                title="Tools & Technologies"
                description="The stack I use to design, build, and automate things."
              />
              <ToolboxItems
                items={toolboxItems}
                className=""
                itemsWrapperClassName="animate-move-left"
              />
              <ToolboxItems
                items={toolboxItems}
                className="mt-3"
                itemsWrapperClassName="animate-move-right [animation-duration:2s]"
              />
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-4 gap-8">
            {/* GitHub Calendar */}
            <Card className="p-0 flex flex-col md:col-span-3 lg:col-span-3">
              <CardHeader
                title="GitHub Calendar"
                description="Days I Code"
              />
              <div className="flex-1 px-3 pb-4 mt-2 flex flex-col github-calendar-wrapper">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 flex-1 flex flex-col">
                  <div className="overflow-x-auto scrollbar-thin flex-1">
                    <div className="min-w-max">
                      <GitHubCalendar
                        username="Barath1018"
                        blockSize={15}
                        blockMargin={5}
                        fontSize={16}
                        colorScheme="dark"
                        theme={{
                          light: ["#1f2937", "#c084f5"],
                          dark: ["#1f2937", "#c084f5"],
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/5 text-[10px] text-white/40 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span>Less</span>
                      <div className="flex gap-0.5">
                        <span className="w-[10px] h-[10px] rounded-sm" style={{ backgroundColor: '#1f2937' }} />
                        <span className="w-[10px] h-[10px] rounded-sm" style={{ backgroundColor: '#4a2080' }} />
                        <span className="w-[10px] h-[10px] rounded-sm" style={{ backgroundColor: '#8040c0' }} />
                        <span className="w-[10px] h-[10px] rounded-sm" style={{ backgroundColor: '#c084f5' }} />
                      </div>
                      <span>More</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Profile Card */}
            <div className="md:col-span-2 lg:col-span-1 flex items-center justify-center lg:justify-end">
              <ProfileCard
                name="Barath"
                title="Frontend Developer"
                handle="Barath1018"
                status="Open to Work"
                contactText="View Profile"
                avatarUrl="/barath.png"
                miniAvatarUrl="/barath.png"
                iconUrl="/iconpattern.svg"
                showUserInfo={true}
                behindGlowEnabled={true}
                behindGlowColor="rgba(192, 132, 245, 0.4)"
                enableTilt={true}
                onContactClick={() => window.open('https://github.com/Barath1018/', '_blank')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
