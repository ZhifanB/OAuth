import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const options = {
  //   scales: {
  //     x: [
  //       {
  //         scaleLabel: {
  //           labelString: "Years in NBA",
  //           display: true,
  //         },
  //       },
  //     ],
  //     y: [
  //       {
  //         scaleLabel: {
  //           labelString: "Points Each Year",
  //           display: true,
  //         },
  //       },
  //     ],
  //   },
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Player Statistics Chart",
    },
  },
  maintainAspectRatio: true,
};

const BarChart = (props) => {
  const playerData = {
    labels: props.data.map((eachData) => eachData.YEAR),
    datasets: [
      {
        label: "Points",
        data: props.data.map((eachData) => eachData.PTS),
        backgroundColor: "rgba(78, 121, 167, 0.6)",
        // backgroundColor: "rgba(53, 162, 235, 0.5)",
        barThickness: 12,
      },
      {
        label: "Rebound",
        data: props.data.map((eachData) => eachData.TRB),
        backgroundColor: "rgba(176, 122, 161, 0.6)",
        barThickness: 12,
      },
      {
        label: "Assist",
        data: props.data.map((eachData) => eachData.AST),
        backgroundColor: "rgba(242, 142, 43, 0.6)",
        // backgroundColor: "rgba(255, 99, 132, 0.5)",
        barThickness: 12,
      },
      {
        label: "Steal",
        data: props.data.map((eachData) => eachData.STL),
        backgroundColor: "rgb(225, 87, 89, 0.5)",
        barThickness: 12,
      },
    ],
  };

  return (
    //div finally works with maintainAspectRatio and responsive set to true in option
    <div style={{ height: "300px", width: "600px" }}>
      <Bar data={playerData} options={options} />
    </div>
  );
};

export default BarChart;

//
