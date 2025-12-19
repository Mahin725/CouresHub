import { useQuery } from "@tanstack/react-query";
import instance from "../api/axios";

const UseUsersMange = () => {
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await instance.get("/user/getAllUsers?page=1")
        
        return res.data.data;
      } catch (error) {
        console.error(error);
        throw error; // Rethrow the error to let react-query handle it
      }
    },
  });
  return [users, refetch, isLoading];
};

export default UseUsersMange;
