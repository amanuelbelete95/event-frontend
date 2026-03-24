import { CalendarIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Text,
  Link as ChakraLink,
  Image,
  HStack,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  MenuDivider,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { EventDesignSystem } from "../events/designSystem";
import { FiSettings, FiLogOut } from "react-icons/fi";

const NAV_ITEMS_ADMIN = [
  { path: "/", label: "Dashboard" },
  { path: "/events", label: "Events" },
  { path: "/users", label: "Users" },
  { path: "/contact", label: "Contacts" }
];

const NAV_ITEMS_USER = [
  { path: "/", label: "Home" },
  { path: "/events", label: "Browse Events" },
  { path: "/register-events", label: "My Registrations" },
  { path: "/contact", label: "Contact" }
];

function Header() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const bg = useColorModeValue("teal.600", "gray.900");
  const navHover = useColorModeValue("white", "teal.200");
  const cardBg = useColorModeValue("white", "gray.800");

  const navItems = user?.role === "admin" ? NAV_ITEMS_ADMIN : NAV_ITEMS_USER;

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
            {user?.role === "admin" ? "Admin Dashboard" : "Discover Events"}
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

        {/* User Menu */}
        <Menu>
          <MenuButton
            as={Button}
            variant="ghost"
            _hover={{ bg: "whiteAlpha.200" }}
            _active={{ bg: "whiteAlpha.300" }}
            rightIcon={<ChevronDownIcon />}
            color="white"
          >
            <HStack spacing={2}>
              <Avatar
                size="sm"
                name={user?.username}
                bg="white"
                color={EventDesignSystem.primaryColor}
              />
              <Text fontSize="sm" fontWeight="medium">
                {user?.username}
              </Text>
            </HStack>
          </MenuButton>
          <MenuList bg={cardBg} borderColor="gray.200">
            <Box px={3} py={2}>
              <Text fontWeight="semibold">{user?.username}</Text>
              <Text fontSize="sm" color="gray.500" textTransform="capitalize">
                {user?.role}
              </Text>
            </Box>
            <MenuDivider />
            <MenuItem
              as={Link}
              to="/"
              icon={<FiSettings />}
              _hover={{ bg: "gray.100" }}
            >
              Settings
            </MenuItem>
            <MenuItem
              onClick={logout}
              icon={<FiLogOut />}
              _hover={{ bg: "gray.100" }}
              color="red.500"
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
}

export default Header;
