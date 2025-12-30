import { useContext, useEffect, useState } from "react";
import { AuthContex } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";

import PaymentInfo from "./PaymentInfo";
import { FaHistory, FaExclamationTriangle } from "react-icons/fa";
import instance from "../../api/axios";

const PaymentHistory = () => {
  const { user } = useContext(AuthContex);
  const [paymentsData, setPaymentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchPaymentHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await instance.get("/pay/payment-history", {
          params: { email: user.email },
        });
        setPaymentsData(response.data.data || []);
      } catch (err) {
        console.error("Error fetching payment history:", err);
        setError("Failed to load payment history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [user?.email]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Helmet>
        <title>Payment History | SpeakUp</title>
      </Helmet>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-4">
            <FaHistory className="text-4xl" />
            <div>
              <h1 className="text-3xl font-bold">Payment History</h1>
              <p className="text-indigo-100 mt-1">
                View all your course enrollment transactions
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 border-solid"></div>
            <p className="mt-4 text-gray-600">Loading your payments...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg flex items-center gap-3">
            <FaExclamationTriangle className="text-2xl" />
            <p>{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && paymentsData.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <div className="text-gray-400 text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-700">
              No Payments Yet
            </h3>
            <p className="text-gray-500 mt-2">
              You haven't enrolled in any courses yet.
            </p>
          </div>
        )}

        {/* Payment List */}
        {!loading && !error && paymentsData.length > 0 && (
          <div className="grid gap-6 md:grid-cols-1">
            {paymentsData.map((item, index) => (
              <PaymentInfo key={item._id} item={item} index={index + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;