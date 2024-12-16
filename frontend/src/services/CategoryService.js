import httpAxios from "./httpAxios";

const CategoryService = {
    index: async () => {
        return await httpAxios.get('category');
    },
    create: async (data) => {
        return await httpAxios.post('category/store', data);
    },
    show: async (id) => {
        return await httpAxios.get(`category/show/${id}`);
    },
    update: async (id, data) => {
        return await httpAxios.post(`category/update/${id}`, data);
    },
    changeStatus: async (id) => {
        return await httpAxios.get(`category/status/${id}`);
    },
    delete: async (id) => {
        return await httpAxios.get(`category/delete/${id}`);
    },
    restore: async (id) => {
        return await httpAxios.get(`category/restore/${id}`);
    },
    destroy: async (id) => {
        return await httpAxios.delete(`category/destroy/${id}`);
    },
    trash: async () => {
        return await httpAxios.get('category/trash');
    }
}

export default CategoryService;
