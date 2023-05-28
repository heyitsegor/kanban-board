<script setup lang="ts">
import KanbanColumn from "./KanbanColumn.vue";
import DialogWindow from "./DialogWindow.vue";

const columns = [
  { title: "В обработке", cardStatus: "in-progress" },
  { title: "Отменена", cardStatus: "cancelled" },
  { title: "Выполнена", cardStatus: "completed" },
];
</script>

<template>
  <div class="board">
    <KanbanColumn
      v-for="column in columns"
      :class="column.cardStatus"
      :title="column.title"
      :cardStatus="column.cardStatus"
    >
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
</style>
