import axios from "axios";

const SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;

//***************** Post user signup data ****************
export const signup = async (requestBody: object):Promise<{email: string}> => {

    const options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const { data } = await axios.post(`${SERVER_API_URL}/signup`, requestBody, options);
    return data;
}
