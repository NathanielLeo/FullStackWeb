import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/order/show/${id}`)
      .then(response => {
        if (response.data.status) {
          setOrder(response.data.order);
        } else {
          setError(response.data.message);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('An error occurred while loading order details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!order) return <p>Order not found</p>;

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
      <div className="space-y-4">
        <p><strong>ID:</strong> {order.id}</p>
        <p><strong>Name:</strong> {order.name}</p>
        <p><strong>Email:</strong> {order.email}</p>
        <p><strong>Phone:</strong> {order.phone}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>Created By:</strong> {order.created_by}</p>
        <p><strong>Updated By:</strong> {order.updated_by}</p>
        <p><strong>Created At:</strong> {new Date(order.created_at).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(order.updated_at).toLocaleString()}</p>
        <p><strong>Status:</strong> {order.status === 1 ? 'Active' : 'Inactive'}</p>
        <div className="mt-4">
          <h3 className="font-semibold">Product List:</h3>
          <ul>
            {order.products.map((product, index) => (
              <li key={index}>
                <strong>{product.product_id}</strong> - {product.qty} x {product.price} VND
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button onClick={() => navigate('/admin/orders')} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
        Back to Orders
      </button>
    </div>
  );
};

export default OrderDetail;
