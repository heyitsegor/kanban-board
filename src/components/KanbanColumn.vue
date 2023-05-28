<script setup lang="ts">
import { watch } from "vue";
import { v1 as uuidv1 } from "uuid";
import store from "../stores/store.ts";
import KanbanCard from "./KanbanCard.vue";

const props = defineProps<{
  title: string;
  cardStatus: string;
}>();

const {
  cards,
  setCurrentCard,
  openEditDialog,
  openDeleteDialog,
  fetchCards,
  setCardsLocalStorage,
} = store();

fetchCards();

watch(cards, () => setCardsLocalStorage(), { deep: true });

const editCard = (cardId: number) => {
  const card = cards.value.find((card) => card.id === cardId);
  if (card) {
    setCurrentCard(card);
  } else {
    setCurrentCard({
      id: uuidv1(),
      title: "",
      contactName: "",
      contactPhone: "",
      totalAmount: "",
      status: props.cardStatus,
    });
  }
  openEditDialog();
};

const deleteCard = (cardId: number) => {
  const card = cards.value.find((card) => card.id === cardId);
  if (card) {
    setCurrentCard(card);
    openDeleteDialog();
  }
};
</script>

<template>
  <div class="column">
    <h1>
      {{ title }}
    </h1>
    <div class="body">
      <div class="button-wrapper">
        <button
          v-show="cardStatus === 'in-progress'"
          @click="editCard(0)"
        >
          <img
            src="../assets/newItemIcon.svg"
            alt="plus button"
          />
        </button>
      </div>
      <ul>
        <KanbanCard
          @open-edit-dialog="editCard"
          @open-delete-dialog="deleteCard"
          v-for="card in cards"
          :isRendered="card.status === cardStatus"
          :card="card"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.column {
  border: 2px solid gray;
}

.button-wrapper {
  position: relative;
  height: 50px;
}

button {
  position: absolute;
  right: 0;
  margin-top: 5px;
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

button img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}

ul {
  padding: 0;
  margin: 0;
}

h1 {
  margin: 0;
  padding: 1em;
  border-bottom: 2px solid gray;
  text-align: center;
}
</style>
