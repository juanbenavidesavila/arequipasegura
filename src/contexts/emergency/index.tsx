import { FC, useState, useContext, useEffect, useMemo } from "react";
import removeAccents from "remove-accents";

import { Emergency, EntityType, PaginatioContext } from "@alerta-ciudadana/entity";

import { database, storage } from "@/firebase";
import { createContext } from "@/utils";

import Cookies from "universal-cookie";
import { usePagination } from "@/hooks";
import moment from "moment";

const cookies = new Cookies();

interface EmergencyContext extends PaginatioContext<Emergency> {
  emergencies: Emergency[];
  allEmergencies: Emergency[];
  typesOfEmergencies: EntityType[];
  setEmergencies(emergencies: Emergency[]): void;
  createEmergencyType: (values: { name: string; icon: File }) => Promise<void>;
  filterByDates: (startDate: string, endDate: string) => void;
  deleteEmergencyType: (entity: EntityType) => Promise<void>;
  filterEmergenciesByType: (name?: string) => void;
  findEmergencies(values: { field: string; query: string }): void;
}

const EmergencyContext = createContext<EmergencyContext>();

const EmergencyProvider: FC = ({ children }) => {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [allEmergencies, setAllEmergencies] = useState<Emergency[]>([]);
  const [typesOfEmergencies, setTypesOfEmergencies] = useState<EntityType[]>([]);
  const { pagination, changeNumberPerPage, nextPage, prevPage, goToFirstPage, goToLastPage } = usePagination({
    allItems: emergencies,
    name: "emergency",
  });
  const districtId = useMemo(() => cookies.get("district_id"), []);
  const type = useMemo(() => cookies.get("type"), []);

  let firebasePath = `district/${districtId}/emergency`

  if(type == "arequipa"){
    firebasePath= `PNP/Emergencia`
  }
  function compararFechas(a:any, b:any) {
    var fechaHoraA:any = new Date(a.date.replace(' ', 'T'));
    var fechaHoraB:any = new Date(b.date.replace(' ', 'T'));
  
    return fechaHoraB - fechaHoraA;
  }

  function getEmergencies() {
    database.ref(firebasePath).on("value", (snapshot) => {
      let emergenciesSnapshot = snapshot.val() || [];

      if (emergenciesSnapshot) {
        emergenciesSnapshot = Object.keys(emergenciesSnapshot)
          .map((key) => {
            let emergencies = (Object.entries(emergenciesSnapshot[key]) as any).map(([id, value]: any) => ({
              ...value,
              id,
              userId: key,
            }));

            return emergencies;
          })
          .flat();
        
        emergenciesSnapshot.sort(compararFechas)
        setEmergencies(emergenciesSnapshot);
        setAllEmergencies(emergenciesSnapshot);
      }
    });
}
let firebasePath2 = `district/${districtId}/tEmergency`

if(type == "arequipa"){
  firebasePath2= `PNP/tEmergency`
}
  function getTypesOfEmergencies() {
    database.ref(firebasePath2).on("value", (snapshot) => {
      let typesOfEmergencies = snapshot.val() || [];
      typesOfEmergencies = Object.keys(typesOfEmergencies).map((key) => ({
        id: key,
        ...typesOfEmergencies[key],
      }));

      setTypesOfEmergencies(typesOfEmergencies);
    });
  }

  async function createEmergencyType(values: { name: string; icon: File }) {
    const name = removeAccents(values.name.toLowerCase().replace(/ /g, "_"));
    await storage.ref(`emergency-types/${name}`).put(values.icon);

    await database.ref(`district/${districtId}/tEmergency`).push({
      name: values.name,
      icon: `https://firebasestorage.googleapis.com/v0/b/alerta-ciudadana-provincial.appspot.com/o/emergency-types%2F${name}?alt=media`,
    });
  }

  async function deleteEmergencyType(entity: EntityType) {
    const name = removeAccents(entity.name.toLowerCase().replace(/ /g, "_"));
    await database.ref(`${firebasePath2}/${entity.id}`).remove();
    await storage.ref(`emergency-types/${name}`).delete();
  }

  async function filterEmergenciesByType(emergencyType?: string) {
    if (!emergencyType) {
      setEmergencies(allEmergencies);
      return;
    }

    const emergenciesFinded = allEmergencies.filter((e) => e.emergency === emergencyType);
    setEmergencies(emergenciesFinded);
  }

  async function filterByDates(startDate: string, endDate: string) {
    const emergenciesFinded = allEmergencies.filter((e) => {
      const compareDate = moment(e.date);
      const startDateCompare = moment(startDate).subtract(1, "days");
      const endDateCompare = moment(endDate);
      return compareDate.isBetween(startDateCompare, endDateCompare);
    });

    setEmergencies(emergenciesFinded);
  }

  async function findEmergencies(values: { field: string; query: string }) {
    if (values.query === "") {
      setEmergencies(allEmergencies);
      return;
    }

    const emergenciesFinded = allEmergencies.filter((e) => {
      const field = e[values.field as keyof Emergency];
      const query = values.query;
      return String(field).toLowerCase().includes(query.toLowerCase());
    });

    setEmergencies(emergenciesFinded);
  }

  useEffect(() => {
    getEmergencies();
    getTypesOfEmergencies();
  }, []);

  return (
    <EmergencyContext.Provider
      value={{
        emergencies,
        allEmergencies,
        typesOfEmergencies,
        setEmergencies,
        deleteEmergencyType,
        createEmergencyType,
        filterEmergenciesByType,
        filterByDates,
        findEmergencies,
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergencyContext = () => useContext(EmergencyContext);

export default EmergencyProvider;
