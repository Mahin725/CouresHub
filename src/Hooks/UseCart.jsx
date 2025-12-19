import { useContext } from "react";
import { AuthContex } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import instance from "../api/axios";

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
        const res = await instance.get(`/carts`, {
          params: { email: user.email },
        })

        const data = await res.data.data;
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
