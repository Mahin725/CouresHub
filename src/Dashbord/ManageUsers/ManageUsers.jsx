// src/pages/Dashboard/ManageUsers.jsx
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import UseUsersMange from "../../Hooks/UseUsersMange";
import { HiUsers, HiSearch } from "react-icons/hi";
import AdminUserTableRow from "./AdminUserTableRow";

const ManageUsers = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const {
    users,
    totalUsers,
    totalPages,
    currentPage,
    refetch,
    isLoading,
  } = UseUsersMange({ page, search });

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    refetch();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <Helmet>
        <title>Manage Users | SpeakUp</title>
      </Helmet>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Manage Users</h1>
        <p className="text-base-content/70">
          Control user roles and permissions across the platform
        </p>
      </div>

      {/* Stats + Search */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body flex-row items-center gap-4">
            <HiUsers className="text-4xl sm:text-5xl text-primary opacity-80" />
            <div>
              <p className="text-sm opacity-70">Total Users</p>
              <p className="text-2xl sm:text-3xl font-bold">{totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered w-full pl-12"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Table with Custom Scrollbar & Mobile Hint */}
      {!isLoading && (
        <div className="relative">
          {/* Mobile Scroll Hint */}
          <div className="lg:hidden p-4 text-center text-sm font-medium text-primary bg-primary/10 border-b border-primary/20">
            ← Swipe left/right to see more columns →
          </div>

          {/* Scrollable Table */}
          <div className="overflow-x-auto bg-base-100 rounded-xl shadow-xl custom-scrollbar">
            <div className="min-w-[800px]">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="bg-base-200 text-base-content font-semibold">
                    <th className="text-left">#</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Current Role</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-12 text-base-content/60 text-lg">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user, index) => (
                      <AdminUserTableRow
                        key={user._id}
                        user={user}
                        index={(currentPage - 1) * 10 + index + 1}
                        refetch={refetch}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Custom Scrollbar Track (Visible on Mobile) */}
          <div className="lg:hidden h-3 bg-base-300 -mt-1 relative overflow-hidden rounded-b-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20"></div>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <div className="join">
            <button
              onClick={() => setPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="join-item btn"
            >
              «
            </button>
            <button className="join-item btn btn-active">
              Page {currentPage} of {totalPages}
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="join-item btn"
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;