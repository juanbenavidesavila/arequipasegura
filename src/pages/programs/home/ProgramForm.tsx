import React, { FC } from "react";

import { Stack, Textarea } from "@chakra-ui/react";

import { InputUploadFile, FormControl, FormProvider, Input } from "@/components";

interface DirectoryFormProps {
  onSubmit(values: any): void;
  defaultValues?: any;
}

export const ProgramForm: FC<DirectoryFormProps> = ({ onSubmit, defaultValues }) => {
  return (
    <FormProvider id="create-or-update-banner" onSubmit={onSubmit}>
      <Stack>
        <FormControl name="file" label="Imagen 1">
          <InputUploadFile name="file" />
        </FormControl>
        <FormControl name="file2" label="Imagen 2">
          <InputUploadFile name="file2" />
        </FormControl>
        <FormControl name="title" label="Título">
          <Input name="title" rules={{ required: true }} inputProps={{ defaultValue: defaultValues?.title }} />
        </FormControl>
        <FormControl name="title" label="Datos">
          <Textarea placeholder='' />
        </FormControl>
        <FormControl name="title" label="Datos2">
          <Textarea placeholder='' />
        </FormControl>
        
      </Stack>
    </FormProvider>
  );
};
