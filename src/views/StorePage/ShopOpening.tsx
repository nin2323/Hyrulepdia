import { StoreOpening } from "../../components/store-opening/StoreOpening"
import { useLocation } from "react-router-dom"

export const ShopOpening = () => {
    const location = useLocation();
    const chest : 'common' | 'rare' | 'epic' = location.state.rarity; 

    return (
        <>
            <StoreOpening rarity={chest}/>
        </>
    )
}
