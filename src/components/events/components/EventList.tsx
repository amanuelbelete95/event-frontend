import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import { Badge, Box, Button, Card, CardBody, CardHeader, Flex, Heading, HStack, Input, InputGroup, InputLeftElement, SimpleGrid, Spacer, Text, useToast, VStack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import { EventAPIResponse } from '../events.type';
import { EVENTS_ROUTES } from '../routes';
import { EventDesignSystem } from '../designSystem';
import DetailActions from '../../DetailActions';
import { onDelete } from '../api/deleteEvents';
import getAllEvents from '../api/getAllEvents';


interface EventListProps {
  isAdmin: boolean
}


const EventList = (props: EventListProps) => {
  const {isAdmin} = props
  const navigate = useNavigate();
  const events = useLoaderData() as EventAPIResponse[];
  const [searchTerm, setSearchTerm] = useState('');
  const toast = useToast();

  const handleDelete = async (event_id: string) => {
    try {
      await onDelete(event_id);
      toast({
        title: "Event Deleted",
        description: "Event deleted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Refresh the page to update the events list
      window.location.reload();
    } catch (error: any) {
      toast({
        title: "Error deleting event",
        description: error.message || "Failed to delete event",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter(event =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.event_status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [events, searchTerm]);

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
          Add New Event
        </Button>}
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={16} borderRadius={"md"} >
        {filteredEvents.map((event) => (
          <Card
            key={event.event_id}
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

              <HStack spacing={3} mt={4} justify="flex-end" p={3} bg="gray.50" borderRadius="md">

                <DetailActions
                handleEdit={() => navigate(EVENTS_ROUTES.EVENTS_EDIT.getAbsoluteLink(event.event_id))}
                handleView={() => navigate(EVENTS_ROUTES.EVENTS_DETAIL.getAbsoluteLink(event.event_id))}
                handleDelete={() => handleDelete(event.event_id)}
                isAdmin={isAdmin}
                />
              </HStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {filteredEvents.length === 0 && isAdmin && (
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