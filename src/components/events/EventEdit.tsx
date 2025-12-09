import React from 'react'
import EventForm from './components/EventForm'
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom'
import { getEventById } from "../events/api/getEvent"
import updateEvent from './api/updateEvent'
import { Event } from './events.type'


export const loader: LoaderFunction = async ({request, params}) => {
    const {event_id} = params
    const event = getEventById(event_id)
    return event;
}

const EventEdit = () =>  {
const event = useLoaderData();
const navigate = useNavigate()
  return (
    <div>
       <EventForm 
        initialValues={event} 
        onConfirm={(data: Event) => updateEvent(data, data.event_id)}
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