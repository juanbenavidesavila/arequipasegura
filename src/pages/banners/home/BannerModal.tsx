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
import { BannerForm } from "./BannerForm";
import { useBannerContext } from "@/contexts";

export const BannerModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createBanner } = useBannerContext();

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
            <BannerForm
              onSubmit={async (values) => {
                await createBanner(values);
                onClose();
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" form="create-or-update-banner" colorScheme="pri">
              Guardar directorio
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
