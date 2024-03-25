import React, { FC, ReactElement, useRef, useState } from "react";

import {
  AlertDialog as _AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Button } from "../Button";

interface AlertDialogProps {
  title: string;
  subtitle?: string;
  button?: ReactElement;
  isOpen?: boolean;
  setIsOpen?: () => void;
  btnPri: Partial<{
    colorSchema: string;
    label: string;
    onClick(): void;
  }>;
  btnSec?: Partial<{
    colorSchema: string;
    label: string;
    onClick(): void;
  }>;
  isDisabled?: boolean;
}

export const AlertDialog: FC<AlertDialogProps> = ({
  button,
  subtitle,
  title,
  btnPri,
  btnSec,
  isDisabled,
  isOpen,
  setIsOpen,
}) => {
  const [isOpenInternal, setIsOpenInternal] = useState(false);
  const onClose = () => setIsOpenInternal(false);
  const cancelRef = useRef(null);

  return (
    <>
      {button && <div onClick={isDisabled ? undefined : () => setIsOpenInternal(true)}>{button}</div>}
      <_AlertDialog
        isCentered
        isOpen={button && typeof isOpen !== "undefined" ? isOpenInternal : Boolean(isOpen)}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay rounded="sm">
          <AlertDialogContent rounded="sm">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{subtitle}</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>{btnSec?.label}</Button>
              <Button
                colorScheme={btnPri.colorSchema}
                onClick={() => {
                  btnPri.onClick && btnPri.onClick();
                  onClose();
                }}
                ml={3}
              >
                {btnPri.label}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </_AlertDialog>
    </>
  );
};

AlertDialog.defaultProps = {
  title: "",
  subtitle: "Estás seguro que deseas realizar esta acción?",
  btnPri: {
    label: "Aceptar",
  },
  btnSec: {
    label: "Cancelar",
  },
};
