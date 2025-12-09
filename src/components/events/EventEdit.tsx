import React from 'react'
import EventForm from './components/EventForm'
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom'
import { getEventById } from "../events/api/getEvent"
import updateEvent from './api/updateEvent'
import { EventAPIResponse } from './events.type'


export const loader: LoaderFunction = async ({params}): Promise<EventAPIResponse> => {
    const { eventId } = params
    const event = await getEventById(eventId ?? "")
    return event;
}

const EventEdit = () =>  {
const event = useLoaderData() as ;
const navigate = useNavigate()

  return (
    <div>
       <EventForm 
        initialValues={event} 
        onConfirm={(data) => updateEvent(data, data?.event_id)}
        onSuccess={() => {
            navigate("./events")
        }}
        onError={(err) => {
           console.log(err)
        }}
        title="Edit Event"/>
    </div>
  )
}

export default EventEdit