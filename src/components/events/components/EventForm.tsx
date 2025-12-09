import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { EventAPIResponse } from "../events.type";
import { CreateUpdateEvent, createUpdateEventSchema } from "../schema";





export interface EventFormProps {
    initialValues?: EventAPIResponse;
    onConfirm?: (data: CreateUpdateEvent) => Promise<EventAPIResponse>
    onSuccess?: (data: EventAPIResponse) => void;
    onError?: (error: any) => void;
    title: string;
}

export default function EventForm(props: EventFormProps) {
    const {
        initialValues,
        onConfirm,
        onSuccess,
        onError,
        title,
    } = props;
   

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateUpdateEvent>({
        defaultValues: initialValues,
        mode: "onTouched",
        resolver: yupResolver(createUpdateEventSchema),
    });

    const { mutate } = useMutation({
        mutationFn: onConfirm,
        onSuccess: onSuccess,
        onError: onError,
        
    });

    const onSubmit: SubmitHandler<CreateUpdateEvent> = (data) => {
        mutate(data);
    };

    return (
        <Box maxW="500px" mx="auto" p={6} borderWidth={1} borderRadius="lg" boxShadow="md">
            <Heading size="lg" mb={6} textAlign="center" color="blue.600">
                {title}
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4} align="stretch">
                    <FormControl>
                        <FormLabel fontWeight="semibold">Name</FormLabel>
                         <Input
                        {...register("name")}
                        type={"text"}/>
                        </FormControl>
                                   
                                   <FormLabel fontWeight="semibold">Date</FormLabel>
                                   <Input
                        
                                       {...register("event_date")}
                                       type={"date"}
                                      
                                   />
                                   <FormLabel fontWeight="semibold">Location</FormLabel>
                                   <Input
                        
                                       {...register("location")}
                                       type={"text"}
                                       
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
                        New Event
                    </Button>
                </VStack>
            </form>
        </Box>
    );
}
