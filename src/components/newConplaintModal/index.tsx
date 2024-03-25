import React, { useEffect, useMemo } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useComplaintContext } from "@/contexts"; // Suponiendo que tienes un contexto para las quejas
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const NewComplaintModal = () => {
  const { newComplaintDetected, 
    newComplaint,
    setNewComplaint, 
    setNewComplaintDetected } = useComplaintContext(); 
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { push, pathname } = useRouter();

  async function updateComplaint() {
    setNewComplaint({ attending: true, complaint: newComplaint.complaint });
    pathname !== "/complaints" && push("/complaints");
    onClose();
  }

  const districtId = useMemo(() => cookies.get("district_id"), []);

  useEffect(() => {
    newComplaintDetected && onOpen();
  }, [newComplaintDetected]);

  return (
    <Modal closeOnOverlayClick={false} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nuevo Reporte</ModalHeader>
        <ModalBody>Alguien ha enviado una Reporte</ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            variant="ghost"
            onClick={() => {
              onClose();
              setNewComplaint({ attending: false, complaint: undefined });
              setNewComplaintDetected(false);
            }}
          >
            Cerrar
          </Button>
          <Button colorScheme="pri" onClick={() => updateComplaint()}>
            Atender
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};