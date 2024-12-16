import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import axios from 'axios';
import { MdEmail ,MdLocalPhone, MdOutlineFacebook } from "react-icons/md";
import { SiZalo } from "react-icons/si";
import { VscLocation } from "react-icons/vsc";

const ConfigList = () => {
  const [configs, setConfigs] = useState([]);
  const [filteredConfigs, setFilteredConfigs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSocial, setSelectedSocial] = useState(null); // State để lưu thông tin mạng xã hội đã chọn

  const socialLinks = {
    email: {
      name: "Email",
      url: "https://accounts.google.com/SignOutOptions?hl=vi&continue=https://mail.google.com/mail/&service=mail&ec=GBRAFw",
      icon: <MdEmail />
    },
    phones: {
      name: "Phone",
      url: "tel:+0394459156",
      icon: <MdLocalPhone />
    },
    facebook: {
      name: "Facebook", 
      url: "https://www.facebook.com/profile.php?id=100063854304829",
      icon: <MdOutlineFacebook />
    },
    zalo: {
      name: "Zalo",
      url: "https://www.zalo.me/0394459156",
      icon: <SiZalo /> 
    },
    address: {
      name: "Địa chỉ",
      url: "https://maps.app.goo.gl/dGffTcXqjmp5Gmwe9",
      icon: <VscLocation  /> 
    },
  };

  const handleSearch = (query) => {
    const filtered = configs.filter((config) =>
      config.site_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredConfigs(filtered);
  };

  const handleSocialClick = (social) => {
    setSelectedSocial(social); // Cập nhật thông tin mạng xã hội đã chọn
  };

  const handleLinkClick = (url) => {
    const userConfirmed = window.confirm("Bạn có chắc muốn truy cập liên kết này?");
    if (userConfirmed) {
      window.open(url, "_blank", "noopener noreferrer");
    }
  };

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/config');
        setConfigs(response.data.configs);
        setFilteredConfigs(response.data.configs);
        setLoading(false);
      } catch (error) {
        setError('Không thể lấy dữ liệu');
        setLoading(false);
      }
    };

    fetchConfigs();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl p-6 flex flex-col lg:flex-row items-center bg-white shadow-lg rounded-3xl">
        <div className="lg:w-1/2 w-full lg:mr-10 mb-6 lg:mb-0 flex">
          {/* <video
            src="/img/video.mp4"
            alt="Mô tả ảnh"
            className="rounded-3xl w-full h-96 transform transition-transform duration-300 hover:scale-105"
            autoPlay
            loop
            muted
          /> */}
          <img
            src="https://draerp.vn/wp-content/uploads/2022/10/lien-he.png"
            alt="Mô tả ảnh"
            className="rounded-3xl w-full h-96 transform transition-transform duration-300 hover:scale-105"
            autoPlay
            loop
            muted
          />
        </div>  

        <div className="lg:w-1/2 w-full bg-gray-100 rounded-3xl p-6">
          <h2 className="text-3xl font-bold mb-4">Liên hệ hỗ trợ </h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Tên đầy đủ"
                className="border border-gray-300 rounded-xl pl-4 py-2 w-full"
              />
              <input
                type="email"
                placeholder="Địa chỉ email"
                className="border border-gray-300 rounded-xl pl-4 py-2 w-full"
              />
            </div>
            <textarea
              placeholder="Đừng ngại hỏi về đơn hàng của bạn"
              className="border border-gray-300 rounded-xl pl-4 pr-4 py-2 w-full h-32"
            ></textarea>
            <button type="submit" className="bg-black text-white rounded-xl px-4 py-2 w-full">Gửi liên hệ</button>
          </form>

          {/* Icon mạng xã hội */}
          <div className="flex items-center justify-start mt-6 space-x-4">
            <h1 className="text-lg font-bold mb-4">Thông tin liên hệ:</h1>
            {Object.entries(socialLinks).map(([key, { icon }]) => (
              <button key={key} onClick={() => setSelectedSocial(key)} className="text-gray-700 hover:text-black text-2xl">
                {icon}
              </button>
            ))}
          </div>

          {/* Hiển thị thông tin mạng xã hội khi người dùng nhấn */}
          {selectedSocial && (
            <div className="mt-6 p-4 border rounded-xl bg-gray-200">
              <p className="text-lg font-bold mb-2">Bạn đang truy cập {socialLinks[selectedSocial].name}</p>
              <p className="text-gray-600">
                Thông tin: {filteredConfigs[0]?.[selectedSocial] || 'Không có thông tin'}
              </p>
              <button
                onClick={() => handleLinkClick(socialLinks[selectedSocial].url)}
                className="text-blue-500 underline"
              >
                Nhấp vào đây để truy cập {socialLinks[selectedSocial].name}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bản đồ Google Map */}
      <div className="w-full max-w-6xl mt-10">
        <h3 className="text-2xl font-bold mb-4">Địa chỉ của chúng tôi</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7463927056347!2d106.77246711092734!3d10.830709789276847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752701a34a5d5f%3A0x30056b2fdf668565!2zQ2FvIMSQ4bqzbmcgQ8O0bmcgVGjGsMahbmcgVFAuSENN!5e0!3m2!1svi!2s!4v1730646884117!5m2!1svi!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Google Map"
        ></iframe>
      </div>
    </div>
  );
};

export default ConfigList;
