import { FC, useState, useContext, useEffect, useMemo } from "react";
import { Programs } from "@alerta-ciudadana/entity"; // Asegúrate de importar el tipo correcto para Program
import { createContext } from "@/utils";

import { database } from "@/firebase";

import Cookies from "universal-cookie";
import { useAuthContext } from "../auth";
import { usePagination } from "@/hooks";

const cookies = new Cookies();

interface ProgramContext {
  programs: Programs[]; 
  updateProgram: (values: { programId: string; program: any }) => Promise<void>; 
  deleteProgram: (programId: string) => Promise<void>;
  createProgram: (program: Programs) =>  Promise<void>;
}

const ProgramContext = createContext<ProgramContext>();

const ProgramProvider: FC = ({ children }) => {
  const [programs, setPrograms] = useState<Programs[]>([]); 
  const { pagination, changeNumberPerPage, nextPage, prevPage, goToFirstPage, goToLastPage } = usePagination({
    allItems: programs,
    name: "programs", 
  });
  const districtId = useMemo(() => cookies.get("district_id"), []);
 

  function getPrograms() {
    database.ref('PNP/Programas').on("value", (snapshot) => {
      let data = snapshot.val();

      if (data) {
        const programs = Object.keys(data).map((key) => ({ ...data[key], uid: key }));
        setPrograms(programs);
      }
    });
  }
  async function createProgram(program:Programs) {
    await database.ref(`PNP/Programas`).push(program);
  }

  async function updateProgram({ program, programId }: { programId: string; program: Programs }) {
    await database.ref(`PNP/Programas/${programId}`).update(program);
  }

  async function deleteProgram(programId:string) {
    await database.ref(`PNP/Programas/${programId}`).remove(); 
  }

  useEffect(
    () => {
      /*  isAuthenticated &&  */ getPrograms();
    },
    [
      /* isAuthenticated */
    ]
  );

  return <ProgramContext.Provider value={{ programs, updateProgram, createProgram, deleteProgram }}>{children}</ProgramContext.Provider>;
};

export const useProgramContext = () => useContext(ProgramContext);

export default ProgramProvider;