import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Box,
} from "@chakra-ui/react";
import { FieldError, Path, UseFormRegister } from "react-hook-form";

type NormalInputFieldProps<T extends Record<string, any>> = {
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    required?: boolean | string;
    placeholder?: string;
    error?: FieldError;
    width?: string | number;
    type?: string;
};

export default function NormalInputField<T extends Record<string, any>>({
    label,
    name,
    register,
    required,
    placeholder,
    error,
    width = "100%",
    type = "text",
}: NormalInputFieldProps<T>) {
    return (
        <Box width={width}>
            <FormControl isInvalid={!!error} mb={4}>
                <FormLabel fontWeight="semibold">{label}</FormLabel>
                <Input
                    placeholder={placeholder || label}
                    {...register(name, { required })}
                    type={type}
                    borderWidth="1px"
                    p={4}
                    borderColor="gray.300"
                    borderRadius="md"
                    _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                />
                {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
            </FormControl>
        </Box>
    );
}
