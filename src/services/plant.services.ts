import axios from 'axios';
import { IPlantModel } from '../models/plant.model';
import { formatLatinNameDb, formatLatinNameDisplay } from '../utils/app.utils';

const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const UNSPLASH_BASE_URL = import.meta.env.VITE_UNSPLASH_BASE_URL;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_BASE_URL = import.meta.env.VITE_OPENAI_BASE_URL;
const SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;

//******************** Get one plant from DB ********************
export const getPlant = async (latinName :string):Promise<IPlantModel> => {
    const plantLatinName =  formatLatinNameDb(latinName);
    const { data } = await axios.get(`${SERVER_API_URL}/plants/${plantLatinName}`);
    const foundPlant = {...data, latinName: formatLatinNameDisplay(data.latinName)}
    return foundPlant;
};

//******************** Get plant image ********************
export const getPlantImage = async (plantName:string):Promise<string> => {
    const { data } = await axios.get(`${UNSPLASH_BASE_URL}/search/photos?query=${plantName}+plant&per_page=1&client_id=${UNSPLASH_API_KEY}`);
    const result = data.results[0].urls.regular;
    return result;
};

//***************** Get plant information from ChatGPT ****************
export const getPlantInfo = async (plantName:string):Promise<IPlantModel> => {

    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
    };

    const queryData = {
        'model': 'gpt-3.5-turbo',
        'messages': [
            {'role': 'system', 'content': 'You are a helpful assistant designed to output real plant information in JSON. Follow these instructions in all your responses: 1. Only state real plants. 2. Do not state fictional plants. 3. If it is not a real plant, state plantUndefined for the properties latinName, description, sunNeeds, waterNeeds. 4. Do not state the plant name in sunNeeds or waterNeeds.'},
            {'role': 'user', 'content': `Create a JSON object with the following structure about a plant called ${plantName}:
            In property 'name': State the plants common name.
            In property 'latinName': State the plants latin name.
            In property 'description' State facts about the plant in 3 sentences. Do not state anything in feet, instead use centimetre or metre.
            In property 'sunNeeds': State the sun needs in a few words in maximum one sentence. Do not state the plant name in the sentence. 
            In property 'waterNeeds': State the water needs in a few words in maximum one sentence. Do not state the plant name in the sentence. Do not state anything in inch, instead use centimetre.
            ` }
        ],
        'max_tokens': 200,
    };

    const { data } = await axios.post(`${OPENAI_BASE_URL}/chat/completions`, queryData, options);
    const result = JSON.parse(data.choices[0].message.content);
    return result;
};

//***************** Save plant in DB ****************
export const savePlant = async (userId:string, plant:IPlantModel):Promise<{message: string, createdPlant: IPlantModel}> => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const requestBody = {
       _id: userId,  
        ...plant, 
        latinName: formatLatinNameDb(plant.latinName),
    };

    const { data } = await axios.post(`${SERVER_API_URL}/plants/save`, requestBody, options);
    const createdPlant = {...data.createdPlant, latinName: formatLatinNameDisplay(data.createdPlant.latinName)}
    return {message: data.message, createdPlant};
};

//***************** Save plant in DB - On share ****************
export const savePlantOnShare = async (plant:IPlantModel):Promise<{message: string, plant: IPlantModel}> => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const requestBody = {...plant, latinName: formatLatinNameDb(plant.latinName)};

    const { data } = await axios.post(`${SERVER_API_URL}/plants/share/save`, requestBody, options);
    return data;
};
