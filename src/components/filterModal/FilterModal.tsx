import '../filterModal/filter-modal.css'
import { Filters } from '../filters/filters';
import { Dispatch, SetStateAction } from 'react';


interface FilterModalProps {
    open?: boolean;
    onClose?: () => void;
    onFilterTypesChange: (value: string) => void;
    onFilterCategoryChange: (value: string) => void;
    onSearchChange: (value: string) => void;
    setIsReversed: Dispatch<SetStateAction<boolean>>;
    onFavoritesToggle: () => void;
    isShowingFavorites: boolean;
}

export const FilterModal =  ({
open,
onClose,
onFilterTypesChange,
onFilterCategoryChange,
onSearchChange,
setIsReversed,
onFavoritesToggle,
isShowingFavorites

}: FilterModalProps ) => {
  return (
    <div className={`filter-modal-overlay ${open ? 'open' : 'closed'}`}>
      <div className="filter-modal-panel">
        <div className="close-btn__content">
            <button className='close-btn' onClick={onClose}>
            ✕
            </button>
        </div>
        <div className="filter-modal-content">
        <Filters
            onFilterTypesChange={onFilterTypesChange}
            onFilterCategoryChange={onFilterCategoryChange}
            onSearchChange={onSearchChange}
            setIsReversed={setIsReversed}
            onFavoritesToggle={onFavoritesToggle}
            isShowingFavorites={isShowingFavorites}
            isModal={true}
        />
        </div>
      </div>
    </div>
  );
}