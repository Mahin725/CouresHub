import { Link } from "react-router-dom";
import {
  HiPencil,
  HiUsers,
  HiInformationCircle,
  HiPlusCircle,
  HiVideoCamera,
} from "react-icons/hi";
import { useState } from "react";
import instance from "../../api/axios";
import Swal from "sweetalert2";

const CourseCard = ({ course, onModuleAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const enrolled = course?.enrolled ?? 0;
  const seats = course?.availableSeats ?? 0;
  const fillPercentage = seats
    ? Math.min(Math.round((enrolled / seats) * 100), 100)
    : 0;

  const statusColorMap = {
    approved: "bg-success text-white",
    pending: "bg-warning text-white",
    denied: "bg-error text-white",
  };

  const statusClass =
    statusColorMap[course?.status] || "bg-base-300 text-base-content";

  const statusText = course?.status
    ? course.status[0].toUpperCase() + course.status.slice(1)
    : "Unknown";

  const handleAddModule = async (e) => {
    e.preventDefault();
    if (!moduleName.trim() || !videoUrl.trim()) return;

    setLoading(true);
    try {
      await instance.patch(`coures/content-collections/${course._id}`, {
        moduleName: moduleName.trim(),
        videoUrl: videoUrl.trim(),
      });

      Swal.fire({
        title: "Success!",
        text: "Module added successfully to " + course.name,
        icon: "success",
        confirmButtonText: "Cool",
        timer: 3000,
        timerProgressBar: true,
      });
      setModuleName("");
      setVideoUrl("");
      setIsModalOpen(false);

      // Optional: callback to refresh parent if needed
      if (onModuleAdded) onModuleAdded();
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "Module added Failed to " + course.name,
        icon: "error",
        confirmButtonText: "Cool",
        timer: 3000,
        timerProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="group relative bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
        {/* Image Section */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={course?.image}
            alt={course?.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h3 className="text-xl font-bold mb-2 line-clamp-2">
              {course?.name}
            </h3>
            <span className={`badge badge-lg font-medium ${statusClass}`}>
              {statusText}
            </span>
          </div>
          <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1.5 rounded-full font-semibold shadow">
            ${course?.price}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Enrolled Info */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center gap-2 font-medium">
                <HiUsers /> Enrolled
              </span>
              <span>
                {enrolled} / {seats || 0}
              </span>
            </div>
            <progress
              className="progress progress-primary w-full h-2"
              value={fillPercentage}
              max="100"
            />
            <p className="text-right text-xs mt-1 text-base-content/60">
              {fillPercentage}% filled
            </p>
          </div>

          {/* Feedback */}
          {course?.status === "denied" && course?.feedback?.message ? (
            <div
              className="tooltip tooltip-primary w-full"
              data-tip={course.feedback.message}
            >
              <button className="btn btn-outline btn-primary btn-sm w-full flex items-center justify-center gap-2">
                <HiInformationCircle /> View Feedback
              </button>
            </div>
          ) : (
            <p className="text-center text-sm italic text-base-content/50">
              No feedback from admin
            </p>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-secondary flex items-center justify-center gap-2"
            >
              <HiPlusCircle className="text-xl" /> Add Module
            </button>

            <Link
              to={`/dashbord/course-player/${course._id}`}
              className="btn btn-primary flex items-center justify-center gap-2"
            >
              <HiVideoCamera className="text-xl" /> View Content
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="modal-box max-w-lg w-full">
            {/* Course Title Header */}
            <div className="mb-6">
              <h3 className="font-bold text-2xl">Add New Module</h3>
              <p className="text-base-content/70 mt-2">
                Course: <span className="font-semibold text-primary">{course?.name}</span>
              </p>
            </div>

            <form onSubmit={handleAddModule}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-medium">Module Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Introduction to JavaScript"
                  className="input input-bordered w-full"
                  value={moduleName}
                  onChange={(e) => setModuleName(e.target.value)}
                  required
                />
              </div>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-medium">Video URL (YouTube Embed)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/embed/xyz"
                  className="input input-bordered w-full"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setModuleName("");
                    setVideoUrl("");
                  }}
                  className="btn btn-ghost"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Add Module"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCard;