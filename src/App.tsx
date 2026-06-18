import { Routes, Route, Navigate } from "react-router-dom";

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
import LandingPage from "./pages/LandingPage/LandingPage";

// =====================
// DATA STORES
// =====================
import { DataStoreProvider as TeacherDataStore } from "./pages/Dashboard/TeacherDashboard/DataStore";
import { DataStoreProvider as ParentDataStore } from "./pages/Dashboard/ParentDashboard/DataStore";

// =====================
// TEACHER
// =====================
import TeacherLayout from "./Layouts/TeacherLayout";
import TeacherDashboard from "./pages/Dashboard/TeacherDashboard/TeacherDashboard";
import Students from "./pages/Dashboard/TeacherDashboard/Student";
import Attendance from "./pages/Dashboard/TeacherDashboard/Attendance";
import ClassAttendance from "./pages/Dashboard/TeacherDashboard/ClassAttendance";
import Assignments from "./pages/Dashboard/TeacherDashboard/Assignments";
import Salary from "./pages/Dashboard/TeacherDashboard/Salary";
import ClassStudentList from "./pages/Dashboard/TeacherDashboard/ClassStudentslist";
import TeacherProfile from "./pages/Dashboard/TeacherDashboard/Profile";
import LeaveManagement from "./pages/Dashboard/TeacherDashboard/LeaveManagement";
import Timetable from "./pages/Dashboard/TeacherDashboard/TimeTable";
import ExamsAndMarks from "./pages/Dashboard/TeacherDashboard/Exams";
import TeacherSettings from "./pages/Dashboard/TeacherDashboard/Settings";

// =====================
// PARENT
// =====================
import ParentLayout from "./Layouts/ParentLayout";
import ParentDashboard from "./pages/Dashboard/ParentDashboard/ParentDashboard";
import Parentattendance from "./pages/Dashboard/ParentDashboard/Parentattendance";
import Fees from "./pages/Dashboard/ParentDashboard/Fees";
import Reports from "./pages/Dashboard/ParentDashboard/Reports";
import Notices from "./pages/Dashboard/ParentDashboard/Notices";
import ParentProfile from "./pages/Dashboard/ParentDashboard/ParentProfile";
import ParentSettings from "./pages/Dashboard/ParentDashboard/ParentSettings";
import Events from "./pages/Dashboard/ParentDashboard/Events";

// =====================

// =====================
// RECEPTIONIST
// =====================
import ReceptionistLayout from "./Layouts/ReceptionistLayout";
import ReceptionistDashboard from "./pages/Dashboard/ReceptionistDashboard/ReceptionistDashboard";
import Visitors from "./pages/Dashboard/ReceptionistDashboard/Visitors";
import Deliveries from "./pages/Dashboard/ReceptionistDashboard/Deliveries";
import Appointments from "./pages/Dashboard/ReceptionistDashboard/Appointment";
import PhoneDirectory from "./pages/Dashboard/ReceptionistDashboard/PhoneDirectory";
import Documents from "./pages/Dashboard/ReceptionistDashboard/Documents";
import Rprofile from "./pages/Dashboard/ReceptionistDashboard/Profile";
import SSettings from "./pages/Dashboard/ReceptionistDashboard/Setting";
// import ReceptionistSearchPage from "./pages/Dashboard/ReceptionistDashboard/ReceptionistSearchPage";

// =====================
// SUPER ADMIN
// =====================
import SuperAdminLayout from "./Layouts/SuperAdminLayout";
import SuperAdminDashboard from "./pages/Dashboard/SuperAdminDashboard/SuperAdminDashboard";
import ManageUsers from "./pages/Dashboard/SuperAdminDashboard/ManageUsers";
import Roles from "./pages/Dashboard/SuperAdminDashboard/Roles";
import AuditLogs from "./pages/Dashboard/SuperAdminDashboard/AuditLogs";
import SuperAdminSettings from "./pages/Dashboard/SuperAdminDashboard/Settings";
// import ReceptionistSearchPage from "./components/Receptionist/ReceptionistNavbar/ReceptionistSearchPage";
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
         {/* LANDING PAGE */}
      <Route path="/" element={<LandingPage />} />

      {/* TEACHER ROUTES */}
      <Route
        path="/teacher/*"
        element={
          <TeacherDataStore>
            <TeacherLayout />
          </TeacherDataStore>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="students/:classId" element={<ClassStudentList />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="attendance/:classId" element={<ClassAttendance />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="salary" element={<Salary />} />
        <Route path="profile" element={<TeacherProfile />} />
        <Route path="leavemanagement" element={<LeaveManagement />} />
        <Route path="timetable" element={<Timetable />} />
        <Route path="exams" element={<ExamsAndMarks />} />
        <Route path="settings" element={<TeacherSettings />} />
      </Route>

      {/* PARENT ROUTES */}
      <Route
        path="/parent/*"
        element={
          <ParentDataStore>
            <ParentLayout />
          </ParentDataStore>
        }
      >
        <Route index element={<ParentDashboard />} />
        <Route path="dashboard" element={<ParentDashboard />} />
        <Route path="attendance" element={<Parentattendance />} />
        <Route path="fees" element={<Fees />} />
        <Route path="reports" element={<Reports />} />
        <Route path="notices" element={<Notices />} />
        <Route path="profile" element={<ParentProfile />} />
        <Route path="settings" element={<ParentSettings />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="events" element={<Events />} />
      </Route>

      {/* STUDENT ROUTES */}
      <Route path="/student/*" element={<StudentLayout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="dashboard" element={<StudentDashboard />} />
      </Route>

      {/* RECEPTIONIST ROUTES */}
      <Route path="/reception/*" element={<ReceptionistLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<ReceptionistDashboard />} />
        <Route path="visitors" element={<Visitors />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="deliveries" element={<Deliveries />} />
        <Route path="Settings" element={<SSettings />} />
        <Route path="Phone-Directory" element={<PhoneDirectory />} />
        <Route path="Documents" element={<Documents />} />
        <Route path="Profile" element={<Rprofile />} />
        {/* <Route path="search" element={<ReceptionistSearchPage />} /> */}
      </Route>

      {/* SUPER ADMIN ROUTES */}
      <Route path="/superadmin/*" element={<SuperAdminLayout />}>
        <Route index element={<SuperAdminDashboard />} />
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="roles" element={<Roles />} />
        <Route path="settings" element={<SuperAdminSettings />} />
        <Route path="audit-logs" element={<AuditLogs />} />
      </Route>

      {/* 404 ROUTE */}
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;

