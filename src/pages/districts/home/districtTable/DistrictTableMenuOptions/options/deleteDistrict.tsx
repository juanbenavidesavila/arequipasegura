import React, { FC, useState } from "react";

import { District } from "@alerta-ciudadana/entity";

import { AlertDialog } from "@/components";
import { useDistrictContext } from "@/contexts";

import { MenuItem } from "@chakra-ui/react";

interface DeleteDistrictProps {
  district: District;
}

export const DeleteDistrict: FC<DeleteDistrictProps> = ({ district }) => {
  const { deleteDistrict } = useDistrictContext();
  const [isOpen, setIsOpen] = useState(false);

  async function handleDelete() {
    await deleteDistrict(district.id);
    setIsOpen(false);
  }

  return (
    <div>
      <MenuItem onClick={() => setIsOpen(true)}>Eliminar</MenuItem>
      <AlertDialog
        isOpen={isOpen}
        title="Eliminar Distrito"
        btnPri={{
          colorSchema: "red",
          label: "Sí, Eliminar",
          onClick: handleDelete,
        }}
        btnSec={{
          label: "Cancelar",
          onClick: () => setIsOpen(false),
        }}
      />
    </div>
  );
};
