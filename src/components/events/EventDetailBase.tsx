import { Box, Flex, Text, Heading, VStack, Badge, Divider } from '@chakra-ui/react'
import { LoaderFunction } from 'react-router-dom'
import getEvent from './api/getEvent'
import { EventAPIResponse } from './events.type'
import { EventDesignSystem } from './designSystem'

// Shared loader function
export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id;
  if (!id) {
    throw new Response("Event ID is missing", { status: 400 });
  }

  const event = await getEvent(id);
  if (!event) {
    throw new Response("Event not found", { status: 404 });
  }

  return event;
};

// Base event detail component with shared UI elements
interface EventDetailBaseProps {
  event: EventAPIResponse;
  children?: React.ReactNode;
  showAdminBadge?: boolean;
}

export const EventDetailBase: React.FC<EventDetailBaseProps> = ({
  event,
  children,
  showAdminBadge = false
}) => {
  return (
    <Box
      maxW="1000px"
      mx="auto"
      my={8}
      p={6}
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      borderWidth="1px"
      borderColor="gray.200"
    >
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="xl" color={EventDesignSystem.primaryColor} fontWeight="bold">
          {event.name}
        </Heading>
        <Flex alignItems="center" gap={3}>
          <Badge
            colorScheme={EventDesignSystem.statusColors[event.event_status as keyof typeof EventDesignSystem.statusColors] || EventDesignSystem.statusColors.default}
            variant="solid"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="sm"
          >
            {event.event_status}
          </Badge>
          {showAdminBadge && (
            <Badge colorScheme="purple" variant="solid" px={3} py={1} borderRadius="full" fontSize="sm">
              Admin View
            </Badge>
          )}
        </Flex>
      </Flex>

      <Divider mb={6} />

      <VStack align="start" spacing={6}>
        <Box width="100%">
          <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={2}>📍 LOCATION</Text>
          <Text fontSize="lg" color="gray.700">{event.location}</Text>
        </Box>

        <Box width="100%">
          <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={2}>📅 DATE & TIME</Text>
          <Text fontSize="lg" color="gray.700">
            {new Date(event.event_date).toLocaleDateString()} at {new Date(event.event_date).toLocaleTimeString()}
          </Text>
        </Box>

        {event.description && (
          <Box width="100%">
            <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={2}>📝 DESCRIPTION</Text>
            <Text fontSize="lg" color="gray.700" whiteSpace="pre-line">
              {event.description}
            </Text>
          </Box>
        )}

        {children}
      </VStack>
    </Box>
  )
}