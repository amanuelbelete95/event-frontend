import { CellContext, createColumnHelper } from "@tanstack/react-table";
import ReactTable from "../ReactTable"
import { Text } from "@chakra-ui/react";
import { EventAPIResponse } from "../events/events.type";
import { UserAPIResponse } from "../users/users.type";
import { useQuery } from "@tanstack/react-query";
import { getRegisterEvents, RegisterEventApiResponse } from "./api/getRegisterEvents";
import { useAuth } from "../auth/AuthProvider";

const columnHelper = createColumnHelper<RegisterEventApiResponse>();
const basicColumns = [
  columnHelper.accessor(row => row.event.name, { 
    id: "name",  
    header:"Event Name",
    cell: (info: CellContext<RegisterEventApiResponse, string>) => {
      const value = info.getValue();
      return <Text>{value}</Text>;
    },
  }),
  columnHelper.accessor(row => row.event.capacity, {
    id: "capacity",
    header: "Capacity",
    cell: (info: CellContext<RegisterEventApiResponse, number>) => {
      const value = info.getValue();
        return <Text>{value}</Text>;
    }
  }),
  columnHelper.accessor(row => row.user.username, {
    id: "username",
    header: "Username",
    cell: (info: CellContext<RegisterEventApiResponse, string>) => {
      const value = info.getValue();
      return <Text>{value}</Text>;
    },
  }),
  columnHelper.accessor(row => row.reason, {
    id: "reason",
    header: "Reason For Registering",
    cell: (info: CellContext<RegisterEventApiResponse, string>) => {
      const value = info.getValue();
        return <Text>{value}</Text>;
    },
  }),
  columnHelper.accessor(row => row.event.description, {
    id: "description",
    header: "Description",
    cell: (info: CellContext<RegisterEventApiResponse, string | undefined>) => {
      const value = info.getValue();
      return <Text>{value}</Text>;
    },
  }),
];



const RegisterEvents = () => {
    const { data: registerEvents = [] } = useQuery<RegisterEventApiResponse[]>({
    queryKey: ["register-events"],
    queryFn: getRegisterEvents,
  });
    return (
        <ReactTable columns={basicColumns} data={registerEvents} tableCaption="Registered Events" />
    )
}

export default RegisterEvents;