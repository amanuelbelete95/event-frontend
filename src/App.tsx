import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./components/auth/AuthProvider";
import { ChakraProvider } from "@chakra-ui/react";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
