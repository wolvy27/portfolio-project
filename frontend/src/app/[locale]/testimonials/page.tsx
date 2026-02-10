"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { api, TestimonialResponseDTO } from "../../../api/api";
import { useTranslations } from "next-intl";

export default function TestimonialsPage() {
  const t = useTranslations("Testimonials");
  const [testimonials, setTestimonials] = useState<TestimonialResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyRole: "",
    content: ""
  });
  const [submitStatus, setSubmitStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await api.testimonials.getApproved();
        setTestimonials(data);
      } catch (error) {
        console.error("Failed to load testimonials", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("SENDING");

    try {
      await api.testimonials.submit(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.content,
        formData.companyRole
      );
      setSubmitStatus("SUCCESS");
      setFormData({ firstName: "", lastName: "", companyRole: "", content: "", email: "" });
    } catch (error) {
      console.error("Failed to submit testimonial", error);
      setSubmitStatus("ERROR");
    }
  };

  return (
    <>
      <Navbar />
      <main className="py-12 max-w-4xl mx-auto px-6 w-full">
        <h1 className="text-3xl font-bold text-white mb-2">{t("Title")}</h1>
        <p className="text-stone-400 mb-12">{t("Subtitle")}</p>

        {/* Testimonials List */}
        {isLoading ? (
          <div className="text-stone-500 font-mono text-sm animate-pulse mb-16">{t("Loading")}</div>
        ) : (
          <div className="space-y-6 mb-16">
            {testimonials.map(t => (
              <div key={t.testimonialId} className="p-6 bg-[#0f0f0f] border border-stone-800 rounded-lg">
                <p className="text-stone-300 italic mb-4 whitespace-pre-line">"{t.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-stone-800 rounded-full flex items-center justify-center font-bold text-stone-400 text-xs">
                    {t.authorName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{t.authorName}</p>
                    <p className="text-xs text-stone-500">{t.authorRole}</p>
                  </div>
                </div>
              </div>
            ))}
            {testimonials.length === 0 && (
              <p className="text-stone-500 italic">{t("NoTestimonials")}</p>
            )}
          </div>
        )}

        {/* Submission Form */}
        <div className="border-t border-stone-800 pt-12">
          <h2 className="text-xl font-bold text-white mb-6">{t("LeaveTestimonial")}</h2>

          {submitStatus === "SUCCESS" ? (
            <div className="bg-emerald-900/20 border border-emerald-900/50 p-6 rounded text-center">
              <p className="text-emerald-500 font-bold mb-2">{t("SuccessTitle")}</p>
              <p className="text-stone-400 text-sm">{t("SuccessMsg")}</p>
              <button
                onClick={() => setSubmitStatus("IDLE")}
                className="mt-4 text-sm text-stone-500 underline hover:text-white"
              >
                {t("SubmitAnother")}
              </button>
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder={t("PH_FirstName")}
                  className="bg-[#0f0f0f] border border-stone-800 p-3 rounded text-stone-200 text-sm focus:border-stone-500 outline-none"
                  value={formData.firstName}
                  onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                />
                <input
                  type="text"
                  required
                  placeholder={t("PH_LastName")}
                  className="bg-[#0f0f0f] border border-stone-800 p-3 rounded text-stone-200 text-sm focus:border-stone-500 outline-none"
                  value={formData.lastName}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder={t("PH_Email")}
                  className="bg-[#0f0f0f] border border-stone-800 p-3 rounded text-stone-200 text-sm focus:border-stone-500 outline-none"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                  type="text"
                  placeholder={t("PH_Role")}
                  className="bg-[#0f0f0f] border border-stone-800 p-3 rounded text-stone-200 text-sm focus:border-stone-500 outline-none"
                  value={formData.companyRole}
                  onChange={e => setFormData({ ...formData, companyRole: e.target.value })}
                />
              </div>
              <textarea
                required
                placeholder={t("PH_Message")}
                rows={4}
                className="bg-[#0f0f0f] border border-stone-800 p-3 rounded text-stone-200 text-sm focus:border-stone-500 outline-none"
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
              ></textarea>

              {submitStatus === "ERROR" && (
                <p className="text-red-500 text-sm">{t("ErrorMsg")}</p>
              )}

              <button
                type="submit"
                disabled={submitStatus === "SENDING"}
                className="bg-white text-black py-3 rounded font-bold text-sm hover:bg-stone-200 transition disabled:opacity-50"
              >
                {submitStatus === "SENDING" ? t("Submitting") : t("SubmitButton")}
              </button>
            </form>
          )}
        </div>
      </main>
    </>
  );
}