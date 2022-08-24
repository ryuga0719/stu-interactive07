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
        <FormBasic placeholder-text="4" @update="getPasswordLength" class="mb-4"
          >Set Password length</FormBasic
        >
        <div class="grid grid-cols-2 mb-4">
          <CheckBoxBasic name="test" value="UPPER_CASE" v-model="checkedList"
            >大文字(ABC)</CheckBoxBasic
          >
          <CheckBoxBasic name="test" value="LOWER_CASE" v-model="checkedList"
            >小文字(abc)</CheckBoxBasic
          >
          <CheckBoxBasic name="test" value="NUMBER_CASE" v-model="checkedList"
            >数字(123)</CheckBoxBasic
          >
          <CheckBoxBasic name="test" value="HYPHEN_CASE" v-model="checkedList"
            >ハイフン(-)</CheckBoxBasic
          >
        </div>
        <ButtonBasic @on-click="clickHandler">Create Password</ButtonBasic>
        {{ checkedList }}
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
import { getPasswords, unifyTexts } from "./password.composition";

// 生成したパスワードの候補
let passwordList = ref<string[]>([]);

// パスワードの長さ
let passwordLength = ref<number>(4);

// 生成するパスワードに含む文字列の条件リスト
let checkedList = ref<string[]>([]);

// パスワードに含む文字列
let texts = ref<string>("");

// ボタンをクリックした時の処理
const clickHandler = () => {
  // パスワード候補の初期化
  initPasswordList();
  // パスワードに含む文字列を生成
  texts.value = unifyTexts(checkedList.value);
  console.log(texts.value);
  // 生成したパスワードを取得
  passwordList.value = getPasswords(texts.value, passwordLength.value, 5);
};

// 生成したパスワードの候補を初期化
const initPasswordList = () => {
  passwordList.value = [];
};

// フォームからパスワードの長さを取得
const getPasswordLength = (value: string) => {
  passwordLength.value = Number(value);
};
</script>

<style scoped lang="scss"></style>
