import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseCart from "../../Hooks/UseCart";
import { AuthContex } from "../../Providers/AuthProvider";

const CourseCard = ({ course }) => {
  console.log(course);
  const {
    _id,
    name,
    price,
    details,
    image,
    instructorName,
    enrolled,
    availableSeats,
  } = course;
  const trimedDetails = details.substring(0, 50);
  const { user } = useContext(AuthContex);

  const [cart, refetch] = UseCart();
  const [btnDisable, setDisable] = useState(false);
  const [userFromData, setUserData] = useState(null);
  const handleCart = () => {
    if (!user) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "You Need to Login Frist",
        showConfirmButton: false,
        timer: 2500,
      });
      return Navigate("/login");
    }
    if (user && user?.email) {
      const { _id, price, image, name } = course;
      const seletedItem = {
        cartId: _id,
        name,
        image,
        price,
        email: user.email,
      };
      fetch("http://localhost:5000/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(seletedItem),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            refetch();
            setDisable(true);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Coures Added On Cart!!",
              showConfirmButton: false,
              timer: 2500,
            });
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Coures Was Added!!",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/user?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setUserData(data);
        });
    }
  }, [user?.email]);

  return (
    <div
      key={_id}
      className="w-full md:h-[450px] xl:h-[400px] rounded overflow-hidden shadow-md bg-gray-100  flex flex-col"
    >
      {/* CARD IMAGE */}
      <div>
        <img src={image} alt={name} className="w-full h-36 object-cover" />
      </div>

      {/* CARD INFO/BODY */}
      <div className="flex flex-col justify-between p-4 text-sm h-full">
        <div className="mt-4">
          <div className="font-bold text-base mb-2">{name}</div>
          <p className="text-gray-500 text-sm">{trimedDetails}</p>
        </div>

        <div className="flex flex-col justify-start gap-4 mt-5">
          <div className="">
            <p className="text-start text-gray-600 text-sm">
              <span className="font-semibold">Total enrolled:</span> {enrolled}
            </p>
            <p className="text-start text-gray-600 text-sm">
              <span className="font-semibold">Instructor:</span>{" "}
              {instructorName}
            </p>
          </div>

          <div className="mt-auto w-full space-y-2">
            <button
              disabled={btnDisable}
              onClick={handleCart}
              className="w-full bg-gray-800 text-white font-semibold py-1 md:py2 px-4 rounded-sm duration-300"
            >
              {btnDisable ? "Added" : "Add to cart"}
            </button>
            <button className="w-full bg-gray-800 text-white font-semibold py-1 md:py2 px-4 rounded-sm duration-300">
              <Link
                to={`/courses/${_id}`}
                state={course}
                course={course}
                className="block"
              >
                View Details
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
