import httpAxios from "./httpAxios";

const ProductStoreService = {
    index: async () => {
        return await httpAxios.get('productstore');
    },
    create: async (data) => {
        return await httpAxios.post('productstore/store', data);
    },
    show: async (id) => {
        return await httpAxios.get(`productstore/show/${id}`);
    },
    update: async (id, data) => {
        return await httpAxios.post(`productstore/update/${id}`, data);
    },
    changeStatus: async (id) => {
        return await httpAxios.get(`productstore/status/${id}`);
    },
    delete: async (id) => {
        return await httpAxios.get(`productstore/delete/${id}`);
    },
    restore: async (id) => {
        return await httpAxios.get(`productstore/restore/${id}`);
    },
    destroy: async (id) => {
        return await httpAxios.delete(`productstore/destroy/${id}`);
    },
    trash: async () => {
        return await httpAxios.get('productstore/trash');
    }
}

export default ProductStoreService;
