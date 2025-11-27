import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { addEvents } from './api/addEvents';
import EventForm from './components/EventForm';

function NewEvent() {
   return (
<EventForm/>
   )
}
export default NewEvent