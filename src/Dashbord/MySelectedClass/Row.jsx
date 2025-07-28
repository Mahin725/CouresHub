import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import UseCart from "../../Hooks/UseCart";

const Row = ({ row, index }) => {
  const [, refetch] = UseCart();
  const navigate = useNavigate();
  const handlePayNow = () => {
    localStorage.setItem("row", JSON.stringify(row));
    navigate("/dashbord/payment-choose", { state: row });
  };
  // handle Remove Area
  const handleRemove = () => {
    const couresId = { cartId: row.cartId };
    console.log(couresId);
    fetch("https://speakup-ivory.vercel.app/carts", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(couresId),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Item Remove On Cart!!",
            showConfirmButton: false,
            timer: 2500,
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
              <img src={row.image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{row.name}</div>
            <div className="text-sm opacity-50">Coures Id: {row.cartId}</div>
          </div>
        </div>
      </td>
      <td>
        <p className="text-xl">${row.price}</p>
      </td>
      <td>
        <button onClick={handleRemove} className="btn btn-ghost ">
          {" "}
          <FaTrashAlt></FaTrashAlt>{" "}
        </button>
      </td>
      <th>
        <Link to={{ pathname: "/dashbord/payment-choose", state: { row } }}>
          <button onClick={handlePayNow} className="btn btn-ghost">
            Pay Now
          </button>
        </Link>
      </th>
    </tr>
  );
};

export default Row;
