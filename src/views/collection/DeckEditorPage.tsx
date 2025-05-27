// src/views/collection/DeckEditorPage.tsx
import { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../firebaseConfig/firebaseConfig";
import { collection, addDoc, doc } from "firebase/firestore";
import { useAuth } from "../../context/authContext";
import { HyruleCard } from "../../components/hyrule-card/HyruleCard";
import { useUnlockedCards } from "../../hooks/useUnlockedCards";
import './DeckEditorPage.css'


export const DeckEditorPage = ({ onClose }: { onClose: () => void }) => {
  const [deckName, setDeckName] = useState(""); // Nombre del mazo
  const [selectedSlots, setSelectedSlots] = useState<(string | null)[]>(Array(6).fill(null)); // 6 espacios para cartas
  const [activeSlot, setActiveSlot] = useState<number | null>(null); // Slot activo que el usuario quiere llenar
  const { user } = useAuth(); // Usuario autenticado
  const { cards: userCards } = useUnlockedCards(); // Cartas desbloqueadas del usuario

  // Añadir una carta al slot activo
  const handleSelectCard = (cardId: string) => {
    if (!activeSlot && activeSlot !== 0) return;
    if (selectedSlots.includes(cardId)) {
      toast.error("Esta carta ya está en el mazo");
      return;
    }
    const newSlots = [...selectedSlots];
    newSlots[activeSlot] = cardId;
    setSelectedSlots(newSlots);
    setActiveSlot(null);
  };

  // Crear el mazo en Firebase
  const handleCreateDeck = async () => {
    if (!deckName.trim()) {
      toast.error("Debes escribir un nombre para el mazo");
      return;
    }
    if (!user) return;

    const deck = {
      name: deckName,
      cards: selectedSlots.filter(Boolean),
      createdAt: Date.now(),
    };

    try {
      const userRef = doc(db, 'users', user.uid);
      const decksRef = collection(userRef, 'decks');
      await addDoc(decksRef, deck);
      toast.success("Mazo creado");
      onClose(); // Cierra el formulario/modal
    } catch (err) {
      toast.error("Error al guardar el mazo");
    }
  };

  return (
    <div className="deck-editor-modal">
      <div className="deck-editor-form">
        <input
          className="deck-name-input"
          type="text"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          placeholder="Nombre del mazo"
        />

        {/* Grid de 6 botones para slots de cartas */}
        <div className="card-slot-grid">
          {selectedSlots.map((cardId, index) => (
            <button
              key={index}
              className={`card-slot-button ${activeSlot === index ? "active" : ""}`}
              onClick={() => setActiveSlot(index)}
            >
              {cardId ? (
                <HyruleCard
                {...(userCards.find(c => c.id === cardId)!)}
                size="sm"
                disableClick
                isDiscovered
              />
            ) : (
              <span className="empty-slot">+</span>
              )}
            </button>
          ))}
        </div>

        {/* Selector de cartas desbloqueadas */}
        {activeSlot !== null && (
          <div className="card-selection">
            <h4>Select a card for the slot {activeSlot + 1}</h4>
            <div className="user-card-grid">
              {userCards.map(card => (
                <div
                  key={card.id}
                  className="user-card card--sm"
                  onClick={() => handleSelectCard(card.id)}
                >
                  <HyruleCard {...card} disableClick isDiscovered={true}/>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botón para crear el mazo */}
        <button className="create-deck-button" onClick={handleCreateDeck}>
          Crear mazo
        </button>
      </div>
    </div>
  );
};
