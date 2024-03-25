import { FormLabel, FormControl as _FormControl, Flex, Box, Text, FormHelperText, Tooltip } from "@chakra-ui/react";
import React, { FC, useMemo } from "react";
import { AlertTriangle } from "react-feather";
import { useFormContext } from "react-hook-form";
import objectPath from "object-path";

type TypesInputType = "text" | "password" | "email" | "number" | "tel" | "select" | "textarea";

export interface FormControlProps {
  name: string;
  label?: string;
  helperText?: string;
  type?: TypesInputType;
  isTruncatedLabel?: boolean;
}

export const FormControl: FC<FormControlProps> = ({ children, name, label, helperText, isTruncatedLabel }) => {
  const {
    formState: { errors },
  } = useFormContext();

  const errMsg = useMemo(() => {
    if (objectPath.get(errors, name)) {
      const { type, message } = objectPath.get(errors, name) as Record<string, string>;
      const error = message ? message : type === "required" ? "Campo requerido" : "Formato no válido";
      return (
        <Flex fontSize="sm" fontWeight="semibold" ml="1" color="red.500" alignItems="center">
          <Box>
            <AlertTriangle size="1rem" />
          </Box>
          <Text ml="1">{error}</Text>
        </Flex>
      );
    }
  }, [objectPath.get(errors, name)]);

  return (
    <_FormControl>
      {label && (
        <Tooltip hidden={!isTruncatedLabel} lineHeight="4" placement="top" hasArrow label={label} openDelay={250}>
          <FormLabel ml="1" fontSize="sm" color="gray.700" mb="0.5" htmlFor="email" isTruncated={isTruncatedLabel}>
            {label}
          </FormLabel>
        </Tooltip>
      )}
      {children}
      {helperText ? (
        errMsg ? (
          errMsg
        ) : (
          <FormHelperText textAlign="left" ml="1" mt="0.5" color="gray.700">
            {helperText}
          </FormHelperText>
        )
      ) : (
        errMsg
      )}
    </_FormControl>
  );
};
