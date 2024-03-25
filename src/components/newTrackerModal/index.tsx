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
import { useTrackerContext } from "@/contexts";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const NewTrackerModal = () => {
  const { newTrackerDetected, newTracker, setNewTracker, setAttendEmergency, setNewTrackerDetected } =
    useTrackerContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { push, pathname } = useRouter();

  async function updateTracker() {
    setNewTracker({ attending: true, tracker: newTracker.tracker });
    setAttendEmergency({ attending: true, tracker: newTracker.tracker });
    pathname !== "/tracker" && push("/tracker");
    onClose();
  }

  const districtId = useMemo(() => cookies.get("district_id"), []);

  useEffect(() => {
    newTrackerDetected && onOpen();
  }, [newTrackerDetected]);

  return (
    <Modal closeOnOverlayClick={false} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nueva emergencia Detectada</ModalHeader>
        <ModalBody>Alguien ha enviado una emergencia</ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            variant="ghost"
            onClick={() => {
              onClose();
              setNewTracker({ attending: false, tracker: undefined });
              setNewTrackerDetected(false);
            }}
          >
            Cerrar
          </Button>
          <Button colorScheme="pri" onClick={() => updateTracker()}>
            Atender
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
