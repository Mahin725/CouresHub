import Swal from "sweetalert2";
import UseManageClass from "../../Hooks/UseManageClass";
import { useState } from "react";

const ManageClassRow = ({ index, item }) => {
  const [classes, refetch] = UseManageClass();

  const handleFeedback = () => {
    Swal.fire({
      title: "Send Feedback",
      input: "textarea",
      inputPlaceholder: "Enter feedback reason...",
      showCancelButton: true,
      confirmButtonText: "Send",
      cancelButtonText: "Cancel",
      preConfirm: (reason) => {
        if (reason) {
          const message = reason;
          fetch(`http://localhost:5000/feedback/${item._id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ message }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            });
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Feedback sent successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDeny = () => {
    const id = item._id;
    fetch(`http://localhost:5000/classDenied/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.ok) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Class Denied Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleApprove = () => {
    const id = item._id;
    fetch(`http://localhost:5000/classCollection/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.ok) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Class Approved Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={item.image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{item.name}</div>
            <div className="text-sm opacity-50">Class Id: {item._id}</div>
            <div className="text-sm opacity-50">
              {" "}
              Available Seats: {item.availableSeats}
            </div>
          </div>
        </div>
      </td>
      <td>
        <span className="text-xl">{item.instructorName}</span>
        <br />
        <span className="badge badge-ghost badge-sm">
          {item.instructorEmail}
        </span>
      </td>
      <td>{item.status}</td>
      <td>
        <button
          onClick={handleApprove}
          disabled={item.status === "approved" || item.status === "denied"}
          className="btn btn-outline btn-sm"
        >
          Approved
        </button>
      </td>
      <td>
        <button
          onClick={handleDeny}
          disabled={item.status === "approved" || item.status === "denied"}
          className="btn btn-outline btn-sm"
        >
          Deny
        </button>
      </td>
      <td>
        <button onClick={handleFeedback} className="btn btn-outline btn-sm">
          Feedback
        </button>
      </td>
    </tr>
  );
};

export default ManageClassRow;
