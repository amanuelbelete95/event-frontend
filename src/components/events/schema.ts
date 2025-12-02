import * as yup from "yup"

export const schema = yup
  .object({
    name: yup.string().required(),
    location: yup.string().required(),
    event_status: yup.string().required(),
    event_date: yup.string().required(),
  });
