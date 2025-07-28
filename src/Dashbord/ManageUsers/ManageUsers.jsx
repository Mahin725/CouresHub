import { useEffect } from "react";
import { useState } from "react";
import Users from "./Users";
import UseUsersMange from "../../Hooks/UseUsersMange";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  // const [allusers, setAllusers] = useState([])

  const [users] = UseUsersMange();
  // useEffect(() => {
  //     fetch('http://localhost:5000/
  //         .then(res => res.json())
  //         .then(data => {
  //             console.log(data);
  //             setAllusers(data)
  //         })
  // }, [])

  return (
    <div>
      <Helmet>
        <title>MANAGE USER || SpeakUp</title>
      </Helmet>
      {/* Header */}
      <div className="flex flex-row items-center justify-between pe-2 bg-zinc-900 py-4 rounded-sm">
        <p className="text-sm text-white md:text-white font-semibold border-l-4 border-primary ml-2 inline-block px-2 md:px-5">
          Manage All Users
        </p>
      </div>
      {/* header end */}
      {/* <h2 className="text-3xl text-center font-semibold">Manage All Users</h2> */}

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Make Admin</th>
              <th>Add Club Member</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <Users key={user._id} index={index} user={user}></Users>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
