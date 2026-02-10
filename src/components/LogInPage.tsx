import React, { useEffect, useState } from 'react'
import UserForm from './users/components/UserForm'
import { Button, Card, CardBody, CardHeader, createStandaloneToast, Heading, VStack } from '@chakra-ui/react';
import { useAuth } from './auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { CreateUpdateUser } from './users/schema';
import { CalendarIcon } from '@chakra-ui/icons';

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
      <Card>
        <CardHeader className='tex-center'>
          <Heading size='md'>Welcome to EventHub</Heading>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            Sign in to access company events
          </div>
        </CardHeader>
        <CardBody>
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
        </CardBody>
      </Card>
    </div>
  )
}

export default LogInPage