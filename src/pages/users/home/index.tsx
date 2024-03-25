import React from "react";

import { NextPage } from "next";
import { WrapperPage } from "@/templates";
import { Card } from "@/layout";
import { UsersTable } from "./UsersTable";
import { useUserContext } from "@/contexts";

export const UsersPage: NextPage = () => {
  const { users } = useUserContext();

  return (
    <WrapperPage title="Usuarios" breadcrumb={{ routes: ["users"] }}>
      <Card.Wrapper colSpan={12}>
        <Card.Header title="Listado de Usuarios" subtitle={`${users.length} Resultados encontrados`} />
        <UsersTable />
      </Card.Wrapper>
    </WrapperPage>
  );
};
