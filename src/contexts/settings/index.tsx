import { FC, useState, useContext, useEffect, useMemo } from "react";

import { database } from "@/firebase";
import { createContext } from "@/utils";
import Cookies from "universal-cookie";

interface SettingsContext {
  appSettings: AppSettings | undefined;
  centralCoordinates: google.maps.LatLngLiteral;
  setNewCentralCoordinates: (coordinates: google.maps.LatLngLiteral) => Promise<void>;
  setSettings: (settings: AppSettings) => Promise<void>;
  addingDefaultMessages(msg: string): Promise<void>;
  removeDefaultMessage(id: string): Promise<void>;
}
const cookies = new Cookies();

const SettingsContext = createContext<SettingsContext>();

const SettingsProvider: FC = ({ children }) => {
  const [appSettings, setAppSettings] = useState<AppSettings>();
  const [centralCoordinates, setCentralCoordinates] = useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
  const districtId = useMemo(() => cookies.get("district_id"), []);

  async function getSettings() {
    database.ref("settings").on("value", (snapshot) => {
      const settings = snapshot.val();

      const defaultMessages =
        Object.entries(settings.defaultMessages || {}).map(([key, value]: any) => ({
          id: key,
          ...value,
        })) || [];

      setAppSettings({ ...settings.app, defaultMessages });
    });

    database.ref(`admin/districts/${districtId}/centralCoordinates`).on("value", (snapshot) => {
      const centralCoordinates = snapshot.val();

      const [lat, lng] = (centralCoordinates || "0,0").split(",").map((coordinate: string) => parseFloat(coordinate));

      setCentralCoordinates({ lat, lng });
    });
  }

  async function setNewCentralCoordinates(newCoor: google.maps.LatLngLiteral) {
    await database.ref(`admin/districts/${districtId}/centralCoordinates`).set(`${newCoor.lat},${newCoor.lng}`);
  }

  async function setSettings(values: AppSettings) {
    await database.ref("settings/app").set(values);
  }

  async function addingDefaultMessages(message: string) {
    await database.ref("settings/defaultMessages").push({
      message,
      timestamp: Date.now(),
    });
  }

  // Remove default message
  async function removeDefaultMessage(id: string) {
    await database.ref(`settings/defaultMessages/${id}`).remove();
  }

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        appSettings,
        centralCoordinates,
        setNewCentralCoordinates,
        addingDefaultMessages,
        setSettings,
        removeDefaultMessage,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);

export default SettingsProvider;
