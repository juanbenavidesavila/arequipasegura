import { FormProvider, InputControl } from "@/components";
import React, { FC } from "react";

interface ChangeNameFormProps {
  onSubmit: (values: any) => void;
  defaultValues: any;
}

export const ChangeNameForm: FC<ChangeNameFormProps> = ({ onSubmit, defaultValues }) => {
  return (
    <FormProvider id="change-name-form" onSubmit={onSubmit} defaultValues={{ name: defaultValues.name }}>
      <InputControl
        name="name"
        inputProps={{ defaultValue: "Santo Domigo" }}
        formControl={{ label: "Nombre del distrito" }}
      />
    </FormProvider>
  );
};
