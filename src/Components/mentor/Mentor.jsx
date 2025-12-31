import { useState } from "react";
import MentorDetailsModal from "../../Pages/Instructors/MentorDetailsModal";

const Mentor = ({ mentor }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-base-200 rounded-xl shadow-md p-6 hover:shadow-xl transition">
        <div className="flex flex-col items-center">
          <img
            src={mentor?.instructorImage}
            className="w-20 h-20 rounded-full mb-3"
          />

          <h2 className="text-lg font-semibold">
            {mentor?.instructorName}
          </h2>

          <p className="text-sm text-gray-500 mb-4">
            {mentor?.role}
          </p>

          <div className="flex justify-between w-full text-center mb-4">
            <div className="flex-1">
              <p className="font-bold">
                {mentor?.totalClasses}
              </p>
              <p className="text-xs text-gray-400">
                Classes
              </p>
            </div>

            <div className="flex-1">
              <p className="font-bold">
                {mentor?.totalStudents}
              </p>
              <p className="text-xs text-gray-400">
                Students
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="btn btn-primary btn-sm w-full"
          >
            View Details
          </button>
        </div>
      </div>

      <MentorDetailsModal
        mentor={mentor}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default Mentor;
