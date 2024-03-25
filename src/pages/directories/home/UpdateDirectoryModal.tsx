import React, { FC } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  MenuItem,
} from "@chakra-ui/react";

import { Button } from "@/components";
import { DirectoryForm } from "./DirectoryForm";
import { useDirectoryContext } from "@/contexts";
import { Directory } from "@alerta-ciudadana/entity";

interface UpdateDirectoryModalProps {
  directory: Directory;
}

export const UpdateDirectoryModal: FC<UpdateDirectoryModalProps> = ({ directory }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { updateDirectory } = useDirectoryContext();

  return (
    <div>
      <MenuItem onClick={onOpen} fontSize="sm">
        Actualizar
      </MenuItem>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nuevo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DirectoryForm
              defaultValues={directory}
              onSubmit={async (values) => {
                await updateDirectory({ ...values, id: directory.id });
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
