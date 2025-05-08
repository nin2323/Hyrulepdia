import { useNavigate } from "react-router-dom"
import { Button } from "../../components/button/button";
import { Filters } from "../../components/filters/filters";

export const DecksPage = () => {
const navigate = useNavigate();

    return (
        <>
        <Filters
            onFilterTypesChange={() => {}}
            onFilterCategoryChange={() => {}}
            onSearchChange={() => {}}
            setIsReversed={() => {}}
        />
        <div className="collection-page__buttons">
            <Button size="lg" onClick={() => navigate("/collection")}>My Cards</Button>
            <Button size="lg" onClick={() => navigate("/collection/decks")}>Decks</Button>
            <Button size="lg" onClick={() => navigate("/collection/library")}>Library</Button>
        </div>
        </>
    )
}