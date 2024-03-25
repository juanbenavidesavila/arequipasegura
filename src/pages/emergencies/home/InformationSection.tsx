import { Emergency } from "@alerta-ciudadana/entity";
import React, { FC } from "react";
import { Divider, List, ListItem, Text } from "@chakra-ui/react";
import moment from "moment";

interface InformationSectionProps {
  emergency: Emergency;
}

export const InformationSection: FC<InformationSectionProps> = ({ emergency }) => {
  return (
    <div>
      <List>
        <ListItem>
          <Text lineHeight="3" color="gray.500" fontSize="sm">
            Fecha:
          </Text>
          <Text fontWeight="semibold">{moment(emergency.date).format("LLL")}</Text>
        </ListItem>
        <Divider my="2" />
        <ListItem>
          <Text lineHeight="3" color="gray.500" fontSize="sm">
            Emergencia:
          </Text>
          <Text fontWeight="semibold">{emergency.emergency}</Text>
        </ListItem>
        <Divider my="2" />
        <ListItem>
          <Text lineHeight="3" color="gray.500" fontSize="sm">
            Usuario:
          </Text>
          <Text fontWeight="semibold">{emergency.user}</Text>
        </ListItem>
        <Divider my="2" />
        <ListItem>
          <Text lineHeight="3" color="gray.500" fontSize="sm">
            Lugar:
          </Text>
          <Text fontWeight="semibold">{emergency.place}</Text>
        </ListItem>
        <Divider my="2" />
        <ListItem>
          <Text lineHeight="3" color="gray.500" fontSize="sm">
            Estado:
          </Text>
          <Text fontWeight="semibold">{emergency.status}</Text>
        </ListItem>
        <Divider my="2" />
        {/* <ListItem>
          <Text lineHeight="3" color="gray.500" fontSize="sm">
            Valoración:
          </Text>
        </ListItem> */}
        {/* <Divider my="2" /> */}
      </List>
    </div>
  );
};
