import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Heading, VStack } from '@chakra-ui/react';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/events');
        setEvents(response.data);
      } catch (error) {
        alert('Failed to fetch events: ' + error.response?.data || error.message);
      }
    };

    fetchEvents();
  }, []);

  const handleSendEmail = async (eventId) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/events/${eventId}/email`);
      alert(response.data);
    } catch (error) {
      alert('Failed to send email: ' + error.response?.data || error.message);
    }
  };

  const handleConfirmEvent = async (eventId) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/events/${eventId}/confirm`);
      alert(response.data);
    } catch (error) {
      alert('Failed to confirm event: ' + error.response?.data || error.message);
    }
  };

  return (
    <Box maxW="6xl" mx="auto" mt={10} p={5}>
      <Heading as="h1" size="xl" textAlign="center" mb={6}>
        Admin Dashboard
      </Heading>
      <VStack spacing={4} align="stretch">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Event Name</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Date</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Status</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{event.name}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{event.date}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{event.status}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleSendEmail(event.id)}
                    mr={2}
                  >
                    Send Email
                  </Button>
                  <Button
                    colorScheme="green"
                    size="sm"
                    onClick={() => handleConfirmEvent(event.id)}
                  >
                    Confirm
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </VStack>
    </Box>
  );
};

export default AdminDashboard;