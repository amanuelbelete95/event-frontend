import { Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { CellContext, createColumnHelper } from "@tanstack/react-table";
import ReactTable from "../ReactTable";
import { getRegisterEvents, RegisterEventApiResponse } from "./api/getRegisterEvents";

const columnHelper = createColumnHelper<RegisterEventApiResponse>();
const basicColumns = [
  columnHelper.accessor(row => row.event.name, {
    id: "name",
    header: "Event Name",
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
    <ReactTable
      columns={basicColumns}
      data={registerEvents}
      tableCaption="Registered Events" />
  )
}

export default RegisterEvents;