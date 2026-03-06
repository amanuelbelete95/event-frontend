import {
    Box,
    Button,
    createStandaloneToast,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    PortalManager,
    Text
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { useAuth } from "./auth/AuthProvider";
import { EventDesignSystem } from "./events/designSystem";
import { RegisterEventResponse } from "./register-events/EventRegisterForm";
export interface CreateUpdateRegistration {
    event_id: string;
    user_id: string;
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
  event_id: Yup.string().required("Event is required"),
  user_id: Yup.string().required("User is required"),
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
  const { toast } = createStandaloneToast();
  const { register, handleSubmit } = useForm<CreateUpdateRegistration>({
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
    onSuccess: () => {
      toast({
        status: "success",
        title: "Event joined successfully!",
        position: "top-right",
        description: "You have successfully performed the event joining action.",
      });
      onClose();
    },
  });

  const onSubmit : SubmitHandler<CreateUpdateRegistration> =  (data) => {
    mutate({
      ...data,
      event_id: eventId,
      user_id: user?.id || ""
    })
  }

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
            <Text pt={4} textAlign="center" fontWeight={600} fontSize={"25px"}>
              {title}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDirection={"column"} gap={8}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" value={eventId} name="event_id" />
                    <input type="hidden" value={user?.id || ""} name="user_id" />
                    <FormControl marginY={4}>
                      <FormLabel>Reason</FormLabel>
                      <Input
                        {...register("reason")}
                        placeholder="Please provide your reason for joining"
                      />
                    </FormControl>

                    <Flex mt={8} justifyContent={"flex-end"}>
                      <Button
                        mr={3}
                        bg={EventDesignSystem.primaryColor}
                        type="submit"
                        isDisabled={isPending}
                        isLoading={isPending}
                        spinnerPlacement="start"
                        loadingText="Processing"
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
