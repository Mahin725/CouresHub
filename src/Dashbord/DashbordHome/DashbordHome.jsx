import UserRole from "../../Hooks/UserRole";
import AdminHome from "../DashbordRoleBaseHome/AdminHome";
import InstructorHome from "../DashbordRoleBaseHome/InstructorHome";
import StudentHome from "../DashbordRoleBaseHome/StudentHome";


const DashbordHome = () => {
    const [dataUser, isLoading] = UserRole();
   
    if (dataUser?.role === 'student') return <StudentHome />;
    if (dataUser?.role === 'instructor') return <InstructorHome />;
    if (dataUser?.role === 'admin') return <AdminHome />;
    return <div>Loading...</div>;
};

export default DashbordHome;