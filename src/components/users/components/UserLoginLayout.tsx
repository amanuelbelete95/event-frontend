import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Tabs, TabList, Tab, TabPanels, TabPanel, useToast } from "@chakra-ui/react";
import { useAuth } from "../../../components/auth/AuthProvider";
import { logInUser } from "../api/logInUser";
import NewUser from "../../../admin/users/UserNew";
import UserForm from "./UserForm";

function UserLoginLayout() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const toast = useToast();

  // Handle login action
  const handleLogin = async () => {
    try {
      if (!username || !password) {
        toast({
          title: "Missing credentials",
          description: "Please provide both username and password",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      await logInUser(username, password);
      toast({
        title: "Login successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Redirect to home after successful login
      navigate("/");
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Failed to login",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Handle logout action
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading authentication status...</div>;
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <Tabs variant="soft-rounded" colorScheme="blue">
        <TabList>
          <Tab>Login</Tab>
          <Tab>Register</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <UserForm isNew={false} title="Log In"/>

              {isAuthenticated && user && (
                <div style={{ marginTop: '16px', padding: '16px', background: '#f0f0f0', borderRadius: '8px' }}>
                  <p>Currently logged in as: <strong>{user.username}</strong></p>
                  <p>Role: <strong>{user.role}</strong></p>
                  <Button
                    colorScheme="red"
                    onClick={handleLogout}
                    size="sm"
                    mt={2}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <UserForm isNew={true} title={"Register"}/>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Where the login / register page content will appear */}
      <Outlet />
    </div>
  );
}

export default UserLoginLayout;
