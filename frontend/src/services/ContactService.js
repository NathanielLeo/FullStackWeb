import httpAxios from "./httpAxios";

const ContactService = {
    index: async () => {
        return await httpAxios.get('contact');
    },
    reply: async (id, data) => {
        return await httpAxios.post(`contact/reply/${id}`, data);
    },
    show: async (id) => {
        return await httpAxios.get(`contact/show/${id}`);
    },
    changeStatus: async (id) => {
        return await httpAxios.get(`contact/status/${id}`);
    },
    delete: async (id) => {
        return await httpAxios.get(`contact/delete/${id}`);
    },
    restore: async (id) => {
        return await httpAxios.get(`contact/restore/${id}`);
    },
    destroy: async (id) => {
        return await httpAxios.delete(`contact/destroy/${id}`);
    },
    trash: async () => {
        return await httpAxios.get('contact/trash');
    }
}

export default ContactService;
