import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Flex,
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PermissionGuard } from "../../PermissionGuard";
import { onDelete } from "../api/deleteEvents";
import getAllEvents from "../api/getAllEvents";
import { EventDesignSystem } from "../designSystem";
import EventCard from "./EventCard";

const EventList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  const { data: events = [], refetch } = useQuery({
    queryKey: ["events"],
    queryFn: getAllEvents,
  });
  const toast = useToast()


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

        {events.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
            spacing={6}
          >
            {events.map((event) => (
              <EventCard
                key={event.event_id}
                event={event}
                onDeleteEvent={(eventId) => {
                  deleteEventFn(eventId);
                  refetch();
                }}

              />
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
