import React, { FC } from "react";

import { Stack } from "@chakra-ui/react";

import { InputUploadFile, FormControl, FormProvider, Input } from "@/components";

interface DirectoryFormProps {
  onSubmit(values: any): void;
  defaultValues?: any;
}

export const BannerForm: FC<DirectoryFormProps> = ({ onSubmit, defaultValues }) => {
  return (
    <FormProvider id="create-or-update-banner" onSubmit={onSubmit}>
      <Stack>
        <FormControl name="title" label="Título">
          <Input name="title" rules={{ required: true }} inputProps={{ defaultValue: defaultValues?.title }} />
        </FormControl>
        <FormControl name="file" label="Título">
          <InputUploadFile name="file" />
        </FormControl>
      </Stack>
    </FormProvider>
  );
};
