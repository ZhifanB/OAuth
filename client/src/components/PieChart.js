import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
      labels: {
        // This more specific font property overrides the global property
        font: {
          size: 12,
        },
      },
    },
    title: {
      display: true,
      text: "Pie Chart Of Top 10 Events For Selected Player",
      font: {
        size: 20,
      },
    },
  },
  maintainAspectRatio: true,
};

const PieChart = (props) => {
  const playerData = {
    labels: props.data.map((eachData) => eachData.EVENT_NAME),
    datasets: [
      {
        // label: props.data.map((eachData) => eachData.EVENT_NAME),
        data: props.data.map((eachData) => eachData.FREQ_BY_EVENT),
        backgroundColor: [
          "rgba(78, 121, 167, 0.6)",
          "rgba(242, 142, 43, 0.6)",
          "rgba(225, 87, 89, 0.6)",
          "rgba(118, 183, 178, 0.6)",
          "rgba(89, 161, 79, 0.6)",
          "rgba(237, 201, 72, 0.6)",
          "rgba(176, 122, 161, 0.6)",
          "rgba(255, 157, 167, 0.6)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
      },
    ],
  };

  return (
    //div finally works with maintainAspectRatio and responsive set to true in option
    <div style={{ height: "500px", width: "500px" }}>
      <Pie data={playerData} options={options} />
    </div>
  );
};

export default PieChart;
