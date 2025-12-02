import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  Text,
  HStack,
  Link,
  useToast,
  Card,
  CardBody,
  Divider
} from '@chakra-ui/react';

function Contacts() {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    request: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.address || !formData.request) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // You can add your logic here to handle form submission, like sending data to a server
    toast({
      title: "Request Submitted",
      description: "Your request has been submitted successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Navigate to confirmation page
    navigate('/request-conformation');
  };

  return (
    <Box maxW="600px" mx="auto" p={6}>
      <Card shadow="md">
        <CardBody>
          <VStack spacing={6} align="stretch">
            <Heading size="lg" textAlign="center" color="blue.600">
              Contact Us
            </Heading>

            <Text textAlign="center" color="gray.600">
              Have questions or need assistance? Send us your request and we'll get back to you.
            </Text>

            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">Name</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    bg="white"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">Address</FormLabel>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Your address"
                    bg="white"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="semibold">Request Details</FormLabel>
                  <Textarea
                    name="request"
                    value={formData.request}
                    onChange={handleInputChange}
                    placeholder="Please provide details of your request"
                    rows={6}
                    bg="white"
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  _hover={{ bg: "blue.600" }}
                >
                  Submit Request
                </Button>
              </VStack>
            </form>

            <Divider />

            <Box>
              <Text fontWeight="semibold" mb={3}>Follow us on social media:</Text>
              <HStack spacing={4} justify="center">
                <Link
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="blue.500"
                  _hover={{ textDecoration: 'underline' }}
                >
                  Facebook
                </Link>
                <Link
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="blue.400"
                  _hover={{ textDecoration: 'underline' }}
                >
                  Twitter
                </Link>
                <Link
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="blue.600"
                  _hover={{ textDecoration: 'underline' }}
                >
                  LinkedIn
                </Link>
              </HStack>
            </Box>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
}

export default Contacts;
