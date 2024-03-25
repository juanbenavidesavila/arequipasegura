import { Button } from "@/components";
import { User } from "@alerta-ciudadana/entity";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  useDisclosure,
  VStack,
  Avatar,
  Text,
  ListItem,
  List,
  Divider,
} from "@chakra-ui/react";
import React, { FC, useMemo } from "react";
import { Info } from "react-feather";
import Cookies from "universal-cookie";
const cookies = new Cookies();
interface UserModalProps {
  user: User;
}

export const UserModal: FC<UserModalProps> = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const type = useMemo(() => cookies.get("type"), []);

  console.log(user)

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

      <Modal isCentered  scrollBehavior="inside" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader px="4">Detalles del usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody px="4">
            <VStack mb="4" spacing={0}>
              <Avatar src={user.avatarUrl || user.fotoperfil} size="2xl" />
              <Text fontWeight="medium" fontSize="2xl">
                {user.name || user.nombres}
              </Text>
              <Text>{user.email}</Text>
              <Text>{user.phone|| user.telefono}</Text>
            </VStack>
            <List spacing={3}>
              <ListItem lineHeight="none">
                <Text fontSize="sm" color="gray.500">
                  UId
                </Text>
                <Text fontWeight="medium">{user.uid}</Text>
              </ListItem>
              <Divider />
              <ListItem lineHeight="none">
                <Text fontSize="sm" color="gray.500">
                  IMEI
                </Text>
                <Text fontWeight="medium">{user.imei|| user.documento}</Text>
              </ListItem>
              <Divider />
              <ListItem lineHeight="none">
                <Text fontSize="sm" color="gray.500">
                  Estado
                </Text>
                <Text fontWeight="medium">{String(user.access||user.estado)}</Text>
              </ListItem>
              <Divider />
             
              <ListItem lineHeight="none">
              <Divider />

              {
                    (type === "arequipa")?(
                      <Text fontSize="sm" color="gray.500">
                        Telefono
                      </Text>
                    ):(
                      
                      <Text fontSize="sm" color="gray.500">
                        Puntos
                      </Text>
                      )
                  }
                <Text fontWeight="medium">{user.points || user.telefono}</Text>
              </ListItem>
                  {
                    (type === "arequipa") &&
                      <>
                        <Divider />
                          <ListItem lineHeight="none">
                            <Text fontSize="sm" color="gray.500">
                              Programa 1
                            </Text>
                        
                            <Text fontWeight="medium">{user.programa1}</Text>
                          </ListItem>
                      </>
                  }
                    {
                    (type === "arequipa") &&
                      <>
                        <Divider />
                          <ListItem lineHeight="none">
                            <Text fontSize="sm" color="gray.500">
                              Programa 2
                            </Text>
                        
                            <Text fontWeight="medium">{user.programa2}</Text>
                          </ListItem>
                      </>
                  }
                    {
                    (type === "arequipa") &&
                      <>
                        <Divider />
                          <ListItem lineHeight="none">
                            <Text fontSize="sm" color="gray.500">
                              Programa 3
                            </Text>
                        
                            <Text fontWeight="medium">{user.programa3}</Text>
                          </ListItem>
                      </>
                  }
                    {
                    (type === "arequipa") &&
                      <>
                        <Divider />
                          <ListItem lineHeight="none">
                            <Text fontSize="sm" color="gray.500">
                              Programa 4
                            </Text>
                        
                            <Text fontWeight="medium">{user.programa4}</Text>
                          </ListItem>
                      </>
                  }
                   {
                    (type === "arequipa") &&
                      <>
                        <Divider />
                          <ListItem lineHeight="none">
                            <Text fontSize="sm" color="gray.500">
                              Programa 5
                            </Text>
                        
                            <Text fontWeight="medium">{user.programa5}</Text>
                          </ListItem>
                      </>
                  }
                   {
                    (type === "arequipa") &&
                      <>
                        <Divider />
                          <ListItem lineHeight="none">
                            <Text fontSize="sm" color="gray.500">
                              Programa 6
                            </Text>
                        
                            <Text fontWeight="medium">{user.programa6}</Text>
                          </ListItem>
                      </>
                  }
                   {
                    (type === "arequipa") &&
                      <>
                        <Divider />
                          <ListItem lineHeight="none">
                            <Text fontSize="sm" color="gray.500">
                              Programa 7
                            </Text>
                        
                            <Text fontWeight="medium">{user.programa7}</Text>
                          </ListItem>
                      </>
                  }
            </List>
          </ModalBody>
          <ModalFooter px="4">
            <Button colorScheme="pri" w="full" onClick={onClose}>
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
