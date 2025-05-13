import { useEffect, useState } from "react";
import { StorePurchase } from "../../components/store-purchase/StorePurchase"
import { useLocation, useNavigate} from "react-router-dom"
import { getRandomHyruleData } from "../../services/hyrule-card.service";
import './ShopPurchase.css'

export const ShopPurchase = () =>{
    const [loading, setLoading] = useState<boolean>(false)
    const location = useLocation();
    const navigate = useNavigate();
    const selectedChest = location.state; //aqui es donde se guarda rarity y price de StoreMain

    //este useEffect sive para que, si se intenta acceder a storeOpening sin pagar o recargar las cartas, no te deje y te devuelva a la pantalla de shop
    useEffect( () =>{
        if (!selectedChest) navigate('/shop')
    }, [] )

    const handleOpen = async() => { //esta función hace que te lleve a ShopOpening
        setLoading(true);
        const result = await getRandomHyruleData(3, selectedChest.rarity);
        if (result) {
            navigate('/opening', { state: result });
        }
    };

        return (
            <>
                { loading 
                ? <h1 className='loading-text'>Loading cards...</h1>
                : <StorePurchase selectedChest={selectedChest} onOpen={handleOpen}/>}
            </>
        );
};