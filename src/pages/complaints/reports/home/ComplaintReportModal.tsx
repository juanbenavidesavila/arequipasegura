import { Button } from "@/components";
import { Complaint } from "@alerta-ciudadana/entity";
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
  Box,
  Image,
} from "@chakra-ui/react";
import moment from "moment";
import React, { FC, useMemo } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();
interface ComplaintReportModalProps {
  complaint?: Complaint;
  isOpen: boolean;
  onClose: () => void;
}

export const ComplaintReportModal: FC<ComplaintReportModalProps> = ({ complaint, isOpen, onClose }) => {
  const type = useMemo(() => cookies.get("type"), []);
  return (
    <Modal scrollBehavior="inside" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalles de la Denuncia</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <List>
            <ListItem>
              <Text fontSize="sm" fontWeight="semibold">
                Fecha
              </Text>
              <Text>{type == "arequipa" ?moment(complaint?.fecha).format("lll") :moment(complaint?.date).format("lll")}</Text>
            </ListItem>
            <Divider my="2" />
            <ListItem>
              <Text fontSize="sm" fontWeight="semibold">
                Denuncia
              </Text>
              <Text>{type == "arequipa" ? complaint?.tiporeporte :complaint?.type}</Text>
            </ListItem>
            <Divider my="2" />
            <ListItem>
              <Text fontSize="sm" fontWeight="semibold">
                Usuario
              </Text>
              <Text>{type == "arequipa" ? complaint?.nombres :complaint?.user}</Text>
            </ListItem>
            <Divider my="2" />
            <ListItem>
              <Text fontSize="sm" fontWeight="semibold">
                Lugar
              </Text>
              <Text>{type == "arequipa" ? complaint?.direccion:complaint?.place}</Text>
            </ListItem>
            <Divider my="2" />
            <ListItem>
              <Text fontSize="sm" fontWeight="semibold">
                Teléfono
              </Text>
              <Text>{type == "arequipa" ? complaint?.telefono :complaint?.phone}</Text>
            </ListItem>
            <Divider my="2" />
            <ListItem>
              <Text fontSize="sm" fontWeight="semibold">
                Estado
              </Text>
              <Text>{type == "arequipa" ? complaint?.estado :complaint?.status}</Text>
            </ListItem>
            <Divider my="2" />
            <ListItem>
              <Text fontSize="sm" fontWeight="semibold">
                Descripción
              </Text>
              <Text>{type == "arequipa" ?complaint?.descripciondenuncia :complaint?.description}</Text>
            </ListItem>
          </List>
          <Box mt="5">
            <Image src={type == "arequipa" ? complaint?.imagen1 :complaint?.avatarUrl} alt="" />
          </Box>
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
