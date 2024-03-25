import {
  Flex,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Box,
  ButtonGroup,
} from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { Info } from "react-feather";
import { Emergency } from "@alerta-ciudadana/entity";
import { Button, GoogleMaps } from "@/components";
import removeAccents from "remove-accents";
import { useCurrentDistrictPolygon } from "@/hooks";
import { InformationSection } from "./InformationSection";
import { VideoSection } from "./VideoSection";
import { AudioSection } from "./AudioSection";

interface EmergencyModalProps {
  emergency: Emergency;
}

export const EmergencyModal: FC<EmergencyModalProps> = ({ emergency }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { polygon } = useCurrentDistrictPolygon();

  const [sectionActive, setSectionActive] = useState<"INFORMATION" | "AUDIO" | "VIDEO">("INFORMATION");

  return (
    <>
      <IconButton
        onClick={onOpen}
        _focus={{}}
        size="sm"
        colorScheme="pri"
        variant="ghost"
        aria-label="emegergency-modal-button"
        icon={<Info />}
      />

      <Modal size="5xl" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent rounded="sm">
          <ModalHeader>Detalles de la emergencia</ModalHeader>

          <ModalBody>
            <Flex>
              <Box minH="80" mr="4" flex="1">
                <ButtonGroup mb="4" size="sm" isAttached>
                  <Button
                    colorScheme={sectionActive === "INFORMATION" ? "pri" : "gray"}
                    onClick={() => setSectionActive("INFORMATION")}
                  >
                    Información
                  </Button>
                  <Button
                    colorScheme={sectionActive === "AUDIO" ? "pri" : "gray"}
                    onClick={() => setSectionActive("AUDIO")}
                  >
                    Mensajes de voz
                  </Button>
                  <Button
                    colorScheme={sectionActive === "VIDEO" ? "pri" : "gray"}
                    onClick={() => setSectionActive("VIDEO")}
                  >
                    Video
                  </Button>
                </ButtonGroup>
                {sectionActive === "INFORMATION" && <InformationSection emergency={emergency} />}
                {sectionActive === "AUDIO" && <AudioSection emergency={emergency} />}
                {sectionActive === "VIDEO" && <VideoSection emergency={emergency} />}
              </Box>
              {emergency.coor && (
                <Box flex="1.5">
                  <GoogleMaps
                    polygonPathList={[{ path: polygon }]}
                    defaultCenter={{ lat: emergency.coor[0], lng: emergency.coor[1] }}
                    markerList={[
                      {
                        position: { lat: emergency.coor[0], lng: emergency.coor[1] },
                        icon: {
                          url: `https://firebasestorage.googleapis.com/v0/b/alerta-ciudadana-fe9d9.appspot.com/o/Iconos%20emergencia%2F${removeAccents(
                            emergency.emergency.toLowerCase()
                          )}.png?alt=media`,
                          scaledSize: new google.maps.Size(36, 36),
                        },
                      },
                    ]}
                  />
                </Box>
              )}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button _focus={{}} onClick={onClose} variant="ghost">
              Cerrar Ventana
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
