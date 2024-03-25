import { useDirectoryContext } from "@/contexts";
import { Card } from "@/layout";
import { WrapperPage } from "@/templates";
import { Box, Divider, Flex, HStack, List, ListItem, Tag, Text } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { Phone } from "react-feather";
import { MenuDirectory } from "./MenuDirectory";
import { NewDirectoryModal } from "./NewDirectoryModal";

export const DirectoriesPage = () => {
  const { directories } = useDirectoryContext();

  return (
    <WrapperPage title="Diretorios" breadcrumb={{ routes: ["directories"] }}>
      <Card.Wrapper colSpan={12}>
        <Card.Header
          title="Listado de directorios"
          subtitle={`${directories.length} Resultados encontrados`}
          optionsRight={[<NewDirectoryModal key="0" />]}
        />
        <Card.Body>
          <List>
            {directories.map((directory, i) => (
              <Fragment key={directory?.id}>
                {i !== 0 && <Divider my="3" />}

                <ListItem>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Box>
                      <HStack>
                        <Text fontWeight="semibold">{directory?.name}</Text>
                        <Tag lineHeight="none" size="sm" variant="solid" colorScheme="green">
                          {directory?.area}
                        </Tag>
                        <Tag lineHeight="none" size="sm" variant="solid" colorScheme="pri">
                          {directory?.position}
                        </Tag>
                      </HStack>
                      <HStack>
                        <Phone size="1.25rem" />
                        <Text fontWeight="semibold">{directory?.phone}</Text>
                      </HStack>
                    </Box>
                    <MenuDirectory directory={directory} />
                  </Flex>
                </ListItem>
              </Fragment>
            ))}
          </List>
        </Card.Body>
      </Card.Wrapper>
    </WrapperPage>
  );
};
