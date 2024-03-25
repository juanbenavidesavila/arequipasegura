import React, { FC } from "react";

import { HStack, Stack } from "@chakra-ui/react";

import { FormProvider, InputControl } from "@/components";

import { EnterPolygonCoordinates } from "./enterPolygonCoordinates/EnterPolygonCoordinates";

interface NewDistrictFormProps {
  onSubmit(values: any): void;
}

export const NewDistrictForm: FC<NewDistrictFormProps> = ({ onSubmit }) => {
  return (
    <FormProvider
      id="new-district-form"
      onSubmit={(values, methods) => {
        const {
          name,
          coordinates,
          user: { passwordConfirmation, ...user },
        } = values;

        if (user.password !== passwordConfirmation) {
          methods.setError("user.confirmPassword", { message: "Las contraseñas no coinciden" });
          methods.setError("user.password", { message: "Las contraseñas no coinciden" });
          methods.setFocus("user.passwordConfirmation");

          return;
        }

        if (!coordinates) {
          methods.setError("coordinates", { message: "Debe ingresar un polígono válido", type: "required" });
          return;
        }
        if (coordinates?.length < 3) {
          methods.setError("coordinates", { message: "Debe ingresar las coordenadas del polígono", type: "required" });
          return;
        }

        onSubmit({ name, coordinates, user });
      }}
    >
      <Stack>
        <HStack>
          <InputControl
            name="name"
            rules={{ required: true }}
            formControl={{ label: "Nombre del Distrito" }}
            inputProps={{ placeholder: "abc..." }}
          />
        </HStack>
        <HStack alignItems="flex-start">
          <InputControl name="user.name" rules={{ required: true }} formControl={{ label: "Nombre del Usuario" }} />
          <InputControl name="user.username" rules={{ required: true }} formControl={{ label: "Correo de usuario" }} />
        </HStack>
        <HStack alignItems="flex-start">
          <InputControl
            name="user.password"
            rules={{ required: true, minLength: { value: 8, message: "Debe ingresar min. 8 caracteres" } }}
            formControl={{ label: "Contraseña" }}
            inputProps={{ placeholder: "••••••••", type: "password", autoComplete: "on" }}
          />
          <InputControl
            name="user.passwordConfirmation"
            rules={{ required: true }}
            formControl={{ label: "Confirmar Contraseña" }}
            inputProps={{ placeholder: "••••••••", type: "password", autoComplete: "on" }}
          />
        </HStack>
        <EnterPolygonCoordinates />
      </Stack>
    </FormProvider>
  );
};
