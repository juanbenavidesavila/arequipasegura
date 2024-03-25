import React, { FC } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { Button } from "@/components";
import { ChangeNameForm } from "./ChangeNameForm";
import { database } from "@/firebase";
import { District } from "@alerta-ciudadana/entity";
interface ChangeNameModalProps {
  district: District;
}

export const ChangeNameModal: FC<ChangeNameModalProps> = ({ district }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function onSubmit(values: { name: string }) {
    const { name } = values;
    await database.ref(`admin/districts/${district.id}`).update({ name });
    onClose();
  }

  return (
    <>
      <MenuItem onClick={onOpen}>Cambiar Nombre</MenuItem>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cambiar Nombre del Distrito</ModalHeader>
          <ModalBody>
            <ChangeNameForm defaultValues={district} onSubmit={onSubmit} />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} type="submit" colorScheme="pri" form="change-name-form">
              Guardar Cambios
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
