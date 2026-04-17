'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export const RecordsTypeChart = () => {
  const data = {
    labels: ['Vital Records', 'Land Deeds', 'Archival Films', 'Photographs', 'Manuscripts'],
    datasets: [
      {
        label: 'Number of Records',
        data: [12500, 8400, 1200, 3500, 5600],
        backgroundColor: [
          'rgba(37, 99, 235, 0.7)',
          'rgba(5, 150, 105, 0.7)',
          'rgba(217, 119, 6, 0.7)',
          'rgba(220, 38, 38, 0.7)',
          'rgba(124, 58, 237, 0.7)',
        ],
        borderColor: [
          'rgb(37, 99, 235)',
          'rgb(5, 150, 105)',
          'rgb(217, 119, 6)',
          'rgb(220, 38, 38)',
          'rgb(124, 58, 237)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return <Doughnut data={data} options={{ responsive: true, maintainAspectRatio: false }} />
}

export const RequestActivityChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        fill: true,
        label: 'Requests for Access',
        data: [65, 59, 80, 81, 56, 95],
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
      },
      {
        fill: true,
        label: 'Digital Ingestions',
        data: [28, 48, 40, 19, 86, 27],
        borderColor: 'rgb(5, 150, 105)',
        backgroundColor: 'rgba(5, 150, 105, 0.1)',
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
    },
    scales: {
      y: { beginAtZero: true },
    },
  }

  return <Line options={options} data={data} />
}

export const DepartmentVolumeChart = () => {
  const data = {
    labels: ['Legal', 'Heritage', 'Technical', 'Education', 'Public'],
    datasets: [
      {
        label: 'Files Processed (Linear Feet)',
        data: [420, 350, 210, 150, 520],
        backgroundColor: 'rgba(5, 150, 105, 0.7)',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  }

  return <Bar options={options} data={data} />
}
