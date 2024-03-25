import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { InputProps } from "../Input";
import _InputMask from "react-input-mask";
import { Input as _Input } from "@chakra-ui/react";
import { FormControl, FormControlProps } from "../formControl";
import { InputMask, InputMaskProps } from "../inputMask";

interface InputMaskControlProps extends InputMaskProps {
  formControl?: Omit<FormControlProps, "name">;
}

export const InputMaskControl: FC<InputMaskControlProps> = ({ formControl, ...inputMaskProps }) => {
  return (
    <FormControl name={inputMaskProps.name} {...formControl}>
      <InputMask {...inputMaskProps} />
    </FormControl>
  );
};
