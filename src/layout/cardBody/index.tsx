import React, { FC } from "react";

import { CardContainer, CardContainerProps } from "../cardContainer";

interface CardBodyProps extends CardContainerProps {}

export const CardBody: FC<CardBodyProps> = ({ children, ...props }) => {
  return <CardContainer {...props}>{children}</CardContainer>;
};
