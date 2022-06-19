import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./api-url";

let url = API_URL + "/event/";

export async function getAllEvents() {
    return await axios.get(url);
}

export async function createEvent(event) {
    return await axios.post(url, event, { headers: await authHeader() });
}

export async function getEventById(id) {
    return await axios.get(url + id);
}

export async function getEventsByCategory(category) {
    return await axios.get(url + "category/" + category);
}

export async function getEventsByNameOrDescription(input) {
    return await axios.get(url + "name/" + category);
}

export async function deleteEventById(id) {
    return await axios.delete(url + id, { headers: await authHeader() });
}

export async function updateEvent(id, event) {
    return await axios.patch(url + id, event, { headers: await authHeader() });
}

export async function attendEventById(id) {
    return await axios.put(url + "attend/" + id, {}, { headers: await authHeader() });
}

export async function unattendEventById(id) {
    return await axios.put(url + "unattend/" + id, {}, { headers: authHeader() });
}