import React from 'react';
import { Box, Button, Input, VStack, Heading } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

// Define Zod schema for form validation
const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  // Update the onSubmit function to call the backend API
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/api/signup', data);
      alert(response.data);
    } catch (error) {
      alert('Signup failed: ' + error.response?.data || error.message);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Employee Signup
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <Box>
            <label>Name</label>
            <Input type="text" {...register('name')} />
            <Box color="red.500" fontSize="sm">
              {errors.name?.message}
            </Box>
          </Box>

          <Box>
            <label>Email</label>
            <Input type="email" {...register('email')} />
            <Box color="red.500" fontSize="sm">
              {errors.email?.message}
            </Box>
          </Box>

          <Box>
            <label>Password</label>
            <Input type="password" {...register('password')} />
            <Box color="red.500" fontSize="sm">
              {errors.password?.message}
            </Box>
          </Box>

          <Button type="submit" colorScheme="blue" width="full">
            Sign Up
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Signup;