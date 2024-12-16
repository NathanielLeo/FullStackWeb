import httpAxios from "./httpAxios";

const ProductSaleService = {
    index: async () => {
        return await httpAxios.get('productsale');
    },
    create: async (data) => {
        return await httpAxios.post('productsale/store', data);
    },
    show: async (id) => {
        return await httpAxios.get(`productsale/show/${id}`);
    },
    update: async (id, data) => {
        return await httpAxios.post(`productsale/update/${id}`, data);
    },
    changeStatus: async (id) => {
        return await httpAxios.get(`productsale/status/${id}`);
    },
    delete: async (id) => {
        return await httpAxios.get(`productsale/delete/${id}`);
    },
    restore: async (id) => {
        return await httpAxios.get(`productsale/restore/${id}`);
    },
    destroy: async (id) => {
        return await httpAxios.delete(`productsale/destroy/${id}`);
    },
    trash: async () => {
        return await httpAxios.get('productsale/trash');
    }
}

export default ProductSaleService;
