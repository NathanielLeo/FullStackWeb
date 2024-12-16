import httpAxios from "./httpAxios";

const ProductService = {
    index: async () => {
        return await httpAxios.get('product');
    },
    create: async (data) => {
        return await httpAxios.post('product/store', data);
    },
    show: async (id) => {
        return await httpAxios.get(`product/show/${id}`);
    },
    update: async (id, data) => {
        return await httpAxios.post(`product/update/${id}`, data);
    },
    changeStatus: async (id) => {
        return await httpAxios.get(`product/status/${id}`);
    },
    delete: async (id) => {
        return await httpAxios.get(`product/delete/${id}`);
    },
    restore: async (id) => {
        return await httpAxios.get(`product/restore/${id}`);
    },
    destroy: async (id) => {
        return await httpAxios.delete(`product/destroy/${id}`);
    },
    trash: async () => {
        return await httpAxios.get('product/trash');
    }
}

export default ProductService;
