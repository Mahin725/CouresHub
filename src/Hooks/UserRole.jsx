import { useContext } from "react";
import { AuthContex } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import instance from "../api/axios";

const UserRole = () => {
  const { user } = useContext(AuthContex);
  const { data: dataUser, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await instance.get(`/user/getUser?email=${user?.email}`)
      return res.data.data;
    },
  });
  return [dataUser, isLoading];
};
export default UserRole;
