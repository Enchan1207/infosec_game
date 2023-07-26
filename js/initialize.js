//
// 状態初期化
//

import { generateFormula } from "./formula.js";
import { hideFormulaOverlay, lockInputPanel, lockNextButton } from "./uicontrol.js";

/**
 * ゲームを初期状態に戻す
 */
export function initializeGame() {

    // 結果パネルをクリア
    const resultPanel = document.querySelector(".result-container .caption");
    resultPanel.addEventListener("animationend", () => {
        resultPanel.classList.remove("blink");
    });
    resultPanel.textContent = "";

    // 入力パネルを無効化して値をクリア
    lockInputPanel(true);
    lockNextButton(true);
    document.querySelectorAll("form button,input").forEach((elem) => {
        elem.value = "";
    });

    // 数式表示オーバレイを表示
    hideFormulaOverlay(true);

    // 数式を生成
    const formula = generateFormula();

    // KaTeXに投げる
    const formulaElement = document.getElementById("equation");
    katex.render(formula.katex_strings, formulaElement);

    // フォームの隠し項目にjsonエンコードして保存
    const hiddenFormulaInput = document.querySelector("form input[name=formula]");
    hiddenFormulaInput.value = JSON.stringify(formula);

    // TODO: 式の変数の数に合わせてフォームを更新

    // 数式表示オーバレイを隠す
    hideFormulaOverlay(false);

    // 入力フォームを有効化
    lockInputPanel(false);
}