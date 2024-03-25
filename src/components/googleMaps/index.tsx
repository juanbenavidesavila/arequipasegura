import React, { FC, Fragment, useCallback, useRef, useState } from "react";

import { GoogleMap, Polygon, DrawingManager } from "@react-google-maps/api";

import { OriginalTheme } from "@/themes";

import { Marker, MarkerProps } from "./Marker";

/*TODO: Verificar si un punto está dentro de un polígono https://developers.google.com/maps/documentation/javascript/examples/poly-containsLocation */
interface GoogleMapsProps {
  defaultCenter?: google.maps.LatLngLiteral;
  defaultZoom?: number;
  markerList?: any[];
  polygonPathList?: { draggable?: boolean; editable?: boolean; path: google.maps.LatLngLiteral[] }[];
  isDrawing?: boolean;
  onClick?({ event, coords }: { event: google.maps.MapMouseEvent; coords: google.maps.LatLngLiteral }): void;
  onPolygonCompleteDrawingManager?({
    coordinates,
    polygon,
  }: {
    coordinates: google.maps.LatLngLiteral[];
    polygon: google.maps.Polygon;
  }): void;
  onPolygonCompleteDrawingManagerClean?: boolean;
  onEditPolygon?(paths: google.maps.LatLngLiteral[]): void;
}

export const GoogleMaps: FC<GoogleMapsProps> = ({
  defaultCenter,
  markerList,
  onClick,
  isDrawing,
  polygonPathList,
  onPolygonCompleteDrawingManager,
  onEditPolygon,
  onPolygonCompleteDrawingManagerClean,
  defaultZoom,
}) => {
  console.log(markerList);
  const [map, setMap] = useState(null);

  const polygonRef = useRef<any>(null);
  const listenersRef = useRef<any>([]);
  const drawingManagerRef = useRef<any>(null);

  const _onEditPolygon = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng: any) => ({ lat: latLng.lat(), lng: latLng.lng() }));

      onEditPolygon?.(nextPath);
    }
  }, [onEditPolygon]);

  const onLoadPolygon = useCallback(
    (polygon) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", _onEditPolygon),
        path.addListener("insert_at", _onEditPolygon),
        path.addListener("remove_at", _onEditPolygon)
      );
    },
    [_onEditPolygon]
  );

  const onLoad = useCallback(
    (map: any) => {
      const bounds = new window.google.maps.LatLngBounds();

      if (defaultCenter && defaultCenter.lat !== 0 && defaultCenter.lng !== 0) {
        bounds.extend(defaultCenter);
        map.fitBounds(bounds);
        setMap(map);
      } else {
        bounds.extend({ lat: 19.410694, lng: -70.643761 });
        map.fitBounds(bounds);
        setMap(map);
      }
    },
    [defaultCenter]
  );

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const onPolygonComplete = (polygon: google.maps.Polygon) => {
    const coordinates: google.maps.LatLngLiteral[] = polygon
      .getPath()
      .getArray()
      .map((item: any) => ({ lat: item.lat(), lng: item.lng() }));

    onPolygonCompleteDrawingManagerClean && polygon.setMap(null);
    onPolygonCompleteDrawingManager?.({ coordinates, polygon });
  };

  const onUnmountPolygon = useCallback(() => {
    listenersRef.current.forEach((lis: any) => lis.remove());
    polygonRef.current = null;
  }, []);

  const onLoadDrawingManager = (drawingManager: any) => {};

  return (
    <>
      {/* @ts-ignore */}
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{ maxZoom: 18, minZoom: 3, zoom: defaultZoom }}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={(e) => {
          const coords = e.latLng?.toJSON();
          coords && onClick?.({ event: e, coords });
        }}
      >
        {markerList && (
          <Fragment>
            {markerList.map((marker, i) => (
              <Marker key={i} {...marker} />
            ))}
          </Fragment>
        )}

        {polygonPathList &&
          polygonPathList.map((polygonList, index) => (
            <Polygon
              key={index}
              {...polygonList}
              onMouseUp={_onEditPolygon}
              onDragEnd={_onEditPolygon}
              onLoad={onLoadPolygon}
              onUnmount={onUnmountPolygon}
              options={{
                geodesic: true,
                strokeColor: OriginalTheme.components.colors.pri["500"],
                strokeOpacity: 1.0,
                strokeWeight: 2,
                fillColor: OriginalTheme.components.colors.pri["500"],
              }}
            />
          ))}

        {isDrawing && (
          <DrawingManager
            options={
              typeof window !== "undefined"
                ? {
                    drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
                    polylineOptions: { editable: true, draggable: true },
                  }
                : undefined
            }
            onLoad={onLoadDrawingManager}
            onPolygonComplete={onPolygonComplete}
            ref={drawingManagerRef}
          />
        )}
      </GoogleMap>
    </>
  );
};
