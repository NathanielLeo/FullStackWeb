import httpAxios from "./httpAxios";

const ProductService = {
    index: async () => {
        return await httpAxios.get('productimage');
    },
    create: async (data) => {
        return await httpAxios.post('productimage/store', data);
    },
    show: async (id) => {
        return await httpAxios.get(`productimage/show/${id}`);
    },
    update: async (id, data) => {
        return await httpAxios.post(`productimage/update/${id}`, data);
    },
    destroy: async (id) => {
        return await httpAxios.delete(`productimage/destroy/${id}`);
    },
}

export default ProductService;
