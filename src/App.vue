<template>
  <div
    class="w-screen min-h-screen bg-indigo-500 flex justify-center items-center p-4"
  >
    <div
      class="w-full flex flex-col max-w-lg px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10"
    >
      <h1 class="text-center mb-8 text-xl font-light text-gray-800 sm:text-2xl">
        パスワード作るくん
      </h1>
      <!-- form area -->
      <div class="mb-4">
        <div class="mb-4">
          <FormBasic
            placeholder-text="8"
            @update="getPasswordLength"
            max-width="max-w-[100px]"
            >生成するパスワードの長さ
            <template #errorText>{{ errorText1 }}</template>
          </FormBasic>
        </div>
        <div class="mb-8">
          <FormBasic
            placeholder-text="5"
            @update="getPasswordNumber"
            max-width="max-w-[100px]"
            >生成するパスワードの個数
            <template #errorText>{{ errorText2 }}</template>
          </FormBasic>
        </div>
        <p class="text-gray-700 mb-2">パスワードに含む文字</p>
        <div class="grid grid-cols-2 mb-4">
          <CheckBoxBasic
            v-for="(item, i) in caseData"
            :key="i"
            name="textCase"
            :value="item.value"
            v-model="checkedList"
            >{{ item.label }}</CheckBoxBasic
          >
        </div>
        <ButtonBasic @on-click="clickHandler">Create Password</ButtonBasic>
      </div>

      <div v-if="passwordList.length > 0">
        <h2
          class="text-center mb-2 text-lg font-light text-gray-800 sm:text-xl"
        >
          候補
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
import { caseData } from "./mock";
import ButtonBasic from "./components/ButtonBasic.vue";
import FormBasic from "./components/FormBasic.vue";
import CheckBoxBasic from "./components/CheckBoxBasic.vue";
import { getPasswords, unifyTexts } from "./password.composition";

// 生成したパスワードの候補
let passwordList = ref<string[]>([]);

// パスワードの長さ
let passwordLength = ref<number>(8);
// パスワードの個数
let passwordNumber = ref<number>(5);

// 生成するパスワードに含む文字列の条件リスト
let checkedList = ref<string[]>([]);

// パスワードに含む文字列
let texts = ref<string>("");

// エラーテキスト
let errorText1 = ref<string>("");
let errorText2 = ref<string>("");

// ボタンをクリックした時の処理
const clickHandler = () => {
  // パスワード候補の初期化
  initPasswordList();
  initErrorText();

  // バリデーション
  // 32桁より多かったらバリデート
  if (passwordLength.value > 32) {
    errorText1.value = "多分だけどそんな長いの使わないよね?";
    return;
  }
  // 生成数が多かったらバリデート
  if (passwordNumber.value > 100) {
    errorText2.value = "そんな生成しなくていいですよね...";
    return;
  }
  // 入力値が数値でない場合はバリデート
  if (isNaN(passwordLength.value)) {
    errorText1.value = "数値を入力して〜";
    return;
  }
  if (isNaN(passwordNumber.value)) {
    errorText2.value = "数値を入力して〜";
    return;
  }

  // パスワードに含む文字列を生成
  texts.value = unifyTexts(checkedList.value);
  // 生成したパスワードを取得
  passwordList.value = getPasswords(
    texts.value,
    passwordLength.value,
    passwordNumber.value
  );
};

// 生成したパスワードの候補を初期化
const initPasswordList = () => {
  passwordList.value = [];
};

const initErrorText = () => {
  errorText1.value = "";
  errorText2.value = "";
};

// フォームからパスワードの長さを取得
const getPasswordLength = (value: string) => {
  passwordLength.value = Number(value);
};
// フォームからパスワードの個数を取得
const getPasswordNumber = (value: string) => {
  passwordNumber.value = Number(value);
};
</script>

<style scoped lang="scss"></style>
