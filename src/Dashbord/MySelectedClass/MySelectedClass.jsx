import React from "react";
import { Helmet } from "react-helmet-async";
import UseCart from "../../Hooks/UseCart";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Navigate } from "react-router-dom";
import CartItem from "./cartItem";

const MySelectedClass = () => {
  const [cart, refetch] = UseCart();

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart size={80} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-3xl font-bold text-gray-700">Your Cart is Empty</h2>
          <p className="text-gray-500 mt-4">Add some courses to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Cart | CouresHub</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 flex items-center gap-4">
              <ShoppingCart size={40} className="text-indigo-600" />
              My Cart ({cart.length} {cart.length === 1 ? "Course" : "Courses"})
            </h1>
            <p className="text-lg text-gray-600 mt-3">Review your selected classes before payment</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, index) => (
                <CartItem key={item._id} item={item} index={index} refetch={refetch} />
              ))}
            </div>

            {/* Summary Card - Sticky on Large Screens */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600 font-semibold">- $0.00</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-2xl font-extrabold text-indigo-700">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    
                    Navigate("/dashboard/payment-choose", { state: { cart } });
                  }}
                  className="w-full mt-8 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <ShoppingCart size={24} />
                  Proceed to Payment
                </button>

                <p className="text-center text-sm text-gray-500 mt-6">
                  Secure checkout • 30-day money-back guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MySelectedClass;