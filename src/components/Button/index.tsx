import React, { FC } from "react";

import { Button as _Button, ButtonProps as _ButtonProps } from "@chakra-ui/react";

interface ButtonProps extends _ButtonProps {}

export const Button: FC<ButtonProps> = (props) => {
  return (
    <_Button
      borderRadius="md"
      _focus={{ ring: "2", ringColor: `${props.colorScheme}.200` }}
      lineHeight="-1"
      fontSize="sm"
      fontFamily="Open Sans, sans-serif"
      {...props}
    />
  );
};
