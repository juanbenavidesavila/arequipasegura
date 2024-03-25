import React from "react";
import dynamic from "next/dynamic";



const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export type ChartProps = {
  data: any,
  color: string
}


export const ChartTable = ({data, color}:ChartProps) => {
 return(

     <>
      {/*  @ts-ignore:next-line */}
      <ReactApexChart
        options={{
          chart: { height: "600", type: "bar" },
          plotOptions: { bar: { horizontal: false, columnWidth: "55%" } },
          dataLabels: { enabled: false },
          stroke: { show: true, width: 2, colors: ["transparent"] },
          xaxis: { categories: data.dates},
          yaxis: { title: { text: "$ ()" } },
          fill: { opacity: 1, colors:[color] },
          tooltip: {
              y: {
                  formatter: function (val) {
                      return " " + val + " ";
                    },
                },
            },
        }}
        series={[
            
            { name: "Cantidad", data: data.values},
        ]}
        type="bar"
        height="100%"
        />
    </>
        )
  
}