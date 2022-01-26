import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import localStorageService from "./localStorage.service";
import { httpAuth } from "../hooks/useAuth";

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

// Трансформация данных из объекта в массив объектов
const transformData = (data) => {
    return data && !data._id
        ? Object.keys(data).map((key) => ({
            ...data[key]
        }))
        : data;
};

// Перехватчик запроса
http.interceptors.request.use(async config => {
    if (configFile.isFireBase) {
        const containSlash = /\/$/gi.test(config.url);
        config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json";

        // Обновление токена
        const expiresDate = localStorageService.getTokenExpiresDate();
        const refreshToken = localStorageService.getRefreshToken();
        if (refreshToken && expiresDate < Date.now()) {
            const { data } = await httpAuth.post(`token`, {
                grant_type: "refresh_token",
                refreshToken: refreshToken
            });
            await localStorageService.setTokens({
                refreshToken: data.refresh_token,
                idToken: data.id_token,
                expiresIn: data.expires_in,
                localId: data.user_id
            });
        }
        const accessToken = localStorageService.getAccessToken();
        if (accessToken) {
            config.params = { ...config.params, auth: accessToken };
        }
    }
    return config;
}, error => Promise.reject(error));

// Перехватчик ответа
http.interceptors.response.use(res => {
    if (configFile.isFireBase) {
        res.data = { content: transformData(res.data) };
    }
    return res;
}, (error) => {
    const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedErrors) {
        console.log(error);
        toast.error("Попробуйте позже");
    }
    return Promise.reject(error);
});

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};
export default httpService;