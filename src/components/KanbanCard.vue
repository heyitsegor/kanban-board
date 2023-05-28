<script setup lang="ts">
import { CardData } from "../types/CardData.ts";
import DefaultButton from "./DefaultButton.vue";

defineProps<{
  card: CardData;
}>();
</script>

<template>
  <div
    class="card"
    :data-id="card.id"
    :data-status="card.status"
  >
    <h2 class="title">{{ card.title }}</h2>
    <div class="info">
      <p>{{ card.contactName }}</p>
      <p>Тел.: {{ card.contactPhone }}</p>
      <p>Сумма сделки: {{ card.totalAmount }}р</p>
    </div>
    <p>Статус:</p>
    <div class="action-buttons">
      <DefaultButton
        @click="$emit('open-edit-dialog', card.id)"
        button-text="Редактировать"
      />
      <DefaultButton
        @click="$emit('open-delete-dialog', card.id)"
        button-text="Удалить"
      />
    </div>
  </div>
</template>

<style scoped>
.card {
  margin: 1rem;
  margin-top: 2rem;
  padding: 10px;
  border: 2px solid;
}

.card[data-status="in-progress"] {
  border-color: green;
}

.card[data-status="cancelled"] {
  border-color: red;
}

.card[data-status="completed"] {
  border-color: blue;
}

.title {
  margin-top: 0;
  text-align: center;
}

.info > p {
  margin: 0;
  line-height: 1em;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
