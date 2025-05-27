import { useNavigate } from "react-router-dom"
import { Button } from "../../components/button/button";
import { Filters } from "../../components/filters/filters";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebaseConfig";
import { DeckEditorPage } from "./DeckEditorPage";
import deckButton from "../../assets/backgrounds/deck-button.png"
import './DecksPage.css'

export const DecksPage = () => {
const navigate = useNavigate(); //use navigate para redirigir
const { user } = useAuth();
const [decks, setDecks] = useState<any[]>([]); //almacenamos los mazos del usuario
const [isCreating, setIsCreating] = useState(false); //controla si se muestra el editor

useEffect(() => {
    const fetchDecks = async () => {
        if (!user) return;
        const userRef = doc(db, 'users', user.uid);
        const decksRef = collection(userRef, 'decks');
        const snapshot = await getDocs(decksRef);
        const data = snapshot.docs.map(doc => ({id: doc.id, ...doc.data}));
        setDecks(data); //cargamos los mazos en el estado
    };
    fetchDecks();
}, [user, isCreating]) //recargamos al crear nuevo mazo

    return (
        <>
        <Filters
            onFilterTypesChange={() => {}}
            onFilterCategoryChange={() => {}}
            onSearchChange={() => {}}
            setIsReversed={() => {}}
            onFavoritesToggle={() => {}}
            isShowingFavorites
        />
        <div className="collection-page">
            <div className="collection-page__buttons">
                <Button size="lg" onClick={() => navigate("/collection")}>My Cards</Button>
                <Button size="lg" onClick={() => navigate("/collection/decks")}>Decks</Button>
                <Button size="lg" onClick={() => navigate("/collection/library")}>Library</Button>
            </div>
            <div className="collection-page__decks">
                <button className="deck-button" onClick={() => setIsCreating(true)}>
                    <img src={deckButton} alt='deck button'  />;
                </button>
                {decks.map(deck => (
                    <div key={deck.id} className="deck-preview">
                        <div className="deck-image">
                            {deck.cards && deck.cards[0] && (
                                <img
                                    src={deck.cards[0].image || "https://via.placeholder.com/150"}
                                    alt="Deck Cover"
                                />
                            )}
                        </div>
                        <div className="deck-name">{deck.name}</div>
                    </div>
                ))}
            </div>
            {isCreating && <DeckEditorPage onClose={() => setIsCreating(false)} />}
        </div>
        </>
    )
}