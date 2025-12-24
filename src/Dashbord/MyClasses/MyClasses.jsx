import { useContext, useEffect, useState } from "react";
import { AuthContex } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import instance from "../../api/axios";
import {HiOutlineClock, HiBadgeCheck, HiBookOpen } from "react-icons/hi";
import { Link } from "react-router-dom";
import CouresCard from "./CouresCard.jsx";
const MyClasses = () => {
  const { user } = useContext(AuthContex);
  const [myClasses, setMyClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      instance
        .get(`/instructor/my-classes?email=${user.email}`)
        .then((res) => {
          setMyClasses(res.data.data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  const totalClasses = myClasses.length;
  const pendingCount = myClasses.filter((c) => c.status === "pending").length;
  const approvedCount = myClasses.filter((c) => c.status === "approved").length;

  if (loading) {
    return <div className="flex justify-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  return (
    <div className="p-6 lg:p-10">
      <Helmet>
        <title>My Classes | SpeakUp</title>
      </Helmet>

      <h1 className="text-4xl font-bold mb-2">My Classes</h1>
      <p className="text-base-content/70 mb-8">Manage and track your created courses</p>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Total Classes</p>
                <p className="text-3xl font-bold">{totalClasses}</p>
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
                <p className="text-3xl font-bold">{pendingCount}</p>
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
                <p className="text-3xl font-bold">{approvedCount}</p>
              </div>
              <HiBadgeCheck className="text-4xl text-success opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {myClasses.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-base-content/60">No classes added yet.</p>
          <Link to="/dashbord/addnew" className="btn btn-primary mt-6">
            Add Your First Class
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myClasses.map((course) => (
            <CouresCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyClasses;