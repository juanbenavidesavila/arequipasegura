import React from 'react'
import { useProgramContext, } from 'src/contexts/programs';
import { WrapperPage } from "@/templates";
import { Card } from "@/layout";
import { ProgramsTable } from "./ProgramsTable";
import { NextPage } from 'next';
import { Button } from "@/components";
import { ProgramModal } from "./ProgramModal";

export const ProgramsPage: NextPage = () => {
  const programContext = useProgramContext();
  const { programs } = programContext;
    
  return (
    <WrapperPage title="Programas" breadcrumb={{ routes: ["programs"] }}>
      <Card.Wrapper colSpan={12}>
        <Card.Header title="Listado de programas" subtitle={`${programs?.length} Resultados encontrados`} optionsRight={[<ProgramModal key="0" />]}/>
        
        <ProgramsTable />
      </Card.Wrapper>
    </WrapperPage>
  )
}
