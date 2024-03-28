<template>
  <section
    class="drag-drop-file"
    @dragover.prevent
    @dragenter.prevent="handleDragEnter"
    @dragleave="handleDragLeave"
    @dragend="handleDragLeave"
    @drop="handleDrop"
  >
    <p>{{ message }}</p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const message = ref('Перетащите файл сюда');

const handleDragEnter = (event: DragEvent) => {
  event.preventDefault();
  const target = event.currentTarget;
  if (target instanceof HTMLElement) {
    target.classList.add('drag-over');
  }
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  const target = event.currentTarget;
  if (target instanceof HTMLElement) {
    target.classList.remove('drag-over');
    const dataTransfer = event.dataTransfer;
    if (dataTransfer) {
      const files = dataTransfer.files;
      if (files.length > 0) {
        message.value = `Файлы успешно загружены: ${files.length}`;
      }
    }
  }
};

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault();
  const target = event.currentTarget;
  if (target instanceof HTMLElement) {
    target.classList.remove('drag-over');
    message.value = 'Перетащите файл сюда';
  }
};
</script>

<style scoped>
.drag-drop-file {
  margin-top: 10px;
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  font-size: 20px;
}

.drag-drop-file.drag-over {
  border-color: #000;
}
</style>
