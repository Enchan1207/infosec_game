//
// ユーザインタフェース制御
//

/**
 * 入力パネルをロック/ロック解除
 * @param {boolean} state ロック状態
 */
export function lockInputPanel(state) {
    document.querySelectorAll("form button,input").forEach((elem) => {
        elem.disabled = state;
    });
}

/**
 * 「次の問題へ」ボタンをロック/ロック解除
 * @param {boolean} state ロック状態
 */
export function lockNextButton(state) {
    const nextButton = document.getElementById("next");
    nextButton.disabled = state;
}

/**
 * 数式待機オーバレイを表示/非表示
 * @param {boolean} state オーバレイ表示状態
 */
export function hideFormulaOverlay(state) {
    const formulaOverlay = document.querySelector(".equation-container .overlay");
    if (state) {
        formulaOverlay.classList.remove("hide");
    } else {
        formulaOverlay.classList.add("hide");
    }
}

export function updateResultPanel(content) {
    const resultPanel = document.querySelector(".result-container .caption");
    resultPanel.textContent = content;
    resultPanel.classList.add("blink");
}
