import { FormControl, FormLabel, Input } from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { User, Event, EventAPIResponse } from "../events/events.type";
import { UserAPIResponse } from "../users/users.type";
import { useMutation } from "@tanstack/react-query";
import { registerToEvent } from "./api/registerToEvent";

interface RegisterEventInput {
    event_id: string;
    user_id: string;
    reason: string;
    event?: EventAPIResponse;
    user?: UserAPIResponse;
}
const EventRegisterForm = () => {
    const { register, handleSubmit, watch } = useForm<RegisterEventInput>();
    const onSubmit: SubmitHandler<RegisterEventInput> = (data) => {
        registerEventFn(data)
    }

    const { mutate: registerEventFn } = useMutation({
        mutationFn: registerToEvent,
        onSuccess: undefined,
        onError: undefined
    })


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    placeholder="Enter reason"

                />
            </FormControl>
            <Input type="submit" cursor={"pointer"} />
        </form>
    )
}


export default EventRegisterForm;