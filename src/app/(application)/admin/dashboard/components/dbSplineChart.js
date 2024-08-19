import { Line } from 'react-chartjs-2';
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

// Register the required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
    const data = {
        labels: ['2006', '2007','2008','2009', '2010','2011', '2012'],  
        datasets: [
            {
                label: 'Total Sales',
                data: [50, 75, 50, 75, 50, 75, 100],
                fill: false,
                borderColor: 'rgb(255, 155, 68)',
                backgroundColor: 'rgb(255, 155, 68)',
                borderWidth: 2,
                tension: 0.4, // This controls the curve (0 for sharp, 1 for maximum curve)
            },
            {
                label: 'Total Revenue',
                data: [90, 65, 40, 65, 40, 65, 50],
                fill: false,
                borderColor: 'rgb(252, 96, 117)',
                backgroundColor: 'rgb(252, 96, 117)',
                borderWidth: 2,
                tension: 0.4, // This controls the curve (0 for sharp, 1 for maximum curve)
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: false,
            },
            title: {
                display: false,
                text: 'Curved Line Chart Example',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 25, // This sets the gap between y-axis ticks to 25 units
                },
                grid: {
                    color : "#464547"
                },
            },
            x: {
                grid: {
                    display: false,
                },
            }
        },
    };

    return <Line data={data} options={options} />;
};

export default LineChart;
