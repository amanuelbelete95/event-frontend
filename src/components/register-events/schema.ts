import * as yup from "yup"

export const eventRegistrationSchema = yup
    .object({
        event_id: yup.string().required("Event is required"),
        user_id: yup.string().required("User is required"),
        reason: yup.string().required().min(10, "Reason must be at least 10 characters"),
    });