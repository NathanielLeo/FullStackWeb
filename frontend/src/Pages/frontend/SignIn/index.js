import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';

const UserSignIn = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="flex flex-col md:flex-row h-screen mx-auto items-center justify-center bg-gray-100">
      <div className="w-full md:w-1/2 flex flex-col items-center p-8 bg-white shadow-lg rounded-lg">

        <div className="w-full max-w-md">
          {/* Chuyển đổi giữa Đăng nhập và Đăng ký */}
          <div className="flex justify-center mb-6">
            <button
              className={`px-4 py-2 ${isSignIn ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => setIsSignIn(true)}
            >
              Đăng Nhập
            </button>
            <button
              className={`px-4 py-2 ${!isSignIn ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => setIsSignIn(false)}
            >
              Đăng Ký
            </button>
          </div>

          {isSignIn ? (
            <div>
              {/* Form Đăng Nhập */}
              <h1 className="text-3xl font-bold mb-4 text-center">Đăng nhập ngay</h1>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border mb-4 rounded-lg"
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full p-3 border mb-4 rounded-lg"
              />
              <button className="w-full p-3 bg-black text-white rounded-lg">Đăng Nhập</button>
            </div>
          ) : (
            <div>
              {/* Form Đăng Ký */}
              <h1 className="text-3xl font-bold mb-4 text-center">Đăng ký tài khoản</h1>
              <input
                type="text"
                placeholder="Tên đầy đủ"
                className="w-full p-3 border mb-4 rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border mb-4 rounded-lg"
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full p-3 border mb-4 rounded-lg"
              />
              <button className="w-full p-3 bg-black text-white rounded-lg">Đăng Ký</button>
            </div>
          )}

          {/* Các tùy chọn đăng nhập khác */}
          <div className="flex justify-center items-center mt-4">
            <span>Hoặc tiếp tục với:</span>
            <button className="ml-4 p-2 rounded-full hover:bg">
              <FontAwesomeIcon
                icon={faFacebook}
                className="w-10 h-10 text-black-600 transition-transform duration-300 hover:scale-125"
              />
            </button>
            <button className="ml-4 p-2 rounded-full hover:bg">
              <FontAwesomeIcon
                icon={faGoogle}
                className="w-10 h-10 text-black-600 transition-transform duration-300 hover:scale-125"
              />
            </button>
            <button className="ml-4 p-2 rounded-full hover:bg">
              <FontAwesomeIcon
                icon={faGithub}
                className="w-10 h-10 text-black-600 transition-transform duration-300 hover:scale-125"
              />
            </button>
          </div>

          {/* Đường dẫn để chuyển đổi giữa đăng nhập và đăng ký */}
          <p className="mt-4 text-center">
            {isSignIn ? (
              <>
                Chưa có tài khoản?{' '}
                <a href="#" onClick={() => setIsSignIn(false)} className="text-blue-600">
                  Đăng ký ngay!
                </a>
              </>
            ) : (
              <>
                Đã có tài khoản?{' '}
                <a href="#" onClick={() => setIsSignIn(true)} className="text-blue-600">
                  Đăng nhập!
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignIn;
