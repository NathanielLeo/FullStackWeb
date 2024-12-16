import httpAxios from "./httpAxios";

const MenuService = {
    index: async () => {
        return await httpAxios.get('menu');
    },
    create: async (data) => {
        return await httpAxios.post('menu/store', data);
    },
    show: async (id) => {
        return await httpAxios.get(`menu/show/${id}`);
    },
    update: async (id, data) => {
        return await httpAxios.post(`menu/update/${id}`, data);
    },
    changeStatus: async (id) => {
        return await httpAxios.get(`menu/status/${id}`);
    },
    delete: async (id) => {
        return await httpAxios.get(`menu/delete/${id}`);
    },
    restore: async (id) => {
        return await httpAxios.get(`menu/restore/${id}`);
    },
    destroy: async (id) => {
        return await httpAxios.delete(`menu/destroy/${id}`);
    },
    trash: async () => {
        return await httpAxios.get('menu/trash');
    }
}

export default MenuService;
