import React, { useState } from 'react';
import { 
  Settings, 
  Building2, 
  ShieldCheck, 
  Database, 
  Save, 
  Lock, 
  AlertTriangle,
  Server,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<'institution' | 'security' | 'system'>('institution');
  const [isSaving, setIsSaving] = useState(false);

  // --- State Fields: Institution ---
  const [instName, setInstName] = useState('EduSmart Advanced Institute');
  const [instEmail, setInstEmail] = useState('administration@edusmart.edu.np');
  const [academicYear, setAcademicYear] = useState('2026/2027');
  
  // --- State Fields: Security & Portals ---
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowStudentRegistration, setAllowStudentRegistration] = useState(true);
  const [esewaSandboxMode, setEsewaSandboxMode] = useState(true);

  // --- Handler: Save Configurations ---
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate background secure ledger save sequence
    setTimeout(() => {
      setIsSaving(false);
      alert("System core preferences updated successfully inside database schema.");
    }, 1200);
  };

  // --- Handler: Trigger Database Backup ---
  const handleBackupDatabase = () => {
    alert("Database structural backup snapshot compiled successfully. Encrypted file pushed to AWS S3 storage array.");
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen p-6 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        {/* ========================================================= */}
        {/* HEADER SECTION                                            */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-900 text-white rounded-xl shadow-md">
              <Settings size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">System Preferences Hub</h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Control global application states, manage eSewa endpoints, and review database snapshots</p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* NAVIGATION SIDEBAR TAB MATRIX                            */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          
          {/* Quick-select Navigation Deck */}
          <div className="flex flex-col gap-1.5 bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs">
            <button
              onClick={() => setActiveTab('institution')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2.5 transition-all ${
                activeTab === 'institution' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Building2 size={15} /> Institutional Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2.5 transition-all ${
                activeTab === 'security' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck size={15} /> Access & Gateway Control
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2.5 transition-all ${
                activeTab === 'system' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Database size={15} /> Core Ledger Devops
            </button>
          </div>

          {/* ========================================================= */}
          {/* CORE FORMS DISPLAY GRID                                   */}
          {/* ========================================================= */}
          <div className="md:col-span-3 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <form onSubmit={handleSaveSettings} className="flex flex-col gap-6 text-xs">
              
              {/* TAB 1: INSTITUTION PROFILE DATA */}
              {activeTab === 'institution' && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Institutional Identity Mapping</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Configure outward-facing text metrics across systemic billing templates and notices.</p>
                  </div>
                  <div className="h-px bg-slate-100" />
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="uppercase font-bold text-slate-400 tracking-wider">Institution Legal Header</label>
                    <input type="text" value={instName} onChange={(e) => setInstName(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 focus:border-slate-900 rounded-xl font-medium outline-none transition-all" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="uppercase font-bold text-slate-400 tracking-wider">Administrative Inbound Email</label>
                      <input type="email" value={instEmail} onChange={(e) => setInstEmail(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 focus:border-slate-900 rounded-xl font-medium outline-none transition-all" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="uppercase font-bold text-slate-400 tracking-wider">Active Academic Operational Cycle</label>
                      <select value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 font-bold rounded-xl text-slate-600 outline-none cursor-pointer">
                        <option value="2025/2026">Session 2025/2026</option>
                        <option value="2026/2027">Session 2026/2027</option>
                        <option value="2027/2028">Session 2027/2028</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ACCESS & GATEWAY SECURITY */}
              {activeTab === 'security' && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Gateways & Channel Locks</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Control live registration gates and isolate payment authorization environments.</p>
                  </div>
                  <div className="h-px bg-slate-100" />

                  {/* Toggle Option 1: Maintenance Mode */}
                  <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <div>
                      <h4 className="font-bold text-slate-700 flex items-center gap-1">Global System Maintenance Break</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Locks out standard student/teacher accounts for deployment cycles.</p>
                    </div>
                    <button type="button" onClick={() => setMaintenanceMode(!maintenanceMode)} className="text-slate-700 hover:opacity-80 transition-all">
                      {maintenanceMode ? <ToggleRight size={28} className="text-slate-900" /> : <ToggleLeft size={28} className="text-slate-300" />}
                    </button>
                  </div>

                  {/* Toggle Option 2: Registration Flags */}
                  <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <div>
                      <h4 className="font-bold text-slate-700">Open Public Registrations Channel</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Permits prospective student nodes to initialize active accounts autonomously.</p>
                    </div>
                    <button type="button" onClick={() => setAllowStudentRegistration(!allowStudentRegistration)} className="text-slate-700 hover:opacity-80 transition-all">
                      {allowStudentRegistration ? <ToggleRight size={28} className="text-slate-900" /> : <ToggleLeft size={28} className="text-slate-300" />}
                    </button>
                  </div>

                  {/* Toggle Option 3: eSewa Sandbox Environment */}
                  <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <div>
                      <h4 className="font-bold text-slate-700 flex items-center gap-1.5"><Lock size={12} className="text-amber-600" /> eSewa Transaction Endpoint Mapping</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Switches form submissions between staging test gateways and production servers.</p>
                    </div>
                    <button type="button" onClick={() => setEsewaSandboxMode(!esewaSandboxMode)} className="text-slate-700 hover:opacity-80 transition-all">
                      {esewaSandboxMode ? (
                        <span className="text-[9px] font-extrabold bg-amber-50 text-amber-600 border border-amber-200 px-2 py-1 rounded-lg">SANDBOX ROUTING</span>
                      ) : (
                        <span className="text-[9px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-1 rounded-lg">LIVE PRODUCTION</span>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: CORE LEDGER DEVOPS */}
              {activeTab === 'system' && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Data Redundancy & Devops Systems</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Execute complete database rollbacks or export data encryption schemas safely.</p>
                  </div>
                  <div className="h-px bg-slate-100" />

                  <div className="p-4 border border-dashed border-slate-200 rounded-2xl flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-700 flex items-center gap-1.5"><Server size={14} className="text-blue-600" /> Safe Snapshot Backup</h4>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">Generates a complete, structurally structured archive download log of active MongoDB tables.</p>
                    </div>
                    <button 
                      type="button"
                      onClick={handleBackupDatabase}
                      className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold shrink-0 shadow-2xs transition-all"
                    >
                      Compile Snapshot
                    </button>
                  </div>

                  {/* Danger Zone Operational Frame */}
                  <div className="p-4 border border-rose-100 bg-rose-50/20 rounded-2xl flex items-center justify-between gap-4 mt-2">
                    <div className="min-w-0">
                      <h4 className="font-bold text-rose-800 flex items-center gap-1.5"><AlertTriangle size={14} className="text-rose-600" /> Clear Application Staging Memory</h4>
                      <p className="text-[11px] text-rose-600/70 font-medium mt-0.5">Wipes volatile testing instances and transient analytical cache pools immediately. Permanent action.</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => { if(window.confirm("Purge structural staging arrays?")) alert("System context arrays flushed smoothly."); }}
                      className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shrink-0 shadow-sm transition-all"
                    >
                      Purge Cache
                    </button>
                  </div>
                </div>
              )}

              {/* Global Lower Submission Panel */}
              <div className="border-t border-slate-100 pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md flex items-center gap-2 transition-all"
                >
                  <Save size={14} />
                  {isSaving ? "Saving States..." : "Commit Matrix Changes"}
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}