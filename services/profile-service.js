import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./api-url";

let url = API_URL + "/profiles/";

export async function getProfiles() {
    return await axios.get(url);
}

export async function createProfile(profile) {
    return await axios.post(url, profile, { headers: await authHeader() });
}

export async function getProfileById(id) {
    return await axios.get(url + id);
}

export async function deleteProfileAndUser(id) {
    return await axios.delete(url + id, { headers: await authHeader() });
}

export async function updateProfile(id, profile) {
    return await axios.patch(url + id, profile, { headers: await authHeader() });
}

export async function subscribeToUser(id) {
    return await axios.put(url + "subscribe/" + id, {}, { headers: await authHeader() });
}

export async function unsubscribeFromUser(id) {
    return await axios.put(url + "unsubscribe/" + id, {}, { headers: await authHeader() });
}