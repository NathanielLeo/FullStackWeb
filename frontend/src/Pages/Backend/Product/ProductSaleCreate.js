import React, { useState } from 'react';

const ProductSaleCreate = () => {
    const [product_id, setProductId] = useState('');
    const [price_sale, setPriceSale] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('1');
    const [images, setImages] = useState([]);

    const handleFileChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic xử lý khi submit form
        console.log({
            product_id,
            price_sale,
            status,
        });
    };
 
    return (
        <div className="shadow-xl rounded-xl mx-auto max-w-lg p-7 border border-gray-300">
            <h2 className="text-center text-3xl font-bold text-red-700">THÊM PRODUCT SALE</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 font-bold">
                    <label htmlFor="product_id">Product ID</label>
                    <input
                        id="product_id"
                        type="text"
                        value={product_id}
                        onChange={(e) => setProductId(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4 font-bold">
                    <label htmlFor="price_sale">Price Sale</label>
                    <input
                        id="price_sale"
                        type="text"
                        value={price_sale}
                        onChange={(e) => setPriceSale(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4 font-bold">
                    <label htmlFor="status">Status</label>
                    <input 
                        id="status"
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                    Lưu Product Sale
                </button>
            </form>
        </div>
    );
};

export default ProductSaleCreate;
