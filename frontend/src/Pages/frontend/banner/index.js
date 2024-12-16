import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BannerList() {
    const [banners, setBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/banner');
                if (response.data.status) {
                    setBanners(response.data.banners);
                }
            } catch (error) {
                console.error('Lỗi khi tải dữ liệu:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 3000); // Tự động chuyển ảnh mỗi 3 giây
        return () => clearInterval(interval);
    }, [banners.length]);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    if (loading) {
        return <p>Đang tải dữ liệu...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="relative overflow-hidden">
                <div className="relative">
                    {/* Ảnh banner hiện tại */}
                    <div className="w-full h-full">
                        <img
                            src={banners[currentIndex].image_url}
                            alt={banners[currentIndex].name}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>

                    {/* Mũi tên điều hướng */}
                    <button
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                        onClick={goToPrevious}
                    >
                        &lt;
                    </button>
                    <button
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                        onClick={goToNext}
                    >
                        &gt;
                    </button>
                </div>

                {/* Ảnh xem trước bên dưới */}
                <div className="flex justify-center mt-4 space-x-2">
                    {banners.map((banner, index) => (
                        <img
                            key={banner.id}
                            src={banner.image_url}
                            alt={`Thumbnail of ${banner.name}`}
                            className={`w-16 h-16 object-cover rounded-lg cursor-pointer transition-transform duration-300 ${
                                currentIndex === index ? 'border-2 border-blue-500 transform scale-105' : 'border border-gray-300'
                            }`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BannerList;
