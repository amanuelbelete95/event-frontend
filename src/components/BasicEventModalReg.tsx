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
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { PermissionGuard } from "./PermissionGuard";
import { useAuth } from "./auth/AuthProvider";
import { EventDesignSystem } from "./events/designSystem";
import useFetchEvent from "./events/hooks/useFetchEvent";
import { RegisterEventResponse } from "./register-events/EventRegisterForm";
import useFetchAllUsers from "./users/hooks/useFetchAllUsers";
export interface CreateUpdateRegistration {
    event_id: number;
    user_id: number;
    reason: string;
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
  event_id: Yup.number().optional(),
  user_id: Yup.number().optional(),
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

// When user is signed in by himself we need the id of the user and the event id selected
const { user } = useAuth();
const { data: event } = useFetchEvent(eventId);

// For the admin to select when registering the user for the event;
const {data: users} = useFetchAllUsers();
  const { toast } = createStandaloneToast();
  const { register, handleSubmit, formState: { errors } } = useForm<CreateUpdateRegistration>({
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
      if(data == undefined || data === null ) return;
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
    ? {...data, event_id: event?.id}
    : {
        ...data,
        event_id: event?.id,
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
