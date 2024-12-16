import httpAxios from "./httpAxios";

const BrandService = {
    index: async () => {
        return await httpAxios.get('brand');
    },
    create: async (data) => {
        return await httpAxios.post('brand/store', data);
    },
    show: async (id) => {
        return await httpAxios.get(`brand/show/${id}`);
    },
    update: async (id, data) => {
        return await httpAxios.post(`brand/update/${id}`, data);
    },
    changeStatus: async (id) => {
        return await httpAxios.get(`brand/status/${id}`);
    },
    delete: async (id) => {
        return await httpAxios.get(`brand/delete/${id}`);
    },
    restore: async (id) => {
        return await httpAxios.get(`brand/restore/${id}`);
    },
    destroy: async (id) => {
        return await httpAxios.delete(`brand/destroy/${id}`);
    },
    trash: async () => {
        return await httpAxios.get('brand/trash');
    }
}

export default BrandService;
