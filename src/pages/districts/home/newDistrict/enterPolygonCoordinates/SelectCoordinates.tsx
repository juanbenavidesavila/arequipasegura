import { Button } from "@/components";
import { Box } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { GoogleMaps, FormControl } from "@/components";

interface SelectCoordinatesProps {
  value: google.maps.LatLngLiteral[];
  onChange?(coordinates: google.maps.LatLngLiteral[]): void;
}

export const SelectCoordinates: FC<SelectCoordinatesProps> = ({ value, onChange }) => {
  const [isActiveDrawing, setIsActiveDrawing] = useState(true);
  const [polygon, setPolygon] = useState<google.maps.LatLngLiteral[]>(value);

  return (
    <>
      <FormControl name="coordinates">
        <Box borderWidth="2px" h="sm">
          <GoogleMaps
            polygonPathList={polygon ? [{ path: polygon, draggable: true, editable: true }] : undefined}
            isDrawing={isActiveDrawing}
            onPolygonCompleteDrawingManager={({ coordinates }) => {
              setPolygon(coordinates);
              setIsActiveDrawing(false);
              onChange?.(coordinates);
            }}
            onEditPolygon={(paths) => {
              setPolygon(paths);
              onChange?.(paths);
            }}
            onPolygonCompleteDrawingManagerClean
          />
        </Box>
      </FormControl>
      <Button
        w="full"
        mt="2"
        colorScheme="red"
        onClick={() => {
          setPolygon([]);
          setIsActiveDrawing(true);
        }}
      >
        Restablecer Polígono
      </Button>
    </>
  );
};
