import {
  Avatar,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  HStack,
  IconButton,
  Image,
  List,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { FC, useEffect, useMemo, useState } from "react";
import { Info } from "react-feather";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Box } from "@chakra-ui/react";
import { Complaint } from "@alerta-ciudadana/entity";
import { GoogleMaps } from "@/components";
import moment from "moment";
import removeAccents from "remove-accents";
import { useCurrentDistrictPolygon } from "@/hooks";
import { ChangeStatusMenu } from "./ChangeStatusMenu";
import { ComplaintMap } from "./ComplaintMap";
import { CmplaintMessage } from "./CmplaintMessage";
import Cookies from "universal-cookie";
import ReactPlayer from "react-player";
import { VideoSection } from "./VideoSection";
import { useComplaintContext } from "@/contexts";

interface ComplaintModalProps {
  complaint: Complaint;
}

const cookies = new Cookies();

export const ComplaintModal: FC<ComplaintModalProps> = ({ complaint }) => {
  const { complaints } = useComplaintContext();
  const type = useMemo(() => cookies.get("type"), []);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [viewLateral, setViewLateral] = useState<"MAP" | "MESSAGE" | "VIDEO" >("MAP");

  const { polygon } = useCurrentDistrictPolygon();

  const urlIcon = useMemo(() => {
    return `https://firebasestorage.googleapis.com/v0/b/alerta-ciudadana-provincial.appspot.com/o/complaint-types%2F${removeAccents(
      complaint?.type?.toLowerCase() || ""
    ).replace(/ /, "_")}?alt=media`;
  }, [complaint]);


  

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

      <Modal scrollBehavior="inside" size="5xl" isCentered isOpen={isOpen}  onClose={onClose}>
        <ModalOverlay />
        <ModalContent rounded="sm">
          <ModalHeader display="flex" justifyContent="space-between" alignItems="center">
            <Text>Detalles de la denuncias</Text>
            <ChangeStatusMenu complaint={complaint} />
          </ModalHeader>

          <ModalBody>
            <Flex>
              <Box mr="4" flex="1">
                <List>
                  <ListItem>
                    <Text lineHeight="3" color="gray.500" fontSize="sm">
                      Fecha:
                    </Text>
                    <Text fontWeight="semibold">{
                      type == "arequipa" 
                        ? moment(complaint.fecha).format("LLL")
                        : moment(complaint.date).format("LLL")
                    }</Text>
                  </ListItem>
                  <Divider my="2" />
                  <ListItem>
                    <Text lineHeight="3" color="gray.500" fontSize="sm" mb="2">
                      Usuario:
                    </Text>
                    <HStack>
                      <Avatar src={complaint.avatarUrl || complaint.imgperfil} size="sm" /> <Text fontWeight="semibold">{ type == "arequipa" ? complaint.nombres :complaint.user}</Text>
                    </HStack>
                  </ListItem>
                  {
                    (type === "arequipa") &&
                      <>
                        <Divider my="2" />
                          <ListItem lineHeight="none">
                            <Text lineHeight="3" color="gray.500" fontSize="sm">
                              Tipo de reporte
                            </Text>
                        
                            <Text fontWeight="medium">{complaint.tiporeporte}</Text>
                          </ListItem>
                      </>
                  }
                  <Divider my="2" />

                  <ListItem>
                    <Text lineHeight="3" color="gray.500" fontSize="sm">
                      description:
                    </Text>
                    <Text fontWeight="semibold">{type == "arequipa" ? complaint.descripciondenuncia :complaint.description}</Text>
                  </ListItem>
                  <Divider my="2" />
                  <ListItem>
                    <Text lineHeight="3" color="gray.500" fontSize="sm">
                      Teléfono:
                    </Text>
                    <Text fontWeight="semibold">{type == "arequipa" ? complaint.telefono :complaint.phone}</Text>
                  </ListItem>{" "}
                  <Divider my="2" />
                  <ListItem>
                    <Text lineHeight="3" color="gray.500" fontSize="sm">
                      Lugar:
                    </Text>
                    <Text fontWeight="semibold">{type == "arequipa" ? complaint.direccion :complaint.place}</Text>
                  </ListItem>
                  {
                    (type === "arequipa") &&
                      <>
                        <Divider my="2" />
                          <ListItem lineHeight="none">
                            <Text lineHeight="3" color="gray.500" fontSize="sm">
                              mensaje
                            </Text>
                        
                            <Text fontWeight="medium">{complaint.mensaje}</Text>
                          </ListItem>
                      </>
                  }
                  {
                    (type === "arequipa") &&
                      <>

                      <Divider my="2" />
                      <ListItem className="audio-container" >
                      <Text lineHeight="3" color="gray.500" fontSize="sm">
                        Audio
                      </Text>
                            <ReactPlayer url={complaint.audio} controls />
                            
                      </ListItem>
                      </>
                  }
                      
                    
                  {
                    (type === "arequipa") &&
                      <>
                        <Divider my="2" />
                          <ListItem lineHeight="none">
                            <Text lineHeight="3" color="gray.500" fontSize="sm">
                              Ocurrencia
                            </Text>
                        
                            <Text fontWeight="medium">{complaint.ocurrencia}</Text>
                          </ListItem>
                      </>
                  }
                  
                  
                  <Divider my="2" />
                </List>
                {complaint.avatarUrl || complaint.imagen1 ? (
                  
                    (type === "arequipa")?(
                      <>
                        <Image src={complaint.imagen1 } alt="" style={{marginBottom:10}}/>
                        <Image src={complaint.imagen2 } alt="" style={{marginBottom:10}} />
                        <Image src={complaint.imagen3 } alt="" style={{marginBottom:10}} />
                      </>
                    ):(
                      <>
                        <Image src={complaint.avatarUrl } alt="" />
                      </>

                    )
                  
                ) : (
                  <Text fontWeight="semibold" color="gray.400" textAlign="center">
                    No hay imágenes para mostrar
                  </Text>
                )}


              </Box>
              <Box flex="1.5">
                <ButtonGroup mb="2" size="sm" isAttached>
                 
                  <Button
                    colorScheme={viewLateral === "MAP" ? "pri" : "gray"}
                    onClick={() => setViewLateral("MAP")}
                    _focus={{}}
                  >
                    Mapa
                  </Button>
                  <Button
                      colorScheme={viewLateral === "VIDEO" ? "pri" : "gray"}
                      onClick={() => setViewLateral("VIDEO")}
                      _focus={{}}
                    >
                      Video
                  </Button>
                  <Button
                    colorScheme={viewLateral === "MESSAGE" ? "pri" : "gray"}
                    onClick={() => setViewLateral("MESSAGE")}
                    _focus={{}}
                  >
                    Mensajes
                  </Button>
                </ButtonGroup>
                {viewLateral === "MAP" && (
                    <ComplaintMap polygon={polygon} complaint={complaint} urlIcon={urlIcon} />
                ) }
                 {viewLateral === "MESSAGE" && (
                    <CmplaintMessage complaint={complaint} />
                ) }
                 {viewLateral === "VIDEO" && (
                    <VideoSection complaint={complaint} />
                ) }
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button _focus={{}} onClick={onClose} variant="ghost">
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
