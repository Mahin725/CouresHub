import { Link } from "react-router-dom";
import {
  HiPencil,
  HiUsers,
  HiInformationCircle,
} from "react-icons/hi";

const CourseCard = ({ course }) => {
  // safe numbers
  const enrolled = course?.enrolled ?? 0;
  const seats = course?.availableSeats ?? 0;

  const fillPercentage = seats
    ? Math.min(Math.round((enrolled / seats) * 100), 100)
    : 0;

  // status color map (cleaner than function)
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

  return (
    <div className="group relative bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={course?.image}
          alt={course?.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Title + Status */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h3 className="text-xl font-bold mb-2 line-clamp-2">
            {course?.name}
          </h3>
          <span className={`badge badge-lg font-medium ${statusClass}`}>
            {statusText}
          </span>
        </div>

        {/* Price */}
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

        {/* Update Button */}
        <Link
          to={`/dashbord/update-class/${course?._id}`}
          className="btn btn-primary btn-block flex items-center gap-2"
        >
          <HiPencil /> Update Class
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
