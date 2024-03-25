import React, { FC } from "react";
import { FormControl, FormControlProps } from "../formControl";
import { Input, InputProps } from "../Input";

interface InputControlProps extends InputProps {
  formControl?: Omit<FormControlProps, "name">;
}

export const InputControl: FC<InputControlProps> = ({ formControl, ...inputProps }) => {
  return (
    <FormControl name={inputProps.name} {...formControl}>
      <Input {...inputProps} />
    </FormControl>
  );
};
