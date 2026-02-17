import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, VStack, useColorModeValue } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { EventAPIResponse } from "../events.type";
import { CreateUpdateEvent, createUpdateEventSchema } from "../schema";
import { EventDesignSystem } from "../designSystem";
import { useEffect } from "react";





export interface EventFormProps {
  initialValues?: CreateUpdateEvent;
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
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUpdateEvent>({
    defaultValues: initialValues,
    mode: "onTouched",
    resolver: yupResolver(createUpdateEventSchema),
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        ...initialValues,
        event_date: initialValues.event_date?.split("T")[0], // fix date
        event_status: initialValues.event_status, // already "published"
      });
    }
  }, [initialValues, reset]);

  const { mutate } = useMutation({
    mutationFn: onConfirm,
    onSuccess: onSuccess,
    onError: onError,

  });

  const onSubmit: SubmitHandler<CreateUpdateEvent> = (data) => {
    mutate(data);
  };

  ;


  return (
    <Box
      maxW="600px"
      mx="auto"
      p={8}
      borderRadius={EventDesignSystem.card.borderRadius}
      boxShadow={EventDesignSystem.card.shadow}
      bg={useColorModeValue("white", "gray.700")}
      borderWidth={EventDesignSystem.card.borderWidth}
      borderColor={EventDesignSystem.card.borderColor}
    >
      <Heading
        size="xl"
        mb={6}
        textAlign="center"
        color={EventDesignSystem.primaryColor}
        fontWeight="bold"
      >
        {title}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel
              fontWeight="semibold"
              fontSize="md"
            >
              Event Name
            </FormLabel>
            <Input
              {...register("name")}
              type="text"
              placeholder="Enter event name"
            />
          </FormControl>

          <FormLabel
            fontWeight="semibold"
            color={EventDesignSystem.form.label.color}
            fontSize="md"
          >
            Date
          </FormLabel>
          <Input
            {...register("event_date")}
            type="date"

          />
          <FormLabel
            fontWeight="semibold"
            color={EventDesignSystem.form.label.color}
            fontSize="md"
          >
            Location
          </FormLabel>
          <Input
            {...register("location")}
            type="text"

          />

          <FormControl isInvalid={!!errors.event_status}>
            <FormLabel
              fontWeight="semibold"
              color={EventDesignSystem.form.label.color}
              fontSize="md"
            >
              Status
            </FormLabel>
            <Select
              {...register("event_status")}
              placeholder="Select status"
              bg="white"
              size="lg"

            >
              <option value="draft">draft</option>
              <option value="published"> published</option>
              <option value="completed">completed</option>
              <option value="cancelled"> cancelled</option>

            </Select>
            <FormErrorMessage>{errors.event_status?.message}</FormErrorMessage>
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
            {isSubmitting ? "Saving..." : (title.includes("Edit") ? "Update Event" : "Create Event")}
          </Button>
        </VStack>
      </form>
    </Box >
  );
}
