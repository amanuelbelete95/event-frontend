import {
    Box,
    Button,
    createStandaloneToast,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    PortalManager,
    Select,
    Text
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Form, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { useAuth } from "./auth/AuthProvider";
import { EventDesignSystem } from "./events/designSystem";
import { RegisterEventResponse } from "./register-events/EventRegisterForm";
import { PermissionGuard } from "./PermissionGuard";
import useFetchAllEvents from "./events/hooks/useFetchAllEvents";
import useFetchAllUsers from "./users/hooks/useFetchAllUsers";
export interface CreateUpdateRegistration {
    event_id: string  | undefined;
    user_id: number | undefined;
    reason: number;
}

interface BasicEventModalRegProps{
  isOpen: boolean;
  title: string;
  actionName?: string;
  eventId: string;
  onClose: () => void;
  onConfirm: (
    data: CreateUpdateRegistration
  ) => Promise<RegisterEventResponse>;
}

const validationSchema = Yup.object().shape({
  reason: Yup.string().required("reason is required"),
  event_id: Yup.number().required("Event is required").optional(),
  user_id: Yup.number().required("User is required").optional(),
});

export default function BasicEventModalRegModal(
  props: BasicEventModalRegProps
) {
  const {
    isOpen,
    title,
    eventId,
    onConfirm,
    onClose,
  } = props;
  const { user } = useAuth();


const { data: events, isLoading, error } = useFetchAllEvents();
const {data: users} = useFetchAllUsers();
  const { toast } = createStandaloneToast();
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<CreateUpdateRegistration>({
          resolver: yupResolver(validationSchema),
      });
  const { mutate, isPending } = useMutation
  ({
    mutationFn: onConfirm,
    onError: (error : any) => {
      const ErrorMessage = error.message ?? "There was an issue performing the action. If the problem persists, please contact support";
      return toast({
        status: "error",
        title: "Server error!",
        position: "top-right",
        description: ErrorMessage,
      });
    },
    onSuccess: (data) => {
      if(data == undefined || null ) return;
      toast({
        status: "success",
        title: "Event joined successfully!",
        position: "top-right",
        description: "You have successfully performed the event joining action.",
      });
      onClose();
    },
  });


  const onSubmit: SubmitHandler<CreateUpdateRegistration> = (data) => {

  const payload = user?.role === "admin"
    ? data
    : {
        ...data,
        event_id: eventId,
        user_id: user?.id,
      };
  mutate(payload);
};


  return (
    <PortalManager>
      <Modal
        isOpen={isOpen}
        motionPreset="slideInBottom"
        onClose={onClose}
        blockScrollOnMount={true}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent zIndex={1400} borderRadius={8} py={3}>
          <ModalHeader
            w="100%"
            display={"flex"}
            flexDir="column"
            alignItems="center"
            borderBottom={"1px dashed #EDEDED "}
          >
            <Box
              w={"60px"}
              h={"60px"}
              alignSelf="center"
              bg="#BEE4F8CC"
              borderRadius={50}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
            </Box>
            <Text pt={1} textAlign="center" fontWeight={600} fontSize={"25px"}>
              {title}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDirection={"column"} gap={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <PermissionGuard allowedRoles={["admin"]}>
            <FormControl isInvalid={!!errors.event_id}>
              <FormLabel
                  fontWeight="semibold"
                  fontSize="md"
                  id="event_id"
              >
                  Event Name
              </FormLabel>
             <Select placeholder="Select event" {...register("event_id")}>
              {events?.map((event) => (
              <option key={event.id} value={event.id}>
               {event.name}
              </option>
              ))}
              </Select>
            <FormErrorMessage>{errors.event_id?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.user_id}>
              <FormLabel
                  fontWeight="semibold"
                  fontSize="md"
              >
                  User
              </FormLabel>
              <Select placeholder="Select user" {...register("user_id")}>
               {users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
                ))}
              </Select>
            <FormErrorMessage>{errors.user_id?.message}</FormErrorMessage>
            </FormControl>
            </PermissionGuard>   
            <FormControl marginY={4} isInvalid={!!errors.reason}>
            <FormLabel>Reason</FormLabel>
            <Input
              {...register("reason")}
              placeholder="Please provide your reason for joining"
            />
            <FormErrorMessage>{errors.reason?.message}</FormErrorMessage>
            </FormControl>
          <Flex mt={2} justifyContent={"flex-end"}>
            <Button
              mr={3}
              bg={EventDesignSystem.primaryColor}
              isDisabled={isPending}
              isLoading={isPending}
              spinnerPlacement="start"
              loadingText="Processing"
              type="submit"
            >
              Join Event
            </Button>
            <Button onClick={onClose}>Close</Button>
            
          </Flex>
          </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </PortalManager>
  );
}
