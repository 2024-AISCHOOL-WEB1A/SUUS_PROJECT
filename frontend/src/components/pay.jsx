import React, { useRef, useState, useEffect } from 'react';
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
  const [endDate, setEndDate] = useState(new Date());

  const minDateForMonth = new Date(endDate);
  minDateForMonth.setMonth(minDateForMonth.getMonth() - 6);

  const minDateForYear = new Date('2000-01-01');
  const minDateForWeek = new Date(endDate);
  minDateForWeek.setDate(minDateForWeek.getDate() - 7);

  const generateYearData = (start, end) => {
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    const years = [];
    const values = [];

    for (let year = startYear; year <= endYear; year++) {
      years.push(year.toString());
      values.push(Math.floor(Math.random() * 100 + 100));
    }

    return { labels: years, values: values };
  };

  const generateMonthData = (start, end) => {
    const months = [];
    const values = [];
    let current = new Date(start);
    let count = 0;

    while (current <= end && count < 6) {
      const monthLabel = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
      months.push(monthLabel);
      values.push(Math.floor(Math.random() * 100 + 50));
      current.setMonth(current.getMonth() + 1);
      count++;
    }

    return { labels: months, values: values };
  };

  const generateWeekData = (start) => {
    const days = [];
    const values = [];
    let current = new Date(start);

    for (let i = 0; i < 7; i++) {
      const dayLabel = current.toISOString().split('T')[0];
      days.push(dayLabel);
      values.push(Math.floor(Math.random() * 20 + 5));
      current.setDate(current.getDate() + 1);
    }

    return { labels: days, values: values };
  };

  const filterDataByDate = (start, end) => {
    let filteredData;

    if (currentPeriod === 'year') {
      filteredData = generateYearData(start, end);
    } else if (currentPeriod === 'month') {
      filteredData = generateMonthData(start, end);
    } else if (currentPeriod === 'week') {
      filteredData = generateWeekData(start);
    }

    setChartData({
      labels: filteredData.labels,
      datasets: [{
        label: 'GPU 사용량',
        data: filteredData.values,
        backgroundColor: 'rgba(75, 113, 217, 0.2)',
        borderColor: '#4b71d9',
        borderWidth: 2,
        pointBackgroundColor: '#4b71d9',
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true
      }]
    });
  };

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'GPU 사용량',
      data: [],
      backgroundColor: 'rgba(75, 113, 217, 0.2)',
      borderColor: '#4b71d9',
      borderWidth: 2,
      pointBackgroundColor: '#4b71d9',
      pointRadius: 5,
      pointHoverRadius: 7,
      fill: true
    }]
  });

  const updateChart = (period) => {
    setCurrentPeriod(period);

    if (period === 'week') {
      const newStartDate = new Date(endDate);
      newStartDate.setDate(newStartDate.getDate() - 7);
      setStartDate(newStartDate);
      filterDataByDate(newStartDate, endDate);
    } else {
      filterDataByDate(startDate, endDate);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 기본 연도별 데이터를 로드
    updateChart('year');
  }, []);

  const downloadImage = () => {
    const chart = chartRef.current;
    const base64Image = chart.toBase64Image();
    saveAs(base64Image, 'chart.png');
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      chartData.labels.map((label, index) => ({
        Date: label,
        Value: chartData.datasets[0].data[index]
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'chart_data.xlsx');
  };

  return (
    <div className="chart-wrapper">
      <div className="date-picker-container">
        <label>Start Date: </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            filterDataByDate(date, endDate);
          }}
          minDate={currentPeriod === 'month' ? minDateForMonth : currentPeriod === 'year' ? minDateForYear : minDateForWeek}
          maxDate={endDate}
          showMonthYearPicker={currentPeriod === 'month'}
          showYearPicker={currentPeriod === 'year'}
          showWeekNumbers={currentPeriod === 'week'}
        />
        <label>End Date: </label>
        <DatePicker
          selected={endDate}
          onChange={(date) => {
            setEndDate(date);
            filterDataByDate(startDate, date);
          }}
          maxDate={new Date()}
        />
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

      <div className="chart-controls">
        <button onClick={() => updateChart('year')}>Year</button>
        <button onClick={() => updateChart('month')}>Month</button>
        <button onClick={() => updateChart('week')}>Week</button>
      </div>

      <div className="chart-container">
        <Line
          ref={chartRef}
          data={chartData}
          options={{
            scales: {
              x: {
                ticks: {
                  color: '#333333',
                  font: { weight: 'bold', size: 12 },
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  color: '#000000',
                  font: { size: 14 },
                  stepSize: 40,
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.2)',
                  lineWidth: 1,
                },
              },
            },
            plugins: {
              legend: {
                labels: { color: '#000000' },
              },
              tooltip: {
                enabled: true,
                callbacks: {
                  label: (tooltipItem) => `Value: ${tooltipItem.raw}`,
                },
              },
              zoom: {
                zoom: {
                  wheel: { enabled: true },
                  pinch: { enabled: true },
                  mode: 'x',
                },
                pan: { enabled: true, mode: 'x' },
              },
            },
          }}
        />

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
    </div>
  );
};

export default CustomLineChart;
