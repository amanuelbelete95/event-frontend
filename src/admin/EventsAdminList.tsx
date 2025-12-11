import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import { Badge, Box, Button, Card, CardBody, CardHeader, Flex, Heading, HStack, Input, InputGroup, InputLeftElement, SimpleGrid, Spacer, Text, useToast, VStack } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import DetailActions from '../DetailActions';
import { onDelete } from './api/deleteEvents';
import getAllEvents from './api/getAllEvents';
import { EventDesignSystem } from './designSystem';
import { EventAPIResponse } from './events.type';
import { EVENTS_ROUTES } from './routes';
import EventList from '../components/events/EventsListClient';

export const loader: LoaderFunction = async () => {
  try {
    const events = await getAllEvents();
    return events;
  } catch (error) {
    return Promise.reject(error)
  }

};

const EventsAdminList = () => {
    return <EventList isAdmin={true}/>
}
export default EventsAdminList;