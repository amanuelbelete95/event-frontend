import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Input, InputGroup, InputLeftElement, SimpleGrid, Spacer, Text, useToast } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import getAllEvents from '../api/getAllEvents';
import { EventAPIResponse } from '../events.type';
import EventCard from "./EventCard";



export const loader: LoaderFunction = async () => {
  try {
    const events = await getAllEvents();
    return events;
  } catch (error) {
    console.log("error", error)
    return Promise.reject(error)
  }

};


const EventList = () => {
  const navigate = useNavigate();
  const events = useLoaderData() as EventAPIResponse[];
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = useMemo(() => {
    return events.filter(event =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.event_status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [events, searchTerm]);

  return (
    <Box p={6} w={"100%"} mx="auto" minHeight="100vh">
      <Flex mb={6} align="center">
        <Heading size="xl" fontWeight="bold">Events</Heading>
        <Spacer />
        <Button
          leftIcon={<AddIcon />}
          onClick={() => navigate("new")}
          size="md"
          variant={"outline"}
          colorScheme='green'
          boxShadow="md"
          borderRadius={"md"}
        >
          New Event
        </Button>
      </Flex>
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
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        {filteredEvents.map((event) => (
          <EventCard key={event.event_id} event={event} />
        ))}
      </Flex>



      {filteredEvents.length === 0 && (
        <Box textAlign="center" py={10} bg="white" borderRadius="lg" borderWidth="1px" borderColor="gray.200">
          <Text fontSize="xl" color="gray.500" fontWeight="medium">
            {searchTerm ? '🔍 No events found matching your search.' : '📅 No events available.'}
          </Text>
          {!searchTerm && (
            <Button
              mt={4}
              color="white"
              onClick={() => navigate("new")}
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