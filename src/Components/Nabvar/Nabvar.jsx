import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContex } from '../../Providers/AuthProvider';


const Nabvar = () => {
    const { user } = useContext(AuthContex);
    const { logout } = useContext(AuthContex);
    const handleLogut = () => {
        logout()
    }
    const items = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/instructors'>Mentors</Link></li>
        <li><Link to='/classes'>Courses</Link></li>
        {/* <li><Link to='/comming-soon'>Community</Link></li> */}

        {
            user && <>
                <li><Link to='/dashbord/mycart'>Dashboard</Link></li>
                <div className="avatar online w-[7%]">
                    <div className="w-24 rounded-full"><img src={user?.photoURL} />
                    </div>
                </div>
            </>
        }
        {
            user ? <>
                <li> <button className=' ' onClick={handleLogut}>Logout</button> </li>
            </> : <>
                <li><Link to='/login'>Login</Link></li>
            </>
        }
    </>
    return (
        <div className="navbar bg-base-300 font-normal shadow-lg " style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 ,}}>
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 text-xl  bg-red-600 rounded-box w-52">
                        {items}
                    </ul>
                </div>
                <a className=" normal-case text-2xl font-semibold">SpeakUp <span className='text-yellow-400'>School</span> </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal text-xl px-1">
                    {items}
                </ul>
            </div>

        </div>
    );
};

export default Nabvar;