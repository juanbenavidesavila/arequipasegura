import React, { useEffect, useState } from "react";

import { Card, CardContainer } from "@/layout";

import { SetCenterCoordinates } from "./SetCenterCoordinates";
import { Box, Divider, Flex, HStack, Stack } from "@chakra-ui/react";
import { FormControl, Button, FormProvider, InputControl, InputMaskControl } from "@/components";
import { useSettingsContext } from "@/contexts";

export const ConfigurationPanel = () => {
  const { appSettings, centralCoordinates, setSettings } = useSettingsContext();
  const [isEditting, setIsEditting] = useState(false);
  const [version, setVersion] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (appSettings) {
      setVersion(appSettings.version);
      setPhone(appSettings.phone);
    }
  }, [appSettings]);

  return (
    <>
      <Card.Header
        title="Configuración de la aplicación"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus deserunt reprehenderit corporis sed repudiandae maxime."
      />
      <Card.Body>
        <FormProvider
          id="configuration-form"
          onSubmit={async () => {
            await setSettings({ version, phone, defaultMessages: appSettings?.defaultMessages || [] });
          }}
        >
          <Stack maxW="2xl">
            <FormControl
              name="coords"
              label="Coordenadas del centro"
              helperText="Especifique la ubicación donde estará el centro del mapa."
            >
              <Flex flexDir={["column", null, null, "row"]}>
                <HStack mb={["2", null, null, "0"]} mr="2" alignItems="center">
                  <InputControl name="lat" inputProps={{ isReadOnly: true, defaultValue: centralCoordinates.lat }} />
                  <InputControl name="lng" inputProps={{ isReadOnly: true, defaultValue: centralCoordinates.lng }} />
                </HStack>
                <SetCenterCoordinates isDisabled={false} />
              </Flex>
            </FormControl>
            <InputControl
              formControl={{
                label: "Google Map Api",
                helperText: "Identificación para el uso de la aplicación con Google Maps.",
              }}
              name="googleApiKey"
              inputProps={{ isDisabled: !isEditting }}
            />
            <InputMaskControl
              mask="+1 (999) 999-9999"
              formControl={{ label: "Teléfono", helperText: "Teléfono de contacto." }}
              name="phone"
              inputProps={{
                isDisabled: !isEditting,
                defaultValue: appSettings?.phone,
                value: phone,
                onChange: (e) => {
                  setPhone(e.target.value);
                },
              }}
            />
            <InputControl
              formControl={{ label: "Versión", helperText: "Versión actual de la aplicación." }}
              name="version"
              inputProps={{
                isDisabled: !isEditting,
                defaultValue: appSettings?.version,
                value: version,
                onChange: (e) => {
                  setVersion(e.target.value);
                },
              }}
            />
          </Stack>
        </FormProvider>
      </Card.Body>
      <Divider />
      <CardContainer>
        <Flex justifyContent="space-between">
          {isEditting ? (
            <Button colorScheme="red" variant="ghost">
              Restablecer Formulario
            </Button>
          ) : (
            <Box />
          )}

          {isEditting ? (
            <HStack>
              <Button onClick={() => setIsEditting(false)}>Cancelar</Button>
              <Button form="configuration-form" type="submit" colorScheme="pri">
                Guardar Cambios
              </Button>
            </HStack>
          ) : (
            <Button onClick={() => setIsEditting(true)} colorScheme="orange">
              Editar Configuración
            </Button>
          )}
        </Flex>
      </CardContainer>
    </>
  );
};
