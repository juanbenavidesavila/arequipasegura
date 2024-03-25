import React, { FC, useMemo } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Box,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";

import { Hexagon } from "react-feather";

import { Button, GoogleMaps } from "@/components";

interface PolygonInformationModalProps {
  polygon: google.maps.LatLngAltitude[];
}

export const PolygonInformationModal: FC<PolygonInformationModalProps> = ({ polygon }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const centerMap = useMemo(() => {
    if (typeof window !== "undefined") {
      var bounds = new window.google.maps.LatLngBounds();

      for (let i = 0; i < polygon.length; i++) {
        bounds.extend(polygon[i]);
      }
      return bounds.getCenter().toJSON();
    }
  }, [polygon]);

  return (
    <>
      <HStack>
        <Button
          onClick={onOpen}
          pl="2"
          leftIcon={
            <Box mr="-0.5">
              <Hexagon />
            </Box>
          }
          size="sm"
          colorScheme="pri"
        >
          {polygon.length > 999 ? "+999" : polygon.length} Lados
        </Button>
      </HStack>
      <Modal size="xl" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Información del Distrito</ModalHeader>
          <ModalBody>
            <Box h="lg" borderWidth="1px">
              <GoogleMaps defaultZoom={17} polygonPathList={[{ path: polygon }]} defaultCenter={centerMap} />
            </Box>
          </ModalBody>

          <ModalFooter pt="0">
            <Button colorScheme="red" variant="ghost" _focus={{}} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
