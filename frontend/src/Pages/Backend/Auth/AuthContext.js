import React, { createContext, useContext, useState, useEffect } from 'react';

// Tạo context
const AuthContext = createContext();

// Tạo provider để bọc ứng dụng
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Hàm login
  const login = (navigate) => {
    setIsAuthenticated(true);
    navigate('/admin'); // Chuyển hướng sau khi đăng nhập
  };

  // Hàm logout
  const logout = (navigate) => {
    setIsAuthenticated(false);
    navigate('/login'); // Chuyển hướng về trang đăng nhập khi đăng xuất
  };

  // Hàm điều hướng đến trang đăng ký
  const goToSignUp = (navigate) => {
    navigate('/admin/register');
  };

  // Hàm điều hướng đến trang quên mật khẩu
  const goToForgotPassword = (navigate) => {
    navigate('/admin/forget');
  };

  useEffect(() => {
    // Lấy token từ localStorage hoặc sessionStorage để kiểm tra trạng thái đăng nhập
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true); // Nếu có token, người dùng đã đăng nhập
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, goToSignUp, goToForgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
