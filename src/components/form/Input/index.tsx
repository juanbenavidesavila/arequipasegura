import React, { FC } from "react";
import { Input as _Input, InputProps as _InputProps } from "@chakra-ui/react";
import { RegisterOptions, useFormContext } from "react-hook-form";

export interface InputProps {
  name: string;
  rules?: RegisterOptions;
  inputProps?: _InputProps;
}

export const Input: FC<InputProps> = ({ name, inputProps, rules }) => {
  const { register } = useFormContext();

  return (
    <_Input
      _focus={{
        borderColor: inputProps?.colorScheme ? `${inputProps?.colorScheme}.500` : "pri.500",
        ring: "1",
        ringColor: inputProps?.colorScheme ? `${inputProps?.colorScheme}.100` : "pri.100",
      }}
      rounded="md"
      color="black"
      px="2.5"
      placeholder="Escribe algo..."
      {...register(name, rules)}
      {...inputProps}
    />
  );
};
