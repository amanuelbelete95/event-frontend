import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, VStack, useColorModeValue } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { EventDesignSystem } from "../../events/designSystem";
import { CreateUpdateUser, logInSchema, registerSchema } from "../schema";
import { UserAPIResponse } from "../users.type";

export interface UserFormProps {
  initialValues?: CreateUpdateUser;
  onConfirm?: (data: CreateUpdateUser) => Promise<UserAPIResponse>
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  title: string;
  isNew: boolean;
  name?: boolean;
}

export default function UserForm(props: UserFormProps) {
  const {
    initialValues,
    onConfirm,
    onSuccess,
    onError,
    title,
    isNew = false,
    name

  } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUpdateUser>({
    defaultValues: initialValues,
    mode: "onTouched",
    resolver: yupResolver(isNew ? registerSchema : logInSchema),
  });

  const { mutate } = useMutation({
    mutationFn: onConfirm,
    onSuccess: onSuccess,
    onError: onError,

  });

  const onSubmit: SubmitHandler<CreateUpdateUser> = (data) => {
    mutate(data);
  };

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
        {name}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="stretch">
          <FormControl isInvalid={!!errors.username}>
            <FormLabel
              fontWeight="semibold"
              fontSize="md"
            >
              Username
            </FormLabel>
            <Input
              {...register("username")}
              type="text"
              placeholder="Enter username"
            />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel
              fontWeight="semibold"
              color={EventDesignSystem.form.label.color}
              fontSize="md"
            >
              Password
            </FormLabel>
            <Input
              {...register("password")}
              type="password"
              placeholder="Enter password"
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          {isNew && <FormControl isInvalid={!!errors.role}>
            <FormLabel
              fontWeight="semibold"
              color={EventDesignSystem.form.label.color}
              fontSize="md"
            >
              Role
            </FormLabel>
            <Select
              {...register("role")}
              placeholder="Select role"
              bg="white"

              size="lg"
            >
              <option value="any">any</option>
            </Select>
            <FormErrorMessage>{errors.role?.message}</FormErrorMessage>
          </FormControl>}

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
            cursor={"pointer"}
          >
            {isSubmitting ? "Saving..." : `${title}`}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}