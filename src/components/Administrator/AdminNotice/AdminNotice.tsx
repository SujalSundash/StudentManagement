import React, { useState } from 'react';
import { 
  Megaphone, 
  Search, 
  SlidersHorizontal, 
  Plus, 
  Trash2, 
  Calendar, 
  Users, 
  X, 
  CheckCircle,
  Clock,
  Pin} from 'lucide-react';

// --- Interfaces ---
interface NoticeRecord {
  id: string;
  title: string;
  content: string;
  category: 'Academic' | 'Administrative' | 'Event' | 'Urgent';
  targetAudience: 'All' | 'Students' | 'Teachers';
  datePublished: string;
  expiryDate: string;
  isPinned: boolean;
  status: 'Active' | 'Expired';
}

// --- Seed Mock Data Matrix ---
const initialNoticesDataset: NoticeRecord[] = [
  {
    id: "NTC-2026-004",
    title: "Mid-term Examinations Schedule and Guidelines",
    content: "All departments are hereby notified that the upcoming mid-term examinations for the Spring 2026 session will officially commence on June 15, 2026. Detailed schedules, structural seating distributions, and proctor assignments are accessible in the Exams portal.",
    category: "Academic",
    targetAudience: "All",
    datePublished: "2026-06-02",
    expiryDate: "2026-06-20",
    isPinned: true,
    status: "Active"
  },
  {
    id: "NTC-2026-003",
    title: "Settle Outstanding Semester Dues via eSewa",
    content: "The Billing and Receivables engine is now live with real-time automated eSewa verification. All students holding partial or unpaid balance tallies must settle outstanding tuition accounts before the pre-examination clearance lock drops.",
    category: "Urgent",
    targetAudience: "Students",
    datePublished: "2026-06-05",
    expiryDate: "2026-06-14",
    isPinned: true,
    status: "Active"
  },
  {
    id: "NTC-2026-001",
    title: "Faculty Training Workshop on AI Integration",
    content: "A professional development workshop titled 'AI & ML Curriculum Mapping Frameworks' will be hosted inside the main amphitheater for all department heads and active teachers.",
    category: "Administrative",
    targetAudience: "Teachers",
    datePublished: "2026-05-10",
    expiryDate: "2026-05-12",
    isPinned: false,
    status: "Expired"
  }
];

export default function AdminNotice() {
  const [notices, setNotices] = useState<NoticeRecord[]>(initialNoticesDataset);
  const [searchQuery, setSearchQuery] = useState('');
  const [audienceFilter, setAudienceFilter] = useState('All');
  
  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingNotice, setViewingNotice] = useState<NoticeRecord | null>(null);

  // Form States
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<'Academic' | 'Administrative' | 'Event' | 'Urgent'>('Academic');
  const [newAudience, setNewAudience] = useState<'All' | 'Students' | 'Teachers'>('All');
  const [newExpiry, setNewExpiry] = useState('');
  const [newIsPinned, setNewIsPinned] = useState(false);

  // --- Handlers ---
  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const newNotice: NoticeRecord = {
      id: `NTC-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle,
      content: newContent,
      category: newCategory,
      targetAudience: newAudience,
      datePublished: new Date().toISOString().split('T')[0],
      expiryDate: newExpiry || "2026-12-31",
      isPinned: newIsPinned,
      status: "Active"
    };

    setNotices([newNotice, ...notices]);
    setIsAddModalOpen(false);

    // Reset Form Fields
    setNewTitle('');
    setNewContent('');
    setNewCategory('Academic');
    setNewAudience('All');
    setNewExpiry('');
    setNewIsPinned(false);
  };

  const handleDeleteNotice = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering full view modal
    if (window.confirm("Are you sure you want to delete this notice forever?")) {
      setNotices(notices.filter(notice => notice.id !== id));
    }
  };

  const handleTogglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotices(notices.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
  };

  // --- Filter and Sort Architecture ---
  const filteredNotices = notices
    .filter(notice => {
      const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            notice.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAudience = audienceFilter === 'All' || notice.targetAudience === audienceFilter;
      return matchesSearch && matchesAudience;
    })
    // Sort pinned elements straight to the top of the feed array
    .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  return (
    <div className="w-full bg-slate-50 min-h-screen p-6 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        {/* ========================================================= */}
        {/* ACTION HEADER                                             */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-md">
              <Megaphone size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Notices & Communications</h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Broadcast system updates, target student/teacher channels, and pin critical policy revisions</p>
            </div>
          </div>

          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all self-start sm:self-center"
          >
            <Plus size={15} /> Compose Notice
          </button>
        </div>

        {/* ========================================================= */}
        {/* RESPONSIVE METRIC COUNTER BANNER                         */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-row items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0"><Megaphone size={18} /></div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block truncate">Total Dispatched</span>
              <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">{notices.length} Bulletins</h4>
            </div>
          </div>
          <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-row items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0"><CheckCircle size={18} /></div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block truncate">Active Memos</span>
              <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">{notices.filter(n => n.status === 'Active').length} Live</h4>
            </div>
          </div>
          <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-row items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0"><Pin size={18} /></div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block truncate">Pinned Highlights</span>
              <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">{notices.filter(n => n.isPinned).length} Anchored</h4>
            </div>
          </div>
          <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-row items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl shrink-0"><Users size={18} /></div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block truncate">Target Channels</span>
              <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">3 Streams</h4>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CONTROLS & FILTER SYSTEM                                  */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-8 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Query notices by headers, content expressions, or core systemic keywords..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 focus:border-indigo-500 rounded-xl text-xs font-medium outline-none transition-all shadow-sm"
            />
          </div>

          <div className="md:col-span-4 relative">
            <select
              value={audienceFilter}
              onChange={(e) => setAudienceFilter(e.target.value)}
              className="w-full pl-4 pr-8 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-xs outline-none cursor-pointer shadow-sm appearance-none"
            >
              <option value="All">All Audiences</option>
              <option value="Students">Target: Students</option>
              <option value="Teachers">Target: Teachers</option>
            </select>
            <SlidersHorizontal className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
          </div>
        </div>

        {/* ========================================================= */}
        {/* CORE NOTICES STREAM FEED                                  */}
        {/* ========================================================= */}
        <div className="flex flex-col gap-4">
          {filteredNotices.map((notice) => (
            <div 
              key={notice.id}
              onClick={() => setViewingNotice(notice)}
              className={`bg-white rounded-2xl border p-5 shadow-2xs hover:shadow-sm cursor-pointer transition-all flex flex-col md:flex-row md:items-start justify-between gap-4 group relative ${
                notice.isPinned ? 'border-indigo-200 bg-indigo-50/10' : 'border-slate-100'
              }`}
            >
              <div className="flex items-start gap-4 min-w-0">
                <div className={`p-3 rounded-xl shrink-0 ${
                  notice.category === 'Urgent' ? 'bg-rose-50 text-rose-600' :
                  notice.category === 'Academic' ? 'bg-blue-50 text-blue-600' :
                  notice.category === 'Event' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'
                }`}>
                  <Megaphone size={18} />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 tracking-wide">
                      {notice.category}
                    </span>
                    <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 tracking-wide">
                      To: {notice.targetAudience}
                    </span>
                    {notice.isPinned && (
                      <span className="flex items-center gap-1 text-[9px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
                        <Pin size={10} /> Pinned
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-800 text-sm mt-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
                    {notice.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-2 leading-relaxed">
                    {notice.content}
                  </p>

                  <div className="flex items-center gap-4 text-[10px] text-slate-400 font-semibold mt-3">
                    <span className="flex items-center gap-1"><Calendar size={12} /> Published: {notice.datePublished}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> Expiry: {notice.expiryDate}</span>
                  </div>
                </div>
              </div>

              {/* Administrative Quick Action Blocks */}
              <div className="flex items-center gap-1 self-end md:self-start shrink-0">
                <button 
                  onClick={(e) => handleTogglePin(notice.id, e)}
                  className={`p-1.5 rounded-lg border transition-all ${notice.isPinned ? 'text-amber-500 bg-amber-50 border-amber-200' : 'text-slate-300 hover:text-slate-500 border-slate-100'}`}
                  title={notice.isPinned ? "Unpin notice" : "Pin notice to top"}
                >
                  <Pin size={13} />
                </button>
                <button 
                  onClick={(e) => handleDeleteNotice(notice.id, e)}
                  className="p-1.5 border border-slate-100 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                  title="Expunge Bulletin"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}

          {filteredNotices.length === 0 && (
            <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl text-slate-400 font-medium text-xs">
              No bulletin updates or custom announcements cached matching the specified filters.
            </div>
          )}
        </div>

      </div>

      {/* ========================================================= */}
      {/* MODAL: COMPOSE ANNOUNCEMENT FRAME                         */}
      {/* ========================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl max-w-lg w-full overflow-hidden animate-fadeIn">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Megaphone size={16} className="text-indigo-600" /> Broadcast System Notice
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><X size={18} /></button>
            </div>
            
            <form onSubmit={handlePublishNotice} className="p-5 flex flex-col gap-4 text-xs">
              <div>
                <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">Notice Header Title</label>
                <input required type="text" placeholder="e.g., Spring 2026 Registration Guidelines" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 focus:border-indigo-500 rounded-xl font-medium outline-none transition-all" />
              </div>

              <div>
                <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">Notice Description / Content</label>
                <textarea required rows={4} placeholder="Type the core messaging matrix of this institutional broadcast here..." value={newContent} onChange={(e) => setNewContent(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 focus:border-indigo-500 rounded-xl font-medium outline-none transition-all resize-none leading-relaxed" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">Category Classification</label>
                  <select value={newCategory} onChange={(e) => setNewCategory(e.target.value as any)} className="w-full p-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl outline-none cursor-pointer">
                    <option value="Academic">Academic</option>
                    <option value="Administrative">Administrative</option>
                    <option value="Event">Event</option>
                    <option value="Urgent">Urgent Alert</option>
                  </select>
                </div>
                <div>
                  <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">Target Audience Pipeline</label>
                  <select value={newAudience} onChange={(e) => setNewAudience(e.target.value as any)} className="w-full p-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl outline-none cursor-pointer">
                    <option value="All">All Members (Global)</option>
                    <option value="Students">Students Only</option>
                    <option value="Teachers">Teachers Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">Auto-Expiry Date</label>
                  <input required type="date" value={newExpiry} onChange={(e) => setNewExpiry(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 focus:border-indigo-500 rounded-xl font-medium outline-none text-slate-500" />
                </div>
                <div className="flex items-center gap-2 mt-5 pl-1">
                  <input type="checkbox" id="pin-checkbox" checked={newIsPinned} onChange={(e) => setNewIsPinned(e.target.checked)} className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer" />
                  <label htmlFor="pin-checkbox" className="font-bold text-slate-600 cursor-pointer select-none">Pin to stream top</label>
                </div>
              </div>

              <button type="submit" className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-md transition-all mt-2">Publish Announcement</button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: FULL BULLETIN DETAILS INSPECTION                   */}
      {/* ========================================================= */}
      {viewingNotice && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl max-w-xl w-full overflow-hidden animate-fadeIn">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 tracking-wide">{viewingNotice.category}</span>
                <span className="text-[10px] text-slate-400 font-bold">Ref: {viewingNotice.id}</span>
              </div>
              <button onClick={() => setViewingNotice(null)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <h2 className="text-base font-bold text-slate-800 leading-snug">{viewingNotice.title}</h2>
              <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50/50 border border-slate-100 p-4 rounded-xl whitespace-pre-line">
                {viewingNotice.content}
              </p>
              <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-50 text-[11px] text-slate-400 font-semibold">
                <div className="flex gap-4">
                  <span>Published: <strong>{viewingNotice.datePublished}</strong></span>
                  <span>Expires: <strong>{viewingNotice.expiryDate}</strong></span>
                </div>
                <span className="text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md font-bold">Audience: {viewingNotice.targetAudience}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}