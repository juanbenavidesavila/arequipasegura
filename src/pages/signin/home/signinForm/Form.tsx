import { Button, FormProvider, InputControl } from "@/components";
import { Stack } from "@chakra-ui/react";
import React, { FC } from "react";

import { signinSchema } from "./schema";

export interface SigninFormProps {
  isLoading?: boolean;
  onSubmit: (values: SigninFormOnSubmit) => void;
}

export const Form: FC<SigninFormProps> = ({ onSubmit, isLoading }) => {
  return (
    <FormProvider id="" onSubmit={onSubmit} schema={signinSchema}>
      <Stack>
        <InputControl
          
          inputProps={{ isDisabled: isLoading }}
          formControl={{ label: "Correo electrónico" }}
          name="email"
        />
        <InputControl
    
          formControl={{ label: "Contraseña" }}
          name="password"
          inputProps={{ type: "password", isDisabled: isLoading }}
        />
        <Button isLoading={isLoading} type="submit" colorScheme="pri">
          Iniciar Sesión
        </Button>
      </Stack>
    </FormProvider>
  );
};
