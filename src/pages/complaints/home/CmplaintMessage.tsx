import { Button } from "@/components";
import { useComplaintContext } from "@/contexts";
import { Complaint } from "@alerta-ciudadana/entity";
import { FormControl, FormLabel, Textarea, useToast } from "@chakra-ui/react";
import React, { FC, useState } from "react";

interface ComplaintModalProps {
  complaint: any;
}

export const CmplaintMessage: FC<ComplaintModalProps> = ({ complaint }) => {
  const { addingMessage } = useComplaintContext();
  const toast = useToast();

  const [message, setMessage] = useState(complaint.mensaje);

  async function sendMessage() {
    await addingMessage(complaint, message);
    toast({
      title: "Mensaje enviado",
      status: "success",
      duration: 9000,
      isClosable: true,
      position: "top-right",
    });
  }

  return (
    <div>
      <FormControl>
        <FormLabel>Envia un mensaje</FormLabel>
        <Textarea defaultValue={complaint.mensaje} value={message} onChange={(e: any) => setMessage(e.target.value)} />
      </FormControl>
      <Button mt="2" float="right" onClick={sendMessage}>
        Enviar
      </Button>
    </div>
  );
};
