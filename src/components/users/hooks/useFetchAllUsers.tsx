import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/getAllUsers";
import { UserAPIResponse } from "../users.type";

const useFetchAllUsers = () =>
  useQuery<UserAPIResponse>({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

export default useFetchAllUsers;