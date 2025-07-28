import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContex } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import UseCart from "../../Hooks/UseCart";

const Checkout = ({ price, cartId }) => {
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const { user } = useContext(AuthContex);
  const [transaction, setTransaction] = useState("");
  const [cart, refetch] = UseCart();

  useEffect(() => {
    if (price) {
      fetch("https://speakup-ivory.vercel.app/create-payment-intent", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ price: price?.price }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setClientSecret(data.clientSecret);
        });
    }
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("Card Error: ", error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("PaymentMethod: ", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user.email || "Unknown",
            name: user.displayName || "Unknown",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError.message);
    }
    console.log(paymentIntent);
    if (paymentIntent.status === "succeeded") {
      setTransaction(paymentIntent.id);
      const payment = {
        email: user?.email,
        transaction: paymentIntent.id,
        couresId: price?.cartId,
        date: new Date().toISOString(),
      };
      console.log(payment);
      fetch("https://speakup-ivory.vercel.app/payments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);

          if (data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Successfully Enrolled The Class!",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
    }
  };
  return (
    <>
      <form className="w-[300px]" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-outline btn-md mt-7"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay Now
        </button>
        {/* <button></button> */}
      </form>
      {cardError && <p className="text-red-600">{cardError}</p>}
      {transaction && (
        <p className="text-green-600">
          Transaction Completed with Transaction Id :{" "}
          <span className="font-semibold text-1xl">{transaction}</span>
        </p>
      )}
    </>
  );
};

export default Checkout;
