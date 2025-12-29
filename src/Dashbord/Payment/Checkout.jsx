import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContex } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Loader2, CheckCircle } from "lucide-react";

const Checkout = ({ course }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContex);

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const price = parseFloat(course?.price || 0);

  useEffect(() => {
    if (price > 0) {
      fetch("https://speakup-ivory.vercel.app/create-payment-intent", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ price }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          }
        })
        .catch((err) => console.error("Intent error:", err));
    }
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);
    setCardError("");

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "anonymous@example.com",
          name: user?.displayName || "Anonymous",
        },
      },
    });

    setProcessing(false);

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setSuccess(true);
      setTransactionId(paymentIntent.id);

      // Save payment to backend
      const paymentData = {
        email: user?.email,
        transaction: paymentIntent.id,
        couresId: course?.cartId,
        date: new Date().toISOString(),
        price: price,
        courseName: course?.name,
      };

      fetch("https://speakup-ivory.vercel.app/payments", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(paymentData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              text: `Enrolled in "${course.name}"`,
              timer: 3000,
              showConfirmButton: false,
            });
          }
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-3">
          Card Information
        </label>
        <div className="p-5 border border-gray-300 rounded-xl bg-gray-50 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100 transition-all">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "18px",
                  color: "#1f2937",
                  "::placeholder": {
                    color: "#9ca3af",
                  },
                },
                invalid: {
                  color: "#ef4444",
                },
              },
            }}
          />
        </div>
      </div>

      {/* Error Message */}
      {cardError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          {cardError}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-green-800 text-center">
          <CheckCircle size={48} className="mx-auto mb-3 text-green-600" />
          <p className="text-xl font-bold">Payment Successful!</p>
          <p className="mt-2">Transaction ID:</p>
          <p className="font-mono text-sm bg-white px-3 py-1 rounded mt-1 inline-block">
            {transactionId}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing || success}
        className="w-full py-5 px-8 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-xl rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
      >
        {processing ? (
          <>
            <Loader2 className="animate-spin" size={28} />
            Processing...
          </>
        ) : success ? (
          <>
            <CheckCircle size={28} />
            Payment Complete
          </>
        ) : (
          <>
            Pay ${price.toFixed(2)}
          </>
        )}
      </button>
    </form>
  );
};

export default Checkout;