import { Box, Flex, Grid, Heading, Icon, Input, InputGroup, InputLeftElement, Spacer, Text, useToast } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { FiSearch, FiUser } from 'react-icons/fi';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { EventDesignSystem } from '../../events/designSystem';
import { getAllUsers } from '../api/getAllUsers';
import { UserAPIResponse } from '../users.type';
import UserCard from './UserCard';

export const loader: LoaderFunction = async () => {
  try {
    const users = await getAllUsers();
    return users;
  } catch (error) {
    return Promise.reject(error);
  }
};

const UserList = () => {
  const users = useLoaderData() as UserAPIResponse[];
  const [searchTerm, setSearchTerm] = useState('');
  const toast = useToast();

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteUser = useCallback((id: string) => {
    toast({
      title: "Delete User",
      description: `User ${id} would be deleted here. Connect to your delete API.`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  }, [toast]);

  return (
    <Box p={6} maxW="1400px" mx="auto" bg="gray.50" minHeight="100vh">
      <Flex mb={6} align="center" direction={{ base: 'column', md: 'row' }} gap={4}>
        <Heading size="xl" color={EventDesignSystem.primaryColor} fontWeight="bold">
          Users Management
        </Heading>
        <Spacer />
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            bg="white"
            borderRadius="lg"
            _focus={{
              borderColor: EventDesignSystem.primaryColor,
              boxShadow: `0 0 0 1px ${EventDesignSystem.primaryColor}`
            }}
          />
        </InputGroup>
      </Flex>

      <Box mb={4}>
        <Text color="gray.600" fontSize="sm">
          Showing {filteredUsers.length} of {users.length} users
        </Text>
      </Box>

      {filteredUsers.length > 0 ? (
        <Grid
          templateColumns={{
            base: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(4, 1fr)'
          }}
          gap={6}
        >
          {filteredUsers.map(user => (
            <UserCard key={user.id} user={user} onDelete={handleDeleteUser} />
          ))}
        </Grid>
      ) : (
        <Flex
          direction="column"
          align="center"
          justify="center"
          py={16}
          px={4}
          bg="white"
          borderRadius="xl"
          boxShadow="md"
        >
          <Icon as={FiUser} boxSize={16} color="gray.300" mb={4} />
          <Heading size="md" color="gray.500" mb={2}>
            No users found
          </Heading>
          <Text color="gray.400">
            {searchTerm ? 'Try adjusting your search terms' : 'No users available'}
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default UserList;
