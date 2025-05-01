import { FC } from "react";

export type Rareza = "common" | "rare" | "epic";
export type Category = "creatures" | "equipment" | "materials" | "monsters" | "treasure" | "";

export interface HyruleCardTypeFilters {
    id: string;
    name: string;
    rarity: "common" | "rare" | "epic";
    category: Category;
}

export type Props = {
    onFilterRarityChange: (rareza: Rareza) => void;
    onFilterCategoriaChange: (categoria: Category | "") => void;
};

export const ClaseList: FC<Props> = ({ onFilterRarityChange, onFilterCategoriaChange }) => {
  return (
    <>
    <div className="">
      <label className="">Filtrar por rareza:</label>
      <select
        onChange={(e) => onFilterRarityChange(e.target.value as Rareza)} 
        className="">
        <option value="">Todas</option>
        <option value="common">Común</option>
        <option value="rare">Rara</option>
        <option value="epic">Épica</option>
      </select>
    </div>
    <div>
        <label className="mr-2 font-medium">Filtrar por categoría:</label>
        <select
          onChange={(e) => onFilterCategoriaChange(e.target.value as Category)}
          className="border px-3 py-1 rounded">
          <option value="">Todas</option>
          <option value="creatures">Creatures</option>
          <option value="equipment">Equipment</option>
          <option value="materials">Materials</option>
          <option value="monsters">Monsters</option>
          <option value="treasure">Treasure</option>
        </select>
    </div>
    </>
  );
};