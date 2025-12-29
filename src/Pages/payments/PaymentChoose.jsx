import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CreditCard, Shield, ArrowRight } from "lucide-react";
import useSslPay from "../../Hooks/useSslPay";

const PaymentChoose = () => {
  const location = useLocation();
  const item = location.state;

  const sslPay = useSslPay();

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Shield size={60} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold text-gray-700">
            No course selected
          </h2>
          <p className="text-gray-500 mt-2">
            Please go back to your cart and select a course.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Complete Your Purchase
          </h1>
          <p className="text-xl text-gray-600">
            Choose your preferred payment method
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Payment Methods */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <CreditCard className="text-indigo-600" />
                  Select Payment Method
                </h2>

                {/* Stripe */}
                <Link to="/dashbord/stripe-pay" state={{ item }}>
                  <div className="group bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-xl text-white hover:scale-105 transition-all cursor-pointer">
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-bold">Pay with Stripe</p>
                      <ArrowRight />
                    </div>
                  </div>
                </Link>

                {/* SSL */}
                <button
                  onClick={() => sslPay(item)}
                  className="mt-4 w-full group bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-xl text-white hover:scale-105 transition-all"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-bold">Pay with SSLCommerz</p>
                    <ArrowRight />
                  </div>
                </button>
              </div>

              <div className="bg-gray-50 px-8 py-6 border-t">
                <div className="flex justify-center gap-8 text-sm text-gray-600">
                  <span className="flex items-center gap-2">
                    <Shield className="text-green-600" size={18} />
                    Secure Payment
                  </span>
                  <span className="flex items-center gap-2">
                    <CreditCard className="text-green-600" size={18} />
                    Encrypted
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl shadow-xl border p-8">
              <h3 className="text-2xl font-bold mb-6">Order Summary</h3>

              <div className="flex gap-6 mb-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-semibold text-lg">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    Course ID: {item.cartId}
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex justify-between text-lg">
                  <span>Course Price</span>
                  <span className="font-bold text-indigo-600">
                    ${parseFloat(item.price || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentChoose;
