import { useState } from "react";
import {
  FileText,
  Download,
  BarChart3,
  RefreshCw,
  CheckCircle,
  Clock,
  Calendar,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

// --- Interfaces ---
interface ReportTemplate {
  id: string;
  title: string;
  description: string;
  category: "Academic" | "Financial" | "Attendance" | "System";
  formatOptions: ("PDF" | "CSV" | "XLSX")[];
  lastGenerated: string;
}

interface ActiveExportJob {
  id: string;
  reportTitle: string;
  format: string;
  timestamp: string;
  status: "Completed" | "Processing" | "Failed";
  fileSize?: string;
}

// --- Seed Mock Data Matrix ---
const initialTemplates: ReportTemplate[] = [
  {
    id: "REP-ACD-01",
    title: "Semester Grade Distribution Matrix",
    description:
      "Compiles a complete distribution of student grade points, averages, and class passing floors indexed by department units.",
    category: "Academic",
    formatOptions: ["PDF", "XLSX"],
    lastGenerated: "2026-06-01",
  },
  {
    id: "REP-FIN-02",
    title: "Fee Collection & eSewa Clearance Ledger",
    description:
      "A comprehensive financial report auditing transaction strings, outstanding dues, and processed eSewa portal collections.",
    category: "Financial",
    formatOptions: ["CSV", "XLSX"],
    lastGenerated: "2026-06-07",
  },
  {
    id: "REP-ATT-03",
    title: "Institutional Attendance Compliance Report",
    description:
      "Flags profiles falling beneath the mandatory 75% metric constraint threshold alongside global department attendance metrics.",
    category: "Attendance",
    formatOptions: ["PDF", "CSV"],
    lastGenerated: "2026-06-05",
  },
  {
    id: "REP-SYS-04",
    title: "System Access Logs & Audit Trail",
    description:
      "Tracks administrative overrides, security logins, portal status reports, and background background processes.",
    category: "System",
    formatOptions: ["CSV"],
    lastGenerated: "Never",
  },
];

const initialExportJobs: ActiveExportJob[] = [
  {
    id: "JOB-9021",
    reportTitle: "Fee Collection & eSewa Clearance Ledger",
    format: "XLSX",
    timestamp: "10 mins ago",
    status: "Completed",
    fileSize: "2.4 MB",
  },
  {
    id: "JOB-9022",
    reportTitle: "Semester Grade Distribution Matrix",
    format: "PDF",
    timestamp: "Just now",
    status: "Processing",
  },
  {
    id: "JOB-8994",
    reportTitle: "Institutional Attendance Compliance Report",
    format: "CSV",
    timestamp: "2 hours ago",
    status: "Failed",
  },
];

export default function AdminReports() {
  const [templates] = useState<ReportTemplate[]>(initialTemplates);
  const [jobs, setJobs] = useState<ActiveExportJob[]>(initialExportJobs);
  const [searchQuery] = useState("");
  const [categoryFilter] = useState("All");
  const [isGenerating, setIsGenerating] = useState(false);

  // --- Trigger Report Export Routine ---
  const handleTriggerExport = (template: ReportTemplate, format: string) => {
    setIsGenerating(true);

    // Simulate compilation latency inside background engine thread
    const newJob: ActiveExportJob = {
      id: `JOB-${Math.floor(1000 + Math.random() * 9000)}`,
      reportTitle: template.title,
      format: format,
      timestamp: "Just now",
      status: "Processing",
    };

    setJobs([newJob, ...jobs]);

    setTimeout(() => {
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === newJob.id
            ? {
                ...job,
                status: "Completed",
                fileSize: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
              }
            : job,
        ),
      );
      setIsGenerating(false);
    }, 2500);
  };

  const filteredTemplates = templates.filter((temp) => {
    const matchesSearch =
      temp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      temp.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || temp.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full bg-slate-50 min-h-screen p-6 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* ========================================================= */}
        {/* VIEW HEADER TITLE SECTION                                 */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 text-white rounded-xl shadow-md">
              <BarChart3 size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Reports & Analytics Engine
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Compile cross-sectional data spreadsheets, isolate academic
                trends, and export financial summaries
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RESPONSIVE METRIC HOVER DECK                              */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-row items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
              <FileText size={18} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block truncate">
                Total Blueprints
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">
                {templates.length} Core Schemes
              </h4>
            </div>
          </div>
          <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-row items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0">
              <RefreshCw
                size={18}
                className={isGenerating ? "animate-spin" : ""}
              />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block truncate">
                Active Compilations
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">
                {jobs.filter((j) => j.status === "Processing").length} Building
              </h4>
            </div>
          </div>
          <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-row items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
              <CheckCircle size={18} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block truncate">
                Exports Available
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">
                {jobs.filter((j) => j.status === "Completed").length} Files
                Saved
              </h4>
            </div>
          </div>
          <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-row items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl shrink-0">
              <TrendingUp size={18} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block truncate">
                Data Scope Status
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">
                SaaS Live Audited
              </h4>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TWO COLUMN CONTENT LAYOUT GRID                            */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full">
          {/* LEFT PANEL: REPORT SCHEMES & TRIGGER INTERFACE (2/3 Width) */}
          <div className="lg:col-span-2 flex flex-col gap-4 w-full">
            {/* Clean Section Tag */}
            <div className="flex items-center justify-between pb-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Available Report Templates
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white border border-slate-100 shadow-xs rounded-2xl p-5 hover:shadow-sm transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full"
                >
                  <div className="min-w-0 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                          template.category === "Financial"
                            ? "bg-emerald-50 text-emerald-600"
                            : template.category === "Academic"
                              ? "bg-blue-50 text-blue-600"
                              : template.category === "Attendance"
                                ? "bg-amber-50 text-amber-600"
                                : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {template.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Ref Code: {template.id}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm">
                      {template.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xl">
                      {template.description}
                    </p>
                    <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 mt-1">
                      <Calendar size={12} /> Last processing drop:{" "}
                      {template.lastGenerated}
                    </span>
                  </div>

                  {/* Format Selection Buttons */}
                  <div className="flex sm:flex-col gap-1.5 shrink-0 self-end sm:self-center w-full sm:w-auto">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider hidden sm:block text-right mb-0.5">
                      Target Format
                    </span>
                    <div className="flex gap-1.5 w-full justify-end">
                      {template.formatOptions.map((format) => (
                        <button
                          key={format}
                          onClick={() => handleTriggerExport(template, format)}
                          className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-500 text-slate-700 rounded-lg shadow-2xs transition-all"
                        >
                          <Download size={11} className="text-slate-400" />
                          {format}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL: LIVE AUDIT TRACKING COMPILATION STREAM (1/3 Width) */}
          <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5 flex flex-col gap-4 w-full">
            <div>
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <ShieldCheck size={16} className="text-blue-600" /> Live
                Pipeline Activity
              </h3>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                Track real-time compilation progress states and access download
                links
              </p>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="flex flex-col gap-3">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="p-3 bg-slate-50/50 rounded-xl border border-slate-100 flex flex-col gap-2 text-xs font-medium"
                >
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold text-slate-700 line-clamp-1 leading-snug">
                      {job.reportTitle}
                    </h4>
                    <span
                      className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md ${
                        job.status === "Completed"
                          ? "bg-emerald-50 text-emerald-600"
                          : job.status === "Processing"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold pt-1 border-t border-slate-100/50">
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-200 text-slate-600 font-bold uppercase px-1 rounded-sm text-[9px]">
                        {job.format}
                      </span>
                      {job.fileSize && <span>Size: {job.fileSize}</span>}
                    </div>
                    <span className="flex items-center gap-0.5">
                      <Clock size={11} /> {job.timestamp}
                    </span>
                  </div>

                  {job.status === "Completed" && (
                    <button className="w-full mt-1.5 py-1 bg-white hover:bg-slate-100 text-blue-600 border border-slate-200 text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 shadow-2xs">
                      <Download size={12} /> Pull Generated Ledger Link
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
