<script setup lang="ts">
import { ref } from "vue";
import store from "../stores/store.ts";
import KanbanColumn from "./KanbanColumn.vue";
import KanbanCard from "./KanbanCard.vue";
import DialogWindow from "./DialogWindow.vue";

const { cards, setCurrentCard, openEditDialog, openDeleteDialog } = store();

const KanbanColumns = ref([
  {
    statusType: "in-progress",
    title: "В обработке",
    cards: cards,
  },
  {
    statusType: "cancelled",
    title: "Отменена",
    cards: [
      {
        id: 1,
        title: "FooBar2",
        contactName: "Ivan Ivanov",
        contactPhone: "222-222",
        totalAmount: "123",
        status: "cancelled",
      },
    ],
  },
  {
    statusType: "completed",
    title: "Выполнена",
    cards: [
      {
        id: 3,
        title: "FooBar3",
        contactName: "No Name",
        contactPhone: "123-321",
        totalAmount: "555",
        status: "completed",
      },
    ],
  },
]);

// KanbanColumns.value.forEach((column) => {
//   column.cards = cards.filter((card) => card.status === column.statusType);
// });

const createNewCard = () => {
  setCurrentCard({
    id: cards.value.length,
    title: "",
    contactName: "",
    contactPhone: "",
    totalAmount: "",
    status: "",
  });
  openEditDialog();
};

const editDialog = (cardId: Number) => {
  setCurrentCard(cards.value.filter((card) => card.id === cardId)[0]);
  openEditDialog();
};

const deleteDialog = (cardId: Number) => {
  setCurrentCard(cards.value.filter((card) => card.id === cardId)[0]);
  openDeleteDialog();
};
</script>

<template>
  <div class="board">
    <KanbanColumn
      v-for="(KanbanColumn, index) in KanbanColumns"
      :title="KanbanColumn.title"
    >
      <template
        v-if="index === 0"
        #create-new-button
      >
        <button @click="createNewCard">
          <img
            src="../assets/newItemIcon.svg"
            alt="plus button"
          />
        </button>
      </template>
      <template #card>
        <ul>
          <KanbanCard
            @open-edit-dialog="editDialog"
            @open-delete-dialog="deleteDialog"
            v-for="card in KanbanColumn.cards"
            :key="card.id"
            :card="card"
          />
        </ul>
      </template>
    </KanbanColumn>
    <DialogWindow />
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 100vh;
}

ul {
  padding: 0;
  margin: 0;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 0;
}

button img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
</style>
