import React from "react";
import { Line } from "react-chartjs-2";
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

const LineChart = (props) => {
  const playerData = {
    labels: props.data.map((eachData) => eachData.SEASON),
    datasets: [
      {
        label: "Jump Shot",
        data: props.data.map((eachData) => eachData.jump_shot),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        barThickness: 12,
      },
      {
        label: "3pt_jump_shot",
        data: props.data.map((eachData) => eachData["3pt_jump_shot"]),
        backgroundColor: "orange",
        barThickness: 12,
      },
      {
        label: "Running_Jump_Shot",
        data: props.data.map((eachData) => eachData.running_jump_shot),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        barThickness: 12,
      },
    ],
  };

  return (
    //div finally works with maintainAspectRatio and responsive set to true in option
    <div style={{ height: "300px", width: "600px" }}>
      <Line data={playerData} options={options} />
    </div>
  );
};

export default LineChart;

//
