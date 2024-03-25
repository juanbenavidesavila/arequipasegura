import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { InputProps } from "../Input";
import _InputMask from "react-input-mask";
import { Input as _Input } from "@chakra-ui/react";

export interface InputMaskProps extends InputProps {
  mask: string;
  maskChar?: string;
}

export const InputMask: FC<InputMaskProps> = ({ name, mask, maskChar = "", inputProps, rules }) => {
  return (
    <Controller
      name={name}
      rules={rules}
      render={({ field }) => (
        <_InputMask
          {...field}
          mask={mask}
          /*  @ts-ignore:next-line */
          maskChar={maskChar}
          {...inputProps}
        >
          {/*  @ts-ignore:next-line */}
          {(inputProps: any) => (
            <_Input
              _focus={{
                borderColor: inputProps?.colorScheme ? `${inputProps?.colorScheme}.500` : "primary.500",
                ring: "1",
                ringColor: inputProps?.colorScheme ? `${inputProps?.colorScheme}.500` : "primary.500",
              }}
              rounded="sm"
              color="black"
              px="2.5"
              placeholder="Escribe algo..."
              {...inputProps}
            />
          )}
        </_InputMask>
      )}
    />
  );
};
