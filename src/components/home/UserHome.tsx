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
  Card,
  CardBody,
  Image,
  AspectRatio,
  Stack,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthProvider";
import getAllEvents from "../events/api/getAllEvents";
import { getRegisterEvents } from "../register-events/api/getRegisterEvents";
import { EventDesignSystem } from "../events/designSystem";
import { EventAPIResponse } from "../events/events.type";
import { RegisterEventApiResponse } from "../register-events/api/getRegisterEvents";
import {
  FiCalendar,
  FiMapPin,
  FiClock,
  FiUsers,
  FiArrowRight,
  FiStar,
  FiCheck,
  FiZap,
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

const FeaturedEventCard = ({
  event,
  isRegistered,
  onRegister,
}: {
  event: any;
  isRegistered: boolean;
  onRegister: () => void;
}) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  const daysUntil = Math.ceil(
    (new Date(event.event_date).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <Card
      bg={cardBg}
      borderRadius="xl"
      overflow="hidden"
      boxShadow="md"
      border="1px solid"
      borderColor={borderColor}
      transition="all 0.3s"
      _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
    >
      <AspectRatio ratio={16 / 9}>
        <Box
          bgGradient={`linear(to-br, ${EventDesignSystem.primaryColor}, ${EventDesignSystem.primaryDark})`}
        >
          <Flex
            h="full"
            align="center"
            justify="center"
            direction="column"
            color="white"
          >
            <Icon as={FiCalendar} boxSize={12} opacity={0.8} />
            <Text mt={2} fontSize="sm" opacity={0.9}>
              {new Date(event.event_date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </Flex>
        </Box>
      </AspectRatio>

      <CardBody>
        <VStack align="stretch" spacing={3}>
          <Box>
            <HStack justify="space-between" mb={1}>
              <Badge
                colorScheme={event.event_status === "todo" ? "green" : "blue"}
                fontSize="xs"
              >
                {event.event_status.replace("_", " ")}
              </Badge>
              {daysUntil > 0 && (
                <Text fontSize="xs" color="gray.500">
                  {daysUntil} days away
                </Text>
              )}
            </HStack>
            <Heading size="md" color="gray.700" noOfLines={1}>
              {event.name}
            </Heading>
          </Box>

          <Stack spacing={1} color="gray.500" fontSize="sm">
            <HStack>
              <Icon as={FiMapPin} />
              <Text>{event.location}</Text>
            </HStack>
            <HStack>
              <Icon as={FiUsers} />
              <Text>{event.capacity.toString()} spots</Text>
            </HStack>
          </Stack>

          {event.description && (
            <Text color="gray.600" fontSize="sm" noOfLines={2}>
              {event.description}
            </Text>
          )}

          <Divider />

          <Flex justify="space-between" align="center">
            <Button
              as={RouterLink}
              to={`/events/${event.id}/detail`}
              size="sm"
              variant="ghost"
              color={EventDesignSystem.primaryColor}
              rightIcon={<FiArrowRight />}
            >
              View Details
            </Button>
            {isRegistered ? (
              <HStack spacing={1} color="green.500">
                <Icon as={FiCheck} />
                <Text fontSize="sm" fontWeight="medium">
                  Registered
                </Text>
              </HStack>
            ) : (
              <Button
                size="sm"
                bg={EventDesignSystem.primaryColor}
                color="white"
                _hover={{ bg: EventDesignSystem.primaryDark }}
                onClick={onRegister}
              >
                Register
              </Button>
            )}
          </Flex>
        </VStack>
      </CardBody>
    </Card>
  );
};

const UserHome = () => {
  const { user } = useAuth();
  const pageBg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  const { data: events = [] } = useQuery<EventAPIResponse[]>({
    queryKey: ["events"],
    queryFn: getAllEvents,
  });

  const { data: registrations = [] } = useQuery<RegisterEventApiResponse[]>({
    queryKey: ["register-events"],
    queryFn: getRegisterEvents,
  });

  const registeredEventIds = registrations.map((r) => r.event_id);

  const upcomingEvents = events
    .filter((e: EventAPIResponse) => new Date(e.event_date) > new Date())
    .sort(
      (a: EventAPIResponse, b: EventAPIResponse) =>
        new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
    )
    .slice(0, 3);

  const featuredEvents = events.slice(0, 4);

  const totalRegistered = registrations.length;
  const upcomingCount = events.filter(
    (e: EventAPIResponse) =>
      registeredEventIds.includes(e.id) && new Date(e.event_date) > new Date()
  ).length;

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
                    Welcome, {user?.username}!
                  </Heading>
                  <Text color="gray.500">
                    Discover and register for amazing events.
                  </Text>
                </Box>
              </HStack>
              <HStack spacing={3}>
                <Button
                  as={RouterLink}
                  to="/events"
                  leftIcon={<FiCalendar />}
                  bg={EventDesignSystem.primaryColor}
                  color="white"
                  _hover={{ bg: EventDesignSystem.primaryDark }}
                  size="lg"
                >
                  Browse Events
                </Button>
                <Button
                  as={RouterLink}
                  to="/register-events"
                  leftIcon={<FiStar />}
                  variant="outline"
                  borderColor={EventDesignSystem.primaryColor}
                  color={EventDesignSystem.primaryColor}
                  size="lg"
                >
                  My Registrations
                </Button>
              </HStack>
            </Flex>
          </Box>

          {/* Stats Grid */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <StatCard
              label="Total Registrations"
              value={totalRegistered}
              icon={FiCheck}
              helpText="Your registered events"
              colorScheme="green"
            />
            <StatCard
              label="Upcoming Events"
              value={upcomingCount}
              icon={FiClock}
              helpText="Events to attend"
              colorScheme="blue"
            />
            <StatCard
              label="Available Events"
              value={events.length}
              icon={FiZap}
              helpText="Events to explore"
              colorScheme="purple"
            />
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
                to="/events"
                h="auto"
                py={4}
                variant="outline"
                borderColor={borderColor}
                _hover={{
                  borderColor: EventDesignSystem.primaryColor,
                  bg: `${EventDesignSystem.primaryColor}10`,
                }}
              >
                <VStack spacing={2}>
                  <Icon
                    as={FiCalendar}
                    boxSize={5}
                    color={EventDesignSystem.primaryColor}
                  />
                  <Text fontSize="sm" color="gray.600">
                    Browse Events
                  </Text>
                </VStack>
              </Button>
              <Button
                as={RouterLink}
                to="/register-events"
                h="auto"
                py={4}
                variant="outline"
                borderColor={borderColor}
                _hover={{
                  borderColor: EventDesignSystem.primaryColor,
                  bg: `${EventDesignSystem.primaryColor}10`,
                }}
              >
                <VStack spacing={2}>
                  <Icon
                    as={FiStar}
                    boxSize={5}
                    color={EventDesignSystem.primaryColor}
                  />
                  <Text fontSize="sm" color="gray.600">
                    My Registrations
                  </Text>
                </VStack>
              </Button>
              <Button
                as={RouterLink}
                to="/contact"
                h="auto"
                py={4}
                variant="outline"
                borderColor={borderColor}
                _hover={{
                  borderColor: EventDesignSystem.primaryColor,
                  bg: `${EventDesignSystem.primaryColor}10`,
                }}
              >
                <VStack spacing={2}>
                  <Icon
                    as={FiUsers}
                    boxSize={5}
                    color={EventDesignSystem.primaryColor}
                  />
                  <Text fontSize="sm" color="gray.600">
                    Contact Support
                  </Text>
                </VStack>
              </Button>
            </SimpleGrid>
          </Box>

          {/* Featured Events */}
          <Box>
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="md" color="gray.700">
                Featured Events
              </Heading>
              <Button
                as={RouterLink}
                to="/events"
                variant="ghost"
                color={EventDesignSystem.primaryColor}
                size="sm"
                rightIcon={<FiArrowRight />}
              >
                View All
              </Button>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
              {featuredEvents.map((event) => (
                <FeaturedEventCard
                  key={event.id}
                  event={event}
                  isRegistered={registeredEventIds.includes(event.id)}
                  onRegister={() => {}}
                />
              ))}
            </SimpleGrid>
          </Box>

          {/* Upcoming Events List */}
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
                  Upcoming Events
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
            <VStack spacing={0} align="stretch" p={4} pt={0}>
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event, index) => (
                  <Box
                    key={event.id}
                    as={RouterLink}
                    to={`/events/${event.id}/detail`}
                    p={4}
                    borderRadius="lg"
                    _hover={{
                      bg: hoverBg,
                    }}
                    transition="all 0.2s"
                    cursor="pointer"
                  >
                    <Flex
                      justify="space-between"
                      align="center"
                      direction={{ base: "column", md: "row" }}
                      gap={4}
                    >
                      <VStack align="start" spacing={1} flex={1}>
                        <HStack spacing={2}>
                          <Text fontWeight="semibold" color="gray.700">
                            {event.name}
                          </Text>
                          {getStatusBadge(event.event_status)}
                          {registeredEventIds.includes(event.id) && (
                            <Badge bg="green.100" color="green.700">
                              Registered
                            </Badge>
                          )}
                        </HStack>
                        <HStack
                          spacing={4}
                          color="gray.500"
                          fontSize="sm"
                          flexWrap="wrap"
                        >
                          <HStack spacing={1}>
                            <Icon as={FiCalendar} />
                            <Text>
                              {new Date(
                                event.event_date
                              ).toLocaleDateString()}
                            </Text>
                          </HStack>
                          <HStack spacing={1}>
                            <Icon as={FiMapPin} />
                            <Text>{event.location}</Text>
                          </HStack>
                          <HStack spacing={1}>
                            <Icon as={FiUsers} />
                            <Text>{event.capacity.toString()} spots</Text>
                          </HStack>
                        </HStack>
                      </VStack>
                      <HStack spacing={2}>
                        <Box
                          bg={`${EventDesignSystem.primaryColor}10`}
                          color={EventDesignSystem.primaryColor}
                          px={4}
                          py={2}
                          borderRadius="lg"
                          textAlign="center"
                        >
                          <Text fontSize="xs" fontWeight="medium">
                            {new Date(event.event_date).toLocaleDateString(
                              "en-US",
                              { weekday: "short" }
                            )}
                          </Text>
                          <Text
                            fontSize="xl"
                            fontWeight="bold"
                            lineHeight={1}
                          >
                            {new Date(event.event_date).getDate()}
                          </Text>
                          <Text fontSize="xs" fontWeight="medium">
                            {new Date(
                              event.event_date
                            ).toLocaleDateString("en-US", {
                              month: "short",
                            })}
                          </Text>
                        </Box>
                        <IconButton
                          aria-label="View event"
                          icon={<FiArrowRight />}
                          variant="ghost"
                          color={EventDesignSystem.primaryColor}
                        />
                      </HStack>
                    </Flex>
                    {index < upcomingEvents.length - 1 && <Divider mt={4} />}
                  </Box>
                ))
              ) : (
                <Box textAlign="center" py={8} color="gray.500">
                  No upcoming events available
                </Box>
              )}
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default UserHome;
