import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CiSearch } from 'react-icons/ci';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [products, setProducts] = useState([]); // State lưu sản phẩm
  const [filteredProducts, setFilteredProducts] = useState([]); // State lưu sản phẩm đã lọc
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Hàm tìm ki  m danh m  c theo t   ki  m
   * @param {string} query T   ki  m t  m ki  m
   */
/******  5f39d2de-4572-45c9-a061-14bfdb1e556c  *******/  const handleSearch = (query) => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  // Call API để lấy danh sách danh mục và sản phẩm
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryResponse = await axios.get('http://127.0.0.1:8000/api/category');
        const productResponse = await axios.get('http://127.0.0.1:8000/api/product'); // API lấy sản phẩm

        setCategories(categoryResponse.data.categories);
        setFilteredCategories(categoryResponse.data.categories);
        setProducts(productResponse.data.products); // Lưu dữ liệu sản phẩm
        setLoading(false);
      } catch (err) {
        setError('Có lỗi xảy ra khi lấy danh sách.');
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Hàm xử lý khi người dùng nhấp vào một danh mục
  const handleCategoryClick = (categoryId) => {
    const filtered = products.filter((product) => product.category_id === categoryId);
    setFilteredProducts(filtered); // Lưu danh sách sản phẩm đã lọc
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        {/* Thông báo lỗi */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded mb-4">
            {error}
          </div>
        )}

        {/* <header className="bg-white p-4 rounded-3xl shadow mb-6">
          <div className="flex justify-between items-center"> */}
            {/* Search bar with icon */}
            {/* <div className="relative flex items-center w-1/4">
              <CiSearch className="absolute left-3 text-gray-500" size={24} />
              <input
                type="text"
                placeholder="Tìm kiếm danh mục..."
                className="border border-gray-300 rounded-xl pl-10 pr-4 py-2 w-60"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </header> */}

        <div className="p-6">
          <h1 className="text-4xl font-bold text-center mb-6">Danh mục sản phẩm</h1>
          {/* Hiển thị danh mục */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white p-6 rounded-xl shadow-lg relative cursor-pointer"
                  onClick={() => handleCategoryClick(category.id)} // Xử lý nhấp vào danh mục
                >
                  {/* Category image */}
                  <div className="text-center mb-4">
                    {category.image_url ? (
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ) : (
                      <span>Không có hình ảnh</span>
                    )}
                  </div>

                  {/* Category name */}
                  <h2 className="text-lg font-semibold text-center">{category.name}</h2>

                  {/* Category description */}
                  <div className="mt-2 text-sm text-gray-600 text-center">
                    <p>{category.description || 'Không có mô tả'}</p>
                  </div>

                  {/* Category status */}
                  <div className="mt-4 text-center text-xl font-semibold text-gray-800">
                    {category.status === 1 ? 'Hiển thị' : 'Ẩn'}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center col-span-full">Không có danh mục nào</div>
            )}
          </div>

          {/* Hiển thị sản phẩm đã lọc theo danh mục */}
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-center mb-6">Sản phẩm thuộc danh mục</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white p-4 rounded-lg shadow">
                    {/* Product image */}
                    <div className="text-center mb-4">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0].thumbnail}
                          alt={product.name}
                          className="object-cover rounded-lg"
                        />
                      ) : (
                        <span>Không có hình ảnh</span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.description}</p>
                    <p className="text-xl font-bold text-blue-600 mt-2">{product.price} VND</p>
                  </div>
                ))
              ) : (
                <div className="text-center col-span-full">Không có sản phẩm nào</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
