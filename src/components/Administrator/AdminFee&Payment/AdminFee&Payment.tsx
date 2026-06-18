import { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  SlidersHorizontal, 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle, 
  Wallet,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

// --- Interfaces ---
interface StudentFeeRecord {
  id: string;
  name: string;
  email: string;
  semester: string;
  totalFee: number;
  paidFee: number;
  dueFee: number;
  status: 'Fully Paid' | 'Partial' | 'Unpaid';
}

// --- Seed Mock Data Matrix ---
const initialFeeDataset: StudentFeeRecord[] = [
  { id: "STU-2026-089", name: "Rohan Shrestha", email: "rohan.shrestha@edusmart.edu", semester: "6th Semester", totalFee: 65000, paidFee: 65000, dueFee: 0, status: "Fully Paid" },
  { id: "STU-2026-021", name: "Niranjan Joshi", email: "niranjan.j@edusmart.edu", semester: "4th Semester", totalFee: 65000, paidFee: 30000, dueFee: 35000, status: "Partial" },
  { id: "STU-2026-194", name: "Bibek Thapa", email: "bibek.t@edusmart.edu", semester: "4th Semester", totalFee: 60000, paidFee: 0, dueFee: 60000, status: "Unpaid" }
];

export default function AdminFeePayment() {
  const [records] = useState<StudentFeeRecord[]>(initialFeeDataset);
  const [selectedStudent, setSelectedStudent] = useState<StudentFeeRecord | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // --- Real eSewa Checkout Integrator ---
  const handleInitiateEsewaPayment = async (student: StudentFeeRecord) => {
    if (student.dueFee <= 0) {
      alert("This account context has zero outstanding operational dues.");
      return;
    }

    setIsProcessing(true);
    try {
      // 1. Unique transaction tracker ID generated for this specific instance
      const transactionId = `TXN-${student.id}-${Date.now()}`;
      
      // 2. Query your structural backend API to securely sign the transaction variables
      // Replace this URL with your live Node.js/Express server endpoint
      const response = await fetch('http://localhost:5000/api/payment/generate-esewa-signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: student.dueFee,
          product_delivery_charge: 0,
          product_service_charge: 0,
          product_code: "EPAYTEST", // Use your live merchant code for production
          transaction_uuid: transactionId,
        })
      });

      const data = await response.json();

      if (!data.signature) {
        throw new Error("Backend failed to sign data packet safely.");
      }

      // 3. Create a clean hidden HTML form to automatically forward parameters to eSewa
      const esewaForm = document.createElement('form');
      
      // Test environments point to: https://rc-epay.esewa.com.np/api/epay/main/v2/form
      // Live production environments point to: https://epay.esewa.com.np/api/epay/main/v2/form
      esewaForm.setAttribute('method', 'POST');
      esewaForm.setAttribute('action', 'https://rc-epay.esewa.com.np/api/epay/main/v2/form');

      const parameterPayload: Record<string, string> = {
        "amount": student.dueFee.toString(),
        "tax_amount": "0",
        "total_amount": student.dueFee.toString(),
        "transaction_uuid": transactionId,
        "product_code": "EPAYTEST",
        "product_service_charge": "0",
        "product_delivery_charge": "0",
        "success_url": "http://localhost:5173/payment-success", // Route users hit on success
        "failure_url": "http://localhost:5173/payment-failure", // Route users hit on failure
        "signed_field_names": "total_amount,transaction_uuid,product_code",
        "signature": data.signature // The secure cryptographic signature fetched from your server
      };

      // Map parameters into form nodes
      Object.keys(parameterPayload).forEach((key) => {
        const inputField = document.createElement('input');
        inputField.setAttribute('type', 'hidden');
        inputField.setAttribute('name', key);
        inputField.setAttribute('value', parameterPayload[key]);
        esewaForm.appendChild(inputField);
      });

      // Mount the generated gateway array to DOM and dispatch it
      document.body.appendChild(esewaForm);
      esewaForm.submit();

    } catch (error) {
      console.error("Payment Lifecycle Error:", error);
      alert("Failed to initialize transaction handshake with eSewa gateways securely.");
    } finally {
      setIsProcessing(false);
    }
  };

  // --- Calculations ---
  const filteredRecords = records.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchQuery.toLowerCase()) || record.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full bg-slate-50 min-h-screen p-6 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">

        {/* Dashboard Title Header */}
        {!selectedStudent ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-md">
                  <Wallet size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Billing & Receivables Engine</h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Audit student ledgers, process eSewa gateway instances, and review payment settlements</p>
                </div>
              </div>
            </div>

            {/* Quick Metrics Multi-Card Deck */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex items-center gap-3.5">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle size={18} /></div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Collected</span>
                  <h4 className="text-base font-bold text-slate-800">Rs. {records.reduce((acc, c) => acc + c.paidFee, 0).toLocaleString()}</h4>
                </div>
              </div>
              <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex items-center gap-3.5">
                <div className="p-3 bg-rose-50 text-rose-600 rounded-xl"><AlertTriangle size={18} /></div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Outstanding Dues</span>
                  <h4 className="text-base font-bold text-slate-800">Rs. {records.reduce((acc, c) => acc + c.dueFee, 0).toLocaleString()}</h4>
                </div>
              </div>
              <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex items-center gap-3.5">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><CreditCard size={18} /></div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Invoiced Billing</span>
                  <h4 className="text-base font-bold text-slate-800">Rs. {records.reduce((acc, c) => acc + c.totalFee, 0).toLocaleString()}</h4>
                </div>
              </div>
            </div>

            {/* Table Search Filters */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-8 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Filter accounts by student name index or systemic registration code..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs font-medium outline-none transition-all shadow-sm"
                />
              </div>

              <div className="md:col-span-4 relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-4 pr-8 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-xs outline-none cursor-pointer shadow-sm appearance-none"
                >
                  <option value="All">All Settlement Ranks</option>
                  <option value="Fully Paid">Fully Paid</option>
                  <option value="Partial">Partial Dues</option>
                  <option value="Unpaid">Unpaid Accounts</option>
                </select>
                <SlidersHorizontal className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
              </div>
            </div>

            {/* Core Financial Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-212.5">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                      <th className="py-3 px-5 font-medium">Student Account Node</th>
                      <th className="py-3 font-medium">Total Invoiced</th>
                      <th className="py-3 font-medium">Settled Amount</th>
                      <th className="py-3 font-medium">Net Balances Due</th>
                      <th className="py-3 text-center font-medium">Ledger State</th>
                      <th className="py-3 pr-5 text-right font-medium">Operational Core</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-xs">
                    {filteredRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-slate-50/40 group transition-colors">
                        <td className="py-3.5 px-5">
                          <div>
                            <h4 className="font-bold text-slate-700">{record.name}</h4>
                            <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{record.id} • {record.semester}</span>
                          </div>
                        </td>
                        <td className="py-3.5 font-semibold text-slate-600">Rs. {record.totalFee.toLocaleString()}</td>
                        <td className="py-3.5 font-bold text-emerald-600">Rs. {record.paidFee.toLocaleString()}</td>
                        <td className="py-3.5 font-bold text-rose-600">Rs. {record.dueFee.toLocaleString()}</td>
                        <td className="py-3.5 text-center">
                          <span className={`font-bold px-2.5 py-0.5 rounded-full border text-[10px] ${
                            record.status === 'Fully Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            record.status === 'Partial' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                          }`}>{record.status}</span>
                        </td>
                        <td className="py-3.5 pr-5 text-right">
                          <button 
                            onClick={() => setSelectedStudent(record)}
                            className="text-xs font-bold px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-xl shadow-2xs transition-all"
                          >
                            Open Billing Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          
          // ========================================================= 
          // DETAILED BILLING PROFILE VIEW & ESEWA TRIGGER             
          // ========================================================= 
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <button 
                onClick={() => setSelectedStudent(null)}
                className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm transition-all"
              >
                <ArrowLeft size={14} /> Back to Financial Directory
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Account Overview Panel */}
              <div className="md:col-span-2 flex flex-col gap-4 border border-slate-100 p-5 rounded-2xl bg-slate-50/50">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Account Holder</span>
                  <h3 className="text-base font-bold text-slate-800">{selectedStudent.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{selectedStudent.email} • {selectedStudent.id}</p>
                </div>

                <div className="h-px bg-slate-200" />

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium block">Invoiced Fee:</span>
                    <strong className="text-slate-700">Rs. {selectedStudent.totalFee.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Total Paid:</span>
                    <strong className="text-emerald-600">Rs. {selectedStudent.paidFee.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Remaining Balance:</span>
                    <strong className="text-rose-600">Rs. {selectedStudent.dueFee.toLocaleString()}</strong>
                  </div>
                </div>
              </div>

              {/* Secure Payment Trigger Panel */}
              <div className="border border-slate-200 p-5 rounded-2xl shadow-xs bg-white flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wide">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    Secure eSewa Gateway
                  </div>
                  <p className="text-xs text-slate-400 font-medium mt-1">Settle outstanding balances via encrypted eSewa payment routing protocol nodes seamlessly.</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-500">Payable Total:</span>
                  <strong className="text-sm font-black text-slate-800">Rs. {selectedStudent.dueFee.toLocaleString()}</strong>
                </div>

                <button 
                  disabled={selectedStudent.dueFee <= 0 || isProcessing}
                  onClick={() => handleInitiateEsewaPayment(selectedStudent)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all ${
                    selectedStudent.dueFee <= 0 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {isProcessing ? 'Handshaking Gateway...' : 'Settle with eSewa'}
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}