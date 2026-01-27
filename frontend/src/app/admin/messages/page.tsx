export default function AdminMessages() {
  const messages = [
    { id: 1, sender: "Recruiter A", email: "jobs@tech.com", subject: "Job Opportunity", date: "Oct 24", read: false },
    { id: 2, sender: "Dave", email: "dave@gmail.com", subject: "NixOS Question", date: "Oct 20", read: true },
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      <div className="mb-6 flex justify-between items-end border-b border-stone-800 pb-6">
         <div>
            <h1 className="text-3xl font-bold text-white font-mono">Inbox</h1>
            <p className="text-stone-500 mt-2 text-sm">Direct messages from the contact form.</p>
         </div>
         <span className="text-emerald-500 font-mono text-sm bg-emerald-900/10 border border-emerald-900/50 px-3 py-1 rounded">
             1 Unread
         </span>
      </div>

      {/* EMAIL CLIENT UI */}
      <div className="flex-1 bg-[#0f0f0f] border border-stone-800 rounded-lg overflow-hidden flex flex-col">
        
        {/* Header Row */}
        <div className="bg-stone-900 border-b border-stone-800 p-4 grid grid-cols-12 text-xs font-bold text-stone-500 uppercase tracking-widest font-mono">
            <div className="col-span-3">Sender</div>
            <div className="col-span-6">Subject</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-1 text-right">Action</div>
        </div>

        {/* Message List */}
        <div className="overflow-y-auto flex-1">
            {messages.map((msg) => (
                <div 
                    key={msg.id} 
                    className={`grid grid-cols-12 p-4 border-b border-stone-800 hover:bg-stone-800/50 transition cursor-pointer items-center ${
                        !msg.read ? 'bg-stone-900/30' : ''
                    }`}
                >
                    <div className={`col-span-3 text-sm font-mono truncate pr-4 ${!msg.read ? 'text-white font-bold' : 'text-stone-400'}`}>
                        {msg.sender}
                        <span className="block text-xs text-stone-600 font-normal">{msg.email}</span>
                    </div>
                    
                    <div className={`col-span-6 text-sm truncate ${!msg.read ? 'text-stone-200' : 'text-stone-500'}`}>
                        {msg.subject} 
                        <span className="text-stone-600"> - Hello, I saw your portfolio and...</span>
                    </div>
                    
                    <div className="col-span-2 text-xs text-stone-500 font-mono">
                        {msg.date}
                    </div>

                    <div className="col-span-1 text-right">
                        <button className="text-stone-600 hover:text-red-400 transition" title="Delete">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Footer Status Bar */}
        <div className="bg-[#0a0a0a] border-t border-stone-800 p-2 text-right">
            <p className="text-xs text-stone-600 font-mono">2 messages total • 5KB used</p>
        </div>
      </div>
    </div>
  );
}