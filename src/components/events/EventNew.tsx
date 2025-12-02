import { Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { addEvents } from './api/addEvents';
import EventForm from './components/EventForm';

function NewEvent() {
    const navigate = useNavigate();

    const handleCreateEvent = async (data: any) => {
        return await addEvents(data);
    };

    const handleSuccess = () => {
        navigate('/events');
    };

    const handleError = (error: any) => {
        // Handle error - could show toast or log
    };

    return (
        <Box>
            <EventForm
                initialValues={{
                    name: '',
                    location: '',
                    event_status: 'todo',
                    event_date: '',
                }}
                onConfirm={handleCreateEvent}
                onSuccess={handleSuccess}
                onError={handleError}
                title="Create New Event"
            />
        </Box>
    );
}

export default NewEvent;