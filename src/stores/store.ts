import { reactive, toRefs } from "vue";
import { v1 as uuidv1 } from "uuid";
import { CardData } from "../types/CardData.ts";

const state = reactive<{
  cards: CardData[];
  currentCard: CardData;
  showDialog: Boolean;
  isDelete: Boolean;
}>({
  cards: [
    {
      id: uuidv1(),
      title: "FooBar",
      contactName: "John Doe",
      contactPhone: "555-555",
      totalAmount: "1000",
      status: "in-progress",
    },
    {
      id: uuidv1(),
      title: "FooBar2",
      contactName: "Ivan Ivanov",
      contactPhone: "555-555",
      totalAmount: "1000",
      status: "cancelled",
    },
    {
      id: uuidv1(),
      title: "FooBar3",
      contactName: "No Name",
      contactPhone: "123-321",
      totalAmount: "555",
      status: "completed",
    },
  ],
  currentCard: {
    id: 0,
    title: "",
    contactName: "",
    contactPhone: "",
    totalAmount: "",
    status: "",
  },
  showDialog: false,
  isDelete: false,
});

const fetchCards = () => {
  const savedCards = JSON.parse(localStorage.getItem("cards"));
  if (savedCards) {
    state.cards = savedCards;
  }
};

const setCardsLocalStorage = () => {
  localStorage.setItem("cards", JSON.stringify(state.cards));
};

function saveCard() {
  const index = state.cards.findIndex(
    (card) => card.id === state.currentCard.id
  );
  if (index !== -1) {
    state.cards[index] = state.currentCard;
  } else {
    state.cards.push(state.currentCard);
  }
}
function deleteCard() {
  state.cards = state.cards.filter((card) => card.id !== state.currentCard.id);
}
function setCurrentCard(card: CardData) {
  state.currentCard = card;
}
function openEditDialog() {
  state.showDialog = true;
  state.isDelete = false;
}
function openDeleteDialog() {
  state.showDialog = true;
  state.isDelete = true;
}
function closeDialog() {
  state.currentCard = {
    id: 0,
    title: "",
    contactName: "",
    contactPhone: "",
    totalAmount: "",
    status: "",
  };
  state.showDialog = false;
  state.isDelete = false;
}

export default function store() {
  return {
    ...toRefs(state),
    saveCard,
    deleteCard,
    setCurrentCard,
    openEditDialog,
    openDeleteDialog,
    closeDialog,
    fetchCards,
    setCardsLocalStorage,
  };
}
