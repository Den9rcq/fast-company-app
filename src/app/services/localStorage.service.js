const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";

export const setTokens = async ({ expiresIn = 3600, idToken, refreshToken }) => {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
};
export const getAccessToken = () => localStorage.getItem(REFRESH_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);
export const getTokenExpiresDate = () => localStorage.getItem(EXPIRES_KEY);

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate
};

export default localStorageService;
