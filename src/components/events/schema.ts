import * as yup from "yup"


export const createUpdateEventSchema = yup
  .object({
    name: yup.string().required(),
    location: yup.string().required(),
    event_status: yup.string().required(),
    event_date: yup.string().required(),
  });

export type CreateUpdateEvent = yup.InferType<typeof createUpdateEventSchema >
