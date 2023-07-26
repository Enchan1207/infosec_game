//
// 状態初期化
//

import { updateForm } from "./form.js";
import { generateFormula } from "./formula.js";
import { hideFormulaOverlay, lockInputPanel, lockNextButton, updateResultPanel } from "./uicontrol.js";

/**
 * ゲームを初期状態に戻す
 */
export function initializeGame() {

    // 結果パネルをクリア
    updateResultPanel("ready");

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

    // ヘッダを更新
    const formulaNameByType = (type) => {
        switch (type) {
            case "indeterminate":
                return "一次不定方程式";

            case "congruence":
                return "合同式";

            case "simultaneous_congruence":
                return "連立合同式";

            default:
                return "方程式";
        }
    };
    document.querySelector("h1").textContent = `次の${formulaNameByType(formula.type)}を解け。`;

    // フォームを更新
    updateForm(formula);

    // 数式表示オーバレイを隠す
    hideFormulaOverlay(false);

    // 入力フォームを有効化
    lockInputPanel(false);
}