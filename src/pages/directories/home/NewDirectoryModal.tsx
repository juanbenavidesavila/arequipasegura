import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { Button } from "@/components";
import { DirectoryForm } from "./DirectoryForm";
import { useDirectoryContext } from "@/contexts";

export const NewDirectoryModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createDirectory } = useDirectoryContext();

  return (
    <div>
      <Button onClick={onOpen} colorScheme="pri" size="sm">
        Nuevo
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nuevo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DirectoryForm
              onSubmit={async (values) => {
                await createDirectory(values);
                onClose();
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" form="create-or-update-directory" colorScheme="pri">
              Guardar directorio
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
