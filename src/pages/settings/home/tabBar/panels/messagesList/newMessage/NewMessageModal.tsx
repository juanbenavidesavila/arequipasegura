import React, { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

import { Button } from "@/components";

import { NewMessageForm } from "./NewMessageForm";
import { useSettingsContext } from "@/contexts";

export const NewMessageModal = () => {
  const { addingDefaultMessages, appSettings } = useSettingsContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: any) {
    setIsLoading(true);
    await addingDefaultMessages(values.message);
    setIsLoading(false);
    onClose();
  }

  return (
    <>
      <Button onClick={onOpen} size="sm" variant="ghost" colorScheme="pri" key="new-message">
        Nuevo Mensaje
      </Button>

      <Modal closeOnEsc={!isLoading} closeOnOverlayClick={!isLoading} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent rounded="sm">
          <ModalHeader>Agrega un nuevo mensaje</ModalHeader>
          <ModalBody>
            <NewMessageForm onSubmit={onSubmit} isLoading={isLoading} />
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              form="new-message-form"
              colorScheme="pri"
              mr={3}
              isLoading={isLoading}
              loadingText="Guardando mensaje..."
            >
              Guardar Mensaje
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
