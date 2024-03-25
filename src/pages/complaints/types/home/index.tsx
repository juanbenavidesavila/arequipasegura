import React from "react";

import { NextPage } from "next";
import { GeneralList, WrapperPage } from "@/templates";
import { Card } from "@/layout";
import { Breadcrumb as _Breadcrumb, IconButton } from "@chakra-ui/react";
import { Plus } from "react-feather";

export const ComplaintTypesPage: NextPage = () => {
  return (
    <WrapperPage title="Tipos de Denuncias" breadcrumb={{ routes: ["complaints", "complaintTypes"] }}>
      <Card.Wrapper colSpan={12}>
        <Card.Header
          title="Tipos de Denuncias"
          subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut id architecto velit, corporis facere aliquam."
          optionsRight={[
            <IconButton
              key="1"
              colorScheme="pri"
              rounded="md"
              variant="outline"
              size="sm"
              aria-label="New"
              icon={<Plus />}
            />,
          ]}
        />
      </Card.Wrapper>
    </WrapperPage>
  );
};
