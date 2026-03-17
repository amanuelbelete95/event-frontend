import { CellContext, createColumnHelper } from "@tanstack/react-table";
import ReactTable from "../ReactTable"
import { Text } from "@chakra-ui/react";
import { EventAPIResponse } from "../events/events.type";
import { UserAPIResponse } from "../users/users.type";
import { useQuery } from "@tanstack/react-query";
import { getRegisterEvents } from "./api/getRegisterEvents";

interface RegisterEventApiResponse {
    event: EventAPIResponse;
    user: UserAPIResponse;
    reason: string;
}
const columnHelper = createColumnHelper<RegisterEventApiResponse>();
const basicColumns = [
  columnHelper.accessor("event.id", {
    header: "Event ID",
    cell: (info: CellContext<RegisterEventApiResponse, string>) => {
      const value = info.getValue();
      return <Text>{value}</Text>;
    },
  }),
  columnHelper.accessor("event.name", {   
    header: "Event Name",
    cell: (info: CellContext<RegisterEventApiResponse, string>) => {
      const value = info.getValue();
      return <Text>{value}</Text>;
    },
  }),
  columnHelper.accessor("event.capacity", {
    header: "Capacity",
    cell: (info: CellContext<RegisterEventApiResponse, number>) => {
      const value = info.getValue();
        return <Text>{value}</Text>;
    }
  }),
  columnHelper.accessor("user.username", {
    header: "Username",
    cell: (info: CellContext<RegisterEventApiResponse, string>) => {
      const value = info.getValue();
      return <Text>{value}</Text>;
    },
  }),
  columnHelper.accessor("reason", {
    header: "Reason",
    cell: (info: CellContext<RegisterEventApiResponse, string>) => {
      const value = info.getValue();
        return <Text>{value}</Text>;
    },
  }),
  columnHelper.accessor("event.description", {
    header: "Description",
    cell: (info: CellContext<RegisterEventApiResponse, string | undefined>) => {
      const value = info.getValue();
      return <Text>{value}</Text>;
    },
  }),
];

const RegisterEvents = () => {

    const { data: registerEvents    = [], refetch } = useQuery({
    queryKey: ["register-events"],
    queryFn: getRegisterEvents,
  });
    return (
        <ReactTable columns={basicColumns} data={registerEvents}/>
    )
}

export default RegisterEvents;