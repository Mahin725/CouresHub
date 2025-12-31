import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";
import useDeleteFromCart from "../../Hooks/useDeleteFromCart";

const CartItem = ({ item, refetch }) => {
  const navigate = useNavigate();
  const deleteFromCart = useDeleteFromCart(refetch);

  const handleRemove = () => {
    Swal.fire({
      title: "Remove from Cart?",
      text: `"${item.name}" will be removed`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFromCart(item.cartId);
      }
    });
  };

  const handlePayNow = () => {
    navigate("/dashbord/payment-choose", { state: item });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6">
        {/* Image */}
        <img
          src={item.image}
          alt={item.name}
          className="w-28 h-28 object-cover rounded-xl shadow-md"
        />

        {/* Details */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            Course ID: {item.cartId}
          </p>
          <p className="text-3xl font-extrabold text-indigo-600 mt-3">
            ${parseFloat(item.price || 0).toFixed(2)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 self-end sm:self-center">
          <button
            onClick={handleRemove}
            className="p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition-all"
            title="Remove"
          >
            <Trash2 size={22} />
          </button>

          <button
            onClick={handlePayNow}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
