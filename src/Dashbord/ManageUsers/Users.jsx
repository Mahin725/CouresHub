import { HiOutlineUser, HiOutlineUserCircle } from "react-icons/hi";
import UseUsersMange from "../../Hooks/UseUsersMange";
import Swal from "sweetalert2";

const Users = ({ user, index }) => {
  const [users, refetch] = UseUsersMange();

  // Make Admin
  const handleMakeAdmin = () => {
    const id = user._id;
    fetch(`http://localhost:5000/make-admin/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Made Admin Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  // ✅ Make Club Member
  const handleMakeClubMember = () => {
    fetch("http://localhost:5000/add-club-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: data.message || "Added to Club Members",
          showConfirmButton: false,
          timer: 1500,
        });
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
          <HiOutlineUser />
        </button>
      </td>
      <td>
        <button
          onClick={handleMakeClubMember}
          className="btn btn-outline btn-sm"
        >
          <HiOutlineUserCircle />
        </button>
      </td>
    </tr>
  );
};

export default Users;
