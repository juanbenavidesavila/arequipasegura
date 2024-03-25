import React, { FC } from "react";
import { Input as _Input, InputProps as _InputProps } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export interface InputNormalProps extends _InputProps {}

export const InputNormal: FC<InputNormalProps> = ({ ...props }) => {
  return (
    <_Input
      _focus={{
        borderColor: props?.colorScheme ? `${props?.colorScheme}.500` : "pri.500",
        ring: "1",
        ringColor: props?.colorScheme ? `${props?.colorScheme}.100` : "pri.100",
      }}
      rounded="md"
      color="black"
      px="2.5"
      placeholder="Escribe algo..."
      {...props}
    />
  );
};
