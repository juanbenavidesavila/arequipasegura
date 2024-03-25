import React, { FC, useMemo, useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { Edit } from "react-feather";
import { database } from "@/firebase";
import Cookies from "universal-cookie";

interface EditTitleProps {
  bannerId: string;
}
export const EditTitle: FC<EditTitleProps> = ({ bannerId }) => {
  const districtId = useMemo(() => new Cookies().get("district_id"), []);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newValue, setNewValue] = useState("");

  async function handleUpdate() {
    await database.ref(`district/${districtId}/banner/${bannerId}`).update({ title: newValue });
    onClose();
  }

  return (
    <>
      <IconButton
        colorScheme="green"
        rounded="sm"
        aria-label=""
        size="sm"
        _focus={{ ring: 0 }}
        ring="0"
        icon={<Edit size="1.25rem" />}
        onClick={onOpen}
      />
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nuevo titulo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input value={newValue} onChange={(e) => setNewValue(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose} variant="ghost">
              Cancelar
            </Button>
            <Button onClick={handleUpdate} colorScheme="blue">
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
