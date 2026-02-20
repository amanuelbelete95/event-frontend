import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import { Badge, Box, Button, Card, CardBody, CardHeader, Flex, Heading, HStack, Input, InputGroup, InputLeftElement, SimpleGrid, Spacer, Text, useToast, VStack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import { UserAPIResponse, UserListResponse } from '../users.type';
import { EventDesignSystem } from '../../events/designSystem';
import DetailActions from '../../DetailActions';
import { getAllUsers } from '../api/getAllUsers';

interface UserListProps {
  isAdmin: boolean
}

export const loader: LoaderFunction = async () => {
  try {
    const users = await getAllUsers();
    return users;
  } catch (error) {
    return Promise.reject(error)
  }

};

const UserList = (props: UserListProps) => {
  const {isAdmin} = props
  const navigate = useNavigate();
  const usersResponse = useLoaderData() as UserListResponse;
  const users = usersResponse.users;
  const [searchTerm, setSearchTerm] = useState('');
  const toast = useToast();

  const filteredUsers = useMemo(() => {
    return users.filter((user: UserAPIResponse) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  return (
    <Box p={6} maxW="1200px" mx="auto" bg="gray.50" minHeight="100vh">
      <Flex mb={6} align="center" direction={{ base: 'column', md: 'row' }} gap={4}>
        <Heading size="xl" color={EventDesignSystem.primaryColor} fontWeight="bold">Users Management</Heading>
        <Spacer />
        <InputGroup maxW="300px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
       { isAdmin && <Button
          leftIcon={<AddIcon />}
          bg={EventDesignSystem.primaryColor}
          color="white"
          onClick={() => navigate("new")}
          size="md"
          _hover={{ bg: EventDesignSystem.primaryDark }}
          _active={{ transform: "scale(0.98)" }}
          boxShadow="md"
        >
          Add New User
        </Button>}
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={16} borderRadius={"md"} >
        {filteredUsers.map((user: UserAPIResponse) => (
          <Card
            key={user.user_id}
            shadow={EventDesignSystem.card.shadow}
            borderRadius={"lg"}
            overflow="hidden"
            borderWidth={EventDesignSystem.card.borderWidth}
            borderColor={EventDesignSystem.card.borderColor}
            transition={EventDesignSystem.card.transition}
            _hover={EventDesignSystem.card.hover}
            bg="white"
            padding={8}

          >
            <CardHeader pb={2}>
              <Flex justify="space-between" align="center">
                <Heading size="lg" color={EventDesignSystem.primaryColor} noOfLines={1} fontWeight="semibold">
                  {user.username}
                </Heading>
                <Badge
                  colorScheme={user.role === 'admin' ? 'purple' : 'green'}
                  variant="solid"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  {user.role}
                </Badge>
              </Flex>
            </CardHeader>
            <CardBody pt={0}>
              <VStack align="start" spacing={2}>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  🆔 <strong>User ID:</strong> {user.user_id}
                </Text>
              </VStack>

              <HStack spacing={3} mt={4} justify="flex-end" p={3} bg="gray.50" borderRadius="md">

                <DetailActions
                handleView={() => navigate(`/admin/users/detail/${user.user_id}`)}
                isAdmin={isAdmin}
                showEdit={false}
                showDelete={false}
                />
              </HStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {filteredUsers.length === 0 && isAdmin && (
        <Box textAlign="center" py={10} bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.200">
          <Text fontSize="xl" color="gray.500" fontWeight="medium">
            {searchTerm ? '🔍 No users found matching your search.' : '👤 No users available.'}
          </Text>
          {!searchTerm && (
            <Button
              mt={4}
              bg={EventDesignSystem.primaryColor}
              color="white"
              onClick={() => navigate("new")}
              _hover={{ bg: EventDesignSystem.primaryDark }}
            >
              Create Your First User
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};
export default UserList;