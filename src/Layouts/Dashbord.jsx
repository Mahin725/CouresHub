import { Link, Outlet } from "react-router-dom";
import { HiBadgeCheck, HiDocumentAdd, HiLogout, HiOutlineBookOpen, HiOutlineCollection, HiOutlineCurrencyDollar, HiOutlineHome, HiOutlineViewList, HiQuestionMarkCircle, HiShoppingCart, HiUserGroup } from 'react-icons/hi'
import UserRole from "../Hooks/UserRole";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContex } from "../Providers/AuthProvider";

// At Frist fault in the condition all Sidebar then fetch users.

const Dashbord = () => {

    const [IsAdmin, setAdmin] = useState(false)
    const [IsInstructor, setInstructor] = useState(false);
    const [IsStudent, setStudent] = useState(false)

    const [dataUser, isLoading] = UserRole();
    console.log("dataUSer", dataUser);
    const { logout } = useContext(AuthContex);

    const handleLogout = () => {
        logout()
            .then(() => { })
            .catch((error) => console.error(error));
    };
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
                <title>Dashbord || Coures-Hub</title>
            </Helmet>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col ">
                {/* Page content here */}

                <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden"><HiOutlineViewList className="text-3xl"></HiOutlineViewList> </label>
                <Outlet></Outlet>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar Header */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-primary">CouresHub</h2>
                        <p className="text-sm opacity-70">Dashboard</p>
                    </div>

                    {/* Student Links */}
                    {IsStudent && (
                        <>
                            <li><Link to='/dashbord' className="text-lg mb-2 flex items-center gap-3"><HiOutlineHome className="text-xl" /> Home</Link></li>
                            <li><Link to='/dashbord/mycart' className="text-lg mb-2 flex items-center gap-3"><HiShoppingCart className="text-xl" /> My Cart</Link></li>
                            <li><Link to='/dashbord/enrolled-class' className="text-lg mb-2 flex items-center gap-3"><HiBadgeCheck className="text-xl" /> Enrolled Classes</Link></li>
                            <li><Link to='/dashbord/payment-history' className="text-lg mb-2 flex items-center gap-3"><HiOutlineCurrencyDollar className="text-xl" /> Payment History</Link></li>
                        </>
                    )}

                    {/* Instructor Links */}
                    {IsInstructor && (
                        <>
                            <li><Link to='/dashbord' className="text-lg mb-2 flex items-center gap-3"><HiOutlineHome className="text-xl" /> Home</Link></li>
                            <li><Link to='/dashbord/addnew' className="text-lg mb-2 flex items-center gap-3"><HiDocumentAdd className="text-xl" /> Add Coures</Link></li>
                            <li><Link to='/dashbord/myclasses' className="text-lg mb-2 flex items-center gap-3"><HiOutlineBookOpen className="text-xl" /> My Coureses</Link></li>
                        </>
                    )}

                    {/* Admin Links */}
                    {IsAdmin && (
                        <>
                            <li><Link to='/dashbord' className="text-lg mb-2 flex items-center gap-3"><HiOutlineHome className="text-xl" /> Home</Link></li>
                            <li><Link to='/dashbord/manage-classes' className="text-lg mb-2 flex items-center gap-3"><HiOutlineCollection className="text-xl" /> Manage Classes</Link></li>
                            <li><Link to='/dashbord/manage-users' className="text-lg mb-2 flex items-center gap-3"><HiUserGroup className="text-xl" /> Manage Users</Link></li>
                        </>
                    )}

                    <div className="divider"></div>

                    <li><Link to='/' className="text-lg flex items-center gap-3"><HiOutlineHome className="text-xl" /> Back to Home</Link></li>

                    {/* Optional: User profile at bottom */}
                    <div className="mt-auto pt-8">
                        <div className="flex items-center gap-3">
                            <div className="avatar placeholder">
                                <div className="bg-neutral text-neutral-content rounded-full w-10">
                                    <span className="text-xs uppercase">{dataUser?.name?.[0] || 'U'}</span>
                                </div>
                            </div>
                            <div>
                                <p className="font-medium">{dataUser?.name || 'User'}</p>
                                <p className="text-sm opacity-70 capitalize">{dataUser?.role}</p>

                            </div>
                            <button onClick={handleLogout} className="btn btn-error btn-sm mt-2">
                                <HiLogout /> Logout
                            </button>
                        </div>
                    </div>
                </ul>

            </div>
            <div>

            </div>
        </div>
    );
};

export default Dashbord;