import React, { useMemo, useState } from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { useComplaintContext } from "@/contexts";
import { Card } from "@/layout";
import { GoogleMaps } from "@/components";
import removeAccents from "remove-accents";
import { ComplaintReportModal } from "./ComplaintReportModal";
import { HStack, useDisclosure } from "@chakra-ui/react";
import { Complaint } from "@alerta-ciudadana/entity";
import { ComplaintFilter } from "./ComplaintFilter";
import { useCurrentDistrictPolygon } from "@/hooks";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const ComplaintReportsPage: NextPage = () => {
  const type = useMemo(() => cookies.get("type"), []);
  const { complaints } = useComplaintContext();

  const [complaintSelected, setComplaintSelected] = useState<any>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { polygon } = useCurrentDistrictPolygon();

  return (
    <>
      <WrapperPage fullScreen title="Reportes de Denuncias" breadcrumb={{ routes: ["complaints", "complaintReports"] }}>
        <Card.Wrapper colSpan={12}>
          <Card.Header title="Reportes de Denuncias" subtitle={`${complaints.length} Resultados encontrados`} />
          <Card.Body h="95%">
            <HStack mb="2">
              <ComplaintFilter />
            </HStack>
            
                <GoogleMaps
              polygonPathList={[{ path: polygon }]}
              markerList={complaints.map((complaint) => ({
                position: { lat: complaint.coordinates[0], lng: complaint.coordinates[1] },
                onClick: () => {
                  setComplaintSelected(complaint);
                  onOpen();
                },
                icon: {
                  url: `https://firebasestorage.googleapis.com/v0/b/alerta-ciudadana-provincial.appspot.com/o/complaint-types%2F${removeAccents(
                    complaint?.type?.toLowerCase() || ""
                  ).replace(/ /, "_")}?alt=media`,
                  scaledSize: new google.maps.Size(36, 36),
                },
              }))}
            />
            
            
          </Card.Body>
        </Card.Wrapper>
      </WrapperPage>
      <ComplaintReportModal isOpen={isOpen} onClose={onClose} complaint={complaintSelected} />
    </>
  );
};
