import React, { FC } from "react";

import { Stack } from "@chakra-ui/react";

import { FormControl, FormProvider, Input } from "@/components";
import { Directory } from "@alerta-ciudadana/entity";

interface DirectoryFormProps {
  onSubmit(values: Directory): void;
  defaultValues?: Directory;
}

export const DirectoryForm: FC<DirectoryFormProps> = ({ onSubmit, defaultValues }) => {
  return (
    <FormProvider id="create-or-update-directory" onSubmit={onSubmit}>
      <Stack>
        <FormControl name="name" label="Nombre">
          <Input name="name" rules={{ required: true }} inputProps={{ defaultValue: defaultValues?.name }} />
        </FormControl>
        <FormControl name="area" label="Área">
          <Input name="area" rules={{ required: true }} inputProps={{ defaultValue: defaultValues?.area }} />
        </FormControl>
        <FormControl name="phone" label="Teléfono">
          <Input name="phone" rules={{ required: true }} inputProps={{ defaultValue: defaultValues?.phone }} />
        </FormControl>
        <FormControl name="position" label="Posición">
          <Input name="position" rules={{ required: true }} inputProps={{ defaultValue: defaultValues?.position }} />
        </FormControl>
      </Stack>
    </FormProvider>
  );
};
