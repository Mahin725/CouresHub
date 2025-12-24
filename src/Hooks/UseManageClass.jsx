import { useQuery } from "@tanstack/react-query";
import instance from "../api/axios";

const UseManageClass = () => {
  const {
    data: classes = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      try {
        const res = await instance.get("/coures/allCoures")
        return res.data.data;
      } catch (error) {
        console.error(error);
        throw error; // Rethrow the error to let react-query handle it
      }
    },
  });
  return [classes, refetch, isLoading];
};

export default UseManageClass;
