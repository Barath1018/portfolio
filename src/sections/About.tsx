"use client";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { CardHeader } from "@/components/CardHeader";
import { ToolboxItems } from "@/components/ToolboxItems";
import ProfileCard from "@/components/ProfileCard";
import { FaPaintBrush } from "react-icons/fa";
import { TbRobot, TbMovie } from "react-icons/tb";
import { useEffect, useState } from "react";
import RotatingText from "@/components/RotatingText";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

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

const levelColors = ["#1f2937", "#3b1f6e", "#6b3fa0", "#9b60d0", "#c084f5"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function GitHubGraph({ username, onTotal }: { username: string; onTotal: (total: number) => void }) {
  const [weeks, setWeeks] = useState<{ days: ContributionDay[] }[]>([]);
  const [monthLabels, setMonthLabels] = useState<{ label: string; weekIndex: number }[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
      .then((res) => res.json())
      .then((data) => {
        const contributions = data.contributions || [];
        const yearTotal = contributions
          .filter((c: { date: string }) => new Date(c.date).getFullYear() === new Date().getFullYear())
          .reduce((sum: number, c: { count: number }) => sum + c.count, 0);
        setTotal(yearTotal);
        onTotal(yearTotal);
        const dayMap: Record<string, { count: number; level: number }> = {};
        contributions.forEach((c: { date: string; count: number; level: number }) => {
          dayMap[c.date] = { count: c.count, level: c.level };
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dayOfWeek = today.getDay();
        const totalWeeks = 52;
        const allDays: ContributionDay[] = [];

        for (let i = totalWeeks * 7 + dayOfWeek; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, "0");
          const day = String(d.getDate()).padStart(2, "0");
          const dateStr = `${y}-${m}-${day}`;
          const entry = dayMap[dateStr];
          allDays.push({
            date: dateStr,
            count: entry ? entry.count : 0,
            level: entry ? entry.level : 0,
          });
        }

        const weekArray: { days: ContributionDay[] }[] = [];
        const labels: { label: string; weekIndex: number }[] = [];
        let lastMonth = -1;

        for (let i = 0; i < allDays.length; i += 7) {
          const weekDays = allDays.slice(i, i + 7);
          weekArray.push({ days: weekDays });

          const firstDayOfWeek = weekDays[0];
          if (firstDayOfWeek) {
            const m = new Date(firstDayOfWeek.date).getMonth();
            if (m !== lastMonth) {
              labels.push({ label: MONTHS[m], weekIndex: weekArray.length - 1 });
              lastMonth = m;
            }
          }
        }
        setWeeks(weekArray);
        setMonthLabels(labels);
      })
      .catch(() => {});
  }, [username]);

  if (weeks.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex gap-[4px]">
          {Array.from({ length: 52 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-[4px]">
              {Array.from({ length: 7 }).map((_, j) => (
                <div key={j} className="w-[15px] h-[15px] rounded-[3px] bg-white/5 animate-pulse" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col relative">
      {/* Month labels */}
      <div className="flex ml-[36px] mb-2 text-[10px] text-white/30 font-medium h-[14px]">
        {monthLabels.map((m, i) => (
          <span key={i} className="absolute" style={{ left: `${32 + m.weekIndex * 19}px` }}>
            {m.label}
          </span>
        ))}
      </div>

      {/* Grid only - day labels moved to parent */}
      <div className="flex gap-[4px]">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[4px]">
            {week.days.map((day, di) => (
              <div
                key={di}
                title={`${day.count} contribution${day.count !== 1 ? "s" : ""} on ${new Date(day.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
                className="w-[15px] h-[15px] rounded-[3px] hover:ring-1 hover:ring-white/30 transition-all"
                style={{ backgroundColor: levelColors[day.level] }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export const AboutSection = () => {
  const [totalContributions, setTotalContributions] = useState(0);
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
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 flex-1 flex flex-col relative">
                  <div className="text-xs text-white/40 mb-2">
                    <span className="text-white/70 font-semibold">{totalContributions}</span> contributions in the last year
                  </div>
                  <div className="flex">
                    {/* Fixed day labels - outside scroll */}
                    <div className="flex flex-col gap-[4px] text-[10px] text-white/30 font-medium w-8 justify-between flex-shrink-0 pt-[22px]">
                      {DAYS.map((day, i) => (
                        <span key={i} className="h-[15px] leading-[15px]">{i % 2 === 1 ? day : ""}</span>
                      ))}
                    </div>
                    {/* Scrollable grid */}
                    <div className="overflow-x-auto scrollbar-thin flex-1 min-w-0">
                      <GitHubGraph username="Barath1018" onTotal={setTotalContributions} />
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/5 text-[10px] text-white/40 flex items-center justify-end gap-2">
                      <span>Less</span>
                      <div className="flex gap-0.5">
                        {levelColors.map((color, i) => (
                          <span key={i} className="w-[10px] h-[10px] rounded-sm" style={{ backgroundColor: color }} />
                        ))}
                      </div>
                      <span>More</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Profile Card */}
            <div className="md:col-span-2 lg:col-span-1 flex items-center justify-center lg:justify-end">
              <ProfileCard
                name="Barath"
                title={
                  <RotatingText
                    texts={["Frontend Developer", "UI/UX Designer", "Automation Builder", "Video Editor"]}
                    rotationInterval={3000}
                    splitBy="words"
                    className="text-white/75"
                  />
                }
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
