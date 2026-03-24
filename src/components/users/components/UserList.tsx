import { SearchIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Input, InputGroup, InputLeftElement, Spacer, Text } from '@chakra-ui/react';
import { CellContext, createColumnHelper } from '@tanstack/react-table';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { EventDesignSystem } from '../../events/designSystem';
import ReactTable from '../../ReactTable';
import { getAllUsers } from '../api/getAllUsers';
import { UserAPIResponse } from '../users.type';


export const loader: LoaderFunction = async () => {
  try {
    const users = await getAllUsers();
    return users;
  } catch (error) {
    return Promise.reject(error)
  }

};

const UserList = () => {
  const users = useLoaderData() as UserAPIResponse[];
  const columnHelper = createColumnHelper<UserAPIResponse>();
  const basicColumns = [
     columnHelper.accessor(row => row.id, {
      id: "id",
      header: "ID",
      cell: (info: CellContext<UserAPIResponse, string | undefined>) => {
        const value = info.getValue();
        return <Text>{value}</Text>;
      },
    }),
    columnHelper.accessor(row => row.username, {
      id: "username",
      header: "Username",
      cell: (info: CellContext<UserAPIResponse, string>) => {
        const value = info.getValue();
        return <Text>{value}</Text>;
      },
    }),
    columnHelper.accessor(row => row.role, {
      id: "role",
      header: "Role",
      cell: (info: CellContext<UserAPIResponse, string>) => {
        const value = info.getValue();
        return <Text>{value}</Text>;
      }
    }),
   
  ];

  return (
    <Box p={6} maxW="1200px" mx="auto" bg="gray.50" minHeight="100vh">
      <Flex mb={6} align="center" direction={{ base: 'column', md: 'row' }} gap={4}>
        <Heading size="xl" color={EventDesignSystem.primaryColor} fontWeight="bold">Users Management</Heading>
        <Spacer />
      </Flex>
      <ReactTable columns={basicColumns} data={users}/>
    </Box>
  );
};
export default UserList;