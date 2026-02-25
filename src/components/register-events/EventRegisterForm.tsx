import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, useToast } from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { EventAPIResponse } from "../events/events.type";
import { UserAPIResponse } from "../users/users.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { registerToEvent } from "./api/registerToEvent";
import { EventDesignSystem } from "../events/designSystem";
import getEventById from "../events/api/getEvent";
import { useNavigate, useParams } from "react-router-dom";

export interface CreateUpdateRegistration {
    event_id: string;
    user_id: string;
    reason: string;
}

export interface RegisterEventResponse extends CreateUpdateRegistration {
    event: EventAPIResponse;
    user: UserAPIResponse;
}
const EventRegisterForm = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, } = useForm<CreateUpdateRegistration>();
    const onSubmit: SubmitHandler<CreateUpdateRegistration> = (data) => {
        registerEventFn(data)
    }
    const navigate = useNavigate();

    const toast = useToast();
    const { id } = useParams();
    const { data: event } = useQuery({
        queryKey: ["event", id],
        queryFn: () => getEventById(id as string),
        enabled: !!id
    });
    const { mutate: registerEventFn } = useMutation({
        mutationFn: registerToEvent,
        onSuccess: () => {
            toast({
                title: "Event Joined",
                description: "Event joined successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            navigate("/events");
        },
        onError: (error) => {
            console.log(error)
            toast({
                title: "Event Failed",
                description: `${error.message}`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    })


    return (
        <Flex justifyContent={"flex-start"} direction={"column"}>
            <Heading
                size="xl"
                mb={6}
                textAlign="center"
                color={EventDesignSystem.primaryColor}
                fontWeight="bold"
            >
                {`Register to : ${event?.name}`}
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box maxW="600px"
                    mx="auto"
                    p={8}
                    borderRadius={EventDesignSystem.card.borderRadius}
                    boxShadow={EventDesignSystem.card.shadow}
                    borderWidth={EventDesignSystem.card.borderWidth}
                    borderColor={EventDesignSystem.card.borderColor}>
                    <FormControl cursor={"pointer"}>
                        <FormLabel
                            fontWeight="semibold"
                            fontSize="md"
                            id="event_id"

                        >
                            Event Name
                        </FormLabel>
                        <Input
                            {...register("event_id")}
                            type="number"
                            placeholder="Enter event name"
                            name="event_id"
                        />
                    </FormControl>
                    <FormControl cursor={"pointer"}>
                        <FormLabel
                            fontWeight="semibold"
                            fontSize="md"
                        >
                            User
                        </FormLabel>
                        <Input
                            {...register("user_id")}
                            type="number"
                            placeholder="PLease select your name"
                        />
                    </FormControl>
                    <FormControl cursor={"pointer"}>
                        <FormLabel
                            fontWeight="semibold"
                            fontSize="md"
                        >
                            Reason
                        </FormLabel>
                        <Input
                            {...register("reason")}
                            type="text"
                            placeholder="Please specify why you want to join the event"

                        />
                    </FormControl>
                    <Button
                        type="submit"
                        bg={EventDesignSystem.primaryColor}
                        color="white"
                        size="lg"
                        width="full"
                        isLoading={isSubmitting}
                        loadingText="Saving..."
                        _hover={{ bg: EventDesignSystem.primaryDark }}
                        _active={{ transform: "scale(0.98)" }}
                        boxShadow="md"
                        fontSize="md"
                        fontWeight="bold"
                        mt={2}
                    >
                        {isSubmitting ? "Joinining..." : "Join Event"}
                    </Button>
                </Box>
            </form>
        </Flex>
    )
}


export default EventRegisterForm;