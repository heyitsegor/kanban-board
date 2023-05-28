<script setup lang="ts">
import store from "../stores/store.ts";
import DefaultButton from "./DefaultButton.vue";

const {
  currentCard,
  showDialog,
  isDelete,
  saveCard,
  deleteCard,
  setCurrentCard,
  closeDialog,
} = store();

const updatedCardData = currentCard;

const updateAndSaveCard = () => {
  updatedCardData.value.id = currentCard.value.id;
  console.log(updatedCardData);
  setCurrentCard(updatedCardData.value);
  saveCard();
  closeDialog();
};

const updateAndDeleteCard = () => {
  setCurrentCard(updatedCardData.value);
  deleteCard();
  closeDialog();
};
</script>

<template>
  <transition name="fade">
    <div
      v-if="showDialog"
      class="dialog-background"
    >
      <div class="dialog-window">
        <div
          v-if="!isDelete"
          class="edit-card"
        >
          <div class="info-wrap">
            <p>Введите название сделки</p>
            <input
              type="text"
              v-model="updatedCardData.title"
            />
            <p>Введите имя заказчика</p>
            <input
              type="text"
              v-model="updatedCardData.contactName"
            />
            <p>Введите телефон</p>
            <input
              type="text"
              v-model="updatedCardData.contactPhone"
            />
            <p>Введите сумму сделки</p>
            <input
              type="text"
              v-model="updatedCardData.totalAmount"
            />
          </div>
          <DefaultButton
            @click="closeDialog"
            button-text="Отменить"
          />
          <DefaultButton
            @click="updateAndSaveCard"
            button-text="Применить"
          />
        </div>
        <div
          v-if="isDelete"
          class="delete-card"
        >
          <p>Удалить сделку?</p>
          <DefaultButton
            @click="closeDialog"
            button-text="Нет"
          />
          <DefaultButton
            @click="updateAndDeleteCard"
            button-text="Да"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.info-wrap > p {
  margin: 0;
}

.info-wrap {
  margin-bottom: 1rem;
}

.dialog-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
}

.dialog-window {
  padding: 10px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  z-index: 1;
  background-color: white;
  color: #242424;
  border: 2px solid gray;
  text-align: center;
}
</style>
