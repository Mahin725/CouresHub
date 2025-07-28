import { useQuery } from "@tanstack/react-query";

const UseUsersMange = () => {
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await fetch("https://speakup-ivory.vercel.app/all-users");
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
  return [users, refetch, isLoading];
};

export default UseUsersMange;
