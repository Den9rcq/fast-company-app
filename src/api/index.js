import * as users from "./fake.api/user.api";
import professions from "./fake.api/profession.api";
import { fetchAll } from "./fake.api/user.api";
const API = {
    users,
    professions
};

fetchAll().map((item) => (item.favorites = false));

export default API;
