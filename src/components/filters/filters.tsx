import { Button } from "../button/button";
import { DropDownButton } from "../button/DropDownButton";
import { SearchBar } from "../searchBar/SearchBar";
import './filters.css';
import menuIcon from '../../assets/icons/menu-icon.svg';

export type Rareza = "common" | "rare" | "epic";
export type Category = "creatures" | "equipment" | "materials" | "monsters" | "treasure" | "";

export interface FiltersProps {
  onFilterTypesChange?: (rarity: string) => void;
  onFilterCategoryChange?: (category: string) => void;
  onSearchChange: (query: string) => void; 
  setIsReversed: React.Dispatch<React.SetStateAction<boolean>>;
  onFavoritesToggle: () => void;
  isShowingFavorites: boolean;
  onOpenFiltersModal?: () => void;
  isModal?: boolean;
}

export const Filters = ({ onFilterTypesChange, onFilterCategoryChange, onSearchChange, setIsReversed, onFavoritesToggle, isShowingFavorites, onOpenFiltersModal, isModal }: FiltersProps) => {
  const types = ['common', 'rare', 'epic' ];
  const categories = ['creatures', 'equipment', 'materials', 'monsters', 'treasure'];


  return (
    <>
      <div className="filters">
        {!isModal && (
          <Button onClick={onOpenFiltersModal} className="filters-btn__modal" size="sm" color="outlined">
            <img src={menuIcon} alt="boton de filtros" />
          </Button>
        )}
        {!isModal && <SearchBar onSearch={onSearchChange} />}
        <div className={isModal ? "filter-modal-buttons" : "filters-buttons"}>
          <Button color="outlined" onClick={() => setIsReversed(prev => !prev)}>Card Nº</Button>
          <Button color="outlined" onClick={onFavoritesToggle}>
            {isShowingFavorites ? "View All" : "Favorites"}
          </Button>
          <DropDownButton 
            options={types}
            onSelect={onFilterTypesChange}
            isModal={isModal}
            >
              Types
          </DropDownButton>
          <DropDownButton  
            options={categories}
            onSelect={onFilterCategoryChange}>
              Categories
            </DropDownButton>
        </div>
      </div>
    </>
  );
};