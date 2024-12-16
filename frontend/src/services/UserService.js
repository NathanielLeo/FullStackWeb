import httpAxios from "./httpAxios";

const UserService = {
    index: async () => {
        return await httpAxios.get('user');
    },
    create: async (data) => {
        return await httpAxios.post('user/store', data);
    },
    show: async (id) => {
        return await httpAxios.get(`user/show/${id}`);
    },
    update: async (id, data) => {
        return await httpAxios.post(`user/update/${id}`, data);
    },
    changeStatus: async (id) => {
        return await httpAxios.get(`user/status/${id}`);
    },
    delete: async (id) => {
        return await httpAxios.get(`user/delete/${id}`);
    },
    restore: async (id) => {
        return await httpAxios.get(`user/restore/${id}`);
    },
    destroy: async (id) => {
        return await httpAxios.delete(`user/destroy/${id}`);
    },
    trash: async () => {
        return await httpAxios.get('user/trash');
    }
    
}

export default UserService;
