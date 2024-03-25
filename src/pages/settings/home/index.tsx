import React from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { SettingsTabBar } from "./tabBar/SettingsTabBar";

export const SettingsPage: NextPage = () => {
  return (
    <WrapperPage title="Configuraciones">
      <SettingsTabBar />
    </WrapperPage>
  );
};
