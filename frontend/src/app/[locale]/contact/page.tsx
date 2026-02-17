"use client";

import { useState } from "react";
import Navbar from "../../../components/Navbar";
import { api } from "../../../api/api";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("SENDING");

    try {
      await api.messages.send(formData.name, formData.email, formData.message);
      setStatus("SUCCESS");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Message failed", error);
      setStatus("ERROR");
    }
  };

  return (
    <>
      <Navbar />
      <main className="py-12 max-w-4xl mx-auto px-6 w-full">

        {/* Contact Info */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-6">{t("Title")}</h1>
          <p className="text-stone-400 mb-8 leading-relaxed">
            {t("Description")}
          </p>

          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-center gap-3 text-stone-300">
              <span className="text-stone-600 font-mono">{t("Label_Email")}</span>
              <a href="mailto:logankairns@outlook.com" className="hover:text-white transition">logan@outlook.com</a>
            </div>
            <div className="flex items-center gap-3 text-stone-300">
              <span className="text-stone-600 font-mono">{t("Label_Github")}</span>
              <a href="https://github.com/wolvy27" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">github.com/logankairns</a>
            </div>
            <div className="flex items-center gap-3 text-stone-300">
              <span className="text-stone-600 font-mono">{t("Label_Linkedin")}</span>
              <a href="https://ca.linkedin.com/in/logankairns" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">linkedin.com/in/logankairns</a>
            </div>
          </div>
        </div>

        <br />

        {/* Contact Form */}
        <div className="bg-[#0f0f0f] border border-stone-800 p-6 rounded-lg">
          {status === "SUCCESS" ? (
            <div className="text-center py-12">
              <div className="text-emerald-500 text-5xl mb-4">✓</div>
              <h3 className="text-white text-xl font-bold mb-2">{t("SuccessTitle")}</h3>
              <p className="text-stone-400">{t("SuccessMsg")}</p>
              <button
                onClick={() => setStatus("IDLE")}
                className="mt-6 text-stone-500 hover:text-white underline text-sm"
              >
                {t("SendAnother")}
              </button>
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-xs font-bold text-stone-500 uppercase">{t("Label_Name")}</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t("PH_Name")}
                  className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm focus:border-stone-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-xs font-bold text-stone-500 uppercase">{t("Label_FormEmail")}</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t("PH_Email")}
                  className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm focus:border-stone-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-xs font-bold text-stone-500 uppercase">{t("Label_Message")}</label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t("PH_Message")}
                  className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm focus:border-stone-500 focus:outline-none transition-colors"
                ></textarea>
              </div>

              {status === "ERROR" && (
                <div className="bg-red-900/20 border border-red-900/50 text-red-500 p-3 rounded text-sm text-center">
                  {t("ErrorMsg")}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "SENDING"}
                className="mt-2 bg-white text-black font-bold py-3 rounded text-sm hover:bg-stone-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "SENDING" ? t("Sending") : t("SendButton")}
              </button>

            </form>
          )}
        </div>

      </main>
    </>
  );
}