import React from "react";

import { NextPage } from "next";

import { GeneralList, GeneralModalAdd, WrapperPage } from "@/templates";

import { Card } from "@/layout";
import { useEmergencyContext } from "@/contexts";
import { storage, database } from "@/firebase";

import removeAccents from "remove-accents";

export const EmergencyTypesPage: NextPage = () => {
  const { typesOfEmergencies } = useEmergencyContext();

  async function onSubmit(values: any) {
    const name = removeAccents(values.name.toLowerCase().replace(/ /g, "_"));
    await storage.ref(`emergency-types/${name}`).put(values.icon);

    await database.ref(`province/temergency`).push({
      name,
      icon: `https://firebasestorage.googleapis.com/v0/b/alerta-ciudadana-provincial.appspot.com/o/emergency-types%2F${name}?alt=media`,
    });
  }

  return (
    <WrapperPage title="Tipos de Emergencias">
      <Card.Wrapper colSpan={12}>
        <Card.Header
          title="Tipos de Emergencias"
          subtitle={`${typesOfEmergencies.length} Resultados encontrados`}
          optionsRight={[<GeneralModalAdd isLoading={false} key="add" createNewItem={onSubmit} />]}
        />
        <GeneralList items={typesOfEmergencies} onDelete={() => {}} />
      </Card.Wrapper>
    </WrapperPage>
  );
};
