import React, { useMemo, useState } from "react";

import {
    Spinner,
  Modal,
  Textarea,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  SimpleGrid,
  GridItem,
  List,
  ListItem,
  Box,
  Image,
  HStack,
} from "@chakra-ui/react";
import { Button } from "@/components";
import { useTrackerContext } from "@/contexts";
import { Tracker } from "@alerta-ciudadana/entity";
import ReactPlayer from "react-player";
import Cookies from "universal-cookie";
import { database } from "@/firebase";
import { Card } from "@/layout";
import youtube from "react-player/youtube";
import { default as _ReactPlayer } from 'react-player/lazy';
import { ReactPlayerProps } from "react-player/types/lib";



const cookies = new Cookies();

export const TrackerModal = () => {
    const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;
  const { attendEmergency, setAttendEmergency } = useTrackerContext();
  const { isOpen, onClose } = useDisclosure();
  const [observation, setObservation] = useState("")

  const type = useMemo(() => cookies.get("type"), []);

  console.log(attendEmergency);

  //setObservation(attendEmergency?.tracker ? attendEmergency?.tracker?.observacion : "")

  const [loading, setLoading] = useState(true)


  const handleInputChange = async (e:any) => {
    let inputValue = e.target.value

    setObservation(inputValue)
  }
  // const [comodin, setComodin] = useState<Tracker>();

  const districtId = useMemo(() => new Cookies().get("district_id"), []);
  // async function attendedEmergency() {
  //   const pathRef = `district/${districtId}/follow/location/${attendEmergency.tracker?.id}`;
  //   const pathRef2 = `district/${districtId}/emergency/${attendEmergency.tracker?.id}/${attendEmergency.tracker?.idemergencia}/`;
  //   // console.log(pathRef2);
  //   await database.ref(pathRef2).update({ status: "Atendido" });
  //   await database.ref(pathRef).update({ activator: false });
  //   // await database.ref(pathRef).remove();
  //   setAttendEmergency({ attending: false, tracker: undefined });
  //   onClose();
  // }

  async function attendedEmergency() {
    let pathRef;
    let pathRef2;
    if(type == "arequipa"){
      pathRef = `PNP/tiemporeal/location/${attendEmergency.tracker?.id}`;
      pathRef2 = `PNP/Emergencia/${attendEmergency.tracker?.id}/${attendEmergency.tracker?.idemergencia}`;
    }else{
      pathRef = `district/${districtId}/follow/location/${attendEmergency.tracker?.id}`;
      pathRef2 = `district/${districtId}/emergency/${attendEmergency.tracker?.id}/${attendEmergency.tracker?.idemergencia}`;
    }

    if (attendEmergency.tracker?.componente === "App") {
      await database.ref(pathRef2).update({ observation: observation });
      await database.ref(pathRef2).update({ status: "Atendido" });
      await database.ref(pathRef).update({ activator: false });
      await database.ref(pathRef).update({ observacion: observation });
    } else {
      await database.ref(pathRef).remove();
    }

    setAttendEmergency({ attending: false, tracker: undefined });
    onClose();
  }

  const videoReady = ()=>{
    console.log("ready")
    setLoading(false)
  }

  const videoReady2 = ()=>{
    console.log("readasdasddy")
  }



  return (
    
    <Modal
      closeOnEsc={false}
      closeOnOverlayClick={false}
      size="3xl"
      isCentered
     isOpen={attendEmergency.attending}
     //isOpen={true}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent >
        <ModalHeader>{attendEmergency.tracker?.tipe}</ModalHeader>
        <ModalBody>
          <SimpleGrid spacing={5} columns={12}>
            <GridItem colSpan={6}>
              <List spacing={3}>
                <ListItem>
                  <strong>Foto:</strong>
                  <Image rounded="md" w="10" src={attendEmergency.tracker?.foto} alt="" />
                </ListItem>
                <ListItem>
                  <strong>Nombre:</strong> {attendEmergency.tracker?.user}
                </ListItem>
                <ListItem>
                  <strong>Teléfono:</strong> {attendEmergency.tracker?.phone}
                </ListItem>
                <ListItem>
                  <strong>Dirección:</strong> {attendEmergency.tracker?.place}
                </ListItem>
                <ListItem>
                  <strong>Tipo de emergencia:</strong> {attendEmergency.tracker?.tipe}
                </ListItem>
                <ListItem>
                  <strong>Audios:</strong>
                  <Box>
                    <List>
                      {Object.values(attendEmergency.tracker?.voz || {}).map(({ mensaje_voz }) => (
                        <ListItem className="audio-container" key={mensaje_voz}>
                          {/* @ts-ignore */}
                          <ReactPlayer url={mensaje_voz} controls />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </ListItem>
                <ListItem>
                  <Textarea 
                    value={observation == "" ? attendEmergency?.tracker?.observacion : observation }
                    onChange={handleInputChange}
                    placeholder='Indicar la unidad móvil y personal que atendera esta emergencia' />
                </ListItem>
              </List>
            </GridItem>
            <GridItem colSpan={6} style={{textAlign: "center"}}>
              {/* @ts-ignore */}
              {
                  loading && <Spinner  color='red.500' size='xl' style={{position: "absolute",top: "25%"}}  />
              }
              <ReactPlayer onReady={videoReady} onBuffer={videoReady2} width="100%" controls url={attendEmergency.tracker?.video}  /> 
            </GridItem>
          </SimpleGrid>
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <HStack>
            <Button colorScheme="pri" mr={3} onClick={attendedEmergency}  disabled={observation.length < 5}>
              Atendida
            </Button>
            {/* <RecordAudio userToken={comodin.token} /> */}
          </HStack>
          <Button
            colorScheme="pri"
            mr={3}
            onClick={() => {
              onClose();
              setAttendEmergency({ attending: false, tracker: undefined });
            }}
          >
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
