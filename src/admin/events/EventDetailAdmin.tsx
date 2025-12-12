import { HStack, Button, useToast, Box, Text, VStack, Divider } from '@chakra-ui/react'
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom'
import { EventDetailBase, loader as baseLoader } from '../../components/events/EventDetailBase'
import { EventAPIResponse } from '../../components/events/events.type';
import { onDelete } from '../../components/events/api/deleteEvents';
import { EVENTS_ROUTES } from '../../components/events/routes';

export const loader: LoaderFunction = baseLoader;

function EventDetailAdmin() {
  const event = useLoaderData() as EventAPIResponse
  const navigate = useNavigate()
  const toast = useToast()

  const handleEdit = () => {
    navigate(EVENTS_ROUTES.EVENTS_EDIT.getAbsoluteLink(event.event_id))
  }

  const handleDelete = async () => {
    try {
      await onDelete(event.event_id)
      toast({
        title: "Event Deleted",
        description: "Event deleted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      navigate('/admin/events')
    } catch (error: any) {
      toast({
        title: "Error deleting event",
        description: error.message || "Failed to delete event",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <EventDetailBase event={event} showAdminBadge={true}>
      <Box width="100%">
        <Text fontSize="sm" color="gray.500" fontWeight="medium" mb={2}>🔧 ADMIN CONTROLS</Text>
        <VStack align="start" spacing={2} bg="gray.50" p={4} borderRadius="md">
          <Text fontSize="md" color="gray.700">
            <strong>Event ID:</strong> {event.event_id}
          </Text>
          <Text fontSize="md" color="gray.700">
            <strong>Status:</strong> {event.event_status}
          </Text>
        </VStack>
      </Box>

      <Divider my={8} />

      <HStack spacing={4} justifyContent="flex-end">
        <Button
          colorScheme="brand"
          variant="outline"
          onClick={() => navigate('/admin/events')}
        >
          Back to Events
        </Button>
        <Button
          colorScheme="yellow"
          variant="solid"
          onClick={handleEdit}
        >
          Edit Event
        </Button>
        <Button
          colorScheme="red"
          variant="solid"
          onClick={handleDelete}
        >
          Delete Event
        </Button>
      </HStack>
    </EventDetailBase>
  )
}

export default EventDetailAdmin