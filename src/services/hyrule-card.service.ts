import { HyruleDataType, HyruleCardType } from "../types/hyrule.types"

//Esta función se usa para que se le asigne un tipo de rareza a cada carta
const getRandomRarity = () : 'common' | 'rare' | 'epic' => {
    const rand = Math.random();
    if(rand < 0.05) return 'epic'; //5%
    if (rand < 0.30) return 'rare'; //25%
    return 'common'; //70%
}

//Esta función asigna puntos según la rareza
const getPointsByRarity = (rarity: 'common' | 'rare' | 'epic') : number => {
    switch (rarity) {
        case 'epic': return 100;
        case 'rare': return 50;
        case 'common': return 20;
    }
}

//Esta función recoge todos los datos de la api ya que no tiene nada que devuelva un objeto de datos aleatorios
const getAllHyruleData = async() : Promise<HyruleDataType[] | undefined> => {
    const url = 'https://botw-compendium.herokuapp.com/api/v3/compendium/all';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        // parsear el response como JSON para acceder a los datos
        const json = await response.json(); //te da el objeto entero, la clave data contiene el arrat que se necesita
        return json.data as HyruleDataType[];
    } catch (error: any) {
        throw new error('Oops! Something went wrong while fetching data from the Hyrule Compendium');
    }
};

//Esta función baraja los objetos que devuelve la api y devuelve 3 aleatorios
export const getRandomHyruleData = async( num : number = 3 ) : Promise< HyruleCardType[] | undefined> => {
    const allData = await getAllHyruleData();
    if (!allData) return;

    // Mezclamos los datos con el algoritmo de Fisher-Yates
    const shuffled = [...allData].sort(() => 0.5 - Math.random());

     // Seleccionamos los primeros `num` elementos
    const selected: HyruleCardType[] =  shuffled.slice(0, num).map((item) => { //el map se usa para transformar cada elemento del array original en un nuvo objeto con una forma diferente: HyruleCardType.
        const rarity = getRandomRarity();

        return {
            id: item.id,
            name: item.name,
            image: item.image,
            description: item.description,
            location: item.common_locations?.join(', ') || "Unknown",
            items: item.drops?.join(', ') || "None",
            category: item.category as HyruleCardType['category'],
            rarity,
            points: getPointsByRarity(rarity),
        };
    });

    return selected;
};

//llamar al componente y le asigno una rareza según el cofre que haya abierto
//useeffect, con el array de 3 Datas y con aleatprio le añado la rareza. 