// src/Hooks/UseUsersMange.jsx
import { useQuery } from "@tanstack/react-query";
import instance from "../api/axios";

const UseUsersMange = ({ page = 1, search = "" }) => {
  const {
    data = {},
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", page, search],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (page) params.append("page", page);
      if (search) params.append("search", search);

      const res = await instance.get(`/user/getAllUsers?${params.toString()}`);
      return res.data.data; // { users: [], totalUsers, totalPages, page, limit }
    },
    keepPreviousData: true, // Smooth pagination
  });

  return {
    users: data.users || [],
    totalUsers: data.totalUsers || 0,
    totalPages: data.totalPages || 1,
    currentPage: data.page || 1,
    refetch,
    isLoading,
    isError,
  };
};

export default UseUsersMange;