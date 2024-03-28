<script setup lang="ts">
import { defineProps, ref } from 'vue';

interface Props {
  disabled?: boolean;
  accept?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['change']);
const fileInput = ref<HTMLInputElement | null>(null);
const fileName = ref('Файл не выбран');
const errorMessage = ref('');
const localFilesReading = ref(false);
const cancelReading = ref(false);
const uploadedFile = ref<File | null>(null);

function validFileType(file: File) {
  return props.accept?.replaceAll('.', '').split(',').includes(file.type.split('/')[1]);
}

const handleFileChange = async(event: Event) => {
  const input = event.target as HTMLInputElement;
  localFilesReading.value = true;

  if (input.files) {
    const files = Array.from(input.files);
    const file: File = files[0];

    const isValid = validFileType(file);
    if (!isValid) {
      errorMessage.value = 'Неверный формат файла';
      localFilesReading.value = false;
      return;
    }

    fileName.value = file.name;
    setTimeout(() => {
      if (cancelReading.value !== true) {
        localFilesReading.value = false;
        uploadedFile.value = file;
        emit('change', file);
      }
    }, 3000);
  }
};

const handleButtonClick = () => {
  fileInput.value?.click();
};

const handleCancel = () => {
  cancelReading.value = true;
  localFilesReading.value = false;
  fileName.value = 'Файл не выбран';
}

const handleDelete = () => {
  fileName.value = 'Файл не выбран';
  uploadedFile.value = null;
  emit('change', null);
}
</script>
  

<template>
  <section class="upload-file">
    <div class="upload-file__container">
        <input
          ref="fileInput"
          type="file"
          :accept="accept"
          class="upload-file__input"
          @change="handleFileChange"
        >
          <template v-if="!uploadedFile">
            <template v-if="localFilesReading">
              <button
                  class="upload-file__button"
                  @click="handleCancel"
              >
                Отменить
              </button>
            </template>
            <template v-else>
              <button
                  class="upload-file__button"
                  :disabled="disabled"
                  @click="handleButtonClick"
              >
                Выбрать файл
              </button>
            </template>
          </template>
          <template v-else>
            <button
                class="upload-file__button"
                :disabled="disabled"
                @click="handleDelete"
            >
              Удалить
            </button>
          </template>
        <div class="upload-file__info">
          <img v-if="localFilesReading" src="/src/assets/loader.svg" alt="loader" class="upload-file__circular">
          <span class="upload-file__fileName">{{ fileName }}</span>
        </div>
    </div>
    <div v-if="errorMessage" class="upload-file__error">{{ errorMessage }}</div>
    <div v-else class="upload-file__tips">Доступные форматы: {{accept}}</div>
  </section>
</template>

<style scoped>
.upload-file {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-file__input {
    display: none;
  }

.upload-file__container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.upload-file__button {
  background-color: #FFF;
  color: #384252;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  padding: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
}

.upload-file__button:hover {
  background-color: #F3F4F6;
}

.upload-file__button:focus-visible {
  outline: 2px solid #6B72801A;
}

.upload-file__button:disabled {
  color: #9CA3B0;
}

.upload-file__button:disabled:hover {
  background-color: transparent;
}

.upload-file__fileName {
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: #9CA3B0;
}

.upload-file__error {
  font-size: 13px;
  font-weight: 400;
  line-height: 15.6px;
  margin-top: 5px;
  color: red;
}

.upload-file__tips {
  font-size: 13px;
  font-weight: 400;
  line-height: 15.6px;
  margin-top: 5px;
  color: #6B7280;
}

.upload-file__info {
  margin-left: 10px;
  display: flex;
  align-items: center;
}

.upload-file__circular {
  height: 16px;
  width: 16px;
  margin-right: 5px;
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>