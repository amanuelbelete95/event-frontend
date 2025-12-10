import { Box, Flex, Text } from '@chakra-ui/react'
import { LoaderFunction, useLoaderData } from 'react-router-dom'
import getEvent from './api/getEvent'
import { Event } from './events.type'



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


function EventDetail() {

  const event = useLoaderData() as Event
  return (
    <Flex direction={'column'} width={'50%'} gap={'20px'} >
      <Box display={"flex"} gap={'20px'}>
      <Text> Event Name</Text>
      <Text>{event.name}</Text>
    </Box>
    <Box display={"flex"} gap={'20px'}>
        <Text> Event Location</Text>
        <Text>{event.location}</Text>
    </Box>
    </Flex>


  )
}

export default EventDetail