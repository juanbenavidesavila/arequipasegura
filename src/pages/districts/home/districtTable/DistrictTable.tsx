import React, { useEffect, useState } from "react";

import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Text } from "@chakra-ui/react";
import { FormProvider } from "@/components";
import { DistrictTableMenuOptions } from "./DistrictTableMenuOptions/DistrictTableMenuOptions";
import { PolygonInformationModal } from "./polygonInformationModal/PolygonInformationModal";
import { database } from "@/firebase";
import moment from "moment";
import numeral from "numeral";
import { District } from "@alerta-ciudadana/entity";
import { useAction } from "src/store/actions";
import { useDistrictContext } from "@/contexts";

export const DistrictTable = () => {
  const { getDistricts } = useAction();
  const { districts } = useDistrictContext();

  useEffect(() => {
    getDistricts();
  }, []);

  return (
    <FormProvider id="" onSubmit={() => {}}>
      <TableContainer>
        <Table size="sm" variant="striped">
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Usuario Encargado</Th>
              <Th>Fecha de Creación</Th>
              <Th>Área</Th>
              <Th>Polígono</Th>
              <Th w="0"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {districts.length === 0 && (
              <>
                <Tr>
                  <Td colSpan={6}>
                    <Text py="2" textAlign="center" fontWeight="semibold">
                      No se han encontrado distritos
                    </Text>
                  </Td>
                </Tr>{" "}
              </>
            )}
            {districts.map((district: District) => (
              <Tr key={district.id}>
                <Td>{district.name}</Td>
                <Td>
                  <Text lineHeight="none">{district.user.name}</Text>
                  <Text color="gray.600" fontSize="sm" fontWeight="semibold">
                    {district.user.credentials.username}
                  </Text>
                </Td>
                <Td>
                  <Text lineHeight="none">{moment(district.createdAt).format("LLL")}</Text>
                </Td>
                <Td>{numeral(district.area).format("0,0.00")} km²</Td>
                <Td>
                  <PolygonInformationModal polygon={district.polygon} />
                </Td>
                <Td>
                  <DistrictTableMenuOptions district={district} />
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Nombre</Th>
              <Th>Usuario Encargado</Th>
              <Th>Fecha de Creación</Th>
              <Th>Área</Th>
              <Th>Polígono</Th>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </FormProvider>
  );
};
