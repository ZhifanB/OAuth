import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Numbers of Win/Loss per year for selected team as Home/Away Team',
    },
  },
};

const TeamChart = (props) => {
    const data = {
        // labels: props.performance.map(result => result.SEASON_ID),
        labels: ['2000-2001', '2001-2002', '2002-2003', '2003-2004', '2005-2006', '2006-2007', '2007-2008', '2008-2009', '2009-2010', '2010-2011', 
                '2011-2012', '2012-2013', '2013-2014', '2014-2015', '2015-2016', '2016-2017', '2017-2018', '2018-2019', '2019-2020', '2020-2021'],
        datasets: [
          {
            label: 'Home Wins',
            data: props.performance.map(result => result.HOME_WIN),
            borderColor: 'rgb(242, 142, 43)',
            backgroundColor: 'rgba(242, 142, 43, 0.5)',
            // backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderWidth: 1
          },
          {
            label: 'Away Wins',
            data: props.performance.map(result => result.AWAY_WIN),
            borderColor: 'rgb(78, 121, 167)',
            backgroundColor: 'rgba(78, 121, 167, 0.5)',
            // backgroundColor: 'rgba(53, 162, 235, 0.5)',
            borderWidth: 1
          },
          {
            label: 'Home Loses',
            data: props.performance.map(result => result.HOME_LOSE),
            borderColor: 'rgb(242, 142, 43)',
            backgroundColor: 'rgba(242, 142, 43, 0.5)',
            borderDash: [10,5],
            borderWidth: 1,
            // lineTension: 0.3,
          },
          {
            label: 'Away Loses',
            data: props.performance.map(result => result.AWAY_LOSE),
            borderColor: 'rgb(78, 121, 167)',
            backgroundColor: 'rgba(78, 121, 167, 0.5)',
            borderDash: [10,5],
            borderWidth: 1,
            // lineTension: 0.3,
          }
        ],
      };
    return (
        <Line options={options} data={data} />
    )
}

export default TeamChart;
