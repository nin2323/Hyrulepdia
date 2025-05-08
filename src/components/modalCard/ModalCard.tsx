import React from "react";
import { HyruleCardType } from "../../types/hyrule.types";
import { HyruleCard } from "../hyrule-card/HyruleCard";
import { Button } from "../button/button";
import { CardContainer } from "../CardContainer/CardContainer";

interface ModalCardProps {
  selectedCard: HyruleCardType;
  onClose: () => void;
  onAddToFavorites: (cardId: number) => void;
}

export const ModalCard: React.FC<ModalCardProps> = ({
  selectedCard,
  onClose,
  
}) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
        <CardContainer className="card-container-modal" onClick={(e) => e.stopPropagation()}>
          <HyruleCard {...selectedCard} variant="default" />
          <p className="modal-description">{selectedCard.description}</p>
          <Button>
            Add favorites
          </Button>
          <Button>
            Add Deck
          </Button>
        </CardContainer>
      </div>
  );
};