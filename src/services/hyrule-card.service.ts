import { HyruleCardType, HyruleDataType } from "../types/hyrule.types"


const getAllHyruleData = async() : Promise<HyruleDataType[] | undefined> => {
    const url = 'https://botw-compendium.herokuapp.com/api/v3/compendium/all';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return response.data
    } catch (error: any) {
        throw new Error('Oops! Something went wrong while fetching data from the Hyrule Compendium');
    }
};

export const getRandomHyruleData = async( num : number = 3 ) : Promise< HyruleDataType[] | undefined> => {
    const allData = await getAllHyruleData();
    if (!allData) return;

    // Mezclamos los datos con el algoritmo de Fisher-Yates
    const shuffled = [...allData].sort(() => 0.5 - Math.random());

     // Seleccionamos los primeros `num` elementos
    const selected = shuffled.slice(0, num);

    return selected;
} 