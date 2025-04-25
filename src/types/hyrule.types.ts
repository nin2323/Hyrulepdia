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