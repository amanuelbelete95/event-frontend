import { HStack, Button, Box, Text, VStack, Divider } from '@chakra-ui/react'
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom'
import { EventAPIResponse } from './events.type'
import { EventDesignSystem } from './designSystem'
import { EVENTS_ROUTES } from './routes'
import { EventDetailBase, loader as baseLoader } from './EventDetailBase'

export const loader: LoaderFunction = baseLoader;

function EventDetailUser() {
  const event = useLoaderData() as EventAPIResponse
  const navigate = useNavigate()

  return (
    <EventDetailBase event={event}>
      <Box width="100%">
        <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={2}>🎫 TICKET INFORMATION</Text>
        <VStack align="start" spacing={2}>
          <Text fontSize="lg" color="gray.700">
            Ticket information available upon registration
          </Text>
        </VStack>
      </Box>

      <Divider my={8} />

      <HStack spacing={4} justifyContent="flex-end">
        <Button
          colorScheme="brand"
          variant="outline"
          onClick={() => navigate(EVENTS_ROUTES.BASE.ABSOLUTE)}
        >
          Back to Events
        </Button>
        <Button
          colorScheme="brand"
          bg={EventDesignSystem.primaryColor}
          color="white"
          _hover={{ bg: EventDesignSystem.primaryDark }}
        >
          Register for Event
        </Button>
      </HStack>
    </EventDetailBase>
  )
}

export default EventDetailUser