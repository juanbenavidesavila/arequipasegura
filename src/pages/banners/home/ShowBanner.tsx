import React, { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { Button } from "@/components";
import { Eye } from "react-feather";
import { Banner } from "@alerta-ciudadana/entity";

interface ShowBannerProps {
  banner: Banner;
}

export const ShowBanner: FC<ShowBannerProps> = ({ banner }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton onClick={onOpen} colorScheme="pri" variant="ghost" _focus={{}} size="sm" aria-label={""}>
        <Eye size="1.25rem" />
      </IconButton>
      <Modal size="xl" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Imagen del banner {banner.title}</ModalHeader>
          <ModalBody>
            <Image w="full" userSelect="none" alt="" src={banner.url.replace(/Banner\//, "Banner%2F")} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="pri" onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
