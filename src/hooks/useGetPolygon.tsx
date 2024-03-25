import { useMemo, useState } from "react";

import Cookies from "universal-cookie";

import { useDistrictContext } from "@/contexts";

export const useGetPolygon = () => {
  const { districts } = useDistrictContext();

  const polygon = useMemo<google.maps.LatLngAltitude[]>(() => {
    const districtId = new Cookies().get("district_id");
    const district = districts.find((d) => d.id === districtId);
    return district?.polygon || [];
  }, [districts]);

  const center = useMemo(() => {
    if (typeof window !== "undefined") {
      var bounds = new google.maps.LatLngBounds();
      polygon.forEach((coor) => bounds.extend(coor));
      return bounds.getCenter().toJSON();
    }
  }, [polygon]);

  return { polygon, center };
};
