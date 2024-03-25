import React, { useEffect } from "react";

import { NextPage } from "next";

import { Divider, Flex, HStack, IconButton, Text, chakra } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "react-feather";

import { WrapperPage } from "@/templates";
import { Card, CardContainer } from "@/layout";
import { useDistrictContext } from "@/contexts";

import { NewDistrict } from "./newDistrict/NewDistrict";
import { DistrictTable } from "./districtTable/DistrictTable";
import { useAdmin } from "@/hooks";
import { useRouter } from "next/router";

export const DistrictTemplate: NextPage = () => {
  const { districts } = useDistrictContext();
  const { hasSuperAdmin } = useAdmin();

  const { push } = useRouter();

  if (!hasSuperAdmin) {
    if (typeof window !== "undefined") {
      push("/dashboard");
    }
    return <></>;
  }

  return (
    <WrapperPage title="Listado de Distritos" breadcrumb={{ routes: ["districts"] }}>
      <Card.Wrapper colSpan={12}>
        <Card.Header
          title="Listado de Distritos"
          subtitle={`${districts.length} Resultados encontrados`}
          optionsRight={[<NewDistrict key={1} />]}
        />
        <Card.Body px="0">
          <DistrictTable />
        </Card.Body>
        <Divider />
        <CardContainer>
          <Flex align="center" justify="space-between">
            <HStack>
              <IconButton variant="outline" aria-label="" size="sm" colorScheme="pri" icon={<>20</>} />
              <IconButton aria-label="" size="sm" colorScheme="pri" icon={<>50</>} />
              <IconButton variant="outline" aria-label="" size="sm" colorScheme="pri" icon={<>100</>} />
            </HStack>
            <HStack>
              <IconButton
                size="sm"
                aria-label="fist page"
                icon={<ChevronsLeft size="1.25rem" />}
                colorScheme="pri"
                variant="ghost"
                _focus={{}}
              />
              <IconButton
                size="sm"
                aria-label="fist page"
                icon={<ChevronLeft size="1.25rem" />}
                colorScheme="pri"
                variant="ghost"
                _focus={{}}
              />
              <Flex>
                <Text userSelect="none" fontSize="sm" fontWeight="medium">
                  <chakra.span color="pri.700">10-20</chakra.span> de 25
                </Text>
              </Flex>
              <IconButton
                size="sm"
                aria-label="last page"
                icon={<ChevronRight size="1.25rem" />}
                colorScheme="pri"
                variant="ghost"
                _focus={{}}
              />
              <IconButton
                size="sm"
                aria-label="last page"
                icon={<ChevronsRight size="1.25rem" />}
                colorScheme="pri"
                variant="ghost"
                _focus={{}}
              />
            </HStack>
          </Flex>
        </CardContainer>
      </Card.Wrapper>
    </WrapperPage>
  );
};
