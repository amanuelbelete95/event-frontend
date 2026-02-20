import {
  Box,
  Tabs,
  TabList,
  Tab,
  Container,
  Heading,
  Text,
  Card,
  CardBody,
  useColorModeValue
} from "@chakra-ui/react";
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

function UserLogInRegisterLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const bgPage = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box minH="100vh" bg={bgPage} py={20} w={"100%"}>
      <Container maxW="md">
        <Card bg={cardBg} boxShadow="xl" borderRadius="xl">
          <CardBody p={8}>
            <Box textAlign="center" mb={6}>
              <Heading size="lg" mb={2}>
                Welcome
              </Heading>
              <Text fontSize="sm" color="gray.500">
                Access your account or create a new one
              </Text>
            </Box>
            <Tabs
              index={activeTabIndex}
              variant="soft-rounded"
              colorScheme="blue"
              mb={6}
              isFitted
            >
              <TabList>
                <Tab onClick={() => {
                  navigate("/login")
                  setActiveTabIndex(0)
                }}
                >
                  Login
                </Tab>
                <Tab onClick={() => {
                  navigate("/login/new")
                  setActiveTabIndex(1)
                }}>
                  Register
                </Tab>
              </TabList>
            </Tabs>

            {/* Forms Render Here */}
            <Outlet />
          </CardBody>
        </Card>
      </Container>
    </Box >
  );
}

export default UserLogInRegisterLayout;
