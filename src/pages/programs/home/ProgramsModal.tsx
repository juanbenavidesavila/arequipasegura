import { Button } from "@/components";
import { useUserContext } from "@/contexts";
import { Programs, User } from "@alerta-ciudadana/entity";
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
  Image,
  ListItem,
  List,
  Divider,
  Box,
  Flex,
} from "@chakra-ui/react";

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'


import React, { FC, useEffect, useMemo } from "react";
import { Info } from "react-feather";
import Cookies from "universal-cookie";
const cookies = new Cookies();

interface ProgramsModalProps{
    programs: Programs
}

export const ProgramsModal = ({programs}:ProgramsModalProps) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { users } = useUserContext();
    let programUsers = [];
    if(programs.uid){
        let index = programs.uid?.toLowerCase()
        programUsers = users.filter(u=> u[index] == "SI")
    }
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
        <Modal scrollBehavior="inside" size="6xl" isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader px="4">Detalles del Programa</ModalHeader>
                <ModalCloseButton />
                <ModalBody height={500}>
                <Flex>
                    <Box mr="4" flex="1">
                        <List spacing={3}>
                            <ListItem lineHeight="none">
                                <Text fontSize="sm" color="gray.500">
                                Titulo
                                </Text>
                                <Text fontWeight="medium">{programs.titulo}</Text>
                            </ListItem>
                            <Divider my="2" />
                            <ListItem lineHeight="none">
                                <Text fontSize="sm" marginBottom={5} color="gray.500">
                                    datos del programa
                                </Text>
                                <Text fontWeight="medium">{programs.data1}</Text>
                            </ListItem>
                            <Divider my="2" />
                            <ListItem lineHeight="none" >
                                <Text fontSize="sm"  marginBottom={5} color="gray.500">
                                    detalles del programa
                                </Text>
                                <Text fontWeight="medium">{programs.data2}</Text>
                            </ListItem>
                            <ListItem lineHeight="none" >
                                <Text fontSize="sm"  marginBottom={5} color="gray.500">
                                Usuarios Inscritos al programa
                                </Text>
                                <TableContainer>
                                    <Table variant='simple'>
                                        <Thead>
                                            <Tr>
                                                <Th>Nombre</Th>    
                                                <Th>Telefono</Th>
                                                <Th>Comisaria</Th>
                                                <Th>Distrito</Th>   
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {
                                                programUsers.map((p)=>
                                                    <Tr key={p.uid}>
                                                        <Td>{p.nombres}</Td>
                                                        <Td>{p.telefono}</Td>
                                                        <Td>{p.comisaria}</Td>
                                                        <Td>{p.distrito}</Td>
                                                    </Tr>
                                                )
                                            }
                                           
                                            
                                        </Tbody>

                                    </Table>
                                </TableContainer>
                            </ListItem>
                        </List>
                    </Box>
                    <Box>
                        <Text fontSize="sm" color="gray.500">
                            imagenes
                        </Text>
                        <Image style={{width:450, marginTop:25}} src={programs.img1 } alt="" />
                        <Image style={{width:450, marginTop:25}} src={programs.img2 } alt="" />
                    </Box>
                </Flex>

                </ModalBody>
                <ModalFooter px="4">
                    <Button colorScheme="pri" w="full" onClick={onClose}>
                    Aceptar
                    </Button>
                </ModalFooter>
            </ModalContent>
      </Modal>
    </>
  )
}
