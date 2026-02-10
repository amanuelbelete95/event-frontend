import { CalendarIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Text,
  Link as ChakraLink,
  Image,
  HStack,
  useColorModeValue
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const bg = useColorModeValue("teal.600", "gray.900");
  const navHover = useColorModeValue("white", "teal.200");

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/events", label: "Events" },
    { path: "/settings", label: "Settings" },
    { path: "/contact", label: "Contacts" }
  ];

  return (
    <Flex
      px={8}
      py={4}
      align="center"
      justify="space-between"
      bg={bg}
      color="white"
      boxShadow="md"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      {/* Logo + Title */}
      <HStack spacing={3}>
        <CalendarIcon boxSize={6} />
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            Event Tracking System
          </Text>

          <Text fontSize="xs" opacity={0.85}>
            Manage and organize your events efficiently
          </Text>
        </Box>
      </HStack>

      {/* Navigation */}
      <HStack spacing={8}>
        {navItems.map(({ path, label }) => {
          const isActive = location.pathname === path;

          return (
            <ChakraLink
              key={path}
              as={Link}
              to={path}
              fontWeight="semibold"
              fontSize="sm"
              position="relative"
              color={isActive ? "white" : "whiteAlpha.800"}
              _hover={{
                textDecoration: "none",
                color: navHover
              }}
              _after={{
                content: '""',
                position: "absolute",
                width: isActive ? "100%" : "0%",
                height: "2px",
                bottom: "-4px",
                left: 0,
                bg: "white",
                transition: "0.3s"
              }}
            >
              {label}
            </ChakraLink>
          );
        })}
      </HStack>
    </Flex>
  );
}

export default Header;
