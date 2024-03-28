<script setup lang="ts">
import { ref } from "vue";


const uploadedFile = ref<File | null>(null);

function getUploadedFile(file: File) {
  console.log(file)
  uploadedFile.value = file;
}
</script>
<template>
  <div>
    <Header :title="'Загрузка файла'" :logo="'/vite.svg'" />
    <UploadButton 
      :disabled="false"
      accept=".csv,.xml"
      @change="getUploadedFile"
    />
    <DragAndDropFile />
  </div>
</template>

<style scoped>
</style>
