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
  ListItem,
  Flex,
  Image,
  List,
  Divider,
} from "@chakra-ui/react";
import { Button } from "@/components";

export const RemoveBannerModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} variant="ghost" colorScheme="red">
        Eliminar
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eliminar imagenes del baner</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List>
              <ListItem>
                <Flex justifyContent="space-between" alignItems="center">
                  <Image
                    w="24"
                    src="https://img.freepik.com/vector-gratis/banner-negro-formas-geometricas-amarillas_1017-32327.jpg?w=2000"
                    alt=""
                  />
                  <Button variant="ghost" colorScheme="red">
                    Remover
                  </Button>
                </Flex>
              </ListItem>
              <Divider my="2" />
              <ListItem>
                <Flex justifyContent="space-between" alignItems="center">
                  <Image
                    w="24"
                    src="https://img.freepik.com/vector-gratis/banner-negro-formas-geometricas-amarillas_1017-32327.jpg?w=2000"
                    alt=""
                  />
                  <Button variant="ghost" colorScheme="red">
                    Remover
                  </Button>
                </Flex>
              </ListItem>
              <Divider my="2" />
              <ListItem>
                <Flex justifyContent="space-between" alignItems="center">
                  <Image
                    w="24"
                    src="https://img.freepik.com/vector-gratis/banner-negro-formas-geometricas-amarillas_1017-32327.jpg?w=2000"
                    alt=""
                  />
                  <Button variant="ghost" colorScheme="red">
                    Remover
                  </Button>
                </Flex>
              </ListItem>
            </List>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
