import { Box, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import EventForm from '../../components/events/components/EventForm';
import { addEvents } from '../../components/events/api/addEvents';

function NewEvent() {
    const toast = useToast();
    const navigate = useNavigate();

    const handleSuccess = () => {
        toast({
             title: "Event created",
             description: "Event created successfully",
             status: "success",
             duration: 5000,
             isClosable: true,
        });
        navigate("/events");
    };

    const handleError = (error: any) => {
        toast({
            title: "Event Creation Failed",
            description: error.message || "Event creation failed",
            status: "error",
            duration: 5000,
            isClosable: true,
        });
    };

    return (
        <Box>
            <EventForm
                initialValues={{
                    name: '',
                    location: '',
                    event_status: '',
                    event_date: '',
                }}
                onConfirm={addEvents}
                onSuccess={handleSuccess}
                onError={handleError}
                title="Create New Event"
            />
        </Box>
    );
}

export default NewEvent;