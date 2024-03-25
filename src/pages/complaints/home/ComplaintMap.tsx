import { GoogleMaps } from "@/components";
import { Complaint } from "@alerta-ciudadana/entity";
import { Box } from "@chakra-ui/react";
import React, { FC, useMemo } from "react";
import Cookies from "universal-cookie";

interface ComplaintMapProps {
  complaint: Complaint;
  polygon: google.maps.LatLngLiteral[];
  urlIcon: string;
}

const cookies = new Cookies();

export const ComplaintMap: FC<ComplaintMapProps> = ({ complaint, polygon, urlIcon }) => {

  const type = useMemo(() => cookies.get("type"), []);


  return (
    
    <GoogleMaps
      polygonPathList={[{ path: polygon }]}
      defaultCenter={{ lat: complaint.coordinates[0], lng: complaint.coordinates[1] }}
      markerList={[
        {
          position: { lat: complaint.coordinates[0], lng: complaint.coordinates[1] },
       
        },
      ]}
    />
  );
};
