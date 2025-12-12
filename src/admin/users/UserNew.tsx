import { Box, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../../components/users/components/UserForm';
import { addUser } from '../../components/users/api/addUser';

function NewUser() {
    const toast = useToast();
    const navigate = useNavigate();

    const handleSuccess = () => {
        toast({
             title: "User created",
             description: "User created successfully",
             status: "success",
             duration: 5000,
             isClosable: true,
        });
        navigate("/admin/users");
    };

    const handleError = (error: any) => {
        toast({
            title: "User Creation Failed",
            description: error.message || "User creation failed",
            status: "error",
            duration: 5000,
            isClosable: true,
        });
    };

    return (
        <Box>
            <UserForm
                initialValues={{
                    username: '',
                    password: '',
                    role: '',
                }}
                onConfirm={addUser}
                onSuccess={handleSuccess}
                onError={handleError}
                title="Create New User"
            />
        </Box>
    );
}

export default NewUser;