"use client";

import { useState, useEffect } from "react";
import { api, TestimonialResponseDTO } from "../../../api/api";

export default function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState<TestimonialResponseDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Simple state to track which testimonial is currently being "Reviewed" (expanded)
    const [reviewingId, setReviewingId] = useState<string | null>(null);

    const fetchTestimonials = async () => {
        try {
            const data = await api.testimonials.getAll();
            setTestimonials(data);
        } catch (error) {
            console.error("Failed to fetch testimonials", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleUpdateStatus = async (id: string, isApproved: boolean) => {
        try {
            await api.testimonials.updateStatus(id, isApproved);
            setTestimonials(prev => prev.map(t =>
                t.testimonialId === id ? { ...t, approved: isApproved } : t
            ));
            setReviewingId(null);
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Failed to update status.");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this testimonial?")) return;
        try {
            await api.testimonials.delete(id);
            setTestimonials(prev => prev.filter(t => t.testimonialId !== id));
        } catch (error) {
            console.error("Failed to delete", error);
        }
    };

    const pendingCount = testimonials.filter(t => !t.approved).length;

    return (
        <div className="max-w-4xl mx-auto w-full">
            <div className="flex justify-between items-end mb-8 border-b border-stone-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white font-mono">Testimonials</h1>
                    <p className="text-stone-500 mt-2 text-sm">Review and approve incoming feedback.</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-amber-900/30 border border-amber-900/50 text-amber-500 text-xs font-bold rounded">{pendingCount} Pending</span>
                </div>
            </div>

            {isLoading ? (
                <div className="text-stone-500 font-mono text-sm animate-pulse">Loading testimonials...</div>
            ) : (
                <div className="space-y-4">
                    {testimonials.map((t) => (
                        <div
                            key={t.testimonialId}
                            className={`bg-[#0f0f0f] border rounded-lg transition-all ${reviewingId === t.testimonialId ? 'border-stone-600 shadow-lg' : 'border-stone-800'
                                }`}
                        >
                            {/* CARD HEADER (Always Visible) */}
                            <div className="p-6 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-black ${!t.approved ? 'bg-amber-500' : 'bg-emerald-500'}`}>
                                        {t.authorName.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm">{t.authorName}</h3>
                                        <p className="text-stone-500 text-xs">{t.authorRole}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <span className="text-stone-600 font-mono text-xs">
                                        {new Date(t.receivedAt).toLocaleDateString()}
                                    </span>

                                    {!t.approved ? (
                                        reviewingId === t.testimonialId ? (
                                            <button
                                                onClick={() => setReviewingId(null)}
                                                className="text-stone-400 hover:text-white text-xs font-bold uppercase tracking-wider"
                                            >
                                                Close
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => setReviewingId(t.testimonialId)}
                                                className="bg-stone-200 text-black px-4 py-2 rounded text-xs font-bold hover:bg-white transition uppercase tracking-wider"
                                            >
                                                Review
                                            </button>
                                        )
                                    ) : (
                                        <div className="flex items-center gap-4">
                                            <span className="px-3 py-1 bg-emerald-900/20 text-emerald-500 text-xs font-bold rounded uppercase tracking-wider border border-emerald-900/50">
                                                Approved
                                            </span>
                                            <button
                                                onClick={() => handleDelete(t.testimonialId)}
                                                className="text-stone-600 hover:text-red-400 transition"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* EXPANDED REVIEW AREA (Only visible if Review is clicked) */}
                            {reviewingId === t.testimonialId && (
                                <div className="px-6 pb-6 pt-0 border-t border-stone-800/50 mt-2">
                                    <div className="py-6">
                                        <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">Full Message</h4>
                                        <p className="text-stone-300 text-sm leading-relaxed bg-[#0a0a0a] p-4 rounded border border-stone-800 whitespace-pre-line">
                                            "{t.content}"
                                        </p>
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={() => handleDelete(t.testimonialId)}
                                            className="border border-red-900/50 text-red-400 px-4 py-2 rounded text-sm font-bold hover:bg-red-900/20 transition font-mono"
                                        >
                                            Reject & Delete
                                        </button>
                                        <button
                                            onClick={() => handleUpdateStatus(t.testimonialId, true)}
                                            className="bg-emerald-600 text-white px-6 py-2 rounded text-sm font-bold hover:bg-emerald-500 transition font-mono shadow-lg shadow-emerald-900/20"
                                        >
                                            Approve & Publish
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {testimonials.length === 0 && (
                        <p className="text-stone-500 text-center py-8">No testimonials found.</p>
                    )}
                </div>
            )}
        </div>
    );
}