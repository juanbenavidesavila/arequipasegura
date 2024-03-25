import { FC, useState, useContext, useEffect, useMemo } from "react";
import { Directory } from "@alerta-ciudadana/entity";

import { database } from "@/firebase";
import { createContext } from "@/utils";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface DirectoryContext {
  directories: Directory[];
  deleteDirectory(id: string): void;
  createDirectory(directory: Directory): Promise<void>;
  updateDirectory(directory: Directory): Promise<void>;
}

const DirectoryContext = createContext<DirectoryContext>();

const DirectoryProvider: FC = ({ children }) => {
  const [directories, setDirectories] = useState<Directory[]>([]);

  const districtId = useMemo(() => cookies.get("district_id"), []);

  function getDirectory() {
    database.ref(`district/${districtId}/directory`).on("value", (snapshot) => {
      let directories = snapshot.val();

      directories = Object.keys(directories || {}).map((key: any) => ({
        id: key,
        ...directories[key],
      }));
      setDirectories(directories);
    });
  }

  async function createDirectory(directory: Directory) {
    await database.ref(`district/${districtId}/directory`).push(directory);
  }

  async function updateDirectory(directory: Directory) {
    const { id, ...rest } = directory;
    await database.ref(`district/${districtId}/directory/${id}`).update(rest);
  }

  async function deleteDirectory(id: string) {
    await database.ref(`district/${districtId}/directory/${id}`).remove();
  }

  useEffect(() => {
    getDirectory();
  }, []);

  return (
    <DirectoryContext.Provider value={{ directories, createDirectory, updateDirectory, deleteDirectory }}>
      {children}
    </DirectoryContext.Provider>
  );
};

export const useDirectoryContext = () => useContext(DirectoryContext);

export default DirectoryProvider;
