import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "user/";
const userService = {
    fetchAll: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(userEndpoint + localStorageService.getUserId());
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.patch(userEndpoint + payload._id, payload);
        return data;
    }
};

export default userService;
