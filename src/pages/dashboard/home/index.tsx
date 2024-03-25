import React, {useEffect, useMemo, useState} from "react";
import { NextPage } from "next";
import Cookies from "universal-cookie";
import { IconButton } from "@chakra-ui/react";
import { Maximize } from "react-feather";

import { Card } from "@/layout";
import { WrapperPage } from "@/templates";
import { SwiperSlideBaner } from "@/components";
import { database } from "@/firebase";
import { ChartTable } from "src/components/Chart/chart_table";



export const DashboardPage: NextPage = () => {

  const districtId = useMemo(() => new Cookies().get("district_id"), []);
  const type = useMemo(() => new Cookies().get("type"), []);
  let pathRef = `district/${districtId}/emergency/`
  let pathRef2 = `district/${districtId}/complaint/`
  if(type == "arequipa"){
    pathRef = `PNP/Emergencia/`
    pathRef2 = `PNP/complaint/`
  }


  const extractValues = (data:any) => {
    return Object.values(data).map((item:any) => {
      return item //Object.values(item);
    });
  };
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const countValuesByMonth = (data: any) => {
    return Object.values(data).reduce((acc: any, item: any) => {
      const date = new Date(item.date);
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      const monthName = monthNames[date.getMonth()];
  
      acc.atendido = acc.atendido || {};
      acc.notAtendido = acc.notAtendido || {};
      acc.all = acc.all || {};
  
      acc.atendido[monthName] = (acc.atendido[monthName] || 0) + (item.status === "Atendido" ? 1 : 0);
      acc.notAtendido[monthName] = (acc.notAtendido[monthName] || 0) + (item.status !== "Atendido" ? 1 : 0);
      acc.all[monthName] = (acc.all[monthName] || 0) + 1;
  
      return acc;
    }, { atendido: {}, notAtendido: {}, all: {} });
  };
  
  type dataSets = {
    dates:string[],
    values: any []
  }
  const [data1, setData1] = useState<dataSets>({dates:[], values:[]})
  const [data2, setData2] = useState<dataSets>({dates:[], values:[]})
  const [data3, setData3] = useState<dataSets>({dates:[], values:[]})
  const [data4, setData4] = useState<dataSets>({dates:[], values:[]})


    const setChart = ()=>{
        database.ref(pathRef).once("value")  

        .then(function(snapshot) {
            var key = snapshot.key; // null
            var childKey = snapshot.val() // "ada"

            if(!childKey) return false
            Object.keys(childKey).forEach(k=>{
            let test = extractValues(childKey[k])
            const counts:any = countValuesByMonth(test);

            const countAtendido = counts.atendido;

            let temp = {
                dates: Object.keys(countAtendido),
                values: Object.values(countAtendido)
            }
            setData1(temp)

            const countNotAtendido = counts.notAtendido;

            let temp2 = {
                dates: Object.keys(countNotAtendido),
                values: Object.values(countNotAtendido)
            }
            setData2(temp2)

            const countAll = counts.all;

            let temp3 = {
                dates: Object.keys(countAll),
                values: Object.values(countAll)
            }
            setData3(temp3)
            })
            
        });
    }

    const setChart2 = () =>{
        database.ref(pathRef2).once("value")
        .then(function(snapshot){
            var key = snapshot.key;
            var childKey = snapshot.val()
            if(!childKey) return false
            Object.keys(childKey).forEach(k=>{
                let test = extractValues(childKey[k])
                const counts:any = countValuesByMonth(test);
                const countAll = counts.all;
                let temp = {
                    dates: Object.keys(countAll),
                    values: Object.values(countAll)
                }
                setData4(temp)
            })
        })
    }

  useEffect(()=>{
    setChart()
    setChart2()
  },[])

  return (
    <WrapperPage fullScreen title="Dashboard">
      <Card.Wrapper colSpan={[12]}>
        <Card.Container>
          <SwiperSlideBaner />
        </Card.Container>
      </Card.Wrapper>
      <Card.Wrapper colSpan={[12, null, null, 6]}>
        <Card.Header
          title="Emergencias"
          optionsRight={[
            <IconButton
              size="sm"
              aria-label="x"
              key={""}
              colorScheme="pri"
              variant="ghost"
              _focus={{}}
              icon={<Maximize size="1.25rem" />}
            />,
          ]}
        />
        <Card.Body flex="1">
            <ChartTable color={"#FF0000"} data={data3} />
        </Card.Body>
      </Card.Wrapper>
      <Card.Wrapper colSpan={[12, null, null, 6]}>
        <Card.Header
          title="Atendidas"
          optionsRight={[
            <IconButton
              size="sm"
              aria-label="x"
              key={""}
              colorScheme="pri"
              variant="ghost"
              _focus={{}}
              icon={<Maximize size="1.25rem" />}
            />,
          ]}
        />
        <Card.Body flex="1">
            <ChartTable color={"#008000"} data={data1} />
        </Card.Body>
      </Card.Wrapper>
      <Card.Wrapper colSpan={[12, null, null, 6]}>
        <Card.Header
          title="No atendidas"
          optionsRight={[
            <IconButton
              size="sm"
              aria-label="x"
              key={""}
              colorScheme="pri"
              variant="ghost"
              _focus={{}}
              icon={<Maximize size="1.25rem" />}
            />,
          ]}
        />
        <Card.Body flex="1">
             <ChartTable color={"#007aff"} data={data2} />
        </Card.Body>
      </Card.Wrapper>
      
      <Card.Wrapper colSpan={[12, null, null, 6]}>
        <Card.Header
          title="Denuncias "
          optionsRight={[
            <IconButton
              size="sm"
              aria-label="x"
              key={""}
              colorScheme="pri"
              variant="ghost"
              _focus={{}}
              icon={<Maximize size="1.25rem" />}
            />,
          ]}
        />
        <Card.Body flex="1">
        <ChartTable color={"#007aff"} data={data4} />
        </Card.Body>
      </Card.Wrapper>
    </WrapperPage>
  );
};