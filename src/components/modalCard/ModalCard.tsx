import { useState, useEffect, FC } from "react";
import { HyruleCardType } from "../../types/hyrule.types";
import { HyruleCard } from "../hyrule-card/HyruleCard";
import { Button } from "../button/button";
import { CardContainer } from "../CardContainer/CardContainer";
import { useAuth } from "../../context/authContext";
import { useAddFavorites } from "../../hooks/useAddFavorites";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig/firebaseConfig"; // Importa tu configuración de Firebase

interface ModalCardProps {
  selectedCard: HyruleCardType;
  onClose: () => void;
}

export const ModalCard: FC<ModalCardProps> = ({
  selectedCard,
  onClose,
}) => {
  const [showZoomedCard, setShowZoomedCard] = useState(false);

  const { toggleFavorite } = useAddFavorites(); // Llamamos al hook
  const [isFavorite, setIsFavorite] = useState(false);

  const { user } = useAuth();

  // Verificar si la carta está en favoritos al abrir el modal
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user) {
        // Aquí consultamos Firestore para ver si el id de la carta está en los favoritos del usuario
        const userDocRef = doc(db, "users", user.uid); // Referencia al documento del usuario
        const userDocSnap = await getDoc(userDocRef); // Obtener los datos del documento

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const favorites: number[] = userData?.favorites || []; // Suponiendo que el campo favorites es un array de ids

          setIsFavorite(favorites.includes(selectedCard.id)); // Comprobamos si el id de la carta está en los favoritos
        }
      }
    };
    checkFavoriteStatus();
  }, [user, selectedCard]);

  // Función para manejar el clic en el botón de favoritos
  const handleToggleFavorite = async () => {
    if (!user) {
      alert("Debes estar logueado para añadir favoritos");
      return;
    }

    // Agregar o quitar de favoritos según el estado
    await toggleFavorite(selectedCard); // Llamada al hook para agregar o eliminar de favoritos

    // Cambiar el estado local de 'isFavorite'
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <CardContainer className="card-container-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-content__card" onClick={() => setShowZoomedCard(true)}>
            <HyruleCard {...selectedCard} variant="default" size="lg" />
          </div>
          <div className="modal-content__text-btn">
            <h1>{selectedCard.name}</h1>
            <p className="modal-description">{selectedCard.fullDescription}</p>
            <div className="modal-description">
              <h2>Common Location</h2>
              {selectedCard.location}
            </div>
            <div className="modal-description">
              <h2>Droppable Items</h2>
              {selectedCard.items}
            </div>
            <div className="modal-content__btn">
              <Button onClick={handleToggleFavorite}>
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
              </Button>
              <Button>Add Deck</Button>
            </div>
          </div>
        </div>
      </CardContainer>

      {showZoomedCard && (
        <div
          className="zoomed-card-overlay"
          onClick={(e) => {
            e.stopPropagation();
            setShowZoomedCard(false);
          }}
        >
          <div className="zoomed-card-content" onClick={(e) => e.stopPropagation()}>
            <HyruleCard {...selectedCard} variant="default" size="xl" />
          </div>
        </div>
      )}
    </div>
  );
};
