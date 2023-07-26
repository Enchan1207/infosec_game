//
// 状態初期化
//

import { generateFormula } from "./formula.js";

/**
 * ゲームを初期状態に戻す
 */
export function initializeGame() {

    // 各種ボタンを無効化
    document.querySelectorAll("button").forEach((button) => {
        button.disabled = true;
    });

    // 数式表示エリアを隠す
    const formulaOverlay = document.querySelector(".equation-container .overlay");
    formulaOverlay.classList.remove("hide");

    // 数式を生成
    const formula = generateFormula();

    // KaTeXに投げる
    const formulaElement = document.getElementById("equation");
    katex.render(formula.katex_strings, formulaElement);

    // フォームの隠し項目にjsonエンコードして保存
    const hiddenFormulaInput = document.querySelector("form input[name=formula]");
    hiddenFormulaInput.value = JSON.stringify(formula);

    // 数式表示エリアを表示
    formulaOverlay.classList.add("hide");

    // input-container内のボタンのみ有効化
    document.querySelectorAll(".input-container button").forEach((button) => {
        button.disabled = false;
    });
}