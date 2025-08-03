import React from "react";
import { Bar } from "react-chartjs-2";
import "./Graph.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler
);

const Graph = ({ graphData }) => {
  const labels = graphData?.map((item, i) => `${item.clickDate}`);
  const userPerDaya = graphData?.map((item) => item.count);

  const data = {
    labels:
     graphData.length > 0
        ? labels
        : ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Total Clicks",
        data:
         graphData.length > 0
            ? userPerDaya
            : [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
        backgroundColor:
         graphData.length > 0 
            ? "rgba(102, 126, 234, 0.8)" 
            : "rgba(102, 126, 234, 0.1)",
        borderColor: "rgba(102, 126, 234, 1)",
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        pointBorderColor: "#667eea",
        fill: true,
        tension: 0.4,
        barThickness: 24,
        categoryPercentage: 0.8,
        barPercentage: 0.8,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: 'Inter, sans-serif',
            size: 12,
            weight: '600'
          },
          color: '#64748b'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1e293b',
        bodyColor: '#64748b',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        titleFont: {
          family: 'Inter, sans-serif',
          size: 14,
          weight: '600'
        },
        bodyFont: {
          family: 'Inter, sans-serif',
          size: 13
        },
        padding: 12,
        callbacks: {
          title: function(context) {
            return `Date: ${context[0].label}`;
          },
          label: function(context) {
            return `Clicks: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(226, 232, 240, 0.5)',
          drawBorder: false
        },
        ticks: {
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value.toString();
            }
            return "";
          },
          font: {
            family: 'Inter, sans-serif',
            size: 12
          },
          color: '#64748b',
          padding: 8
        },
        title: {
          display: true,
          text: "Number of Clicks",
          font: {
            family: 'Inter, sans-serif',
            size: 14,
            weight: '600',
            color: '#1e293b',
          },
          padding: {
            top: 10,
            bottom: 10
          }
        },
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'Inter, sans-serif',
            size: 12
          },
          color: '#64748b',
          padding: 8
        },
        title: {
          display: true,
          text: "Date",
          font: {
            family: 'Inter, sans-serif',
            size: 14,
            weight: '600',
            color: '#1e293b',
          },
          padding: {
            top: 10,
            bottom: 10
          }
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
        backgroundColor: '#667eea',
        borderColor: '#ffffff',
        borderWidth: 2
      }
    }
  };

  return (
    <div className="graph-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graph;