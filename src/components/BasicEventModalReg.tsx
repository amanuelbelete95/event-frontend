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
import { Form, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";

interface BasicEventModalRegProps{
  isOpen: boolean;
  title: string;
  actionName?: string;
  onClose: () => void;
  onConfirm: (
    data: BasicActionForm
  ) => Promise<any>;
}

interface BasicActionForm {
  reason: string;
  user_id: string;
  event_id: string;
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
    onConfirm,
    onClose,
  } = props;
  const { toast } = createStandaloneToast();
  const { register, handleSubmit } = useForm<BasicActionForm>({
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

  const submitAction : SubmitHandler<BasicActionForm> =  (data) => {
    mutate(data)
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
                  <Form noValidate onSubmit={handleSubmit(submitAction)}>
                    <FormControl>
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
                        placeholder="Please provide event name"
                        name="event_id"
                    />
                    </FormControl>
                    <FormControl>
                        <FormLabel
                            fontWeight="semibold"
                            fontSize="md"
                        >
                            User
                        </FormLabel>
                        <Input
                            {...register("user_id")}
                            type="number"
                            placeholder="Please provide your name"
                        />
                        </FormControl>
                    <FormControl marginY={4}>
                      <FormLabel>Reason</FormLabel>
                      <Input
                        {...register("reason")}
                      />
                    </FormControl>

                    <Flex mt={8} justifyContent={"flex-end"}>
                      <Button
                        colorScheme="red"
                        mr={3}
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
                  </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </PortalManager>
  );
}
