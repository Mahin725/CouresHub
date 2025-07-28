import { HiOutlineUser, HiOutlineUserCircle } from "react-icons/hi";
import UseUsersMange from "../../Hooks/UseUsersMange";
import Swal from "sweetalert2";

const Users = ({ user, index }) => {
  const [users, refetch] = UseUsersMange();
  const handleMakeAdmin = () => {
    const id = user._id;
    fetch(`http://localhost:5000/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Make Admin Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  // Make Instructor
  const handleMakeInstructor = () => {
    const id = user._id;
    fetch(`http://localhost:5000/ctor/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Make Instructor Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <tr className="bg-base-200">
      <th>{index + 1}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <button
          onClick={handleMakeAdmin}
          disabled={user.role === "admin"}
          className="btn btn-outline btn-sm"
        >
          {" "}
          <HiOutlineUser></HiOutlineUser>{" "}
        </button>
      </td>
      <td>
        <button
          onClick={handleMakeInstructor}
          disabled={user.role === "instructor"}
          className="btn btn-outline btn-sm"
        >
          {" "}
          <HiOutlineUserCircle></HiOutlineUserCircle>{" "}
        </button>
      </td>
    </tr>
  );
};

export default Users;
