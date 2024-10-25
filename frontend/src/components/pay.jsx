import React, { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-plugin-zoom';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { FaBars } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/pay.css';

const CustomLineChart = () => {
  const chartRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState('year');
  const [startDate, setStartDate] = useState(new Date('2023-01-01'));
  const [endDate, setEndDate] = useState(new Date('2023-12-31'));

  const data = {
    year: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      values: [12, 19, 3, 5, 2, 3, 9, 7, 6, 10, 12, 15]
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      values: [5, 10, 7, 8]
    },
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [2, 4, 3, 6, 8, 7, 5]
    }
  };

  const [chartData, setChartData] = useState({
    labels: data.year.labels,
    datasets: [{
      label: 'GPU 사용량',
      data: data.year.values,
      backgroundColor: 'rgba(0, 0, 255, 0.2)',
      borderColor: '#00ffff',
      borderWidth: 2,
      pointBackgroundColor: '#00ffff',
      pointRadius: 5,
      pointHoverRadius: 7,
      fill: true
    }]
  });

  // 날짜 범위 필터링 함수
  const filterDataByDate = (start, end) => {
    const filteredLabels = [];
    const filteredValues = [];

    data.year.labels.forEach((label, index) => {
      const currentDate = new Date(`2023-${index + 1}-01`);
      if (currentDate >= start && currentDate <= end) {
        filteredLabels.push(label);
        filteredValues.push(data.year.values[index]);
      }
    });

    setChartData({
      labels: filteredLabels,
      datasets: [{
        label: 'GPU 사용량',
        data: filteredValues,
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        borderColor: '#00ffff',
        borderWidth: 2,
        pointBackgroundColor: '#00ffff',
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true
      }]
    });
  };

  const updateChart = (period) => {
    setCurrentPeriod(period);
    setChartData({
      labels: data[period].labels,
      datasets: [{
        label: 'GPU 사용량',
        data: data[period].values,
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        borderColor: '#00ffff',
        borderWidth: 2,
        pointBackgroundColor: '#00ffff',
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true
      }]
    });
  };

  const downloadImage = () => {
    const chart = chartRef.current;
    const base64Image = chart.toBase64Image();
    saveAs(base64Image, 'chart.png');
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      data[currentPeriod].labels.map((label, index) => ({
        Date: label,
        Value: data[currentPeriod].values[index]
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'chart_data.xlsx');
  };

  return (
    <div className="chart-wrapper">
      {/* 날짜 선택기 및 메뉴 아이콘 */}
      <div className="date-picker-container">
        <label>Start Date: </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            filterDataByDate(date, endDate); // 선택된 날짜로 데이터 필터링
          }}
        />
        <label>End Date: </label>
        <DatePicker
          selected={endDate}
          onChange={(date) => {
            setEndDate(date);
            filterDataByDate(startDate, date); // 선택된 날짜로 데이터 필터링
          }}
        />
        {/* 메뉴 아이콘을 날짜 선택기 옆에 위치 */}
        <div className="menu-icon-container">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="menu-icon">
            <FaBars size={24} color="#fff" />
          </button>
          {isMenuOpen && (
            <div className="menu-dropdown">
              <ul>
                <li onClick={downloadImage}>Download Image</li>
                <li onClick={downloadExcel}>Download Excel</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 라인 차트 */}
      <div className="chart-container">
        <Line ref={chartRef} data={chartData} options={{
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: '#fff',
                font: { size: 14 }
              }
            },
            x: {
              ticks: {
                color: '#fff',
                font: { size: 14 }
              }
            }
          },
          plugins: {
            legend: {
              labels: { color: '#fff' }
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: (tooltipItem) => `Value: ${tooltipItem.raw}`
              }
            },
            zoom: {
              zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: 'x' },
              pan: { enabled: true, mode: 'x' }
            }
          }
        }} />

        {/* 오른쪽 표 차트 */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {chartData.labels.map((label, index) => (
                <tr key={index}>
                  <td>{label}</td>
                  <td>{chartData.datasets[0].data[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Year, Month, Week 버튼을 차트 아래에 배치 */}
      <div className="chart-controls">
        <button onClick={() => updateChart('year')}>Year</button>
        <button onClick={() => updateChart('month')}>Month</button>
        <button onClick={() => updateChart('week')}>Week</button>
      </div>
    </div>
  );
};

export default CustomLineChart;
