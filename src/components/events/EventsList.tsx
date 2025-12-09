
import { Box, Button, HStack, VStack, Text, Badge, useToast, Input, InputGroup, InputLeftElement, SimpleGrid, Card, CardBody, CardHeader, Heading, IconButton, Flex, Spacer } from '@chakra-ui/react';
import { EventDesignSystem } from './designSystem';
import { useMemo, useState } from 'react';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import getAllEvents from './api/getAllEvents';
import { Event } from './events.type';
import { EVENTS_ROUTES } from './routes';
import { onDelete } from './api/deleteEvents';
import { DeleteIcon, EditIcon, ViewIcon, SearchIcon, AddIcon } from '@chakra-ui/icons';

export const loader: LoaderFunction = async () => {
  try {
    const events = await getAllEvents();
    return events;
  } catch (error) {
    return Promise.reject(error)
  }

};



const EventList = () => {
  const navigate = useNavigate();
  const events = useLoaderData() as Event[];
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id: string) => {
    try {
      const response = await onDelete(id);
      if (response.ok) {
        toast({
          title: "Event Deleted Successfully",
          status: 'success',
          description: "The event has been successfully deleted from the system.",
          duration: 3000,
          isClosable: true,
        });
        // Note: In a real app, you'd invalidate the query cache here
      } else {
        const errorData = await response.json();
        toast({
          title: "Error Deleting Event",
          status: 'error',
          description: errorData.message || "The event was not found or could not be deleted.",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        status: 'error',
        description: error.message || "An unexpected error occurred while deleting the event.",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter(event =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.event_status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [events, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'green';
      case 'in_progress': return 'blue';
      case 'todo': return 'yellow';
      case 'postponed': return 'orange';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  return (
    <Box p={6} maxW="1200px" mx="auto" bg="gray.50" minHeight="100vh">
      <Flex mb={6} align="center" direction={{ base: 'column', md: 'row' }} gap={4}>
        <Heading size="xl" color={EventDesignSystem.primaryColor} fontWeight="bold">Events Management</Heading>
        <Spacer />
        <InputGroup maxW="300px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <Button
          leftIcon={<AddIcon />}
          bg={EventDesignSystem.primaryColor}
          color="white"
          onClick={() => navigate("new")}
          size="md"
          _hover={{ bg: EventDesignSystem.primaryDark }}
          _active={{ transform: "scale(0.98)" }}
          boxShadow="md"
        >
          Add New Event
        </Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {filteredEvents.map((event) => (
          <Card
            key={event.event_id}
            shadow={EventDesignSystem.card.shadow}
            borderRadius={EventDesignSystem.card.borderRadius}
            overflow="hidden"
            borderWidth={EventDesignSystem.card.borderWidth}
            borderColor={EventDesignSystem.card.borderColor}
            transition={EventDesignSystem.card.transition}
            _hover={EventDesignSystem.card.hover}
            bg="white"
          >
            <CardHeader pb={2}>
              <Flex justify="space-between" align="center">
                <Heading size="md" color={EventDesignSystem.primaryColor} noOfLines={1} fontWeight="semibold">
                  {event.name}
                </Heading>
                <Badge
                  colorScheme={EventDesignSystem.statusColors[event.event_status as keyof typeof EventDesignSystem.statusColors] || EventDesignSystem.statusColors.default}
                  variant="solid"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  {event.event_status}
                </Badge>
              </Flex>
            </CardHeader>
            <CardBody pt={0}>
              <VStack align="start" spacing={2}>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  📍 <strong>Location:</strong> {event.location}
                </Text>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  📅 <strong>Date:</strong> {new Date(event.event_date).toLocaleDateString()}
                </Text>
                {event.description && (
                  <Text fontSize="sm" color="gray.600" noOfLines={2} mt={2} p={2} bg="gray.50" borderRadius="md">
                    📝 <strong>Description:</strong> {event.description}
                  </Text>
                )}
              </VStack>

              <HStack spacing={2} mt={4} justify="flex-end" p={2} bg="gray.50" borderRadius="md">
                <IconButton
                  aria-label="View event"
                  icon={<ViewIcon />}
                  size="sm"
                  colorScheme="blue"
                  variant="outline"
                  onClick={() => navigate(EVENTS_ROUTES.EVENTS_DETAIL.getAbsoluteLink(event.event_id))}
                />
                <IconButton
                  aria-label="Edit event"
                  icon={<EditIcon />}
                  size="sm"
                  colorScheme="yellow"
                  variant="solid"
                  onClick={() => navigate(EVENTS_ROUTES.EVENTS_EDIT.getAbsoluteLink(event.event_id))}
                  _hover={{ transform: "scale(1.05)" }}
                />
                <IconButton
                  aria-label="Delete event"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme={EventDesignSystem.primaryColor}
                  variant="solid"
                  onClick={() => handleDelete(event.event_id)}
                  _hover={{ transform: "scale(1.05)" }}
                />
              </HStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {filteredEvents.length === 0 && (
        <Box textAlign="center" py={10} bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.200">
          <Text fontSize="xl" color="gray.500" fontWeight="medium">
            {searchTerm ? '🔍 No events found matching your search.' : '📅 No events available.'}
          </Text>
          {!searchTerm && (
            <Button
              mt={4}
              bg={EventDesignSystem.primaryColor}
              color="white"
              onClick={() => navigate("new")}
              _hover={{ bg: EventDesignSystem.primaryDark }}
            >
              Create Your First Event
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};
export default EventList;