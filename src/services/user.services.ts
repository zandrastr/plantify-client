import axios from "axios";

const SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;

//***************** Add plant to user favorites ****************
export const addPlant = async (userId: string, plantId:string):Promise<{message: string}> => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const requestBody = {
        userId,  
        plantId,
    };
    
    const { data } = await axios.put(`${SERVER_API_URL}/users/favorites/add`, requestBody, options);
    return data;
};

//***************** Remove plant from user favorites ****************
export const removePlant = async (userId: string, plantId:string):Promise<{message: string}> => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const requestBody = {
        userId,  
        plantId,
    };

    const { data } = await axios.put(`${SERVER_API_URL}/users/favorites/remove`, requestBody, options);
    return data;
};
