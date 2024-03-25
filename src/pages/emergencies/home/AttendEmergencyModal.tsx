import { Emergency } from "@alerta-ciudadana/entity";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  useDisclosure,
  Button,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import React, { FC, useMemo, useState } from "react";
import { Check } from "react-feather";
import { database } from "@/firebase";
import Cookies from "universal-cookie";

interface AttendEmergencyModalProps {
  emergency: Emergency;
}
const cookies = new Cookies();

export const AttendEmergencyModal: FC<AttendEmergencyModalProps> = ({ emergency }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const [assessment, setAssessment] = useState(true);

  const districtId = useMemo(() => cookies.get("district_id"), []);

  async function attendEmergency() {
    setIsLoading(true);
    const { userId, id } = emergency;

    await database
      .ref(`/district/${districtId}/emergency/${userId}/${id}`)
      .update({ attended: true, status: "Atendida", values: assessment ? "Verdadero" : "Falso" });
    setIsLoading(false);
    onClose();
  }

  return (
    <>
      <IconButton
        isDisabled={emergency.attended}
        onClick={onOpen}
        colorScheme="green"
        size="sm"
        aria-label="check"
        icon={<Check size="1.25rem" />}
        variant={emergency.attended ? "ghost" : "solid"}
      />
      <AlertDialog
        closeOnEsc={!isLoading}
        closeOnOverlayClick={!isLoading}
        isCentered
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Desea anteder la emergencia del Usuario?
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text fontSize="lg" fontWeight="medium" mb="2">
                Usuario: {emergency.user}
              </Text>
              <Checkbox onChange={(e: any) => setAssessment(!e.target.checked)}>
                Marque en caso de falsa emergencia
              </Checkbox>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button variant="ghost" isDisabled={isLoading} colorScheme="red" ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button isLoading={isLoading} colorScheme="pri" onClick={attendEmergency} ml={3}>
                Atender
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
