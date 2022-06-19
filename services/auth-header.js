import { AsyncStorage } from 'react-native';

export default async function authHeader() {
    const userStr = await AsyncStorage.getItem("user");
    let user = null;
    if (userStr) user = JSON.parse(userStr);

    if (user && user.token) {
        return { Authorization: "Bearer " + user.token };
    } else {
        return {};
    }
}
