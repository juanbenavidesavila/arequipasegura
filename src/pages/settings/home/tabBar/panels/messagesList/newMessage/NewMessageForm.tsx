import React, { FC } from "react";

import { FormProvider, Input } from "@/components";

interface NewMessageFormProps {
  isLoading: boolean;
  onSubmit: (values: any) => void;
}

export const NewMessageForm: FC<NewMessageFormProps> = ({ onSubmit, isLoading }) => {
  return (
    <FormProvider id="new-message-form" onSubmit={onSubmit}>
      <Input
        name="message"
        rules={{ required: true }}
        inputProps={{ placeholder: "Ingresa tu mensaje...", isDisabled: isLoading }}
      />
    </FormProvider>
  );
};
