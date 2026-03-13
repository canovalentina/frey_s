"use client";

import { useState } from "react";
import { Send } from "lucide-react";

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
      <div className="border border-[#b2a2cb] p-8">
        <h2 className="font-display text-2xl font-bold text-[#0a0a0a] mb-3">
          Message sent
        </h2>
        <p className="font-serif text-[#6b6b6b]">
          Thank you for reaching out. I typically respond within 2–3 business
          days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label className="font-display text-xs uppercase tracking-widest text-[#6b6b6b] block mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full bg-transparent border border-[#e2e0dd] px-4 py-3 font-display text-sm text-[#0a0a0a] placeholder-[#6b6b6b] focus:border-[#b2a2cb] focus:outline-none transition-colors"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div>
        <label className="font-display text-xs uppercase tracking-widest text-[#6b6b6b] block mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          className="w-full bg-transparent border border-[#e2e0dd] px-4 py-3 font-display text-sm text-[#0a0a0a] placeholder-[#6b6b6b] focus:border-[#b2a2cb] focus:outline-none transition-colors"
          placeholder="your@email.com"
        />
      </div>

      {/* Project Type */}
      <div>
        <label className="font-display text-xs uppercase tracking-widest text-[#6b6b6b] block mb-2">
          Project Type
        </label>
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setProjectType(type)}
              className={`font-display text-xs uppercase tracking-widest px-3 py-2 border transition-colors ${
                projectType === type
                  ? "border-[#b2a2cb] bg-[#b2a2cb] text-[#0a0a0a]"
                  : "border-[#e2e0dd] text-[#6b6b6b] hover:border-[#b2a2cb] hover:text-[#b2a2cb]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <input type="hidden" name="projectType" value={projectType} />
      </div>

      {/* Message */}
      <div>
        <label className="font-display text-xs uppercase tracking-widest text-[#6b6b6b] block mb-2">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full bg-transparent border border-[#e2e0dd] px-4 py-3 font-display text-sm text-[#0a0a0a] placeholder-[#6b6b6b] focus:border-[#b2a2cb] focus:outline-none transition-colors resize-none"
          placeholder="Tell me about your project..."
        />
      </div>

      {error && (
        <p className="font-display text-xs text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="font-display text-sm font-semibold uppercase tracking-widest px-6 py-3 bg-[#0a0a0a] text-[#f7f5f2] hover:bg-[#b2a2cb] hover:text-[#0a0a0a] transition-colors inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Sending…" : <>Send message <Send size={14} /></>}
      </button>
    </form>
  );
}
