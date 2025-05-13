export interface HyruleCardType {
    id: number;
    name: string;
    points: number;
    rarity: 'common' | 'rare' | 'epic';
    image: string;
    description: string;
    location: string;
    items: string;
    category: 'creatures' | 'materials' | 'equipment' | 'monsters' | 'treasure';
}

export interface HyruleDataType {
    category: string;
    common_locations: string[] | null;
    description: string;
    dlc: boolean;
    drops: string[] | null;
    id: number;
    image: string;
    name: string;
}

export interface ChestButtonType {
    rarity: 'common' | 'rare' | 'epic';
    price: number;
}
