import React, { FC } from "react";
import { Marker as _Marker } from "@react-google-maps/api";

export interface MarkerProps {
  position: google.maps.LatLngLiteral;
  onClick?: (event: google.maps.MapMouseEvent) => void;
  icon?: google.maps.Icon;
}

export const Marker: FC<MarkerProps> = ({ ...props }) => {
  return (
    <>
      {/* @ts-ignore */}
      <_Marker {...props} />
    </>
  );
};
