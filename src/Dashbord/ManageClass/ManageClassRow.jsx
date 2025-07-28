import Swal from "sweetalert2";
import UseManageClass from "../../Hooks/UseManageClass";
import { useState } from "react";
import { Link } from "react-router-dom";

const ManageClassRow = ({ index, item }) => {
  const [classes, refetch] = UseManageClass();

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
        <Link
          to={`/coures-content`}
          state={item}
          className="btn btn-outline btn-sm"
        >
          View
        </Link>
      </td>
      
    </tr>
  );
};

export default ManageClassRow;
