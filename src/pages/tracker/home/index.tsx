import React, { useMemo } from "react";

import { NextPage } from "next";
import removeAccents from "remove-accents";

import { WrapperPage } from "@/templates";
import { Card } from "@/layout";
import { GoogleMaps } from "@/components";
import { useTrackerContext } from "@/contexts";
import { TrackerModal } from "./TrackerModal";
import { useGetPolygon } from "@/hooks";

export const TrackerPage: NextPage = () => {
  const { polygon, center } = useGetPolygon();
  const { trackers, setAttendEmergency } = useTrackerContext();
  console.log(trackers);
  const MapComponent = useMemo(() => {
    if (center?.lat !== 0) {
      return (
        <GoogleMaps
          polygonPathList={[{ path: polygon }]}
          defaultCenter={{lat:-16.400732099729286, lng:-71.53806324980305}}
          defaultZoom={12}
          markerList={trackers.map((tracker) => {
            // console.log("TRACKER:", tracker);
            return {
              position: { lat: -16.400732099729286, lng: -71.53806324980305 },
              onClick: () => {
                setAttendEmergency({ attending: true, tracker });
              },
            };
          })}
        />
      );
    }
  }, [polygon, trackers, center]);

  return (
    <>
      <WrapperPage fullScreen title="Seguimientos" breadcrumb={{ routes: ["tracker"] }}>
        <Card.Wrapper colSpan={12} flex="1">
          <Card.Header title="Seguimiento" />
          <Card.Body h="95%">{MapComponent}</Card.Body>
        </Card.Wrapper>
      </WrapperPage>
      <TrackerModal />
    </>
  );
};
