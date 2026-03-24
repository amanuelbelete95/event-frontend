import {
  Box,
  Heading,
  Text,
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Button,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  Flex,
  Avatar,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Progress,
  Divider,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthProvider";
import getAllEvents from "../events/api/getAllEvents";
import { EventDesignSystem } from "../events/designSystem";
import { EventAPIResponse } from "../events/events.type";
import {
  FiCalendar,
  FiUsers,
  FiCheckCircle,
  FiTrendingUp,
  FiPlus,
  FiActivity,
  FiClock,
  FiMapPin,
} from "react-icons/fi";

const StatCard = ({
  label,
  value,
  icon,
  helpText,
  colorScheme,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  helpText?: string;
  colorScheme: string;
}) => {
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Card bg={cardBg} shadow="md" borderRadius="xl">
      <CardBody>
        <Flex align="center" justify="space-between">
          <Stat>
            <StatLabel color="gray.500" fontSize="sm" fontWeight="medium">
              {label}
            </StatLabel>
            <StatNumber
              fontSize="3xl"
              fontWeight="bold"
              color={EventDesignSystem.primaryColor}
            >
              {value}
            </StatNumber>
            {helpText && (
              <StatHelpText mb={0} color="gray.500">
                {helpText}
              </StatHelpText>
            )}
          </Stat>
          <Box
            p={3}
            borderRadius="lg"
            bg={`${colorScheme}.50`}
            color={`${colorScheme}.600`}
          >
            <Icon as={icon} boxSize={6} />
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};

const AdminHome = () => {
  const { user } = useAuth();
  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const tableHoverBg = useColorModeValue("gray.50", "gray.700");
  const theadBg = useColorModeValue("gray.50", "gray.700");

  const { data: events = [] } = useQuery<EventAPIResponse[]>({
    queryKey: ["events"],
    queryFn: getAllEvents,
  });

  const totalEvents = events.length;
  const activeEvents = events.filter(
    (e: EventAPIResponse) => e.event_status === "in_progress" || e.event_status === "todo"
  ).length;
  const completedEvents = events.filter(
    (e: EventAPIResponse) => e.event_status === "completed"
  ).length;
  const totalCapacity = events.reduce(
    (sum: number, e: EventAPIResponse) => sum + Number(e.capacity),
    0
  );
  const registeredCount = events.filter(
    (e: EventAPIResponse) => e.registration_status
  ).length;

  const recentEvents = [...events]
    .sort(
      (a: EventAPIResponse, b: EventAPIResponse) =>
        new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
    )
    .slice(0, 5);

  const upcomingEvents = events
    .filter((e: EventAPIResponse) => new Date(e.event_date) > new Date())
    .sort(
      (a: EventAPIResponse, b: EventAPIResponse) =>
        new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
    )
    .slice(0, 4);

  const getStatusBadge = (status: string) => {
    const colors: Record<string, { bg: string; color: string }> = {
      completed: { bg: "green.100", color: "green.700" },
      in_progress: { bg: "blue.100", color: "blue.700" },
      todo: { bg: "yellow.100", color: "yellow.700" },
      postponed: { bg: "orange.100", color: "orange.700" },
      cancelled: { bg: "red.100", color: "red.700" },
    };
    const style = colors[status] || { bg: "gray.100", color: "gray.700" };
    return (
      <Badge bg={style.bg} color={style.color} px={2} py={1} borderRadius="md">
        {status.replace("_", " ")}
      </Badge>
    );
  };

  return (
    <Box bg={pageBg} minH="calc(100vh - 80px)" py={8}>
      <Container maxW="7xl">
        <VStack spacing={8} align="stretch">
          {/* Welcome Section */}
          <Box
            bg={cardBg}
            borderRadius="2xl"
            p={8}
            boxShadow="lg"
            border="1px solid"
            borderColor={borderColor}
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align={{ base: "flex-start", md: "center" }}
              gap={4}
            >
              <HStack spacing={4}>
                <Avatar
                  size="lg"
                  name={user?.username}
                  bg={EventDesignSystem.primaryColor}
                  color="white"
                />
                <Box>
                  <Heading size="lg" color="gray.700">
                    Welcome back, {user?.username}!
                  </Heading>
                  <Text color="gray.500">
                    Here's what's happening with your events today.
                  </Text>
                </Box>
              </HStack>
              <HStack spacing={3}>
                <Button
                  as={RouterLink}
                  to="/events/new"
                  leftIcon={<FiPlus />}
                  bg={EventDesignSystem.primaryColor}
                  color="white"
                  _hover={{ bg: EventDesignSystem.primaryDark }}
                  size="lg"
                >
                  Create Event
                </Button>
                <Button
                  as={RouterLink}
                  to="/users"
                  leftIcon={<FiUsers />}
                  variant="outline"
                  borderColor={EventDesignSystem.primaryColor}
                  color={EventDesignSystem.primaryColor}
                  size="lg"
                >
                  Manage Users
                </Button>
              </HStack>
            </Flex>
          </Box>

          {/* Stats Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            <StatCard
              label="Total Events"
              value={totalEvents}
              icon={FiCalendar}
              helpText="All time"
              colorScheme="blue"
            />
            <StatCard
              label="Active Events"
              value={activeEvents}
              icon={FiActivity}
              helpText="In progress & todo"
              colorScheme="green"
            />
            <StatCard
              label="Completed"
              value={completedEvents}
              icon={FiCheckCircle}
              helpText="Finished events"
              colorScheme="purple"
            />
            <StatCard
              label="Total Capacity"
              value={totalCapacity}
              icon={FiTrendingUp}
              helpText={`${registeredCount} registered`}
              colorScheme="orange"
            />
          </SimpleGrid>

          {/* Main Content Grid */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            {/* Recent Events Table */}
            <Box
              bg={cardBg}
              borderRadius="xl"
              boxShadow="md"
              border="1px solid"
              borderColor={borderColor}
              overflow="hidden"
            >
              <Box p={6} pb={4}>
                <Flex justify="space-between" align="center">
                  <Heading size="md" color="gray.700">
                    Recent Events
                  </Heading>
                  <Button
                    as={RouterLink}
                    to="/events"
                    variant="ghost"
                    color={EventDesignSystem.primaryColor}
                    size="sm"
                  >
                    View All
                  </Button>
                </Flex>
              </Box>
              <Box overflowX="auto">
                <Table variant="simple">
                  <Thead bg={theadBg}>
                    <Tr>
                      <Th>Event</Th>
                      <Th>Date</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {recentEvents.length > 0 ? (
                      recentEvents.map((event: EventAPIResponse, index: number) => (
                        <Tr
                          key={event.id}
                          _hover={{ bg: tableHoverBg }}
                          cursor="pointer"
                        >
                          <Td>
                            <VStack align="start" spacing={0}>
                              <Text fontWeight="semibold" color="gray.700">
                                {event.name}
                              </Text>
                              <HStack spacing={1} color="gray.500" fontSize="sm">
                                <Icon as={FiMapPin} />
                                <Text>{event.location}</Text>
                              </HStack>
                            </VStack>
                          </Td>
                          <Td>
                            <HStack spacing={1} color="gray.600">
                              <Icon as={FiCalendar} />
                              <Text>{new Date(event.event_date).toLocaleDateString()}</Text>
                            </HStack>
                          </Td>
                          <Td>{getStatusBadge(event.event_status)}</Td>
                        </Tr>
                      ))
                    ) : (
                      <Tr>
                        <Td colSpan={3} textAlign="center" py={8} color="gray.500">
                          No events found
                        </Td>
                      </Tr>
                    )}
                  </Tbody>
                </Table>
              </Box>
            </Box>

            {/* Upcoming Events */}
            <Box
              bg={cardBg}
              borderRadius="xl"
              boxShadow="md"
              border="1px solid"
              borderColor={borderColor}
              overflow="hidden"
            >
              <Box p={6} pb={4}>
                <Heading size="md" color="gray.700">
                  Upcoming Events
                </Heading>
              </Box>
              <VStack spacing={0} align="stretch" p={4} pt={0}>
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event: EventAPIResponse, index: number) => (
                    <Box
                      key={event.id}
                      as={RouterLink}
                      to={`/events/${event.id}/detail`}
                      p={4}
                      borderRadius="lg"
                      _hover={{ bg: tableHoverBg }}
                      transition="all 0.2s"
                      cursor="pointer"
                    >
                      <Flex justify="space-between" align="center">
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="semibold" color="gray.700">
                            {event.name}
                          </Text>
                          <HStack spacing={3} color="gray.500" fontSize="sm">
                            <HStack spacing={1}>
                              <Icon as={FiCalendar} />
                              <Text>{new Date(event.event_date).toLocaleDateString()}</Text>
                            </HStack>
                            <HStack spacing={1}>
                              <Icon as={FiMapPin} />
                              <Text>{event.location}</Text>
                            </HStack>
                          </HStack>
                        </VStack>
                        <Box
                          bg={`${EventDesignSystem.primaryColor}10`}
                          color={EventDesignSystem.primaryColor}
                          px={3}
                          py={2}
                          borderRadius="lg"
                          textAlign="center"
                        >
                          <Text fontSize="xs" fontWeight="medium">
                            {new Date(event.event_date).toLocaleDateString("en-US", {
                              weekday: "short",
                            })}
                          </Text>
                          <Text fontSize="lg" fontWeight="bold" lineHeight={1}>
                            {new Date(event.event_date).getDate()}
                          </Text>
                        </Box>
                      </Flex>
                      {index < upcomingEvents.length - 1 && <Divider mt={4} />}
                    </Box>
                  ))
                ) : (
                  <Box textAlign="center" py={8} color="gray.500">
                    No upcoming events
                  </Box>
                )}
              </VStack>
            </Box>
          </SimpleGrid>

          {/* Quick Actions */}
          <Box
            bg={cardBg}
            borderRadius="xl"
            p={6}
            boxShadow="md"
            border="1px solid"
            borderColor={borderColor}
          >
            <Heading size="md" color="gray.700" mb={4}>
              Quick Actions
            </Heading>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
              <Button
                as={RouterLink}
                to="/events/new"
                h="auto"
                py={4}
                variant="outline"
                borderColor={borderColor}
                _hover={{ borderColor: EventDesignSystem.primaryColor, bg: `${EventDesignSystem.primaryColor}10` }}
              >
                <VStack spacing={2}>
                  <Icon as={FiPlus} boxSize={5} color={EventDesignSystem.primaryColor} />
                  <Text fontSize="sm" color="gray.600">Create Event</Text>
                </VStack>
              </Button>
              <Button
                as={RouterLink}
                to="/users"
                h="auto"
                py={4}
                variant="outline"
                borderColor={borderColor}
                _hover={{ borderColor: EventDesignSystem.primaryColor, bg: `${EventDesignSystem.primaryColor}10` }}
              >
                <VStack spacing={2}>
                  <Icon as={FiUsers} boxSize={5} color={EventDesignSystem.primaryColor} />
                  <Text fontSize="sm" color="gray.600">Manage Users</Text>
                </VStack>
              </Button>
              <Button
                as={RouterLink}
                to="/events"
                h="auto"
                py={4}
                variant="outline"
                borderColor={borderColor}
                _hover={{ borderColor: EventDesignSystem.primaryColor, bg: `${EventDesignSystem.primaryColor}10` }}
              >
                <VStack spacing={2}>
                  <Icon as={FiCalendar} boxSize={5} color={EventDesignSystem.primaryColor} />
                  <Text fontSize="sm" color="gray.600">All Events</Text>
                </VStack>
              </Button>
              <Button
                as={RouterLink}
                to="/contact"
                h="auto"
                py={4}
                variant="outline"
                borderColor={borderColor}
                _hover={{ borderColor: EventDesignSystem.primaryColor, bg: `${EventDesignSystem.primaryColor}10` }}
              >
                <VStack spacing={2}>
                  <Icon as={FiActivity} boxSize={5} color={EventDesignSystem.primaryColor} />
                  <Text fontSize="sm" color="gray.600">Support</Text>
                </VStack>
              </Button>
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default AdminHome;
