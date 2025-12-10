import { Box, createStandaloneToast } from '@chakra-ui/react';
import { addEvents } from './api/addEvents';
import EventForm from './components/EventForm';
import { error } from 'console';
import { useNavigate } from 'react-router-dom';

const { toast } = createStandaloneToast();

function NewEvent() {

    const navigate = useNavigate();
    const handleSuccess = () => {
        toast({
             title: "Event created",
             description:"Event created successfully",
             status: "success",
             duration: 5000,
             isClosable: true,
            })
         navigate("/events")
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
                onError={error => {
                    toast({
                        title : "Event Update Failed",
                         description:"Event update failde",
                         status: "error",
                         duration: 5000,
                         isClosable: true,

                    })
                }}
                title="Create New Event"
            />
        </Box>
    );
}

export default NewEvent;