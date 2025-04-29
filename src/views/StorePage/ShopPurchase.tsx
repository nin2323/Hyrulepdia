import { StorePurchase } from "../../components/store-purchase/StorePurchase"
import { useLocation, useNavigate } from "react-router-dom"

export const ShopPurchase = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const selectedChest = location.state; //aqui es donde se guarda rarity y price de StoreMain

    if (!selectedChest) return <p>No chest selected</p>

    const handleOpen = () => { //esta función hace que te lleve a ShopOpening
        navigate('/opening', {state: selectedChest});
    };

        return (
                <StorePurchase selectedChest={selectedChest} onOpen={handleOpen}/>
        );
};