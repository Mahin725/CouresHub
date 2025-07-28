import { useContext } from "react";
import { useEffect } from "react";
import { AuthContex } from "../../Providers/AuthProvider";
import { useState } from "react";
import PaymentInfo from "./PaymentInfo";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
  const { user } = useContext(AuthContex);
  const [paymentsData, setPaymentsData] = useState([]);

  useEffect(() => {
    if (user.email) {
      fetch(
        `http://localhost:5000/payment-history?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setPaymentsData(data);
        });
    }
  }, [user.email]);
  return (
    <div>
      <Helmet>
        <title>Payment HIstory || SpeakUp</title>
      </Helmet>
      {/* Header */}
      <div className="flex flex-row items-center justify-between pe-2 bg-zinc-900 py-4 rounded-sm">
        <p className="text-sm text-white md:text-white font-semibold border-l-4 border-primary ml-2 inline-block px-2 md:px-5">
          Payment History
        </p>
      </div>
      {/* header end */}
      {/* <h3 className="text-4xl text-center font-semibold">Payment History</h3> */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Transaction Id</th>
              <th>Coures Id</th>
              <th>Date</th>
              <th>invoice</th>
            </tr>
          </thead>
          <tbody>
            {paymentsData.map((item, index) => (
              <PaymentInfo
                key={item._id}
                item={item}
                index={index}
              ></PaymentInfo>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
