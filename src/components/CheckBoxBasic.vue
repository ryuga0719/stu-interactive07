<template>
  <label class="flex items-center space-x-3 mb-3 cursor-pointer">
    <input
      type="checkbox"
      :name="name"
      :value="value"
      @input="onChange"
      class="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-purple-500 checked:border-transparent focus:outline-none"
    />
    <span v-if="$slots.default" class="text-gray-700 font-normal">
      <slot></slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref } from "vue";
interface Props {
  name?: string;
  value?: string;
}

// 初期値
const props = withDefaults(defineProps<Props>(), {
  name: "",
  value: "",
});

// emit
const emit = defineEmits<{
  (e: "update", selected: string): void;
}>();

const onChange = () => {
  emit("update", props.value);
};
</script>

<style scoped></style>
