import { Routes, Route, Navigate } from "react-router-dom";

// import StudentLayout from "./Layouts/StudentLayout";

// import StudentDashboard from "./pages/Dashboard/StudentDashboard/StudentDashboard";
import AdminAttendance from "./components/Administrator/AdminAttendance/AdminAttendanceDashboard";
import AdminDepartment from "./components/Administrator/AdminDepartment/AdminDepartment";
import AdminExam from "./components/Administrator/AdminExam/AdminExam";
import AdminFeePayment from "./components/Administrator/AdminFee&Payment/AdminFee&Payment";
import AdminNotice from "./components/Administrator/AdminNotice/AdminNotice";
import AdminReports from "./components/Administrator/AdminReports/AdminReports";
import AdminSettings from "./components/Administrator/AdminSettings/AdminSettings";
import StudentProfilePage from "./components/Administrator/StudentProfilePage/StudentProfilePage";
import TeacherStudentManager from "./components/Administrator/TeacherStudentManager/TeacherStudentManager";
// import StudentHome from "./components/Student/Dashboard/StudentHome/StudentHome";
// import StudentAttendance from "./components/Student/StudentAttendance/StudentAttendance";
// import StudentExams from "./components/Student/StudentExam/StudentExams";
// import StudentFees from "./components/Student/StudentFees/StudentFees";
// import StudentProfile from "./components/Student/StudentInformation/StudentMainProfile/StudentMainProfile";
// import StudentNotices from "./components/Student/StudentNotices/StudentNotices";
// import StudentSetting from "./components/Student/StudentSettings/StudentSettings";
import AdminstratorDashboard from "./pages/Dashboard/AdminstratorDashboard/AdminstratorDashboard";
import AdminLayout from "./Layouts/AdminstratorLayout";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import VerifyOTPPage from "./pages/VerifyOTPPage/VerifyOTPPage";
import StudentDashboard from "./pages/Dashboard/StudentDashboard/StudentDashboard";
import StudentHome from "./components/Student/Dashboard/StudentHome/StudentHome";
import StudentProfile from "./components/Student/StudentInformation/StudentMainProfile/StudentMainProfile";
import StudentAttendance from "./components/Student/StudentAttendance/StudentAttendance";
import StudentFees from "./components/Student/StudentFees/StudentFees";
import StudentExams from "./components/Student/StudentExam/StudentExams";
import StudentNotices from "./components/Student/StudentNotices/StudentNotices";
import StudentSetting from "./components/Student/StudentSettings/StudentSettings";
import AchievementsCard from "./components/Student/Dashboard/StudentPages/AchievementsCard";
import DashboardAnalyticsRow from "./components/Student/Dashboard/StudentPages/DashboardAnalyticsRow";
import DashboardFooter from "./components/Student/Dashboard/StudentPages/DashboardFooter";
import DashboardSchedules from "./components/Student/Dashboard/StudentPages/DashboardSchedules";
import FeeSummaryCard from "./components/Student/Dashboard/StudentPages/FeeSummaryCard";
import InfoCard from "./components/Student/StudentInformation/InfoCard";
import ProfileHero from "./components/Student/StudentInformation/ProfileHero";
import StudentMainProfile from "./components/Student/StudentInformation/StudentMainProfile/StudentMainProfile";
import StudentStats from "./components/Student/StudentInformation/StudentStats";
import StudentLayout from "./Layouts/StudentLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<StudentLayout />}>
        <Route index element={<Navigate to="/StudentDashboard" replace />} />
        <Route path="StudentDashboard" element={<StudentDashboard />} />
        <Route path="StudentHome" element={<StudentHome />} />
        <Route path="StudentInformation" element={<StudentProfile />} />
        <Route path="StudentAttendance" element={<StudentAttendance />} />
        <Route path="StudentFees" element={<StudentFees />} />
        <Route path="StudentExams" element={<StudentExams />} />
        <Route path="StudentNotices" element={<StudentNotices />} />
        <Route path="StudentSetting" element={<StudentSetting />} />
        <Route path="AchievementsCard" element={<AchievementsCard />} />
        <Route path="DashboardAnalyticsRow" element={<DashboardAnalyticsRow />} />
        <Route path="DashboardFooter" element={<DashboardFooter />} />
        <Route path="DashboardSchedules" element={<DashboardSchedules />} />
        <Route path="FeeSummaryCard" element={<FeeSummaryCard />} />
        <Route path="StudentMainProfile" element={<StudentMainProfile />} />
        <Route path="InfoCard" element={<InfoCard title={""} items={[]} />} />
        <Route path="ProfileHero" element={<ProfileHero />} />
        <Route path="StudentDashboard" element={<StudentDashboard />} />
        <Route path="StudentStats" element={<StudentStats />} />
        <Route path="StudentStats" element={<StudentStats />} />
      </Route>

        {/* Admin Routes */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />

          <Route path="admin/dashboard" element={<AdminstratorDashboard />} />
          <Route path="admin/student" element={<StudentProfilePage />} />
          <Route path="admin/teacher" element={<TeacherStudentManager />} />
          <Route path="admin/department" element={<AdminDepartment />} />
          <Route path="admin/attendance" element={<AdminAttendance />} />
          <Route path="admin/fee-payment" element={<AdminFeePayment />} />
          <Route path="admin/exam" element={<AdminExam />} />
          <Route path="admin/notice" element={<AdminNotice />} />
          <Route path="admin/reports" element={<AdminReports />} />
          <Route path="admin/settings" element={<AdminSettings />} />

          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
