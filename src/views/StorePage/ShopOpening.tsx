import { StoreOpening } from "../../components/store-opening/StoreOpening"
import { useLocation } from "react-router-dom"

export const ShopOpening = () => {
    const location = useLocation();

    return (
        <>
            <StoreOpening cards={location.state}/>
        </>
    )
}
