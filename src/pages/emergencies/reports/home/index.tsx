import React, { useState } from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { Card } from "@/layout";
import { GoogleMaps } from "@/components";
import { useEmergencyContext } from "@/contexts";
import { HStack, useDisclosure } from "@chakra-ui/react";
import { Emergency } from "@alerta-ciudadana/entity";

import { EmergencyReportModal } from "./EmergencyReportModal";
import removeAccents from "remove-accents";
import { EmergencyFilter } from "./EmergencyFilter";
import { useCurrentDistrictPolygon } from "@/hooks";

export const EmergencyReportsPage: NextPage = () => {
  const { emergencies } = useEmergencyContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [emergencySelected, setEmergencySelected] = useState<Emergency>();
  const { polygon } = useCurrentDistrictPolygon();

  return (
    <>
      <WrapperPage
        fullScreen
        title="Reportes de Emergencias"
        breadcrumb={{ routes: ["emergencies", "emergenciesReports"] }}
      >
        <Card.Wrapper colSpan={12}>
          <Card.Header title="Reportes de Emergencias" subtitle={`${emergencies.length} Resultados encontrados`} />
          <Card.Body h="95%">
            <HStack mb="2">
              <EmergencyFilter />
            </HStack>
            <GoogleMaps
              polygonPathList={[{ path: polygon }]}
              markerList={emergencies.map((emergency) => ({
                position: { lat: emergency.coor[0], lng: emergency.coor[1] },
                onClick: () => {
                  setEmergencySelected(emergency);
                  onOpen();
                },
                icon: {
                  url: `https://firebasestorage.googleapis.com/v0/b/alerta-ciudadana-fe9d9.appspot.com/o/Iconos%20emergencia%2F${removeAccents(
                    emergency.emergency.toLowerCase()
                  )}.png?alt=media`,
                  scaledSize: new google.maps.Size(36, 36),
                },
              }))}
            />
          </Card.Body>
        </Card.Wrapper>
      </WrapperPage>
      <EmergencyReportModal emegency={emergencySelected} isOpen={isOpen} onClose={onClose} />
    </>
  );
};
