import { Emergency } from "@alerta-ciudadana/entity";
import { Box, List, ListItem } from "@chakra-ui/react";
import React, { FC } from "react";
import ReactPlayer from "react-player";

interface AudioSectionProps {
  emergency: Emergency;
}

export const AudioSection: FC<AudioSectionProps> = ({ emergency }) => {

  return (
    <Box>
      <List>
        {Object.values(emergency.voz || {}).map(({ mensaje_voz }) => (
          <ListItem className="audio-container" key={mensaje_voz}>
            {/* @ts-ignore */}
            <ReactPlayer url={mensaje_voz} controls />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
