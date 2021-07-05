import { FormErrorMessage, Input as ChakraInput, FormLabel, FormControl, InputProps as ChakraInputProps } from "@chakra-ui/react"
import { forwardRef, ForwardRefRenderFunction } from "react"
import { FieldError } from "react-hook-form"

interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
    error?: FieldError;
}

const InputBase:ForwardRefRenderFunction<HTMLInputElement, InputProps > = ({ label, name, error = null, ...rest }: InputProps, ref) => {
    return (
        <FormControl isInvalid={!!error}>
            {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <ChakraInput
                {...rest}
                id={name}
                placeholder={label}
                name={name}
                focusBorderColor="pink.500"
                bgColor="gray.900"
                variant="filled"
                _hover={{
                    bgColor: "gray.900"
                }}
                size="lg"
                ref={ref}
            />

            {!!error && (
                <FormErrorMessage>
                    {error.message}
                </FormErrorMessage>
            )}
        </FormControl>
    )
}

export const Input = forwardRef(InputBase)