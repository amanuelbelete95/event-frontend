import { Box, Button, Flex, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { User, Event, EventAPIResponse } from "../events/events.type";
import { UserAPIResponse } from "../users/users.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { registerToEvent } from "./api/registerToEvent";
import { EventDesignSystem } from "../events/designSystem";
import getEventById from "../events/api/getEvent";

import { URLSearchParams } from "url";
import { BASE_URL } from "../events/constants";
import { useParams } from "react-router-dom";

interface RegisterEventInput {
    event_id: string;
    user_id: string;
    reason: string;
    event?: EventAPIResponse;
    user?: UserAPIResponse;
}
const EventRegisterForm = () => {
    const { register, handleSubmit, watch, formState: { errors, isSubmitting }, } = useForm<RegisterEventInput>();
    const onSubmit: SubmitHandler<RegisterEventInput> = (data) => {
        registerEventFn(data)
    }

    const { id } = useParams();
    const { data: event } = useQuery({
        queryKey: ["event", id],
        queryFn: () => getEventById(id as string),
        enabled: !!id
    });
    const { mutate: registerEventFn } = useMutation({
        mutationFn: registerToEvent,
        onSuccess: undefined,
        onError: undefined
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