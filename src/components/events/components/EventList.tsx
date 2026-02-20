import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Badge
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { LoaderFunction, useLoaderData, useNavigate } from "react-router-dom";
import getAllEvents from "../api/getAllEvents";
import { EventAPIResponse } from "../events.type";
import EventCard from "./EventCard";
import { EventDesignSystem } from "../designSystem";

export const loader: LoaderFunction = async () => {
  try {
    return await getAllEvents();
  } catch (error) {
    return Promise.reject(error);
  }
};

const EventList = () => {
  const navigate = useNavigate();
  const events = useLoaderData() as EventAPIResponse[];
  const [searchTerm, setSearchTerm] = useState("");
  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      [event.name, event.location, event.event_status]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [events, searchTerm]);

  return (
    <Box bg={pageBg} minH="100vh" px={{ base: 4, md: 8 }} py={8}>
      <VStack spacing={8} align="stretch" maxW="1400px" mx="auto">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "start", md: "center" }}
          gap={4}
        >
          <Box>
            <Heading size="lg">Events</Heading>
            <HStack mt={2}>
              <Badge colorScheme="blue" px={3} py={1} rounded="full">
                {filteredEvents.length} Events
              </Badge>
            </HStack>
          </Box>

          <Button
            leftIcon={<AddIcon />}
            onClick={() => navigate("new")}
            size="md"
            borderRadius="lg"
            boxShadow="sm"
            bg={EventDesignSystem.primaryColor}
            color="white"
            variant="outline"
          >
            Create Event
          </Button>
        </Flex>

        <Box maxW="400px">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>

            <Input
              placeholder="Search by name, location, or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg={cardBg}
              borderRadius="lg"
            />
          </InputGroup>
        </Box>

        {filteredEvents.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
            spacing={6}
          >
            {filteredEvents.map((event) => (
              <EventCard key={event.event_id} event={event} />
            ))}
          </SimpleGrid>
        ) : (
          <Box
            textAlign="center"
            py={16}
            px={6}
            bg={cardBg}
            borderRadius="xl"
            borderWidth="1px"
            boxShadow="sm"
          >
            <Text fontSize="2xl" mb={3}>
              {searchTerm ? "🔍 No matching events" : "📅 No events yet"}
            </Text>

            <Text color="gray.500" mb={6}>
              {searchTerm
                ? "Try adjusting your search keywords."
                : "Start by creating your first event."}
            </Text>

            {!searchTerm && (
              <Button
                leftIcon={<AddIcon />}
                bg={EventDesignSystem.primaryColor}
                color="white"
                variant="outline"
                onClick={() => navigate("new")}
              >
                Create Event
              </Button>
            )}
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default EventList;
