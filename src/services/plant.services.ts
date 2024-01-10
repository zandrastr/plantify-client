import axios from 'axios';
import { IPlantModel } from '../models/plant.model';

const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

//******************** Get plant image ********************
export const getPlantImage = async (plantName:string):Promise<string> => {
    const { data } = await axios.get(`https://api.unsplash.com/search/photos?query=${plantName}+plant&per_page=1&client_id=${UNSPLASH_API_KEY}`);
    const result = data.results[0].urls.regular;
    return result;
};

//***************** Get plant information ****************
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

    const { data } = await axios.post('https://api.openai.com/v1/chat/completions', queryData, options);
    const result = JSON.parse(data.choices[0].message.content);
    return result;
};
