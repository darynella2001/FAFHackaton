import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./api-url";
import { login } from "./auth-service";

let url = API_URL + "/users/";

export async function createUser(email, password) {
    const user = await axios.post(url, {
        email,
        password,
    });
    await login(email, password);

    return user.data;
}

export async function getUsers() {
    return await axios.get(url, { headers: await authHeader() });
}

export async function getUserById(id) {
    return await axios.get(url + id, { headers: await authHeader() });
}

export async function deleteUserById(id) {
    return await axios.delete(url + id, { headers: await authHeader() });
}
