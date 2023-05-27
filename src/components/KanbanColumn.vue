<script setup lang="ts">
defineProps<{
  title: String;
}>();
</script>

<template>
  <div class="column">
    <h1>
      {{ title }}
    </h1>
    <div class="body">
      <div class="button-wrapper">
        <slot name="create-new-button" />
      </div>
      <slot name="card" />
    </div>
  </div>
</template>

<style scoped>
.column {
  border: 2px solid gray;
}

.button-wrapper {
  position: relative;
  height: 2rem;
}

h1 {
  margin: 0;
  padding: 1em;
  border-bottom: 2px solid gray;
  text-align: center;
}
</style>
