import { reactive, toRefs } from "vue";
import { CardData } from "../types/cardData.ts";

const state = reactive<{
  cards: CardData[];
  currentCard: CardData;
  showDialog: Boolean;
  isDelete: Boolean;
}>({
  cards: [],
  currentCard: {
    id: undefined,
    title: "",
    contactName: "",
    contactPhone: "",
    totalAmount: "",
    status: "",
  },
  showDialog: false,
  isDelete: false,
});

function saveCard() {
  // const index = state.cards.findIndex(
  //   (card) => card.id === state.currentCard.id
  // );
  // if (index !== -1) {
  //   state.cards[index] = state.currentCard;
  // } else {
  state.cards.push(state.currentCard);
  console.log("saveCard");
  console.log(state.currentCard);
  // }
}
function deleteCard() {
  state.cards = state.cards.filter((card) => card.id !== state.currentCard.id);
  console.log("deleteCard");
  console.log(state.currentCard);
}
function setCurrentCard(card: CardData) {
  state.currentCard = card;
  console.log("setCurrentCard");
  console.log(state.currentCard);
}
function openEditDialog() {
  state.showDialog = true;
  state.isDelete = false;
  console.log("openEditDialog");
  console.log(state.currentCard);
}
function openDeleteDialog() {
  state.showDialog = true;
  state.isDelete = true;
  console.log("openDeleteDialog");
  console.log(state.currentCard);
}
function closeDialog() {
  state.currentCard = {
    id: -1,
    title: "",
    contactName: "",
    contactPhone: "",
    totalAmount: "",
    status: "",
  };
  state.showDialog = false;
  state.isDelete = false;
  console.log("closeDialog");
  console.log(state.currentCard);
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
  };
}
