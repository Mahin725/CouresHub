import { Link, Outlet } from "react-router-dom";
import { HiBadgeCheck, HiDocumentAdd, HiOutlineBookOpen, HiOutlineCollection, HiOutlineCurrencyDollar, HiOutlineHome, HiOutlineViewList, HiQuestionMarkCircle, HiShoppingCart, HiUserGroup } from 'react-icons/hi'
import UserRole from "../Hooks/UserRole";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

// At Frist fault in the condition all Sidebar then fetch users.

const Dashbord = () => {

    const [IsAdmin, setAdmin] = useState(true)
    const [IsInstructor, setInstructor] = useState(true);
    const [IsStudent, setStudent] = useState(false)

    const [dataUser, isLoading] = UserRole();

    useEffect(() => {

        if (dataUser?.role === 'student') {
            setStudent(true);
        }
        else if (dataUser?.role === 'instructor') {
            setInstructor(true);
        }
        else if (dataUser?.role === 'admin') {
            setAdmin(true);
        }
    }, [dataUser, isLoading]);

    return (
        <div className="drawer lg:drawer-open">
            <Helmet>
                <title>Dashbord || SpeakUp</title>
            </Helmet>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col ">
                {/* Page content here */}
                
                <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden"><HiOutlineViewList className="text-3xl"></HiOutlineViewList> </label>
                <Outlet></Outlet>
                
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-[#6856eb] rouned-lg text-white">
                    {/* Sidebar content here */}
                   
                    <p className="uppercase text-3xl font-semibold" >Dashboard</p>
                    {/* Student Role Pages */}
                    {IsStudent && <>
                        <li><Link to='/dashbord/mycart' className="text-2xl mt-2"> <HiShoppingCart></HiShoppingCart> Check Cart</Link> </li>
                        <li><Link to='/dashbord/enrolled-class' className="text-2xl mt-2"> <HiBadgeCheck></HiBadgeCheck>Enrolled Classes</Link> </li>
                        <li><Link to='/dashbord/payment-history' className="text-2xl mt-2"> <HiOutlineCurrencyDollar></HiOutlineCurrencyDollar>Payment History</Link> </li>
                    </>}
                    {/* Instructor Role Pages */}
                    {
                        IsInstructor && <>
                            <li><Link to='/dashbord/addnew' className="text-2xl mt-2"> <HiDocumentAdd></HiDocumentAdd> Add A Class</Link> </li>
                            <li><Link to='/dashbord/addnewmodule' className="text-2xl mt-2"> <HiDocumentAdd></HiDocumentAdd> Add Module</Link> </li>
                            <li><Link to='/dashbord/myclasses' className="text-2xl mt-2"> <HiOutlineBookOpen></HiOutlineBookOpen>MY Classes </Link> </li>
                        </>
                    }

                    {/* Admin Role Pages */}
                    {
                        IsAdmin && <>
                            <li><Link to='/dashbord/manage-classes' className="text-2xl mt-2"> <HiOutlineCollection></HiOutlineCollection> Manage Classes</Link> </li>
                            <li><Link to='/dashbord/manage-users' className="text-2xl mt-2"> <HiUserGroup></HiUserGroup> Manage Users</Link> </li>
                        </>
                    }
                    <div className="divider"></div>
                    <li><Link to='/' className="text-2xl mt-2"> <HiOutlineHome></HiOutlineHome> Home</Link></li>
                    {/* <li><Link to='/dashbord/live-chat' className="text-2xl mt-2"> <HiQuestionMarkCircle></HiQuestionMarkCircle>Live Chat</Link></li> */}
                </ul>

            </div>
            <div>
                
            </div>
        </div>
    );
};

export default Dashbord;