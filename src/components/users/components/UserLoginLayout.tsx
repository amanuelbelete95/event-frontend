import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";

function UserLogInRegisterLayout() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <Tabs variant="soft-rounded" colorScheme="blue">
        <TabList>
          <Tab onClick={() => navigate("/login")}>Login</Tab>
          <Tab onClick={() => navigate("/login/register") }>Register</Tab>
        </TabList>
      </Tabs>
      <Outlet />
    </div>
  );
}

export default UserLogInRegisterLayout;
