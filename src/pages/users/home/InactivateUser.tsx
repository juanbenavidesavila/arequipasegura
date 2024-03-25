import React, { FC, useMemo, useRef } from "react";
import { UserCheck, UserX } from "react-feather";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Button } from "@/components";
import { User } from "@alerta-ciudadana/entity";
import { useUserContext } from "@/contexts";
import { useDebounce } from "use-debounce";

interface InactivateUserProps {
  user: User;
}

export const InactivateUser: FC<InactivateUserProps> = ({ user }) => {
  const { updateUser } = useUserContext();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const access = useMemo(() => user.access, [user]);

  const [accessDebounce] = useDebounce(user.access, 750);

  async function handleInactiveUser() {
    await updateUser({ userId: user.uid, user: { ...user, access: !access } });
    onClose();
  }

  return (
    <>
      <IconButton
        onClick={onOpen}
        _focus={{}}
        size="sm"
        colorScheme={access ? "green" : "red"}
        aria-label="emegergency-modal-button"
        icon={access ? <UserCheck size="1.25rem" /> : <UserX size="1.25rem" />}
      />

      <AlertDialog isCentered isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Alerta de Seguridad
            </AlertDialogHeader>

            <AlertDialogBody>Desea {!accessDebounce ? "activar" : "desactivar"} este usuario?</AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancelar</Button>
              <Button colorScheme="red" ml={3} onClick={handleInactiveUser}>
                {!accessDebounce ? "Activar" : "Desactivar"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
