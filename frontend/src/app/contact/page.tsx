import Navbar from "../../components/Navbar";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="py-12 max-w-4xl mx-auto px-6 w-full">
        
        {/* Left Side: Info */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-6">Get in touch</h1>
          <p className="text-stone-400 mb-8 leading-relaxed">
            I am actively seeking new opportunities in software development. If you have any inquiries regarding my experience, technical skills, or potential collaborations, please feel free to reach out using the form or the contact details provided.
          </p>

          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-center gap-3 text-stone-300">
              <span className="text-stone-600 font-mono">EMAIL:</span>
              <a href="mailto:logankairns@outlook.com" className="hover:text-white transition">logan@example.com</a>
            </div>
            <div className="flex items-center gap-3 text-stone-300">
              <span className="text-stone-600 font-mono">GITHUB:</span>
              <a href="https://github.com/wolvy27" target="_blank" className="hover:text-white transition">github.com/logankairns</a>
            </div>
             <div className="flex items-center gap-3 text-stone-300">
              <span className="text-stone-600 font-mono">LINKEDIN:</span>
              <a href="https://ca.linkedin.com/in/logankairns" target="_blank" className="hover:text-white transition">linkedin.com/in/logankairns</a>
            </div>
          </div>
        </div>

        <br/> {/* Temporary fix for spacing, will change as soon as possible */}

        {/* Right Side: The Form */}
        <div className="bg-[#0f0f0f] border border-stone-800 p-6 rounded-lg">
          <form className="flex flex-col gap-4">
            
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-xs font-bold text-stone-500 uppercase">Name</label>
              <input 
                id="name" 
                type="text" 
                placeholder="John Doe"
                className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm focus:border-stone-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs font-bold text-stone-500 uppercase">Email</label>
              <input 
                id="email" 
                type="email" 
                placeholder="john@example.com"
                className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm focus:border-stone-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="text-xs font-bold text-stone-500 uppercase">Message</label>
              <textarea 
                id="message" 
                rows={5}
                placeholder="Your message..."
                className="w-full bg-[#0a0a0a] border border-stone-800 rounded p-3 text-stone-300 text-sm focus:border-stone-500 focus:outline-none transition-colors"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="mt-2 bg-white text-black font-bold py-3 rounded text-sm hover:bg-stone-200 transition-colors"
            >
              Send Message
            </button>

          </form>
        </div>

      </main>
    </>
  );
}