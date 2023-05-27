<script setup lang="ts">
defineProps<{ buttonText: string }>();
</script>

<template>
  <button>{{ buttonText }}</button>
</template>

<style scoped>
button {
  width: 125px;
  height: 50px;
  border: 2px solid gray;
  text-align: center;
  cursor: pointer;
}
</style>
