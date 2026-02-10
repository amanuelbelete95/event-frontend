import {
  Box,
  Heading,
  Text,
  Container,
  VStack,
  Button,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from "@chakra-ui/react";

import { accordionData } from "./data";

const Home = () => {
  const heroBg = useColorModeValue(
    "linear(to-r, teal.500, green.500)",
    "linear(to-r, teal.600, green.700)"
  );

  const cardBg = useColorModeValue("white", "gray.800");
  const pageBg = useColorModeValue("gray.50", "gray.900");

  return (
    <Box bg={pageBg} minH="100vh" py={12}>

      {/* ===== Hero Section ===== */}
      <Box
        bgGradient={heroBg}
        color="white"
        py={{ base: 14, md: 20 }}
        textAlign="center"
        px={6}
        boxShadow="lg"
      >
        <Container maxW="3xl">
          <VStack spacing={5}>
            <Heading size="2xl">
              Event Tracking System
            </Heading>

            <Text fontSize="lg" opacity={0.9}>
              Streamline your event management process. Plan, organize, and
              monitor events from start to finish with ease.
            </Text>

            <Button
              size="lg"
              bg="white"
              color="teal.600"
              _hover={{ bg: "gray.100" }}
            >
              Get Started
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* ===== FAQ / Info Section ===== */}
      <Container maxW="4xl" mt={14}>
        <VStack spacing={8} align="stretch">

          <Box textAlign="center">
            <Heading size="lg" mb={2}>
              Frequently Asked Questions
            </Heading>

            <Text color="gray.500">
              Learn more about how the system helps you manage events.
            </Text>
          </Box>

          <Box
            bg={cardBg}
            borderRadius="xl"
            boxShadow="md"
            p={6}
          >
            <Accordion allowToggle>
              {accordionData.map((item) => (
                <AccordionItem key={item.id} border="none" mb={3}>
                  <AccordionButton
                    borderRadius="md"
                    _hover={{ bg: "gray.100" }}
                  >
                    <Box flex="1" textAlign="left" fontWeight="semibold">
                      {item.question}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  <AccordionPanel pb={4} color="gray.600">
                    {item.answer}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;
