// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { CiSearch } from 'react-icons/ci';

// const ProductPage = () => {
//   const [products, setProducts] = useState([]);
//   const [productSales, setProductSales] = useState([]);
//   const [productStores, setProductStores] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const itemsPerPage = 4;
//   const [currentPage, setCurrentPage] = useState(1);
//   const [currentSalePage, setCurrentSalePage] = useState(1);
//   const [currentStorePage, setCurrentStorePage] = useState(1);

//   const handleSearch = (query) => {
//     const filtered = products.filter((product) =>
//       product.name.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productsRes, salesRes, storesRes] = await Promise.all([
//           axios.get('http://127.0.0.1:8000/api/product'),
//           axios.get('http://127.0.0.1:8000/api/productsale'),
//           axios.get('http://127.0.0.1:8000/api/productstore'),
//         ]);

//         setProducts(productsRes.data.products);
//         setProductSales(salesRes.data.productsales || []);
//         setProductStores(storesRes.data.productstores || []);
//         setFilteredProducts(productsRes.data.products);

//         setLoading(false);
//       } catch (err) {
//         setError('Có lỗi xảy ra khi lấy danh sách sản phẩm.');
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const paginatedData = (data, currentPage) => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return data.slice(startIndex, startIndex + itemsPerPage);
//   };

//   const totalPages = (data) => Math.ceil(data.length / itemsPerPage);

//   const handlePageClick = (type, page) => {
//     switch (type) {
//       case 'products':
//         setCurrentPage(page);
//         break;
//       case 'sales':
//         setCurrentSalePage(page);
//         break;
//       case 'stores':
//         setCurrentStorePage(page);
//         break;
//       default:
//         break;
//     }
//   };

//   if (loading) return <div>Đang tải...</div>;

//   const Pagination = ({ type, total, current }) => (
//     <div className="mt-4 flex justify-center space-x-2">
//       <button
//         onClick={() => handlePageClick(type, current - 1)}
//         disabled={current === 1}
//         className={`px-3 py-1 rounded ${current === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
//       >
//         Previous
//       </button>
//       {[...Array(total).keys()].map((page) => (
//         <button
//           key={page + 1}
//           onClick={() => handlePageClick(type, page + 1)}
//           className={`px-3 py-1 rounded ${current === page + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
//         >
//           {page + 1}
//         </button>
//       ))}
//       <button
//         onClick={() => handlePageClick(type, current + 1)}
//         disabled={current === total}
//         className={`px-3 py-1 rounded ${current === total ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
//       >
//         Next
//       </button>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {error && (
//         <div className="bg-red-500 text-white p-4 rounded mb-4">
//           {error}
//         </div>
//       )}

//       <div className="relative flex items-center w-1/4 mb-6">
//         <CiSearch className="absolute left-3 text-gray-500" size={24} />
//         <input
//           type="text"
//           placeholder="Tìm kiếm sản phẩm..."
//           className="border border-gray-300 rounded-xl pl-10 pr-4 py-2 w-60"
//           onChange={(e) => handleSearch(e.target.value)}
//         />
//       </div>

//       {/* Tất cả sản phẩm */}
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">Tất cả sản phẩm</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {paginatedData(filteredProducts, currentPage).length > 0 ? (
//             paginatedData(filteredProducts, currentPage).map((product) => (
//               <div key={product.id} className="bg-white p-4 rounded-xl shadow-lg">
//                 <img
//                   src={product.images?.[0]?.thumbnail || 'Không có hình ảnh'}
//                   alt={product.name}
//                   className="w-full h-48 object-cover rounded-lg"
//                 />
//                 <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
//                 <p className="text-gray-600">{product.price} VNĐ</p>
//               </div>
//             ))
//           ) : (
//             <p>Không có sản phẩm nào</p>
//           )}
//         </div>
//         <Pagination type="products" total={totalPages(filteredProducts)} current={currentPage} />
//       </div>

//       {/* Sản phẩm giảm giá */}
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">Sản phẩm giảm giá</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {paginatedData(productSales, currentSalePage).length > 0 ? (
//             paginatedData(productSales, currentSalePage).map((sale) => (
//               <div key={sale.id} className="bg-white p-4 rounded-xl shadow-lg">
//                 <img
//                   src={sale.images?.[0]?.thumbnail || 'Không có hình ảnh'}
//                   alt={sale.product_id}
//                   className="w-full h-48 object-cover rounded-lg"
//                 />
//                 <h3 className="text-lg font-semibold mt-2">{sale.price_sale} VNĐ</h3>
//                 <p className="text-gray-600">Bắt đầu: {sale.date_begin}</p>
//                 <p>Kết thúc: {sale.date_end}</p>
//               </div>
//             ))
//           ) : (
//             <p>Không có sản phẩm giảm giá.</p>
//           )}
//         </div>
//         <Pagination type="sales" total={totalPages(productSales)} current={currentSalePage} />
//       </div>

//       {/* Product Store */}
//       <div>
//         <h2 className="text-2xl font-bold mb-4">Sản phẩm bán chạy</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {paginatedData(productStores, currentStorePage).length > 0 ? (
//             paginatedData(productStores, currentStorePage).map((store) => (
//               <div key={store.id} className="bg-white p-4 rounded-xl shadow-lg">
//                 <img
//                   src={store.images?.[0]?.thumbnail || 'Không có hình ảnh'}
//                   alt={`Product ${store.product_id}`}
//                   className="w-full h-48 object-cover rounded-lg"
//                 />
//                 <h3 className="text-lg font-semibold mt-2">ID sản phẩm: {store.product_id}</h3>
//                 <p className="text-gray-600">Loại: {store.type}</p>
//                 <p className="text-gray-600">Số lượng: {store.qty}</p>
//                 <p className="text-gray-600">{store.price} VNĐ</p>
//               </div>
//             ))
//           ) : (
//             <p>Không có sản phẩm nào trong kho</p>
//           )}
//         </div>
//         <Pagination type="stores" total={totalPages(productStores)} current={currentStorePage} />
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CiSearch } from 'react-icons/ci';
import { FaThList } from "react-icons/fa";
import { Link ,useParams } from 'react-router-dom';
import ProductDetail from './ProductDetail';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [productSales, setProductSales] = useState([]);
  const [productStores, setProductStores] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSalePage, setCurrentSalePage] = useState(1);
  const [currentStorePage, setCurrentStorePage] = useState(1);
  const [isGirlFilter, setIsGirlFilter] = useState(false);
  const [isListView, setIsListView] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, salesRes, storesRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/product/'),
          axios.get('http://127.0.0.1:8000/api/productsale'),
          axios.get('http://127.0.0.1:8000/api/productstore'),
        ]);

        setProducts(productsRes.data.products);
        setProductSales(salesRes.data.productsales || []);
        setProductStores(storesRes.data.productstores || []);
        setFilteredProducts(productsRes.data.products);
        setLoading(false);
      } catch (err) {
        setError('Có lỗi xảy ra khi lấy danh sách sản phẩm.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (query) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(isGirlFilter ? filtered.filter(product => product.category?.toLowerCase() === 'girl') : filtered);
  };

  const toggleGirlFilter = () => {
    setIsGirlFilter(!isGirlFilter);
    if (!isGirlFilter) {
      setFilteredProducts(filteredProducts.filter((product) => product.category?.toLowerCase() === 'girl'));
    } else {
      setFilteredProducts(products);
    }
  };

  const toggleView = () => {
    setIsListView(!isListView);
  };

  const paginatedData = (data, currentPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = (data) => Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (type, page) => {
    switch (type) {
      case 'products':
        setCurrentPage(page);
        break;
      case 'sales':
        setCurrentSalePage(page);
        break;
      case 'stores':
        setCurrentStorePage(page);
        break;
      default:
        break;
    }
  };

  if (loading) return <div>Đang tải...</div>;

  const Pagination = ({ type, total, current }) => (
    <div className="mt-4 flex justify-center space-x-2">
      <button
        onClick={() => handlePageClick(type, current - 1)}
        disabled={current === 1}
        className={`px-3 py-1 rounded ${current === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
      >
        Previous
      </button>
      {[...Array(total).keys()].map((page) => (
        <button
          key={page + 1}
          onClick={() => handlePageClick(type, page + 1)}
          className={`px-3 py-1 rounded ${current === page + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          {page + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageClick(type, current + 1)}
        disabled={current === total}
        className={`px-3 py-1 rounded ${current === total ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
      >
        Next
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {error && (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          {error}
        </div>
      )}

      <div className="relative flex items-center w-1/4 mb-6">
        <CiSearch className="absolute left-3 text-gray-500" size={24} />
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="border border-gray-300 rounded-xl pl-10 pr-4 py-2 w-60"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={toggleGirlFilter}
          className={`px-4 py-2 rounded-lg ${isGirlFilter ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
        >
          {isGirlFilter ? 'Hiển thị tất cả sản phẩm' : 'Lọc sản phẩm cho girl'}
        </button>
        <button
          onClick={toggleView}
          className={`px-4 py-2 rounded-lg ${isListView ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          {isListView ? 'Chuyển sang dạng lưới' : 'Chuyển sang dạng danh sách'}
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Tất cả sản phẩm</h2>
        <div className={isListView ? "space-y-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"}>
          {paginatedData(filteredProducts, currentPage).length > 0 ? (
            paginatedData(filteredProducts, currentPage).map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>  {/* Thêm Link vào đây */}
                <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-start">
                  <img
                    src={product.images?.[0]?.thumbnail || 'Không có hình ảnh'}
                    alt={product.name}
                    className={isListView ? "w-24 h-24 object-cover rounded-lg mr-4" : "w-full h-48 object-cover rounded-lg"}
                  />
                  <div className={isListView ? "flex-1 ml-4" : "mt-2"}>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">{product.price} VNĐ</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>Không có sản phẩm nào</p>
          )}
        </div>
        <Pagination type="products" total={totalPages(filteredProducts)} current={currentPage} />
      </div>
    </div>
  );
};

export default ProductPage;








// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { CiSearch } from 'react-icons/ci';

// const ProductPage = () => {
//   const [products, setProducts] = useState([]);
//   const [productSales, setProductSales] = useState([]);
//   const [productStores, setProductStores] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const itemsPerPage = 4;
//   const [currentPage, setCurrentPage] = useState(1);
//   const [currentSalePage, setCurrentSalePage] = useState(1);
//   const [currentStorePage, setCurrentStorePage] = useState(1);

//   // Filter and Sort states
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [brandFilter, setBrandFilter] = useState('');
//   const [priceFilter, setPriceFilter] = useState('');
//   const [sortOption, setSortOption] = useState('');

//   const handleSearch = (query) => {
//     const filtered = products.filter((product) =>
//       product.name.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredProducts(filtered);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productsRes, salesRes, storesRes] = await Promise.all([
//           axios.get('http://127.0.0.1:8000/api/product'),
//           axios.get('http://127.0.0.1:8000/api/productsale'),
//           axios.get('http://127.0.0.1:8000/api/productstore'),
//         ]);

//         setProducts(productsRes.data.products);
//         setProductSales(salesRes.data.productsales || []);
//         setProductStores(storesRes.data.productstores || []);
//         setFilteredProducts(productsRes.data.products);

//         setLoading(false);
//       } catch (err) {
//         setError('Có lỗi xảy ra khi lấy danh sách sản phẩm.');
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     let updatedProducts = products;

//     if (categoryFilter) {
//       updatedProducts = updatedProducts.filter(product => product.category === categoryFilter);
//     }
//     if (brandFilter) {
//       updatedProducts = updatedProducts.filter(product => product.brand === brandFilter);
//     }
//     if (priceFilter) {
//       // Implement price filtering logic if needed
//     }

//     // Apply sorting
//     if (sortOption === 'price-desc') {
//       updatedProducts = [...updatedProducts].sort((a, b) => b.price - a.price);
//     } else if (sortOption === 'price-asc') {
//       updatedProducts = [...updatedProducts].sort((a, b) => a.price - b.price);
//     } else if (sortOption === 'best-selling') {
//       // Implement best-selling sorting logic if available
//     }

//     setFilteredProducts(updatedProducts);
//   }, [categoryFilter, brandFilter, priceFilter, sortOption, products]);

//   const paginatedData = (data, currentPage) => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return data.slice(startIndex, startIndex + itemsPerPage);
//   };
//   const totalPages = (data) => Math.ceil(data.length / itemsPerPage);

//   const handlePageClick = (type, page) => {
//     switch (type) {
//       case 'products':
//         setCurrentPage(page);
//         break;
//       case 'sales':
//         setCurrentSalePage(page);
//         break;
//       case 'stores':
//         setCurrentStorePage(page);
//         break;
//       default:
//         break;
//     }
//   };

//   if (loading) return <div>Đang tải...</div>;

//   const Pagination = ({ type, total, current }) => (
//     <div className="mt-4 flex justify-center space-x-2">
//       <button
//         onClick={() => handlePageClick(type, current - 1)}
//         disabled={current === 1}
//         className={`px-3 py-1 rounded ${current === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
//       >
//         Previous
//       </button>
//       {[...Array(total).keys()].map((page) => (
//         <button
//           key={page + 1}
//           onClick={() => handlePageClick(type, page + 1)}
//           className={`px-3 py-1 rounded ${current === page + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
//         >
//           {page + 1}
//         </button>
//       ))}
//       <button
//         onClick={() => handlePageClick(type, current + 1)}
//         disabled={current === total}
//         className={`px-3 py-1 rounded ${current === total ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
//       >
//         Next
//       </button>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {error && (
//         <div className="bg-red-500 text-white p-4 rounded mb-4">
//           {error}
//         </div>
//       )}

//       {/* Search */}
//       <div className="relative flex items-center w-1/4 mb-6">
//         <CiSearch className="absolute left-3 text-gray-500" size={24} />
//         <input
//           type="text"
//           placeholder="Tìm kiếm sản phẩm..."
//           className="border border-gray-300 rounded-xl pl-10 pr-4 py-2 w-60"
//           onChange={(e) => handleSearch(e.target.value)}
//         />
//       </div>

//       {/* Filter and Sort Dropdowns */}
//       <div className="flex gap-6 mb-6">
//         {/* Filter Column */}
//         <div className="bg-white p-4 rounded-xl shadow-lg w-1/2">
//           <h3 className="text-lg font-bold mb-2">Lọc sản phẩm</h3>
//           <div className="flex flex-col gap-4">
//             <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="border border-gray-300 rounded p-2">
//               <option value="">Theo danh mục</option>
//               {/* Thêm các tùy chọn danh mục tại đây */}
//             </select>
//             <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)} className="border border-gray-300 rounded p-2">
//               <option value="">Theo thương hiệu</option>
//               {/* Thêm các tùy chọn thương hiệu tại đây */}
//             </select>
//             <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="border border-gray-300 rounded p-2">
//               <option value="">Giá</option>
//               {/* Thêm các tùy chọn giá tại đây */}
//             </select>
//             <select className="border border-gray-300 rounded p-2">
//               <option value="">Bộ lọc khác</option>
//               {/* Thêm các bộ lọc khác tại đây */}
//             </select>
//           </div>
//         </div>

//         {/* Sort Column */}
//         <div className="bg-white p-4 rounded-xl shadow-lg w-1/2">
//           <h3 className="text-lg font-bold mb-2">Sắp xếp sản phẩm</h3>
//           <div className="flex flex-col gap-4">
//             <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="border border-gray-300 rounded p-2">
//               <option value="">Mới nhất</option>
//               <option value="price-desc">Giá cao đến thấp</option>
//               <option value="price-asc">Giá thấp đến cao</option>
//               <option value="best-selling">Bán chạy</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Product List */}
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">Tất cả sản phẩm</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {paginatedData(filteredProducts, currentPage).length > 0 ? (
//             paginatedData(filteredProducts, currentPage).map((product) => (
//               <div key={product.id} className="bg-white p-4 rounded-xl shadow-lg">
//                 <img
//                   src={product.images?.[0]?.thumbnail || 'Không có hình ảnh'}
//                   alt={product.name}
//                   className="w-full h-48 object-cover rounded-lg"
//                 />
//                 <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
//                 <p className="text-gray-600">{product.price} VNĐ</p>
//               </div>
//             ))
//           ) : (
//             <p>Không có sản phẩm nào</p>
//           )}
//         </div>
//         <Pagination type="products" total={totalPages(filteredProducts)} current={currentPage} />
//       </div>
//     </div>
//   );
// };

// export default ProductPage;