import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContex } from '../../Providers/AuthProvider';

const Nabvar = () => {
  const { user, logout } = useContext(AuthContex);

  const handleLogout = () => {
    logout()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const navItems = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/instructors">Mentors</Link></li>
      <li><Link to="/classes">Courses</Link></li>
      {/* <li><Link to="/comming-soon">Community</Link></li> */}

      {user && (
        <li>
          <Link to="/dashbord">Dashboard</Link>
        </li>
      )}
    </>
  );

  return (
    <div
      className="navbar bg-base-200 shadow-lg fixed top-0 left-0 right-0 z-50"
      data-theme="coursehub"
    >
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-52 text-lg"
          >
            {navItems}
            {/* Mobile Auth Section */}
            {user ? (
              <>
                <li className="menu-title">
                  <span>{user.displayName || user.email}</span>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn btn-error btn-sm">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="btn btn-primary btn-sm">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* Brand Logo */}
        <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold">
          Coures Hub
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg">{navItems}</ul>
      </div>

      {/* Desktop Auth Section */}
      <div className="navbar-end gap-4">
        {user ? (
          <>
            {/* User Avatar */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user?.photoURL || "https://i.ibb.co.com/5Y5Z7wK/default-avatar.jpg"}
                    alt="User Avatar"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="menu-title">
                  <span className="text-lg">{user.displayName || user.email}</span>
                </li>
                <li>
                  <Link to="/dashbord">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn btn-error btn-sm mt-2">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost">
              Login
            </Link>
            <Link to="/singup" className="btn btn-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Nabvar;