import httpAxios from "./httpAxios";

const PostService = {
    index: async () => {
        return await httpAxios.get('post');
    },
    create: async (data) => {
        return await httpAxios.post('post/store', data);
    },
    show: async (id) => {
        return await httpAxios.get(`post/show/${id}`);
    },
    update: async (id, data) => {
        return await httpAxios.post(`post/update/${id}`, data);
    },
    changeStatus: async (id) => {
        return await httpAxios.get(`post/status/${id}`);
    },
    delete: async (id) => {
        return await httpAxios.get(`post/delete/${id}`);
    },
    restore: async (id) => {
        return await httpAxios.get(`post/restore/${id}`);
    },
    destroy: async (id) => {
        return await httpAxios.delete(`post/destroy/${id}`);
    },
    trash: async () => {
        return await httpAxios.get('post/trash');
    }
}

export default PostService;
