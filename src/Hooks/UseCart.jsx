import { useContext } from "react";
import { AuthContex } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const UseCart = () => {
  const { user } = useContext(AuthContex);

  const {
    data: cart = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://speakup-ivory.vercel.app/carts?email=${user?.email}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch cart data");
        }
        const data = await res.json();
        return data;
      } catch (error) {
        console.error(error);
        throw error; // Rethrow the error to let react-query handle it
      }
    },
  });
  return [cart, refetch, isLoading];
};

export default UseCart;
