import React, { useMemo } from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { Card } from "@/layout";
import { Button } from "@/components";
import Link from "next/link";
import { ComplaintsTable } from "./ComplaintsTable";
import { useComplaintContext } from "@/contexts";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const ComplaintsPage: NextPage = () => {
  const { complaints } = useComplaintContext();
  const type = useMemo(() => cookies.get("type"), []);
  console.log(type)
  
  let headerTitle = "Listado de Denuncias";

  if (type === "arequipa") {
    headerTitle = "Listado de Reportes";
  }
  
  let titleInit = "Denuncias";

  if (type === "arequipa") {
    titleInit = "Reportes";
  }



  return (
    <WrapperPage title={titleInit} breadcrumb={{ routes: ["complaints"] }}>
      <Card.Wrapper colSpan={12}>
        <Card.Header
          title={headerTitle}
          subtitle={`${complaints.length} Resultados encontrados`}
          optionsRight={[
            // <Link key="types" href="/complaints/types">
            //   <a>
            //     <Button variant="outline" w="24" colorScheme="pri" size="sm">
            //       Tipos
            //     </Button>
            //   </a>
            // </Link>,
            <Link key="reports" href="/complaints/reports">
              <a>
                <Button variant="outline" w="24" colorScheme="green" size="sm">
                  Reportes
                </Button>
              </a>
            </Link>,
          ]}
        />
        <ComplaintsTable />
      </Card.Wrapper>
    </WrapperPage>
  );
};
