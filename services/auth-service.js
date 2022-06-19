import axios from "axios";
import { API_URL } from "./api-url";
import { AsyncStorage } from 'react-native';

let url = API_URL + "/auth/";

export async function login(email, password) {
    const {data} = await axios.post(url + "login", {
        email,
        password,
    });
    console.log(data)
    if(data) await AsyncStorage.setItem("user", JSON.stringify(data));
    return data;
}

// export async function login(email, password) {
//     return await axios.post(url + "login", {
//         email,
//         password,
//     });
// }

export const getCurrentUser = async () => {
    const userStr = await AsyncStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
};

export const logout = async () => {
    await AsyncStorage.removeItem("user");
};
