import { useEffect } from "react";
import { StorePurchase } from "../../components/store-purchase/StorePurchase"
import { useLocation, useNavigate } from "react-router-dom"

export const ShopPurchase = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const selectedChest = location.state; //aqui es donde se guarda rarity y price de StoreMain

    //este useEffect sive para que, si se intenta acceder a storeOpening sin pagar o recargar las cartas, no te deje y te devuelva a la pantalla de shop
    useEffect( () =>{
        if (!selectedChest) navigate('/shop')
    }, [] )
    

    const handleOpen = () => { //esta función hace que te lleve a ShopOpening
        navigate('/opening', {state: selectedChest});
    };

        return (
                <StorePurchase selectedChest={selectedChest} onOpen={handleOpen}/>
        );
};