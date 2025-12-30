import React, { useContext, useEffect, useState } from "react";
import { AuthContex } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BookOpen, PlayCircle, Trophy, Clock } from "lucide-react";
import instance from "../../api/axios"; // Axios instance

const EnrolledClass = () => {
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContex);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      instance
        .get(`/coures/enrolled-classes?email=${user.email}`)
        .then((res) => {
          setEnrolled(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Loading your courses...</p>
        </div>
      </div>
    );
  }

  if (enrolled.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <Trophy size={80} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            No Enrolled Courses Yet
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start your learning journey today! Explore courses and enroll in what excites you.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all"
          >
            <BookOpen size={24} />
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Enrolled Classes | CouresHub</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 flex items-center justify-center gap-4">
              <Trophy size={40} className="text-yellow-500" />
              My Learning Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Continue where you left off • {enrolled.length} {enrolled.length === 1 ? "course" : "courses"} enrolled
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrolled.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group"
              >
                {/* Course Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium bg-indigo-600 px-3 py-1 rounded-full inline-block">
                      Enrolled
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 line-clamp-2">
                    {course.name}
                  </h3>

                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock size={20} />
                    <span className="text-sm">by {course.instructorName}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">42% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full w-[42%] transition-all duration-1000"></div>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <Link
                    to={`/dashbord/course-player/${course._id}`}
                    className="block w-full mt-6"
                  >
                    <button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group">
                      <PlayCircle size={28} className="group-hover:scale-110 transition-transform" />
                      Continue Learning
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Motivation Footer */}
          <div className="text-center mt-16">
            <p className="text-2xl font-semibold text-gray-800">
              Keep learning — your future self will thank you! 🚀
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnrolledClass;
