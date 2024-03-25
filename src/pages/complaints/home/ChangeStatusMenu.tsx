import React, { FC, useMemo} from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDown } from "react-feather";
import { useComplaintContext } from "@/contexts";
import { Complaint } from "@alerta-ciudadana/entity";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface ChangeStatusMenuProps {
  complaint: Complaint;
}

export const ChangeStatusMenu: FC<ChangeStatusMenuProps> = ({ complaint }) => {
  const { changeStatus } = useComplaintContext();
  const type = useMemo(() => cookies.get("type"), []);

  return (
    <div>
      <Menu>
        <MenuButton fontSize="sm" as={Button} rightIcon={<ChevronDown />}>
          Estado {complaint.status}
        </MenuButton>
        {
          (type === "arequipa")?(
            <MenuList>
            {["Pendiente", "Atendiendo", "En evaluacion", "Concluido", "Archivado"].map((status) => (
              <MenuItem
                key={status}
                mb="1"
                fontWeight="medium"
                fontSize="sm"
                onClick={() => changeStatus(complaint, status)}
                isDisabled={complaint.status === status}
              >
                Pasar a {status}
              </MenuItem>
            ))}
          </MenuList>
          ):(
            <MenuList>
            {["Pendiente", "Atendiendo", "Resuelta"].map((status) => (
              <MenuItem
                key={status}
                mb="1"
                fontWeight="medium"
                fontSize="sm"
                onClick={() => changeStatus(complaint, status)}
                isDisabled={complaint.status === status}
              >
                Pasar a {status}
              </MenuItem>
            ))}
          </MenuList>
          )
        }

       
      </Menu>
    </div>
  );
};
