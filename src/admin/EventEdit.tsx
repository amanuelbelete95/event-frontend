import React from 'react'
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom'

import { useToast } from '@chakra-ui/react'
import getEventById from '../components/events/api/getEvent'
import { EventAPIResponse } from '../components/events/events.type'
import EventForm from '../components/events/components/EventForm'
import updateEvent from '../components/events/api/updateEvent'

export const loader: LoaderFunction = async ({params}): Promise<EventAPIResponse> => {
    const { id } = params
    const event = await getEventById(id ?? "")
    return event;
}

const EventEdit = () =>  {
const event = useLoaderData() as EventAPIResponse;
const navigate = useNavigate();
const toast = useToast();

  return (
    <div>
       <EventForm
        initialValues={event}
        onConfirm={(data) => updateEvent(data, event.event_id)}
        onSuccess={() => {
          toast({
             title: "Event Updated",
             description:"Event updated successfully",
             status: "success",
             duration: 5000,
             isClosable: true,
            })
            navigate("/events")

        }}
        onError={(err) => {
           toast({
             title: "Error updating event",
             description: err.message || "Failed to update event",
             status: "error",
             duration: 5000,
             isClosable: true,
           })
           console.error(err)
        }}
        title="Edit Event"/>
    </div>
  )
}

export default EventEdit