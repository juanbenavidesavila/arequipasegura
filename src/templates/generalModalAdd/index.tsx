import React, { FC, useEffect } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";

import { Plus } from "react-feather";

import { Button } from "@/components";
import { AddingTypeForm } from "./AddingTypeForm";

interface GeneralModalAddProps {
  isLoading: boolean;
  createNewItem: (values: { name: string; icon: File }) => Promise<void>;
}

export const GeneralModalAdd: FC<GeneralModalAddProps> = ({ isLoading, createNewItem }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function onSubmit(values: any) {
    await createNewItem(values);

    onClose();
  }

  return (
    <>
      <IconButton
        onClick={onOpen}
        key="1"
        colorScheme="pri"
        rounded="md"
        variant="outline"
        size="sm"
        aria-label="New"
        icon={<Plus />}
      />
      <Modal closeOnEsc={!isLoading} closeOnOverlayClick={!isLoading} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nuevo item</ModalHeader>
          <ModalBody>
            <AddingTypeForm onSubmit={onSubmit} />
          </ModalBody>

          <ModalFooter>
            <Button
              form="adding-type-form"
              type="submit"
              colorScheme="blue"
              mr={3}
              isLoading={isLoading}
              loadingText="Guardando..."
            >
              Guardar
            </Button>
            <Button isDisabled={isLoading} onClick={isLoading ? undefined : onClose} variant="ghost">
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
