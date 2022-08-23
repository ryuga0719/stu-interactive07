<template>
  <div class="w-screen h-screen bg-indigo-500 flex justify-center items-center">
    <div
      class="flex flex-col max-w-md px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10"
    >
      <h1 class="text-center mb-2 text-xl font-light text-gray-800 sm:text-2xl">
        Create a new password suggestion
      </h1>
      <!-- form area -->
      <div class="mb-4">
        <FormBasic placeholder-text="4" @update="getPasswordLength"
          >Set Password length</FormBasic
        >
        <div>
          <CheckBoxBasic name="test" value="upper" @update="getSelectedValue"
            >upper</CheckBoxBasic
          >
          <CheckBoxBasic name="test" value="lower" @update="getSelectedValue"
            >lower</CheckBoxBasic
          >
        </div>
        <ButtonBasic @on-click="clickHandler">Create Password</ButtonBasic>
      </div>

      <div v-if="passwordList.length > 0">
        <h2
          class="text-center mb-2 text-lg font-light text-gray-800 sm:text-xl"
        >
          Suggestions
        </h2>
        <ul>
          <li v-for="(item, i) in passwordList" class="mb-1">・{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ButtonBasic from "./components/ButtonBasic.vue";
import FormBasic from "./components/FormBasic.vue";
import CheckBoxBasic from "./components/CheckBoxBasic.vue";

let passwordList = ref<string[]>([]);

const numList = "0123456789";
const upperList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerList = "abcdefghijklmnopqrstuvwxyz";
const hyphen = "-";
let passwordLength = ref<number>(4);
let selectedValueList = ref<string[]>([]);

// パスワードを生成
const getPassword = () => {
  let password = "";
  for (let k = 0; k < 5; k++) {
    for (let i = 0; i < passwordLength.value; i++) {
      let randomNumber = Math.floor(Math.random() * numList.length);
      password += numList.substring(randomNumber, randomNumber + 1);
    }
    passwordList.value.push(password);
    password = "";
  }
};

// ボタンをクリックした時の処理
const clickHandler = () => {
  initPasswordList();
  getPassword();
};

const initPasswordList = () => {
  passwordList.value = [];
};

const getPasswordLength = (value: string) => {
  passwordLength.value = Number(value);
};

const getSelectedValue = (value: string) => {
  selectedValueList.value.push(value);
  console.log(selectedValueList.value);
};
</script>

<style scoped lang="scss"></style>
