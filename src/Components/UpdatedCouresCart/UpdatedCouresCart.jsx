import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseCart from "../../Hooks/UseCart";
import { AuthContex } from "../../Providers/AuthProvider";
import useAddToCart from "../../Hooks/AddCart";

const CourseCard = ({ course }) => {
  const {
    _id,
    name,
    price,
    details,
    image,
    instructorName,
    enrolled,
  } = course;

  const trimedDetails = details.substring(0, 50);
  const { user } = useContext(AuthContex);
  const navigate = useNavigate();

  const [, refetch] = UseCart();
  const [btnDisable, setDisable] = useState(false);

  const addToCart = useAddToCart(refetch, setDisable);

  const handleCart = () => {
    if (!user) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "You Need to Login First",
        showConfirmButton: false,
        timer: 2500,
      });
      return navigate("/login");
    }

    const selectedItem = {
      cartId: _id,
      name,
      image,
      price,
      email: user.email,
    };

    addToCart(selectedItem);
  };

  return (
    <div className="w-full rounded shadow-md bg-gray-100 flex flex-col">
      <img src={image} alt={name} className="w-full h-36 object-cover" />

      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-gray-500 text-sm">{trimedDetails}</p>
        </div>

        <div className="mt-4 space-y-2">
          <p><b>Enrolled:</b> {enrolled}</p>
          <p><b>Instructor:</b> {instructorName}</p>

          <button
            disabled={btnDisable}
            onClick={handleCart}
            className="w-full bg-gray-800 text-white py-1 rounded"
          >
            {btnDisable ? "Added" : "Add to cart"}
          </button>

          <Link
            to={`/courses/${_id}`}
            state={course}
            className="block text-center bg-blue-600 text-white py-1 rounded"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
