import React, { useEffect, useState } from 'react'
import UserForm from './users/components/UserForm'
import { Button, Card, CardBody, CardHeader, createStandaloneToast, Heading, VStack } from '@chakra-ui/react';
import { useAuth } from './auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { CreateUpdateUser } from './users/schema';
import { CalendarIcon } from '@chakra-ui/icons';

const { toast } = createStandaloneToast();


function LogInPage() {
  const { user, isAuthenticated, login, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (user: CreateUpdateUser) => {
    const { username, password } = user;
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
    <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4">
      <Card>
        <CardHeader className='tex-center'>
          <Heading size='md'>Welcome to EventHub</Heading>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            Sign in to access company events
          </div>

        </CardHeader>
        <CardBody>
          <UserForm isNew={false} onConfirm={(data) => handleLogin(data)} title='SignIn' />
        </CardBody>
      </Card>
    </div>
  )
}

export default LogInPage