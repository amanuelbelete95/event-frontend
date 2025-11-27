import { Flex } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import NormalInputField from "./Input";
import { schema as eventCreateUpdateSchema } from "../schema";
import { useMutation } from "@tanstack/react-query";
import { addEvents } from "../api/addEvents";
import { yupResolver } from "@hookform/resolvers/yup";




export interface EventFormTypes {
    name: string;
    location: string;
    event_status: string;
    event_date: string;
}


export interface EventFormProps {
    schema: any;
    initialValues: any;
    onConfirm: (data: any) => void;
    onSuccess: (data: any) => void;
    onError: (error: any) => void;
}

export default function EventForm(props) {
    const { schema, initialValues, onConfirm, onSuccess, onError } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EventFormTypes>({
    resolver: yupResolver(eventCreateUpdateSchema),
  })
   
    const { mutate} = useMutation({
       mutationFn: onConfirm,
       onSuccess: onSuccess,
       onError: onError,
    })

     const onSubmit: SubmitHandler<EventFormTypes> = (data) => {
        mutate(data)
     }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex display={"flex"} direction={"column"} gap={"20px"} justifyContent={"space-between"}>
                <NormalInputField<EventFormTypes>
                    label="Event Name"
                    name="name"
                    register={register}
                    required={true}
                    error={errors.name}
                />
                <NormalInputField label={"Location"} required={true} name="location" register={register} error={errors.location} />
                <NormalInputField label={"Event Date"} required={true} name="event_date" register={register} error={errors.event_date} />
                <select {...register("event_status")}>
                    <option value="todo">Todo</option>
                    <option value="progress">Progress</option>
                    <option value="completed">Completed</option>
                    <option value="postponed">Postponed</option>
                    <option value="cancelled">Canceled</option>
                </select>

            </Flex>

            {errors.location && <span>This field is required</span>}
            <input type="submit" />

        </form>
    )
}
