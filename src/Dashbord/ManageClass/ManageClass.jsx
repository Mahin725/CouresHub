import { Helmet } from "react-helmet-async";
import UseManageClass from "../../Hooks/UseManageClass";
import { HiBookOpen, HiOutlineClock, HiBadgeCheck } from "react-icons/hi";
import AdminCourseCard from "./AdminCouresCard";

const ManageClass = () => {
  const [classes, refetch, isLoading] = UseManageClass(); // Assuming your hook returns [data, refetch, loading]

  const total = classes.length;
  const pending = classes.filter(c => c.status === "pending").length;
  const approved = classes.filter(c => c.status === "approved").length;
  const denied = classes.filter(c => c.status === "denied").length;

  if (isLoading) {
    return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  return (
    <div className="p-6 lg:p-10">
      <Helmet>
        <title>Manage Classes | SpeakUp</title>
      </Helmet>

      <h1 className="text-4xl font-bold mb-2">Manage All Classes</h1>
      <p className="text-base-content/70 mb-8">Review, approve, or provide feedback on submitted courses</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Total Classes</p>
                <p className="text-3xl font-bold">{total}</p>
              </div>
              <HiBookOpen className="text-4xl text-primary opacity-80" />
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Pending Review</p>
                <p className="text-3xl font-bold">{pending}</p>
              </div>
              <HiOutlineClock className="text-4xl text-warning opacity-80" />
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Approved</p>
                <p className="text-3xl font-bold">{approved}</p>
              </div>
              <HiBadgeCheck className="text-4xl text-success opacity-80" />
            </div>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Denied</p>
                <p className="text-3xl font-bold">{denied}</p>
              </div>
              <span className="text-4xl text-error opacity-80">✕</span>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {classes.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-base-content/60">No classes submitted yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((item) => (
            <AdminCourseCard key={item._id} item={item} refetch={refetch} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageClass; 