import axios from "axios";

export const getData = async (url: string, username: string) => {
    try {
        let response = await axios.get(`${url}?q=${username}`);
        return response.data
    } catch (err) {
        console.log('[GITHUB APP]: No users found with that username');
        // When no user is found, nothing should be showing on the users list
        return {}
    }
}