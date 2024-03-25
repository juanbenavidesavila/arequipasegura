import React from "react";

import { Box, Flex, List, ListItem, Text } from "@chakra-ui/react";

import { Card } from "@/layout";
import { Button } from "@/components";

import { NewMessageModal } from "./newMessage/NewMessageModal";
import { useSettingsContext } from "@/contexts";

export const MessagesListPanel = () => {
  const { appSettings, removeDefaultMessage } = useSettingsContext();

  return (
    <>
      <Card.Header
        title="Listado de Mensajes"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus deserunt reprehenderit corporis sed repudiandae maxime."
        optionsRight={[<NewMessageModal key="new-message" />]}
      />

      <Card.Body>
        <List spacing={2} pl="5" listStyleType="disc">
          {appSettings?.defaultMessages.length ? (
            appSettings?.defaultMessages.map((message, i) => (
              <ListItem key={i}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Box flex="1" overflow="auto" mr={["3", null, null, "5"]}>
                    <Text w="max-content" flex="1" fontWeight="medium">
                      {message.message}
                    </Text>
                  </Box>
                  <Button
                    _focus={{}}
                    colorScheme="red"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDefaultMessage(message.id)}
                  >
                    Eliminar
                  </Button>
                </Flex>
              </ListItem>
            ))
          ) : (
            <Text fontWeight="medium" textAlign="center" color="gray.400">
              No hay mensajes predefinidos
            </Text>
          )}
        </List>
      </Card.Body>
    </>
  );
};
