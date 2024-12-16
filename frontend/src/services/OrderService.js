import httpAxios from "./httpAxios";

const OrderService = {
    index: async () => {
        return await httpAxios.get('order');
    },
    show: async (id) => {
        return await httpAxios.get(`order/show/${id}`);
    },
    changeStatus: async (id) => {
        return await httpAxios.get(`order/status/${id}`);
    },
    destroy: async (id) => {
        return await httpAxios.delete(`order/destroy/${id}`);
    },
    trash: async () => {
        return await httpAxios.get('order/trash');
    }
}

export default OrderService;
