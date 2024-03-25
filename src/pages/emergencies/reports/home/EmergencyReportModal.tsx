import { Button } from "@/components";
import { Emergency } from "@alerta-ciudadana/entity";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Modal,
  List,
  ListItem,
  Text,
  Divider,
} from "@chakra-ui/react";
import moment from "moment";
import React, { FC } from "react";

interface EmergencyReportModalProps {
  emegency?: Emergency;
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyReportModal: FC<EmergencyReportModalProps> = ({ emegency, isOpen, onClose }) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalles de la Emergencia</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <List>
            <ListItem>
              <Text fontSize="sm" fontWeight="semibold">
                Fecha
              </Text>
              <Text>{moment(emegency?.date).format("lll")}</Text>
            </ListItem>
            <Divider my="2" />
            <ListItem>
              <Text fontSize="sm" fontWeight="semibold">
                Emergencia
              </Text>
              <Text>{emegency?.emergency}</Text>
            </ListItem>
            <Divider my="2" />
            <ListItem>
              <Text fontSize="sm" fontWeight="semibold">
                Usuario
              </Text>
              <Text>{emegency?.user}</Text>
            </ListItem>
            <Divider my="2" />
            <ListItem>
              <Text fontSize="sm" fontWeight="semibold">
                Lugar
              </Text>
              <Text>{emegency?.place}</Text>
            </ListItem>
            <Divider my="2" />
            <ListItem>
              <Text fontSize="sm" fontWeight="semibold">
                Teléfono
              </Text>
              <Text>{emegency?.phone}</Text>
            </ListItem>
            <Divider my="2" />
            <ListItem>
              <Text fontSize="sm" fontWeight="semibold">
                Estado
              </Text>
              <Text>{emegency?.status}</Text>
            </ListItem>
            <Divider my="2" />
            <ListItem>
              <Text fontSize="sm" fontWeight="semibold">
                Valoración
              </Text>
              <Text>{emegency?.values}</Text>
            </ListItem>
          </List>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="pri" onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
