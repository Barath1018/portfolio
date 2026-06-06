"use client";
import ArrowDown from "@/assets/icons/arrow-down.svg";

export default function DownloadResumeButton() {
  const onClick = async () => {
    // Try multiple path variants to tolerate apostrophe / encoding issues.
    // Use API route for consistent Content-Disposition
    const res = await fetch("/api/download-resume", { cache: "no-store" });
    if (!res.ok) {
      alert("Resume file not found on server.");
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Barath_Resume.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl hover:bg-white hover:text-gray-900 transition-colors cursor-pointer"
      aria-label="Download my resume (PDF)"
    >
      <span className="font-semibold group-hover:text-gray-900">Download my Resume</span>
      <ArrowDown className="size-4 group-hover:text-gray-900" />
    </button>
  );
}
