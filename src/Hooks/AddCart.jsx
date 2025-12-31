import Swal from "sweetalert2";
import instance from "../api/axios";

const useAddToCart = (refetch, setDisable) => {
  const addToCart = async (item) => {
    try {
      const res = await instance.post("/carts", item);
        console.log(res.data.data?.insertedId);
      if (res.data.data?.insertedId) {
        refetch();
        setDisable(true);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Course Added To Cart!",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Already Added!",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
      });
    }
  };

  return addToCart;
};

export default useAddToCart;
