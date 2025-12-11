import { LoaderFunction } from 'react-router-dom';
import EventList from '../components/events/EventsListClient';
import getAllEvents from '../components/events/api/getAllEvents';


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