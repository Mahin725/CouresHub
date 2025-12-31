import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CheckoutForm from './Checkout';
import { Shield, CreditCard, Lock } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_PK);

const Payment = () => {
  const location = useLocation();
  const course = location.state?.item;
  console.log(course);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield size={60} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700">No course selected</h2>
          <p className="text-gray-500 mt-2">Please go back and select a course to pay.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Secure Checkout | CouresHub</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Lock size={32} className="text-green-600" />
              <span className="text-green-600 font-semibold text-lg">Secure Checkout</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Complete Your Enrollment
            </h1>
            <p className="text-xl text-gray-600 mt-4">You're one step away from starting your journey</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-indigo-100 p-3 rounded-xl">
                    <CreditCard size={32} className="text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
                </div>

                <Elements options={{}} stripe={stripePromise} >
                  <CheckoutForm course={course} />
                </Elements>

                {/* Trust Badges */}
                <div className="mt-10 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Shield size={20} className="text-green-600" />
                      <span>256-bit SSL Encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock size={20} className="text-green-600" />
                      <span>PCI DSS Compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg width="40" viewBox="0 0 64 32" className="fill-gray-700">
                        <path d="M46.21 19.601c0-2.913 2.316-3.188 5.832-3.188 3.516 0 6.007.275 8.498 1.101v-4.951c-2.766-.688-5.557-.963-8.498-.963-5.557 0-10.508 2.138-10.508 7.814 0 3.188 2.491 5.051 7.167 5.876 3.791.688 5.557.963 5.557 2.688 0 1.376-1.101 2.413-4.126 2.413-3.516 0-6.832-.963-9.598-1.926v4.951c3.241.963 6.557 1.376 9.598 1.376 6.007 0 11.234-2.413 11.234-8.227 0-3.188-2.316-5.326-7.442-6.152-3.791-.688-5.832-.963-5.832-2.688 0-.963.688-1.926 2.754-1.926 2.491 0 4.401.688 6.007 1.376v-4.676c-2.041-.55-4.401-.825-6.832-.825-4.676 0-8.773 1.926-8.773 6.602 0 2.688 2.041 4.401 5.832 5.051z"/>
                        <path d="M0 6.602v18.796h8.773c3.516 0 5.832-1.651 5.832-4.676v-9.948c0-3.025-2.316-4.676-5.832-4.676zm3.241 3.791h3.516c1.376 0 2.041.55 2.041 1.651v9.123c0 1.101-.688 1.651-2.041 1.651h-3.516z"/>
                        <path d="M22.756 6.602v18.796h5.557l7.442-18.796h-5.557l-4.126 10.773-4.126-10.773z"/>
                        <path d="M36.879 15.2c0-5.051 4.401-8.502 11.234-8.502 3.791 0 6.557.825 8.773 2.138l-1.376 4.126c-1.926-1.101-4.126-1.651-6.832-1.651-3.516 0-6.007 2.138-6.007 5.326 0 3.188 2.491 5.326 6.007 5.326 2.766 0 5.051-.55 6.832-1.651l1.376 4.126c-2.316 1.376-5.107 2.138-8.773 2.138-6.832 0-11.234-3.463-11.234-8.502z"/>
                      </svg>
                      <span>Powered by Stripe</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>

                <div className="flex gap-5 mb-6">
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-24 h-24 object-cover rounded-xl shadow-md"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 line-clamp-2">{course.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">Course ID: {course.cartId}</p>
                  </div>
                </div>

                <div className="space-y-4 border-t pt-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price</span>
                    <span className="text-3xl font-extrabold text-indigo-600">
                      ${parseFloat(course.price || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span>Included</span>
                  </div>
                </div>

                <div className="mt-8 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                  <p className="text-indigo-800 font-medium text-center">
                    ✓ Lifetime Access<br/>
                    ✓ Completion Certificate<br/>
                    ✓ 30-Day Money-Back Guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;