import React, { FC } from "react";

import { FormProvider, InputControl } from "@/components";

interface AddingTypeFormProps {
  onSubmit: (data: any) => void;
}

export const AddingTypeForm: FC<AddingTypeFormProps> = ({ onSubmit }) => {
  return (
    <FormProvider
      id="adding-type-form"
      onSubmit={(values) => {
        onSubmit({ ...values, icon: Array.from(values.icon)[0] });
      }}
    >
      <InputControl name="name" formControl={{ label: "Nombre" }} inputProps={{ mb: "2" }} />
      <InputControl name="icon" formControl={{ label: "Ícono" }} inputProps={{ type: "file", multiple: false }} />
    </FormProvider>
  );
};
