import { useDistrictContext } from "@/contexts";
import React, { useMemo } from "react";

import Cookies from "universal-cookie";

export const useCurrentDistrictPolygon = () => {
  const { districts } = useDistrictContext();

  const polygon = useMemo<google.maps.LatLngAltitude[]>(() => {
    const districtId = new Cookies().get("district_id");
    const district = districts.find((d) => d.id === districtId);
    return district?.polygon || [];
  }, [districts]);

  return { polygon };
};
