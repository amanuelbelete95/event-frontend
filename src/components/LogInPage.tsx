import React, { useEffect, useState } from 'react'
import UserForm from './users/components/UserForm'
import { Button, createStandaloneToast } from '@chakra-ui/react';
import { useAuth } from './auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { CreateUpdateUser } from './users/schema';

const {toast} = createStandaloneToast();


function LogInPage() {
const { user, isAuthenticated, login, logout, isLoading } = useAuth();
const navigate = useNavigate();

  const handleLogin = async (user: CreateUpdateUser) => {
    const {username, password} = user;
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

      await login(user)
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
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading authentication status...</div>;
  }

  return (
     <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <UserForm isNew={false} title="Log In" onConfirm={(data) => handleLogin(data)} />
                  {isAuthenticated && user && (
                    <div style={{ marginTop: '16px', padding: '16px', background: '#f0f0f0', borderRadius: '8px' }}>
                      <p>Currently logged in as: <strong>{user.username}</strong></p>
                      <p>Role: <strong>{user.role}</strong></p>
                      <Button
                        colorScheme="red"
                        size="sm"
                        mt={2}
                        onClick={() => handleLogout}
                      >
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
  )
}

export default LogInPage