import React, { useContext, useEffect, useState } from "react";
import { AuthContex } from "../../Providers/AuthProvider";
import CouresCart from "../../Components/CouresCart/CouresCart";
import Item from "./Item";
import { Helmet } from "react-helmet-async";

const EnrolledClass = () => {
  const [enrolled, setEnrolled] = useState(null || []);
  const { user } = useContext(AuthContex);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://speakup-ivory.vercel.app/enrolled-classes?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setEnrolled(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  return (
    <div>
      <Helmet>
        <title>ENROLLED CLASSES || SpeakUp</title>
      </Helmet>
      <div className="flex flex-row items-center justify-between pe-2 bg-zinc-900 py-4 rounded-sm">
        <p className="text-sm text-white md:text-white font-semibold border-l-4 border-primary ml-2 inline-block px-2 md:px-5">
          ENROLLED CLASSES
        </p>
      </div>
      {/* <h2 className='text-4xl text-center font-semibold my-4'>Continue Your Enrolled Classes</h2> */}

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Instructor Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {enrolled.map((item, index) => (
              <Item key={item._id} item={item} index={index}></Item>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrolledClass;
