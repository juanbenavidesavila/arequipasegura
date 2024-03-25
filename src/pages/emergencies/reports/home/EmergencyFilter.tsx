import React, { useEffect, useState } from "react";

import { Menu, MenuButton, MenuList, MenuItem, HStack } from "@chakra-ui/react";
import { Button, FormProvider, Input } from "@/components";
import { ChevronDown } from "react-feather";
import { useEmergencyContext } from "@/contexts";
import moment from "moment";

export const EmergencyFilter = () => {
  const { filterEmergenciesByType, typesOfEmergencies, emergencies, filterByDates } = useEmergencyContext();
  const [itemSelected, setItemSelected] = useState<string>();
  const [dates, setDates] = useState({
    startDate: moment().subtract(1, "M").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
  });

  useEffect(() => {
    filterByDates(dates.startDate, dates.endDate);
  }, [dates]);

  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDown />}>
          {itemSelected || "Filtrar por emergencia"}
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => {
              setItemSelected(undefined);
              filterEmergenciesByType();
            }}
          >
            Seleccionar todas
          </MenuItem>
          <MenuItem
            onClick={() => {
              setItemSelected("Esperando");
              filterEmergenciesByType("Esperando");
            }}
          >
            Esperando
          </MenuItem>
          {typesOfEmergencies.map((typesOfEmergency) => (
            <MenuItem
              onClick={() => {
                setItemSelected(typesOfEmergency.name);
                filterEmergenciesByType(typesOfEmergency.name);
              }}
              key={typesOfEmergency.id}
            >
              {typesOfEmergency.name}
            </MenuItem>
          ))}
        </MenuList>
        <FormProvider id="" onSubmit={() => {}}>
          <HStack>
            <Input
              name="startDate"
              inputProps={{
                type: "date",
                value: dates.startDate,
                onChange: (e) => setDates({ ...dates, startDate: e.target.value }),
              }}
            />
            <Input
              name="endDate"
              inputProps={{
                type: "date",
                value: dates.endDate,
                onChange: (e) => setDates({ ...dates, endDate: e.target.value }),
              }}
            />
          </HStack>
        </FormProvider>
      </Menu>
    </>
  );
};
