import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Kiểm tra token trong localStorage/sessionStorage để xác định người dùng đã đăng nhập chưa
  const isAuthenticated = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

  if (!isAuthenticated) {
    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    return <Navigate to="/login" />;
  }

  // Nếu đã đăng nhập, hiển thị nội dung được bảo vệ
  return children;
};

export default ProtectedRoute;
