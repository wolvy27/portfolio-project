"use client";

import { useState } from "react";

export default function AdminTestimonials() {
  // Simple state to track which testimonial is currently being "Reviewed" (expanded)
  const [reviewingId, setReviewingId] = useState<number | null>(null);

  const testimonials = [
    { 
        id: 1, 
        author: "Jane Doe", 
        role: "Tech Lead @ Company",
        content: "Logan tackled the hardest database migration we had. His knowledge of SQL is impressive for a student. He never complained about the legacy code.", 
        date: "2026-03-15",
        status: "PENDING" 
    },
    { 
        id: 2, 
        author: "John Smith", 
        role: "Professor",
        content: "Excellent understanding of distributed systems.", 
        date: "2026-02-10",
        status: "APPROVED" 
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-end mb-8 border-b border-stone-800 pb-6">
        <div>
            <h1 className="text-3xl font-bold text-white font-mono">Testimonials</h1>
            <p className="text-stone-500 mt-2 text-sm">Review and approve incoming feedback.</p>
        </div>
        <div className="flex gap-2">
            <span className="px-3 py-1 bg-amber-900/30 border border-amber-900/50 text-amber-500 text-xs font-bold rounded">1 Pending</span>
        </div>
      </div>

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div 
            key={t.id} 
            className={`bg-[#0f0f0f] border rounded-lg transition-all ${
                reviewingId === t.id ? 'border-stone-600 shadow-lg' : 'border-stone-800'
            }`}
          >
            {/* CARD HEADER (Always Visible) */}
            <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-black ${t.status === 'PENDING' ? 'bg-amber-500' : 'bg-emerald-500'}`}>
                        {t.author.charAt(0)}
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm">{t.author}</h3>
                        <p className="text-stone-500 text-xs">{t.role}</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <span className="text-stone-600 font-mono text-xs">{t.date}</span>
                    
                    {t.status === 'PENDING' ? (
                        reviewingId === t.id ? (
                            <button 
                                onClick={() => setReviewingId(null)}
                                className="text-stone-400 hover:text-white text-xs font-bold uppercase tracking-wider"
                            >
                                Close
                            </button>
                        ) : (
                            <button 
                                onClick={() => setReviewingId(t.id)}
                                className="bg-stone-200 text-black px-4 py-2 rounded text-xs font-bold hover:bg-white transition uppercase tracking-wider"
                            >
                                Review
                            </button>
                        )
                    ) : (
                        <span className="px-3 py-1 bg-emerald-900/20 text-emerald-500 text-xs font-bold rounded uppercase tracking-wider border border-emerald-900/50">
                            Approved
                        </span>
                    )}
                </div>
            </div>

            {/* EXPANDED REVIEW AREA (Only visible if Review is clicked) */}
            {reviewingId === t.id && (
                <div className="px-6 pb-6 pt-0 border-t border-stone-800/50 mt-2">
                    <div className="py-6">
                        <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">Full Message</h4>
                        <p className="text-stone-300 text-sm leading-relaxed bg-[#0a0a0a] p-4 rounded border border-stone-800">
                            "{t.content}"
                        </p>
                    </div>
                    
                    <div className="flex justify-end gap-3">
                        <button className="border border-red-900/50 text-red-400 px-4 py-2 rounded text-sm font-bold hover:bg-red-900/20 transition font-mono">
                            Reject
                        </button>
                        <button className="bg-emerald-600 text-white px-6 py-2 rounded text-sm font-bold hover:bg-emerald-500 transition font-mono shadow-lg shadow-emerald-900/20">
                            Approve & Publish
                        </button>
                    </div>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}