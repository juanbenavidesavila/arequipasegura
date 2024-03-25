import { FC, useState, useContext, useEffect } from "react";
import { District } from "@alerta-ciudadana/entity";
import moment from "moment";

import { database } from "@/firebase";
import { createContext } from "@/utils";

import { deleteDistrict } from "./deleteDistrict";

interface DistrictContext {
  districts: District[];
  deleteDistrict(id: string): Promise<void>;
}

const DistrictContext = createContext<DistrictContext>();

const DistrictProvider: FC = ({ children }) => {
  const [districts, setDistricts] = useState<District[]>([]);

  function getDistricts() {
    database.ref("admin/districts").on("value", (snapshot) => {
      let districts = snapshot.val();
      districts = Object.keys(districts || {})
        .map((key: any) => ({
          id: key,
          ...districts[key],
          polygon: districts[key].polygon.map((path: string) =>
            /* Hacemos un split en el string para obtener las coordenadas y luego lo convertimos en un objecto */
            path.split(",").reduce((a, v, i) => ({ ...a, [i === 0 ? "lat" : "lng"]: Number(v) }), {})
          ),
        }))
        .sort((a: District, b: District) => moment(b.createdAt).diff(moment(a.createdAt)));
      setDistricts(districts);
    });
  }

  useEffect(() => {
    getDistricts();
  }, []);

  return <DistrictContext.Provider value={{ districts, deleteDistrict }}>{children}</DistrictContext.Provider>;
};

export const useDistrictContext = () => useContext(DistrictContext);

export default DistrictProvider;
