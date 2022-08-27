<template>
  <div class="relative w-full">
    <label
      v-if="$slots.default"
      for="name-with-label"
      class="text-gray-700 mb-2 block"
    >
      <slot></slot>
    </label>
    <input
      type="text"
      :class="maxWidth"
      class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      :name="name"
      :placeholder="placeholderText"
      v-model.lazy="value"
      @change="onChange"
    />
    <p v-if="$slots.errorText" class="mt-2 text-xs text-red-500">
      <slot name="errorText"></slot>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
interface Props {
  name?: string;
  placeholderText?: string;
  maxWidth?: string;
}

// 初期値
withDefaults(defineProps<Props>(), {
  name: "",
  placeholderText: "",
  maxWidth: "",
});

const value = ref<string>("");

// emit
const emit = defineEmits<{
  (e: "update", value: string): void;
}>();

const onChange = () => {
  emit("update", value.value);
};
</script>

<style scoped></style>
