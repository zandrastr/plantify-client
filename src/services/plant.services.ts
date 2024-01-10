import axios from 'axios';

const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const UNSPLASH_BASE_URL = import.meta.env.VITE_UNSPLASH_BASE_URL;

//******************** Get plant image ********************
export const getPlantImage = async (plantName:string):Promise<string> => {
    const { data } = await axios.get(`${UNSPLASH_BASE_URL}/search/photos?query=${plantName}+plant&per_page=1&client_id=${UNSPLASH_API_KEY}`);
    const result = data.results[0].urls.regular;
    return result;
};
