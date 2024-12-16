import React, { useEffect, useState } from 'react';
import { FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";
import { SiShopee ,SiZalo } from "react-icons/si";
import axios from 'axios';

export default function Footer() {
  const [config, setConfig] = useState(null);
  const [error, setError] = useState(null);
  const [showFacebookLink, setShowFacebookLink] = useState(false);
  const [showZaloLink, setShowZaloLink] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/config');
        setConfig(response.data.configs[0]);
      } catch (error) {
        setError('Không thể lấy dữ liệu cấu hình');
        console.error('Error fetching config:', error);
      }
    };
    fetchConfig();
  }, []);

  if (!config) {
    return (
      <div className="bg-gray-100 py-8">
        <div className="text-center text-gray-600">Đang tải dữ liệu...</div>
        {error && <div className="text-red-500">{error}</div>}
      </div>
    );
  }

  const handleFacebookClick = () => {
    setShowFacebookLink(true);
  };
  const handleZaloClick = () => {
    setShowZaloLink(true);
  };

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-2">Gọi mua hàng online (08:00 - 21:00 mỗi ngày)</h4>
            <h4 className="text-lg font-semibold mt-4 mb-2">Góp ý & Khiếu nại (08:30 - 20:30)</h4>
            <p className="text-2xl font-bold mb-2">{config.hotline}</p>
            <p className="text-2xl font-bold mb-2">Email: {config.email}</p>
            <p className="text-gray-600">Tất cả các ngày trong tuần (Trừ tết Âm Lịch)</p>
            <p className="text-xl mb-2">{config.address}</p>
          </div>  
          
          <div>
            <h4 className="text-lg font-semibold mb-2">Thông tin</h4>
            <ul>
              <li><a href="st" className="text-gray-600">Thông tin Website thương mại điện tử</a></li>
              <li><a href="st" className="text-gray-600">Giới thiệu về MWC</a></li>
              <li><a href="st" className="text-gray-600">Than Phiền Góp Ý</a></li>
              <li><a href="st" className="text-gray-600">Chính sách và quy định</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-2">FAQ</h4>
            <ul>
              <li><a href="st" className="text-gray-600">Vận chuyển</a></li>
              <li><a href="st" className="text-gray-600">Chính sách đổi trả</a></li>
              <li><a href="st" className="text-gray-600">Chính sách đổi trả bảo hành</a></li>
            </ul>
            
            <div className="flex space-x-4 mt-4 text-4xl">
              <button onClick={handleFacebookClick} aria-label="Facebook" className="text-blue-600 hover:text-blue-800"><FaFacebook /></button>
              <button onClick={handleZaloClick} aria-label="Zalo" className="text-blue-600 hover:text-blue-800"><SiZalo /></button>
              <a href="https://www.youtube.com/@MWCShop01" aria-label="YouTube" className="text-red-600 hover:text-red-800"><FaYoutube /></a>
              <a href="https://shopee.vn/mwc_shop" aria-label="Shopee" className="text-red-500 hover:text-red-700"><SiShopee /></a>
              <a href="https://www.tiktok.com/@nthlion_store?_t=8qyS07phLa4&_r=1" aria-label="TikTok" className="text-black hover:text-gray-800"><FaTiktok /></a>
            </div>

            {showFacebookLink && config.facebook && (
              <p className="text-gray-600 mt-4">
                Link Facebook: <a href={config.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600">Truy cập Facebook</a>
              </p>
            )}
            {showZaloLink && config.zalo && (
              <p className="text-gray-600 mt-4">
                Link Zalo: <a href={config.zalo} target="_blank" rel="noopener noreferrer" className="text-blue-600">Truy cập Zalo</a>
              </p>
            )}

            <div className="mt-8 border-t border-gray-300 pt-4">
              <p className="text-sm text-gray-500">© 2024. Created by {config.site_name}</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
