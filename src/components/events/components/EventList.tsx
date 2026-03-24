import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
  useColorModeValue,
  useToast,
  VStack
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PermissionGuard } from "../../PermissionGuard";
import { onDelete } from "../api/deleteEvents";
import getAllEvents from "../api/getAllEvents";
import { EventDesignSystem } from "../designSystem";
import EventCard from "./EventCard";
import { useAuth } from "../../auth/AuthProvider";

const EventList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const {user} = useAuth();
  const { data: events = [], refetch } = useQuery({
    queryKey: ["events"],
    queryFn: getAllEvents,
  });
  const toast = useToast()

  const filteredEvents = useMemo(() => {
    if (!searchTerm) return events;
    const lower = searchTerm.toLowerCase();
    return events.filter(
      (event) =>
        (event.name.toLowerCase().includes(lower) ||
          event.location.toLowerCase().includes(lower) ||
          event.event_status?.toLowerCase().includes(lower))
    );
  }, [events, searchTerm]);

  const { mutate: deleteEventFn } = useMutation({
    mutationFn: (id: string) => onDelete(id),
    onSuccess: () => {
      refetch();
      toast({
        title: "Event deleted",
        description: "Event deleted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      navigate("/events")

    },
    onError: (error) => {
      toast({
        title: "Event delete Failed ",
        description: `${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  });


  const adminEvents = filteredEvents;
  const userEvents = filteredEvents.filter(event => event.event_status === "published");
  return (
    <Box bg={pageBg} minH="100vh" px={{ base: 4, md: 8 }} py={8} w={"100%"}>
      <VStack spacing={8} align="stretch">
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
                {events.length} Events
              </Badge>
            </HStack>
          </Box>


          <PermissionGuard allowedRoles={["admin"]}>
            <Button
              leftIcon={<AddIcon />}
              onClick={() => navigate("new")}
              size="md"
              borderRadius="lg"
              boxShadow="sm"
              bg={EventDesignSystem.primaryColor}
              color="white"
              _hover={{ opacity: 0.9 }}
              variant="outline"
            >
              Create Event
            </Button>
          </PermissionGuard>
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
          <Grid
            gridTemplateColumns={"1fr 1fr 1fr 1fr"}
            gap={5}
          >
            {user?.role === "admin" ? 
            adminEvents.map((event) => (
              <EventCard key={event.id} event={event} onDeleteEvent={deleteEventFn} />
            )) : 
            userEvents.map((event) => (
              <EventCard key={event.id} event={event} onDeleteEvent={deleteEventFn} />
            ))}
          </Grid>
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
            <PermissionGuard allowedRoles={["admin"]}>
              <Button
                leftIcon={<AddIcon />}
                bg={EventDesignSystem.primaryColor}
                color="white"
                variant="outline"
                onClick={() => navigate("new")}
              >
                Create Event
              </Button>
            </PermissionGuard>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default EventList;
