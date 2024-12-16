import httpAxios from "./httpAxios";

const TopicService = {
    index: async () => {
        return await httpAxios.get('topic');
    },
    create: async (data) => {
        return await httpAxios.post('topic/store', data);
    },
    show: async (id) => {
        return await httpAxios.get(`topic/show/${id}`);
    },
    update: async (id, data) => {
        return await httpAxios.post(`topic/update/${id}`, data);
    },
    changeStatus: async (id) => {
        return await httpAxios.get(`topic/status/${id}`);
    },
    delete: async (id) => {
        return await httpAxios.get(`topic/delete/${id}`);
    },
    restore: async (id) => {
        return await httpAxios.get(`topic/restore/${id}`);
    },
    destroy: async (id) => {
        return await httpAxios.delete(`topic/destroy/${id}`);
    },
    trash: async () => {
        return await httpAxios.get('topic/trash');
    }
}

export default TopicService;
