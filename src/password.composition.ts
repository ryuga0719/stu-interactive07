import { TEXT_PATTERNS } from "./const/index";

/**
 * パスワードの候補を生成
 * @param {string} texts - パスワードに含む文字列
 * @param {number} length - 何桁のパスワードを生成するか
 * @param {number} num - いくつパスワードの候補を生成するか
 * @return {array} 生成したパスワードの候補リスト
 */
export const getPasswords = (texts: string, length: number, num: number) => {
  let password = "";
  const passwords = [];
  for (let i = 0; i < num; i++) {
    password = createPassword(texts, length);
    passwords.push(password);
  }
  return passwords;
};

/**
 * パスワードの候補を生成する
 * @param {string} texts - パスワードに含む文字列
 * @param {number} length - パスワードの長さ
 * @return {string} パスワードの候補の文字列
 */
const createPassword = (texts: string, length: number) => {
  let password = "";
  for (let j = 0; j < length; j++) {
    let randomNumber = Math.floor(Math.random() * texts.length);
    password += texts.substring(randomNumber, randomNumber + 1);
  }
  return password;
};

// 条件追加の際はここに追加する
const patterns = ["UPPER_CASE", "LOWER_CASE", "NUMBER_CASE", "HYPHEN_CASE"];

/**
 * 候補となる文字列を結合する
 * @param {array} list - パスワードに含む文字列の条件のリスト
 * @returns {string} パスワードに含む文字列
 *
 */
export const unifyTexts = (list: string[]) => {
  let texts = "";
  patterns.forEach((pattern, index) => {
    if (list.includes(pattern)) {
      texts = texts + TEXT_PATTERNS[index].text;
    }
  });
  return texts;
};
