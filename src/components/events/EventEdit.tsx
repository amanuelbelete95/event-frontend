import React from 'react'
import EventForm from './components/EventForm'
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom'
import { getEventById } from "../events/api/getEvent"
import updateEvent from './api/updateEvent'
import { EventAPIResponse } from './events.type'
import { useToast } from '@chakra-ui/react'


export const loader: LoaderFunction = async ({params}): Promise<EventAPIResponse> => {
    const { id } = params
    const event = await getEventById(id ?? "")
    return event;
}

const EventEdit = () =>  {
const event = useLoaderData() as EventAPIResponse;
console.log(event)
const navigate = useNavigate()
const toast = useToast()

  return (
    <div>
       <EventForm 
        initialValues={event} 
        onConfirm={(data) => updateEvent(data, event.event_id)}
        onSuccess={() => {
            navigate("./events")
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