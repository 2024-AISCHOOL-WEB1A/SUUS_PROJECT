import React, { useRef, useState } from 'react'; // useRef와 useState를 React에서 임포트
import { Line } from 'react-chartjs-2'; // Line 차트 임포트
import 'chart.js/auto'; // Chart.js 자동 설치
import 'chartjs-plugin-zoom'; // 차트 줌 플러그인
import { saveAs } from 'file-saver'; // saveAs 함수 임포트
import * as XLSX from 'xlsx'; // XLSX 임포트
import { FaBars } from 'react-icons/fa'; // FaBars 아이콘 임포트
import DatePicker from 'react-datepicker'; // DatePicker 컴포넌트 임포트
import 'react-datepicker/dist/react-datepicker.css'; // DatePicker 스타일
import '../css/pay.css'; // CSS 파일 임포트




const CustomLineChart = () => {
  const chartRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState('year');
  const [startDate, setStartDate] = useState(new Date('2023-01-01'));
  const [endDate, setEndDate] = useState(new Date()); // 끝 날짜를 현재 날짜로 설정

  // month에서 6개월 전, year에서 연도별, week에서 7일 전까지 선택 가능하도록 제한 설정
  const minDateForMonth = new Date(endDate);
  minDateForMonth.setMonth(minDateForMonth.getMonth() - 6); // 6개월 전

  const minDateForYear = new Date('2000-01-01'); // 연도는 2000년부터
  const minDateForWeek = new Date(endDate);
  minDateForWeek.setDate(minDateForWeek.getDate() - 7); // 7일 전

  const generateYearData = (start, end) => {
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    const years = [];
    const values = [];

    for (let year = startYear; year <= endYear; year++) {
      years.push(year.toString());
      values.push(Math.floor(Math.random() * 100 + 100)); // 랜덤 GPU 사용량 데이터
    }

    return { labels: years, values: values };
  };

  const generateMonthData = (start, end) => {
    const months = [];
    const values = [];
    let current = new Date(start);
    let count = 0;

    while (current <= end && count < 6) { // 6개월만 보여주도록 설정
      const monthLabel = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
      months.push(monthLabel);
      values.push(Math.floor(Math.random() * 100 + 50)); // 랜덤 GPU 사용량 데이터
      current.setMonth(current.getMonth() + 1);
      count++;
    }

    return { labels: months, values: values };
  };

  const generateWeekData = (start) => {
    const days = [];
    const values = [];
    let current = new Date(start);

    for (let i = 0; i < 7; i++) {  // 시작 날짜로부터 7일치 데이터를 생성
      const dayLabel = current.toISOString().split('T')[0]; // yyyy-mm-dd 형식
      days.push(dayLabel);
      values.push(Math.floor(Math.random() * 20 + 5)); // 랜덤 GPU 사용량 데이터
      current.setDate(current.getDate() + 1);  // 다음 날로 이동
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
      filteredData = generateWeekData(start);  // 주간은 시작 날짜 기준으로 7일만 보여줌
    }

    setChartData({
      labels: filteredData.labels,
      datasets: [{
        label: 'GPU 사용량',
        data: filteredData.values,
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

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'GPU 사용량',
      data: [],
      backgroundColor: 'rgba(0, 0, 255, 0.2)',
      borderColor: '#00ffff',
      borderWidth: 2,
      pointBackgroundColor: '#00ffff',
      pointRadius: 5,
      pointHoverRadius: 7,
      fill: true
    }]
  });

  const updateChart = (period) => {
    setCurrentPeriod(period);

    if (period === 'week') {
      const newStartDate = new Date(endDate);
      newStartDate.setDate(newStartDate.getDate() - 7); // 7일 전 날짜 계산
      setStartDate(newStartDate);
      filterDataByDate(newStartDate, endDate);
    } else if (period === 'month') {
      filterDataByDate(startDate, endDate);
    } else {
      filterDataByDate(startDate, endDate);
    }
  };

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
      {/* 날짜 선택기 및 메뉴 아이콘 */}
      <div className="date-picker-container">
        <label>Start Date: </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            filterDataByDate(date, endDate);
          }}
          minDate={currentPeriod === 'month' ? minDateForMonth : currentPeriod === 'year' ? minDateForYear : minDateForWeek} // 기간에 맞는 minDate 설정
          maxDate={endDate}
          showMonthYearPicker={currentPeriod === 'month'} // 월간 모드일 때만 월별 선택
          showYearPicker={currentPeriod === 'year'} // 연간 모드일 때는 연도 선택
          showWeekNumbers={currentPeriod === 'week'} // 주간 모드일 때 주별 선택 가능
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
        {/* 메뉴 아이콘 */}
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

      {/* Year, Month, Week 버튼을 차트 아래에 배치 */}
      <div className="chart-controls">
        <button onClick={() => updateChart('year')}>Year</button>
        <button onClick={() => updateChart('month')}>Month</button>
        <button onClick={() => updateChart('week')}>Week</button>
      </div>
      {/* 라인 차트 */}
      <div className="chart-container">
      <Line
  ref={chartRef}
  data={chartData}
  options={{
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#fff',
          font: { size: 14 },
          stepSize: 40,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // y축 그리드 선의 색상 설정
          lineWidth: 1, // y축 그리드 선의 두께 설정
        },
      
      },
    },
    plugins: {
      legend: {
        labels: { color: '#fff' },
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
    </div>
  );
};

export default CustomLineChart;