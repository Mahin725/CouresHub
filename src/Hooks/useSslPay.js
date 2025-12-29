import instance from "../api/axios";
import Swal from "sweetalert2";

const useSslPay = () => {
  const sslPay = async (item) => {
    try {
      const res = await instance.post("/pay/sslPay", item);

      if (res.data?.url) {
        window.location.replace(res.data.url);
      } else {
        Swal.fire("Error", "Payment URL not found", "error");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  return sslPay;
};

export default useSslPay;
