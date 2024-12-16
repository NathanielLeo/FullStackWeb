import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Chart } from 'chart.js';

const Dashboard = () => {
  const [doughnutChart, setDoughnutChart] = useState(null);

  useEffect(() => {
    const chartOne = document.getElementById('salesChart');
    const chartTwo = document.getElementById('stockChart');
    const doughnutChartCanvas = document.getElementById('doughnutChart');

    // Xóa biểu đồ Doughnut cũ nếu đã tồn tại
    if (doughnutChart) {
      doughnutChart.destroy();
    }

    // Khởi tạo biểu đồ doanh số bán
    new Chart(chartOne, {
      type: 'bar',
      data: {
        labels: ['Áo', 'Quần', 'Dép', 'Giầy', 'SanDal'],
        datasets: [{
          label: 'Doanh số bán',
          data: [50, 30, 20, 10, 5],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Khởi tạo biểu đồ tồn kho
    new Chart(chartTwo, {
      type: 'line',
      data: {
        labels: ['Áo', 'Quần', 'Dép', 'Giầy', 'SanDal'],
        datasets: [{
          label: 'Tồn kho xe',
          data: [10, 15, 8, 5, 3], // Dữ liệu tồn kho
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          fill: true // Đổ màu dưới đường
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Khởi tạo biểu đồ Doughnut
    const newDoughnutChart = new Chart(doughnutChartCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Áo', 'Quần', 'Dép', 'Giầy', 'SanDal'],
        datasets: [{
          label: 'Doanh số bán siêu xe',
          data: [30, 25, 15, 10, 20], // Giá trị doanh số
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    // Lưu biểu đồ Doughnut để sử dụng lại
    setDoughnutChart(newDoughnutChart);
  }, []); // Sử dụng mảng rỗng để chỉ khởi tạo biểu đồ Doughnut một lần

  return (
    <div className="w-full overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="text-3xl text-black pb-6">Bảng Điều Khiển Bán Hàng</h1>

        <div className="flex flex-wrap mt-6">
          <div className="w-full lg:w-1/2 pr-0 lg:pr-2">
            <p className="text-xl pb-3 flex items-center">
              <i className="fas fa-car mr-3"></i> Doanh Số Bán
            </p>
            <div className="p-6 bg-white">
              <canvas id="salesChart" width="400" height="200"></canvas>
            </div>
          </div>
          <div className="w-full lg:w-1/2 pl-0 lg:pl-2 mt-12 lg:mt-0">
            <p className="text-xl pb-3 flex items-center">
              <i className="fas fa-chart-line mr-3"></i> Tồn Kho
            </p>
            <div className="p-6 bg-white">
              <canvas id="stockChart" width="400" height="200"></canvas>
            </div>
          </div>
        </div>

        <div className="w-full mt-12">
          <p className="text-xl pb-3 flex items-center">
            <i className="fas fa-car-alt mr-3"></i> Cửa Hàng
          </p>
          <div className="bg-white overflow-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Thương Hiệu</th>
                  <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Mẫu </th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Giá</th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr>
                  <td className="w-1/3 text-left py-3 px-4">Áo</td>
                  <td className="w-1/3 text-left py-3 px-4">488 </td>
                  <td className="text-left py-3 px-4">$2,000</td>
                  <td className="text-left py-3 px-4">Chi tiết...</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="w-1/3 text-left py-3 px-4">Quần</td>
                  <td className="w-1/3 text-left py-3 px-4">234</td>
                  <td className="text-left py-3 px-4">$2,274</td>
                  <td className="text-left py-3 px-4">Chi tiết...</td>
                </tr>
                <tr>
                  <td className="w-1/3 text-left py-3 px-4">Dép</td>
                  <td className="w-1/3 text-left py-3 px-4">911</td>
                  <td className="text-left py-3 px-4">$2,000</td>
                  <td className="text-left py-3 px-4">Chi tiết...</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="w-1/3 text-left py-3 px-4">Giầy</td>
                  <td className="w-1/3 text-left py-3 px-4">720</td>
                  <td className="text-left py-3 px-4">$1,000</td>
                  <td className="text-left py-3 px-4">Chi tiết...</td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
          <div className=" w-full flex justify-center mt-6">
            <div className="w-1/2">
              <canvas id="doughnutChart" width="400" height="400"></canvas>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
