import { createStandaloneToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider';
import UserForm from './users/components/UserForm';

const { toast } = createStandaloneToast();


function LogInPage() {
  const { isAuthenticated, login, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading authentication status...</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4">
      <UserForm
        isNew={false}
        onConfirm={login}
        onSuccess={() => {
          toast({
            title: "You have successfully signed in!",
            status: "success",
            duration: 3000,
            isClosable: true,

          });
          navigate("/");
        }}
        onError={() => {
          toast({
            title: "Login failed",
            description: "Login Failed please try again",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }}
        title='SignIn' />
    </div>
  )
}

export default LogInPage