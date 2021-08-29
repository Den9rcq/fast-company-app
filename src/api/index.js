import * as users from "./fake.api/user.api"
import {fetchAll} from "./fake.api/user.api";
const API = {
    users
}

fetchAll().map(item => item.favorites = false)


export default API