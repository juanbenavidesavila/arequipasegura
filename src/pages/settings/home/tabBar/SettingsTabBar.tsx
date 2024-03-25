import React from "react";

import { Tabs, TabList, TabPanels, Tab, TabPanel, GridItem, Text } from "@chakra-ui/react";
import { Card } from "@/layout";
import { ConfigurationPanel } from "./panels/configuration/ConfigurationPanel";
import { MessagesListPanel } from "./panels/messagesList/MessagesListPanel";
import { ListingsPanel } from "./panels/listings/ListingsPanel";

export const SettingsTabBar = () => {
  return (
    <GridItem colSpan={12}>
      <Tabs /* defaultIndex={3} */ colorScheme="pri">
        <Card.Wrapper overflowX="auto" overflowY="hidden" shadow="sm" mb={["1", null, null, "2"]}>
          <TabList borderColor="gray.200" borderBottomWidth="1px">
            <Tab
              py="3"
              _selected={{ bg: "pri.50", borderColor: "pri.500", color: "pri.700" }}
              fontWeight="medium"
              _focus={{}}
            >
              <Text w="max-content">Configuración</Text>
            </Tab>
            <Tab
              py="3"
              _selected={{ bg: "pri.50", borderColor: "pri.500", color: "pri.700" }}
              fontWeight="medium"
              _focus={{}}
            >
              <Text w="max-content">Listado de Mensajes</Text>
            </Tab>
            <Tab
              py="3"
              _selected={{ bg: "pri.50", borderColor: "pri.500", color: "pri.700" }}
              fontWeight="medium"
              _focus={{}}
            >
              <Text w="max-content">Cambiar Contraseña</Text>
            </Tab>{" "}
            <Tab
              py="3"
              _selected={{ bg: "pri.50", borderColor: "pri.500", color: "pri.700" }}
              fontWeight="medium"
              _focus={{}}
            >
              <Text w="max-content">Listados</Text>
            </Tab>
          </TabList>
        </Card.Wrapper>

        <Card.Wrapper>
          <TabPanels>
            <TabPanel p="0">
              <ConfigurationPanel />
            </TabPanel>
            <TabPanel p="0">
              <MessagesListPanel />
            </TabPanel>
            <TabPanel p="0">
              <p>three!</p>
            </TabPanel>
            <TabPanel p="0">
              <ListingsPanel />
            </TabPanel>
          </TabPanels>
        </Card.Wrapper>
      </Tabs>
    </GridItem>
  );
};
