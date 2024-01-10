import axios from 'axios';

const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

//******************** Get plant image ********************
export const getPlantImage = async (plantName:string):Promise<string> => {
    const { data } = await axios.get(`https://api.unsplash.com/search/photos?query=${plantName}+plant&per_page=1&client_id=${UNSPLASH_API_KEY}`);
    const result = data.results[0].urls.regular;
    return result;
};
