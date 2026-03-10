import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/getAllUsers";
import { UserListResponse } from "../users.type";

const useFetchAllUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

export default useFetchAllUsers;