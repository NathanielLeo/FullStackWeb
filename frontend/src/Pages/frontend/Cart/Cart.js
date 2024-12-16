import React, { useEffect } from 'react';

const CartList = ({ isOpen, onClose, cartItems, setCartItems }) => {
  // Cập nhật localStorage mỗi khi cartItems thay đổi
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateCartItemQuantity = (item, newQuantity) => {
    if (newQuantity <= 0) {
      removeCartItem(item);
    } else {
      const updatedCart = cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
      );
      setCartItems(updatedCart);
    }
  };

  const removeCartItem = (item) => {
    const updatedCart = cartItems.filter(cartItem => cartItem.id !== item.id);
    setCartItems(updatedCart);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Giỏ hàng</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">Đóng</button>
      </div>
      <div className="p-4 flex flex-col h-full">
        {cartItems.length === 0 ? (
          <p>Giỏ hàng trống!</p>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between mb-4">
                  <img
                    src={item.images[0].thumbnail}
                    alt={item.name}
                    className="w-12 h-12 rounded"
                  />
                  <div className="flex-1 ml-4">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-gray-500">{item.price} đ</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateCartItemQuantity(item, item.quantity - 1)}
                        className="px-2 py-1 text-gray-700 border rounded hover:bg-gray-200"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => updateCartItemQuantity(item, item.quantity + 1)}
                        className="px-2 py-1 text-gray-700 border rounded hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeCartItem(item)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Xóa
                  </button>
                </div>
              ))}
            </div>
            <button className="bg-blue-500 text-white w-full py-2 mt-4 hover:bg-blue-600">
              Thanh toán
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartList;
