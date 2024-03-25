import React, { FC } from "react";

import { Box, GridItem, GridItemProps } from "@chakra-ui/react";

interface CardWrapperProps extends GridItemProps {}

export const CardWrapper: FC<CardWrapperProps> = ({ children, ...props }) => {
  return (
    <GridItem
      display="flex"
      flexDir="column"
      borderWidth="1px"
      borderColor="gray.300"
      shadow="md"
      rounded="md"
      bgColor="white"
      {...props}
    >
      {children}
    </GridItem>
  );
};
