import Navbar from "../../components/Navbar";

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />
      <main className="py-12 max-w-4xl mx-auto px-6 w-full">
        <h1 className="text-3xl font-bold text-white mb-2">Testimonials</h1>
        <p className="text-stone-400 mb-12">What people say about working with me.</p>

        {/* Display Section */}
        <div className="space-y-6 mb-16">
          <div className="p-6 bg-[#0f0f0f] border border-stone-800 rounded-lg">
            <p className="text-stone-300 italic mb-4">"[This is a testimonial!]"</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-stone-800 rounded-full"></div>
              <div>
                <p className="text-sm font-bold text-white">Jane Doe</p>
                <p className="text-xs text-stone-500">Tech Lead @ Tech Company</p>
              </div>
            </div>
          </div>
        </div>

        {/* Submission Form Section */}
        <div className="border-t border-stone-800 pt-12">
            <h2 className="text-xl font-bold text-white mb-6">Leave a Testimonial</h2>
            <form className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Your Name" className="bg-[#0f0f0f] border border-stone-800 p-3 rounded text-stone-200 text-sm focus:border-stone-500 outline-none" />
                    <input type="text" placeholder="Company (Optional)" className="bg-[#0f0f0f] border border-stone-800 p-3 rounded text-stone-200 text-sm focus:border-stone-500 outline-none" />
                </div>
                <textarea placeholder="Your message..." rows={4} className="bg-[#0f0f0f] border border-stone-800 p-3 rounded text-stone-200 text-sm focus:border-stone-500 outline-none"></textarea>
                <button className="bg-white text-black py-3 rounded font-bold text-sm hover:bg-stone-200 transition">Submit for Approval</button>
            </form>
        </div>
      </main>
    </>
  );
}