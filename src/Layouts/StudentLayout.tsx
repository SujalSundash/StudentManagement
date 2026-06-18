import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/Student/StudentSidebar/StudentSidebar";
import StudentNavbar from "../components/Student/StudentNavbar/StudentNavbar";
<<<<<<< HEAD
import DashboardFooter from "../components/Student/Dashboard/StudentPages/DashboardFooter";
=======
>>>>>>> Shriya

const StudentLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <StudentSidebar />

      <div className="md:ml-64 min-h-screen">
        <StudentNavbar />
<<<<<<< HEAD
        <DashboardFooter/>
=======
>>>>>>> Shriya

        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;