import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { Button } from "@/components";
import { NewDistrictForm } from "./NewDistrictForm";
import { AnyObject } from "yup/lib/types";
import { v4 as uuidv4 } from "uuid";
import { database, auth } from "@/firebase";
import { District } from "@alerta-ciudadana/entity";

export const NewDistrict = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function onSubmit(values: { name: string; coordinates: google.maps.LatLngAltitude[]; user: AnyObject }) {
    const { coordinates } = values;
    const polygon = coordinates.map(({ lat, lng }) => `${lat},${lng}`);

    const newDistrict: Omit<District<string[]>, "id"> = {
      polygon,
      createdAt: new Date().toISOString(),
      area: Number((google.maps.geometry.spherical.computeArea(coordinates) / 100).toFixed(2)),
      name: values.name,
      user: { name: values.user.name, credentials: { password: values.user.password, username: values.user.username } },
    };

    await database.ref(`/admin/districts/`).child(uuidv4()).set(newDistrict);
    auth.createUserWithEmailAndPassword(values.user.username, values.user.password).then((user) => {
      user.user?.updateProfile({ displayName: values.user.name });
    });

    onClose();
  }

  return (
    <>
      <Button size="sm" colorScheme="pri" onClick={onOpen}>
        Nuevo Distrito
      </Button>

      <Modal
        scrollBehavior="inside"
        closeOnOverlayClick={false}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent mx="2">
          <ModalHeader>Agrega un nuevo distrito</ModalHeader>
          <ModalBody>
            <NewDistrictForm onSubmit={onSubmit} />
          </ModalBody>

          <ModalFooter pt="1">
            <HStack>
              <Button type="submit" form="new-district-form" colorScheme="pri">
                Guardar Distrito
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
