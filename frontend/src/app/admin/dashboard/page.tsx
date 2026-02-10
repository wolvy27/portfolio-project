"use client";

import { useEffect, useState } from "react";
import { api } from "../../../api/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    newMessages: 0,
    pendingTestimonials: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [messages, testimonials] = await Promise.all([
          api.messages.getAll(),
          api.testimonials.getAll()
        ]);

        const unreadMessages = messages.filter(m => !m.read).length;
        const pendingTestimonials = testimonials.filter(t => !t.approved).length;

        setStats({
          newMessages: unreadMessages,
          pendingTestimonials
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-stone-500 font-mono animate-pulse">Loading dashboard...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#0f0f0f] border border-stone-800 p-6 rounded-lg">
          <h3 className="text-xs font-bold text-stone-500 uppercase">New Messages</h3>
          <p className="text-3xl font-bold text-emerald-400 mt-2">{stats.newMessages}</p>
        </div>
        <div className="bg-[#0f0f0f] border border-stone-800 p-6 rounded-lg">
          <h3 className="text-xs font-bold text-stone-500 uppercase">Pending Testimonials</h3>
          <p className="text-3xl font-bold text-amber-400 mt-2">{stats.pendingTestimonials}</p>
        </div>
      </div>

      {/* Quick Actions / Recent Activity Placeholder */}
      <div className="bg-[#0f0f0f] border border-stone-800 rounded-lg p-6">
        <h2 className="text-lg font-bold text-white mb-4">System Status</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-sm border-b border-stone-800 pb-2">
            <span className="text-stone-400">Database Connection</span>
            <span className="text-emerald-500 font-mono">ONLINE</span>
          </div>
          <div className="flex items-center justify-between text-sm border-b border-stone-800 pb-2">
            <span className="text-stone-400">MinIO Storage (Pi)</span>
            <span className="text-emerald-500 font-mono">ONLINE</span>
          </div>
          <div className="flex items-center justify-between text-sm border-b border-stone-800 pb-2">
            <span className="text-stone-400">Backends</span>
            <span className="text-emerald-500 font-mono">CONNECTED</span>
          </div>
        </div>
      </div>
    </div>
  );
}