import Swal from "sweetalert2";
import instance from "../api/axios";

const useDeleteFromCart = (refetch) => {
  const deleteFromCart = async (cartId) => {
    try {
      const res = await instance.delete("/carts", {
        data: { cartId },
      });
      console.log(res.data);
      if (res.data.data?.deletedCount > 0) {
        refetch();
        Swal.fire("Removed!", "Course removed from cart.", "success");
      } else {
        Swal.fire("Error!", "Failed to remove course.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  return deleteFromCart;
};

export default useDeleteFromCart;
