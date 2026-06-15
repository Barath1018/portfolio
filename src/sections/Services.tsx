import { SectionHeader } from "@/components/SectionHeader";
import { FaCode, FaRobot, FaVideo } from "react-icons/fa";
import { TbAutomation } from "react-icons/tb";

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
    description: "Creating cinematic edits, engaging short-form content, AMVs, motion visuals, and high-retention videos.",
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
            <div
              key={service.title}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 hover:-translate-y-1 transition-all duration-300 cursor-default hover:border-white/20"
              style={{ boxShadow: `0 0 0 0px ${service.color}00` }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <service.icon
                  className="size-7"
                  style={{ color: service.color }}
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
