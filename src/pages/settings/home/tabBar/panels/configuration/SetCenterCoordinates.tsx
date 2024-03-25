import React, { FC, useMemo, useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Box,
  Text,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { GoogleMaps, Button, FormProvider, Input } from "@/components";
import { useSettingsContext } from "@/contexts";

interface SetCenterCoordinatesProps {
  isDisabled: boolean;
}

export const SetCenterCoordinates: FC<SetCenterCoordinatesProps> = ({ isDisabled }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { centralCoordinates, setNewCentralCoordinates } = useSettingsContext();

  const [newCoor, setNewCoor] = useState<google.maps.LatLngLiteral>(centralCoordinates);

  const MapComponent = useMemo(
    () => (
      <GoogleMaps
        defaultZoom={10}
        defaultCenter={centralCoordinates}
        markerList={[{ position: newCoor }]}
        onClick={({ coords }) => setNewCoor(coords)}
      />
    ),
    [centralCoordinates]
  );

  async function handleUpdate() {
    await setNewCentralCoordinates(newCoor);
    onClose();
  }

  return (
    <div>
      <Button w="full" colorScheme="pri" onClick={onOpen} isDisabled={isDisabled}>
        Cambiar
      </Button>

      <Modal isCentered size="4xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay rounded="sm" />
        <ModalContent mx="2">
          <ModalHeader px="2" pb="0">
            <Text lineHeight="none" fontSize="lg" fontWeight="medium">
              Cambiar Coordenadas del centro
            </Text>
            <Text lineHeight="none" fontSize="sm" fontWeight="normal" color="gray.600">
              Seleccione un punto en el mapa y luego haga click en Guardar
            </Text>
          </ModalHeader>
          <ModalBody px="2">
            <Box h="xl">{MapComponent}</Box>
          </ModalBody>

          <ModalFooter
            px="2"
            flexDir={["column", null, null, "row"]}
            alignItems="stretch"
            pt="0"
            justifyContent="space-between"
          >
            <FormProvider onSubmit={() => {}} id="">
              <HStack>
                <Input
                  name="lat"
                  inputProps={{
                    isReadOnly: true,
                    value: newCoor.lat.toFixed(10),
                    width: "36",
                    textAlign: "center",
                  }}
                />
                ,
                <Input
                  name="lng"
                  inputProps={{
                    isReadOnly: true,
                    value: newCoor.lng.toFixed(10),
                    width: "36",
                    textAlign: "center",
                  }}
                />
              </HStack>
            </FormProvider>
            <Flex mt={["2", null, null, 0]} flex="1" justifyContent="flex-end">
              <Button colorScheme="pri" mr={3} onClick={handleUpdate}>
                Guardar Cambios
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
