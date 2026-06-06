"use client";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";

const contactInfo = [
  { label: "Email", value: "barath.senthil1602@gmail.com", href: "mailto:barath.senthil1602@gmail.com" },
  { label: "Phone", value: "+91 70101 63853", href: "tel:+917010163853" },
  { label: "Location", value: "Chennai, Tamil Nadu, India", href: null },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/Barath1018", icon: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" },
  { name: "LinkedIn", href: "https://linkedin.com/in/barath-senthil-933b03294/", icon: "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" },
  { name: "Instagram", href: "https://instagram.com/_barath_ob1t0", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
  { name: "Discord", href: "https://discord.com/users/barath_codex4", icon: "M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" },
];

const WEBHOOK_URL = "https://n8n-latest-nifu.onrender.com/webhook/contact";

export const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!form.email.includes("@")) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("sending");

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || "",
          message: form.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("sent");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-16 lg:py-24" id="contact">
      <div className="container">
        <SectionHeader 
          eyebrow="Get in Touch"
          title="Let's Talk"
          description="Have a project in mind? I'd love to hear from you."
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          <div className="flex flex-col gap-8">
            <Card className="p-5 sm:p-6 md:p-8">
              <h3 className="font-heading text-xl text-white mb-6">Contact Information</h3>
              <div className="flex flex-col gap-4">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#c084f5] to-sky-400 flex items-center justify-center">
                      {info.label === "Email" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" className="text-gray-900">
                          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                        </svg>
                      )}
                      {info.label === "Phone" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" className="text-gray-900">
                          <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328z" />
                        </svg>
                      )}
                      {info.label === "Location" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" className="text-gray-900">
                          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-white/50 text-sm">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="text-white text-sm hover:text-purple-400 transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white text-sm">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5 sm:p-6 md:p-8">
              <h3 className="font-heading text-xl text-white mb-6">Social Links</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-5 sm:p-6 md:p-10">
            {status === "sent" ? (
              <div className="text-center py-10">
                <div className="text-4xl mb-4">🎉</div>
                <h4 className="text-white font-heading text-lg">Thanks! I'll get back to you soon.</h4>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-white/70 text-sm font-medium">
                      Name <span className="text-[#c084f5]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c084f5]/60 transition-colors ${errors.name ? "border-red-500" : "border-white/10"}`}
                    />
                    {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-white/70 text-sm font-medium">
                      Email <span className="text-[#c084f5]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c084f5]/60 transition-colors ${errors.email ? "border-red-500" : "border-white/10"}`}
                    />
                    {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/70 text-sm font-medium">
                    Phone <span className="text-white/30">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 234 567 8900"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c084f5]/60 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/70 text-sm font-medium">
                    Message <span className="text-[#c084f5]">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className={`bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#c084f5]/60 transition-colors resize-none ${errors.message ? "border-red-500" : "border-white/10"}`}
                  />
                  {errors.message && <p className="text-red-400 text-xs">{errors.message}</p>}
                </div>
                {status === "error" && (
                  <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full sm:w-auto mt-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#c084f5] to-sky-400 text-gray-900 font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};