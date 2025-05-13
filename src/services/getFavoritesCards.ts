import { HyruleCardType } from "../types/hyrule.types";
import { getPointsByRarity } from "./getAllCards";

type RarityType = "common" | "rare" | "epic";

export const getFavoriteCards = async (
  favoriteData: { id: number; rarity: RarityType }[]
): Promise<HyruleCardType[]> => {
  const url = "https://botw-compendium.herokuapp.com/api/v3/compendium/all";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    const allData = json.data;

    const favoriteCards = allData
      .filter((item: any) =>
        favoriteData.some((fav) => fav.id === item.id)
      )
      .map((item: any) => {
        const favorite = favoriteData.find((fav) => fav.id === item.id);
        const rarity: RarityType = favorite?.rarity ?? "common"; // ahora tipado correctamente

        const fullDescription = item.description;
        const trimmedDescription =
          item.description.length > 130
            ? item.description.slice(0, 120) + "..."
            : item.description;

        return {
          id: item.id,
          name: item.name,
          image: item.image,
          fullDescription: fullDescription,
          description: trimmedDescription,
          location: item.common_locations?.join(", ") || "Unknown",
          items: item.drops?.join(", ") || "None",
          category: item.category,
          rarity,
          points: getPointsByRarity(rarity),
        };
      });

    return favoriteCards;
  } catch (error: any) {
    throw new Error("Oops! Something went wrong while fetching favorite cards");
  }
};
