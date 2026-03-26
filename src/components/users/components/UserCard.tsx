
import { Avatar, Badge, Button, Card, CardBody, Divider, Flex, Heading, HStack, Icon, Text, useToast, VStack } from '@chakra-ui/react';
import { memo, useCallback } from 'react';
import { FiEdit2, FiShield, FiTrash2, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { EventDesignSystem } from '../../events/designSystem';
import { UserAPIResponse } from '../users.type';

interface UserCardProps {
  user: UserAPIResponse;
  onDelete: (id: string) => void;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getRoleBadgeColor = (role: string | null) => {
  switch (role?.toLowerCase()) {
    case 'admin':
      return { bg: 'purple.50', color: 'purple.600', border: 'purple.200' };
    case 'organizer':
      return { bg: 'blue.50', color: 'blue.600', border: 'blue.200' };
    case 'user':
      return { bg: 'green.50', color: 'green.600', border: 'green.200' };
    default:
      return { bg: 'gray.50', color: 'gray.600', border: 'gray.200' };
  }
};

const UserCard = memo(({ user, onDelete }: UserCardProps) => {
  const navigate = useNavigate();
  const roleColors = getRoleBadgeColor(user.role);
  const toast = useToast();

  const handleEdit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/users/${user.id}/edit`);
  }, [user.id, navigate]);

  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(user.id);
  }, [user.id, onDelete]);

  const handleView = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/users/${user.id}/detail`);
  }, [user.id, navigate]);

  return (
    <Card
      borderRadius="xl"
      overflow="hidden"
      boxShadow="md"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'xl',
        borderColor: EventDesignSystem.primaryColor,
      }}
      borderWidth="2px"
      borderColor="gray.100"
      cursor="pointer"
      onClick={handleView}
      h="100%"
    >
      <CardBody p={6}>
        <VStack spacing={4} align="stretch">
          <Flex direction="column" align="center" gap={3}>
            <Avatar
              size="xl"
              name={user.username}
              bg={EventDesignSystem.primaryColor}
              color="white"
              fontSize="xl"
              fontWeight="bold"
              icon={<Icon as={FiUser} boxSize={8} />}
            />
            <VStack spacing={1}>
              <Heading size="md" color="gray.700" textAlign="center" noOfLines={1}>
                {user.username}
              </Heading>
              <Badge
                px={3}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="semibold"
                textTransform="uppercase"
                bg={roleColors.bg}
                color={roleColors.color}
                borderWidth="1px"
                borderColor={roleColors.border}
              > 
                <HStack spacing={1}>
                  {user.role?.toLowerCase() === 'admin' && <Icon as={FiShield} boxSize={3} />}
                  <Text>{user.role || 'No Role'}</Text>
                </HStack>
              </Badge>
            </VStack>
          </Flex>

          <Divider />

          <VStack spacing={2} align="stretch">
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.500">User ID</Text>
              <Text fontSize="sm" fontWeight="medium" color="gray.700" noOfLines={1}>
                {user.id}
              </Text>
            </HStack>
          </VStack>

          <Divider />

          <HStack spacing={2} justify="center">
            <Button
              size="sm"
              variant="ghost"
              colorScheme="blue"
              leftIcon={<Icon as={FiUser} boxSize={4} />}
              onClick={handleView}
            >
              View
            </Button>
            <Button
              size="sm"
              variant="ghost"
              colorScheme="yellow"
              leftIcon={<Icon as={FiEdit2} boxSize={4} />}
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="ghost"
              colorScheme="red"
              leftIcon={<Icon as={FiTrash2} boxSize={4} />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
});
export default UserCard;