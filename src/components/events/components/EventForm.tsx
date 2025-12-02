import { Flex, Button, Select, FormControl, FormLabel, FormErrorMessage, Box, VStack, Heading, useToast } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import NormalInputField from "./Input";
import { schema as eventCreateUpdateSchema } from "../schema";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";

export interface EventFormTypes {
    name: string;
    location: string;
    event_status: string;
    event_date: string;
}

export interface EventFormProps {
    schema?: any;
    initialValues?: any;
    onConfirm?: (data: any) => void;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    title?: string;
}

export default function EventForm(props: EventFormProps) {
    const {
        schema,
        initialValues = { name: '', location: '', event_status: 'todo', event_date: '' },
        onConfirm = () => Promise.resolve(null),
        onSuccess = () => {},
        onError = () => {},
        title = "Create Event"
    } = props;
    const toast = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<EventFormTypes>({
        defaultValues: initialValues,
        resolver: yupResolver(eventCreateUpdateSchema),
    });

    const { mutate } = useMutation({
        mutationFn: onConfirm,
        onSuccess: (data) => {
            toast({
                title: "Success",
                description: "Event saved successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            onSuccess(data);
        },
        onError: (error: any) => {
            toast({
                title: "Error",
                description: error.message || "Failed to save event",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            onError(error);
        },
    });

    const onSubmit: SubmitHandler<EventFormTypes> = (data) => {
        mutate(data);
    };

    return (
        <Box maxW="500px" mx="auto" p={6} borderWidth={1} borderRadius="lg" boxShadow="md">
            <Heading size="lg" mb={6} textAlign="center" color="blue.600">
                {title}
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4} align="stretch">
                    <NormalInputField<EventFormTypes>
                        label="Event Name"
                        name="name"
                        register={register}
                        required={true}
                        error={errors.name}
                        placeholder="Enter event name"
                    />
                    <NormalInputField
                        label="Location"
                        name="location"
                        register={register}
                        required={true}
                        error={errors.location}
                        placeholder="Enter event location"
                    />
                    <NormalInputField
                        label="Event Date"
                        name="event_date"
                        register={register}
                        required={true}
                        error={errors.event_date}
                        type="date"
                    />

                    <FormControl isInvalid={!!errors.event_status}>
                        <FormLabel fontWeight="semibold">Event Status</FormLabel>
                        <Select
                            {...register("event_status")}
                            placeholder="Select status"
                            bg="white"
                            borderColor="gray.300"
                            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                        >
                            <option value="todo">Todo</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="postponed">Postponed</option>
                            <option value="cancelled">Cancelled</option>
                        </Select>
                        <FormErrorMessage>{errors.event_status?.message}</FormErrorMessage>
                    </FormControl>

                    <Button
                        type="submit"
                        colorScheme="blue"
                        size="lg"
                        width="full"
                        isLoading={isSubmitting}
                        loadingText="Saving..."
                        _hover={{ bg: "blue.600" }}
                    >
                        Save Event
                    </Button>
                </VStack>
            </form>
        </Box>
    );
}
