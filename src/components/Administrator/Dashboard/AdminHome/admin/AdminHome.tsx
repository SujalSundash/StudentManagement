import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBookOpen,
  FaMoneyBillWave,
  FaWallet,
} from "react-icons/fa";

import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FiZap, FiChevronDown } from "react-icons/fi";
import DashboardOverview from "../../DashboardOverview/DashboardOverview";

const stats = [
  {
    title: "Total Students",
    value: "2,450",
    change: "+ 8.5%",
    icon: <FaUserGraduate />,
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
    positive: true,
  },
  {
    title: "Total Teachers",
    value: "125",
    change: "+ 5.2%",
    icon: <FaChalkboardTeacher />,
    bg: "bg-green-100",
    iconColor: "text-green-600",
    positive: true,
  },
  {
    title: "Total Courses",
    value: "35",
    change: "+ 3.1%",
    icon: <FaBookOpen />,
    bg: "bg-purple-100",
    iconColor: "text-purple-600",
    positive: true,
  },
  {
    title: "Total Revenue",
    value: "$125,430",
    change: "+ 12.7%",
    icon: <FaMoneyBillWave />,
    bg: "bg-orange-100",
    iconColor: "text-orange-600",
    positive: true,
  },
  {
    title: "Pending Fees",
    value: "145",
    change: "- 4.3%",
    icon: <FaWallet />,
    bg: "bg-red-100",
    iconColor: "text-red-600",
    positive: false,
  },
  {
    title: "Attendance Rate",
    value: "89%",
    change: "+ 6.8%",
    icon: <MdOutlineAccessTimeFilled />,
    bg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    positive: true,
  },
];

const AdminHome = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-1">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome back, Administrator! 👋
          </h1>

          <p className="text-slate-500 mt-1">
            Here's what's happening in your institution today.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-sm transition">
          <FiZap />
          Quick Actions
          <FiChevronDown size={16} />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4 ">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm "
          >
            <div className="flex items-start justify-between">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xl ${item.bg} ${item.iconColor}`}
              >
                {item.icon}
              </div>
            </div>

            <p className="text-sm text-slate-500 mt-4">{item.title}</p>

            <h3 className="text-2xl font-bold text-slate-800 mt-1">
              {item.value}
            </h3>

            <p
              className={`text-xs mt-2 ${
                item.positive ? "text-green-600" : "text-red-500"
              }`}
            >
              {item.change} from last month
            </p>
          </div>
        ))}
      </div>
      <DashboardOverview/>
    </div>
  );
};

export default AdminHome;