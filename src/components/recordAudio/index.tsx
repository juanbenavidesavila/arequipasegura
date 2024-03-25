import React, { FC, useState } from "react";
import { Button } from "@chakra-ui/button";
import { v4 as uuidv4 } from "uuid";
import useLongPress from "../../hooks/useLongPress";
// import { ReactMic, ReactMicStopEvent } from "react-mic";
// import { FaMicrophone } from "react-icons/fa";
import { Box } from "@chakra-ui/layout";
import dynamic from "next/dynamic";
import { Mic } from "react-feather";

// @ts-ignore
const ReactMic = dynamic(() => import("react-mic").then(({ ReactMic }) => ReactMic), { ssr: false });

interface RecordAudioProps {
  userToken: string;
}

export const RecordAudio: FC<RecordAudioProps> = ({ userToken }) => {
  const [recording, setRecording] = useState(false);

  async function onStop(event: any) {



    try {
      // const nameAudio = `Audio-${Date.now()}.mp3`;
      // const audioUrl = `https://firebasestorage.googleapis.com/v0/b/alerta-ciudadana-fe9d9.appspot.com/o/Audio%2F${nameAudio}?alt=media&token=2ae2299a-a132-41f8-aa1d-e3b4b209245b`;
      // const tokenLocalStorage = localStorage.getItem("tokenNotificationFirebase");
      // if (!tokenLocalStorage) {
      //   return;
      // }
      // const newAudioRef = storageRef.child(`Audio/${nameAudio}`);
      // await newAudioRef.put(event.blob);
      /* const { data } = await axios.post(
        "https://fcm.googleapis.com/fcm/send",
        {
          to: userToken,
          collapse_key: "type_a",
          data: {
            title: "voz",
            body: audioUrl,
          },
          notification: {
            title: "voz",
            body: audioUrl,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "key=AAAA-geNAc4:APA91bHESX_2QFTKWwglPdvS62-sxwFOkmFGIeJvmys4LEolzSUlZw5lFfEiE4ADrti1kJWK5oBu4sCLmd7NLEtp3zdJ5G71TIESPli0INuWDGI06bksMWNiO6gSnUoAKwUtw6OHWBvd",
          },
        }
      ); */
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Button
        leftIcon={<Mic size="1.25rem" />}
        colorScheme="red"
        variant={recording ? "outline" : "solid"}
        onClick={() => {
          setRecording(!recording);
        }}
      >
        {recording ? "Grabando Audio" : "Grabar Audio"}
      </Button>
      <Box pos="absolute" zIndex="-1" visibility="hidden">
        {/* @ts-ignore */}
        <ReactMic visualSetting="frequencyBars" record={recording} onStop={onStop} />
      </Box>
    </>
  );
};
