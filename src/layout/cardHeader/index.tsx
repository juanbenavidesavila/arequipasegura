import React, { FC } from "react";

import { Box, Divider, Flex, Text, IconButton, HStack } from "@chakra-ui/react";

import { Plus } from "react-feather";

import { CardContainer } from "../cardContainer";

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  optionsRight?: React.ReactElement[];
}

export const CardHeader: FC<CardHeaderProps> = ({ title, subtitle, optionsRight }) => {
  return (
    <>
      <CardContainer>
        <Flex alignItems="center" justifyContent="space-between">
          <Box>
            <Text fontSize="lg" fontFamily="Open Sans, sans-serif" color="pri.800" fontWeight="bold" lineHeight="5">
              {title}
            </Text>
            <Text
              fontFamily="Open Sans, sans-serif"
              fontWeight="medium"
              color="gray.500"
              fontSize={["xs", null, null, "sm"]}
              lineHeight="4"
              maxW="4xl"
              textAlign="justify"
            >
              {subtitle}
            </Text>
          </Box>
          <HStack>{optionsRight?.map((optionRight) => optionRight)}</HStack>
        </Flex>
      </CardContainer>
      <Divider />
    </>
  );
};
