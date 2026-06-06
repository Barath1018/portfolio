import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { FaCode, FaPaintBrush, FaRobot, FaVideo } from "react-icons/fa";
import { TbAutomation } from "react-icons/tb";
import { BsPalette } from "react-icons/bs";

const services = [
  {
    icon: FaCode,
    title: "Web Development",
    description: "Building responsive and modern websites using React, Next.js, Tailwind CSS, and scalable frontend technologies.",
    color: "#61DAFB",
  },
  {
    icon: FaRobot,
    title: "AI Integration",
    description: "Integrating AI-powered features and automation into applications for smarter user experiences and productivity.",
    color: "#EA4B71",
  },
  {
    icon: FaVideo,
    title: "Video Editing",
    description: "Creating cinematic edits, engaging short-form content, AMVs, motion visuals, and high-retention videos using professional editing workflows.",
    color: "#9999FF",
  },
  {
    icon: TbAutomation,
    title: "Workflow Automation",
    description: "Streamlining business processes with n8n workflows and custom automation solutions.",
    color: "#FF6B6B",
  },
];

export const ServicesSection = () => {
  return (
    <div className="py-16 lg:py-24" id="services">
      <div className="container">
        <SectionHeader
          eyebrow="What I Offer"
          title="Services"
          description="Transforming ideas into digital experiences with creativity, strategy, and modern technology."
        />
        <div className="mt-12 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <Card
              key={service.title}
              className="p-6 lg:p-8 hover:-translate-y-1 transition-transform duration-300 cursor-default"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${service.color}20` }}
              >
                <service.icon
                  className="size-7"
                  style={{ color: service.color }}
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
