import { useQuery } from "@tanstack/react-query";

const UseManageClass = () => {
  const {
    data: classes = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/classCollection"
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
  return [classes, refetch, isLoading];
};

export default UseManageClass;
