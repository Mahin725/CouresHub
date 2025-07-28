import { useContext, useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContex } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import UseCart from "../../Hooks/UseCart";
import Coures from "../Home/Coures/Coures";

const CouresDetails = () => {
  // get data useing Location
  const location = useLocation();
  const couresInfo = location.state;
  console.log(couresInfo);
  const { user } = useContext(AuthContex);
  const [btnDisable, setDisable] = useState(false);
  const [userFromData, setUserData] = useState(null);
  const [cart, refetch] = UseCart();
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
      const { _id, price, image, name } = couresInfo;
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

  // pdf generator
  const infoPdf = () => {
    const doc = new jsPDF("landscape", "px", "a4", "false");
    doc.addFont("Helvertica", "bold");
    doc.text(20, 60, `Course Name: ${couresInfo.name}`);
    doc.text(20, 80, `Instructor Name: ${couresInfo.instructorName}`);
    doc.text(20, 100, `Total Enrolled : ${couresInfo.enrolled}`);
    doc.text(20, 120, `Available Seats : ${couresInfo.availableSeats}`);
    doc.text(20, 140, `Coures Ratings  : ${couresInfo.ratings}`);
    // doc.link(20, 150), `Image: Link : ${image}`;
    doc.text(20, 160, ` Price: $${couresInfo.price}`);
    doc.text(20, 180, couresInfo.details);
    doc.save(` ${couresInfo.name}.pdf`);
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
    <div>
      <div className="mt-[6rem] grid md:grid-cols-2 ">
        <div className="">
          <img
            className="border border-gray-200 md:w-[100%] p-9 h-screen rounded-lg"
            src={couresInfo.image}
            alt=""
          />
        </div>
        <div className="ml-8">
          <p className="text-4xl font-semibold">{couresInfo.name}</p>
          <p>
            by{" "}
            <span className="font-semibold underline">
              {couresInfo.instructorName}
            </span>
          </p>
          <div className="">
            <p className="text-xl my-3">{couresInfo.details}</p>
            <p>
              {" "}
              <span className="text-warning font-semibold">Price</span>:{" "}
              <span className="font-bold"> {couresInfo.price} USD</span>
            </p>
            <p>
              {" "}
              <span className="text-warning font-semibold">Discount Price</span>
              :{" "}
              <span className="font-bold"> {couresInfo.price - 19.8} USD</span>
            </p>
            <p>
              {" "}
              <span className="text-warning font-semibold">
                Available Seats
              </span>
              : <span className="font-bold"> {couresInfo.availableSeats}</span>
            </p>
            <p>
              {" "}
              <span className="text-warning font-semibold">Enrolled</span>:{" "}
              <span className="font-bold"> {couresInfo.enrolled}</span>
            </p>
            <p>
              {" "}
              <span className="text-warning font-semibold">Rating</span>:{" "}
              <span className="font-bold"> {couresInfo.ratings}</span>
            </p>
            <div className="my-3">
              <button
                onClick={handleCart}
                className="btn btn-outline bg-slate-500 mr-5"
              >
                Add to Cart
              </button>
              <button
                onClick={infoPdf}
                className="btn btn-outline bg-slate-500"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
      <Coures />
    </div>
  );
};

export default CouresDetails;
