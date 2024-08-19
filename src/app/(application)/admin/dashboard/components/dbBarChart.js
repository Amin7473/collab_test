// components/BarChart.js

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const chartData = {
    labels: ['2006', '2007','2008','2009', '2010','2011', '2012'],
    datasets: [
        {
            label: 'Total Income',
            data: [100, 75, 50, 75, 50, 75, 100],
            backgroundColor: 'rgb(255, 155, 68)',
            borderColor: 'rgb(255, 155, 68)',
            borderWidth: 0,
            barThickness: 20,
        },
        {
            label: 'Total Outcome',
            data: [85, 65, 35, 65, 35, 65, 85],
            backgroundColor: 'rgb(252, 96, 117)',
            borderColor: 'rgb(252, 96, 117)',
            borderWidth: 0,
            barThickness: 20,
        },
    ],
};

const chartOptions = {
    responsive: true,
    // layout : {padding : {left : }},
    plugins: {
        legend: {
            position: 'bottom',
            display : false
        },
        title: {
            display: false,
            text: 'revenue data',
        },
    },
    scales: {
        x: {
            barPercentage : 0.8,
            categoryPercentage: 0.6,
            stacked : false,
            ticks: {
                callback: function (value, index) {
                    // Only show labels for every second year
                    return index % 2 === 0 ? this.getLabelForValue(value) : '';
                },
            },
            grid: {
                display: false,
            },
        },
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 25, // This sets the gap between y-axis ticks to 25 units
            },
            grid: {
                color : "#464547"
            },
        },
    },
}

const BarChart = () => {
    return <Bar data={chartData} options={chartOptions} />;
};

export default BarChart;
