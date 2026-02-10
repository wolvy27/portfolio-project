"use client";

import { useEffect, useState } from "react";
import { api, MessageResponseDTO } from "../../../api/api";

export default function AdminMessages() {
    const [messages, setMessages] = useState<MessageResponseDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const data = await api.messages.getAll();
            // Sort by receivedAt descending (newest first)
            const sorted = data.sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime());
            setMessages(sorted);
        } catch (error) {
            console.error("Failed to fetch messages", error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id: string) => {
        try {
            await api.messages.markAsRead(id);
            // Optimistic update
            setMessages(prev => prev.map(m => m.messageId === id ? { ...m, read: true } : m));
        } catch (error) {
            console.error("Failed to mark as read", error);
            alert("Failed to update status.");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this message?")) return;
        try {
            await api.messages.delete(id);
            setMessages(prev => prev.filter(m => m.messageId !== id));
        } catch (error) {
            console.error("Failed to delete message", error);
            alert("Failed to delete.");
        }
    };

    if (loading) return <div className="text-stone-500 font-mono animate-pulse">Loading messages...</div>;

    return (
        <div className="w-full max-w-[1600px]">
            <div className="mb-10 border-b border-stone-800 pb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white font-mono">Messages</h1>
                    <p className="text-stone-500 mt-2 text-sm">Inbox from Contact Form.</p>
                </div>
                <div className="bg-stone-900 px-4 py-2 rounded text-xs font-mono text-stone-400">
                    {messages.filter(m => !m.read).length} Unread
                </div>
            </div>

            <div className="space-y-4">
                {messages.length === 0 ? (
                    <div className="text-stone-500 italic">No messages found.</div>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.messageId}
                            className={`bg-[#0f0f0f] border rounded-lg p-6 transition-all ${msg.read ? "border-stone-800 opacity-75" : "border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                                }`}
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-bold text-white">{msg.senderName}</h3>
                                        {!msg.read && (
                                            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider">New</span>
                                        )}
                                    </div>
                                    <a href={`mailto:${msg.senderEmail}`} className="text-stone-400 text-sm hover:text-white transition underline decoration-stone-700">
                                        {msg.senderEmail}
                                    </a>
                                </div>
                                <div className="text-xs text-stone-500 font-mono whitespace-nowrap">
                                    {new Date(msg.receivedAt).toLocaleDateString()} at {new Date(msg.receivedAt).toLocaleTimeString()}
                                </div>
                            </div>

                            <div className="bg-[#0a0a0a] p-4 rounded border border-stone-800 text-stone-300 text-sm whitespace-pre-wrap mb-4">
                                {msg.messageBody}
                            </div>

                            <div className="flex justify-end gap-3 border-t border-stone-800 pt-4">
                                {!msg.read && (
                                    <button
                                        onClick={() => handleMarkAsRead(msg.messageId)}
                                        className="text-emerald-500 hover:text-emerald-400 text-xs font-bold uppercase tracking-wider"
                                    >
                                        Mark as Read
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(msg.messageId)}
                                    className="text-stone-500 hover:text-red-500 text-xs font-bold uppercase tracking-wider ml-4"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}