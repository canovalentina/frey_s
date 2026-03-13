"use client";

import { useState } from "react";

const projectTypes = [
  "Film / TV Composition",
  "Licensing Question",
  "Live Performance",
  "Collaboration",
  "Other",
];

export default function ContactForm() {
  const [projectType, setProjectType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      projectType,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please email directly at federicoreyes94@gmail.com");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="border-t-2 border-[#FF2200] pt-8">
        <h2 className="text-xl font-semibold text-[#0A0A0A] mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
          Message sent
        </h2>
        <p className="text-sm text-[#999999]" style={{ fontFamily: "Inter, sans-serif" }}>
          Thank you for reaching out. I typically respond within 2–3 business
          days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* Name */}
      <div>
        <label className="text-[10px] text-[#999999] block mb-2" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
          name
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full bg-transparent border-b border-[#E5E5E5] px-0 py-2 text-sm text-[#0A0A0A] placeholder-[#999999] focus:border-[#0A0A0A] focus:outline-none"
          style={{ fontFamily: "Inter, sans-serif" }}
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div>
        <label className="text-[10px] text-[#999999] block mb-2" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
          email
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full bg-transparent border-b border-[#E5E5E5] px-0 py-2 text-sm text-[#0A0A0A] placeholder-[#999999] focus:border-[#0A0A0A] focus:outline-none"
          style={{ fontFamily: "Inter, sans-serif" }}
          placeholder="your@email.com"
        />
      </div>

      {/* Project Type */}
      <div>
        <label className="text-[10px] text-[#999999] block mb-3" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
          project type
        </label>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {projectTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setProjectType(type)}
              className={`text-[10px] ${
                projectType === type
                  ? "text-[#FF2200]"
                  : "text-[#999999] hover:text-[#0A0A0A]"
              }`}
              style={{ fontFamily: "IBM Plex Mono, monospace" }}
            >
              {projectType === type ? `[${type}]` : type}
            </button>
          ))}
        </div>
        <input type="hidden" name="projectType" value={projectType} />
      </div>

      {/* Message */}
      <div>
        <label className="text-[10px] text-[#999999] block mb-2" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
          message
        </label>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full bg-transparent border-b border-[#E5E5E5] px-0 py-2 text-sm text-[#0A0A0A] placeholder-[#999999] focus:border-[#0A0A0A] focus:outline-none resize-none"
          style={{ fontFamily: "Inter, sans-serif" }}
          placeholder="Tell me about your project..."
        />
      </div>

      {error && (
        <p className="text-[10px] text-[#FF2200]" style={{ fontFamily: "IBM Plex Mono, monospace" }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="text-sm font-medium py-3 px-6 bg-[#0A0A0A] text-white hover:bg-[#FF2200] disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {loading ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
