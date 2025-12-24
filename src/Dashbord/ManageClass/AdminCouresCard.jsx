import { useState } from "react";
import Swal from "sweetalert2";
import instance from "../../api/axios"; // Your configured axios instance

const AdminCourseCard = ({ item, refetch }) => {
  const [loadingAction, setLoadingAction] = useState(null); // Tracks which button is loading

  const getStatusBadge = () => {
    switch (item.status) {
      case "approved":
        return "badge badge-success badge-lg";
      case "pending":
        return "badge badge-warning badge-lg";
      case "denied":
        return "badge badge-error badge-lg";
      default:
        return "badge badge-ghost badge-lg";
    }
  };

  const isActionDisabled = item.status === "approved" || item.status === "denied";

  const handleApprove = async () => {
    setLoadingAction("approve");
    try {
      const res = await instance.put(`/coures/make-approval/${item._id}`);
      if (res.data.success || res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Class Approved!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Approve error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to approve",
        text: "Please try again.",
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDeny = async () => {
    setLoadingAction("deny");
    try {
      const res = await instance.put(`/coures/deniedCoures/${item._id}`);
      if (res.data.success || res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Class Denied",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Deny error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to deny",
        text: "Please try again.",
      });
    } finally {
      setLoadingAction(null);
    }
  };

  const handleFeedback = () => {
    Swal.fire({
      title: "Send Feedback to Instructor",
      input: "textarea",
      inputPlaceholder: "Write your feedback here (e.g., improve description, add more content)...",
      inputAttributes: {
        required: "true",
      },
      showCancelButton: true,
      confirmButtonText: "Send Feedback",
      cancelButtonText: "Cancel",
      preConfirm: (message) => {
        if (!message.trim()) {
          Swal.showValidationMessage("Feedback cannot be empty");
        }
        return message.trim();
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoadingAction("feedback");
        try {
          const res = await instance.put(`/coures/feedback/${item._id}`, {
            message: result.value,
          });

          if (res.data.success || res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Feedback Sent!",
              text: "Instructor has been notified.",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          console.error("Feedback error:", error);
          Swal.fire({
            icon: "error",
            title: "Failed to send feedback",
            text: "Please try again.",
          });
        } finally {
          setLoadingAction(null);
        }
      }
    });
  };

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
      <figure className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="h-48 w-full object-cover rounded-t-xl"
        />
        <div className="absolute top-4 right-4">
          <span className={getStatusBadge()}>
            {item.status?.charAt(0).toUpperCase() + item.status?.slice(1)}
          </span>
        </div>
      </figure>

      <div className="card-body">
        <h2 className="card-title text-xl">{item.name}</h2>
        <p className="text-sm text-base-content/60">ID: {item._id}</p>
        <p className="text-sm">
          Seats: <strong>{item.availableSeats}</strong> | Price: <strong>${item.price}</strong>
        </p>

        <div className="divider my-4"></div>

        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={item.instructorImage || "/default-avatar.png"}
                alt={item.instructorName}
              />
            </div>
          </div>
          <div>
            <p className="font-semibold">{item.instructorName}</p>
            <p className="text-sm text-base-content/70">{item.instructorEmail}</p>
          </div>
        </div>

        <div className="card-actions justify-between mt-6 gap-3">
          <button
            onClick={handleApprove}
            disabled={isActionDisabled || loadingAction}
            className="btn btn-success btn-sm flex-1"
          >
            {loadingAction === "approve" ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Approve"
            )}
          </button>

          <button
            onClick={handleDeny}
            disabled={isActionDisabled || loadingAction}
            className="btn btn-error btn-sm flex-1"
          >
            {loadingAction === "deny" ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Deny"
            )}
          </button>

          <button
            onClick={handleFeedback}
            disabled={loadingAction}
            className="btn btn-primary btn-sm flex-1"
          >
            {loadingAction === "feedback" ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Feedback"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCourseCard;