import React from "react";

import { NextPage } from "next";
import Link from "next/link";
import { WrapperPage } from "@/templates";
import { Card } from "@/layout";
import { Button } from "@/components";
import { useEmergencyContext } from "@/contexts";
import { EmergenciesTable } from "./EmergenciesTable";

export const EmergenciesPage: NextPage = () => {
  const { emergencies } = useEmergencyContext();

  return (
    <WrapperPage title="Emergencias" breadcrumb={{ routes: ["emergencies"] }}>
      <Card.Wrapper colSpan={12}>
        <Card.Header
          title="Listado de Emergencias"
          subtitle={`${emergencies?.length} Resultados encontrados`}
          optionsRight={[
            // <Link key="types" href="/emergencies/types">
            //   <a>
            //     <Button variant="outline" w="24" colorScheme="pri" size="sm">
            //       Tipos
            //     </Button>
            //   </a>
            // </Link>,
            <Link key="reports" href="/emergencies/reports">
              <a>
                <Button variant="outline" w="24" colorScheme="green" size="sm">
                  Reportes
                </Button>
              </a>
            </Link>,
          ]}
        />
        <EmergenciesTable />
      </Card.Wrapper>
    </WrapperPage>
  );
};
