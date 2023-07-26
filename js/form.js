//
// フォーム処理
//

import { lockInputPanel, lockNextButton, updateResultPanel } from "./uicontrol.js";

/**
 * 数式オブジェクトをもとにフォームを更新
 * @param {Object} formula 数式オブジェクト
 */
export function updateForm(formula) {
    const formElement = document.querySelector("form");

    // フォームの隠し項目にjsonエンコードして保存
    const hiddenFormulaInput = formElement.querySelector("input[name=formula]");
    hiddenFormulaInput.value = JSON.stringify(formula);

    // KaTeXに投げる
    const formulaElement = document.querySelector("#equation");
    katex.render(formula.katex_strings, formulaElement);

    // 入力フォームを全消し
    const inputField = formElement.querySelector(".input-fields");
    inputField.querySelectorAll(".input-container").forEach((elem) => {
        elem.remove();
    });

    // 再構成
    Object.keys(formula).filter((key) => { return key.startsWith("correct_") }).map((key) => {
        const inputElement = createInputFormElement(key);
        inputField.appendChild(inputElement);
    });

}

function createInputFormElement(key) {
    const rawKey = key.replace("correct_", "");
    const container = document.createElement("div");
    container.className = "input-container";
    const label = document.createElement("label");
    label.className = "input-label";
    label.setAttribute("for", rawKey);
    label.textContent = `${rawKey} =`;
    const field = document.createElement("input");
    field.type = "number";
    field.className = "input-field";
    field.id = rawKey;
    field.name = `${key.replace("correct_", "answer_")}`;

    container.appendChild(label);
    container.appendChild(field);
    return container;
}

/**
 * フォーム送信時の処理
 * @param {string} submitID フォーム送信コマンド
 * @param {Object} formData フォームデータ
 */
export function onSubmitForm(submitID, formData) {
    const formula = JSON.parse(formData.formula);

    // 正解の文字列を生成
    const correctString = getCorrectStringFromFormula(formula);

    // スキップならここで終了
    if (submitID == "skip") {
        updateResultPanel(`正解: ${correctString}`);
        lockInputPanel(true);
        lockNextButton(false);
        return;
    }

    // 正誤比較
    if (isCorrectAnswer(formula, formData, submitID)) {
        updateResultPanel(`正解! ${correctString}`);
        lockInputPanel(true);
        lockNextButton(false);
    } else {
        updateResultPanel("不正解!")
    }
}

/**
 * 数式オブジェクトとフォーム送信情報から正誤を確認する
 * @param {Object} formula 数式オブジェクト
 * @param {Object} formData フォームオブジェクト
 * @param {Object} submitID フォーム送信コマンド
 * @returns 正誤
 */
function isCorrectAnswer(formula, formData, submitID) {
    // 解がない?
    const hasFormulaNoSolution = ("nosolution" in formula) && formula.nosolution === true;
    const isSelectedNoSolution = submitID === "nosolution";
    if (hasFormulaNoSolution != isSelectedNoSolution) {
        return false;
    }
    if (hasFormulaNoSolution) {
        return true;
    }

    // 数値比較
    const correctKeysWithoutPrefix = Object
        .keys(formula)
        .filter((key) => { return key.startsWith("correct_") })
        .map((key) => key.replace("correct_", ""));
    const isCorrect = correctKeysWithoutPrefix.map((key) => {
        const correctKey = `correct_${key}`;
        const answerKey = `answer_${key}`;
        const isSameValue = Number(formula[correctKey]) === Number(formData[answerKey]);
        return isSameValue;
    }).every(e => e === true);
    return isCorrect;
}

/**
 * 数式オブジェクトから正解の文字列を生成する
 * @param {Object} formula 数式オブジェクト
 * @returns 正解の文字列
 */
function getCorrectStringFromFormula(formula) {
    // 解がない?
    if (("nosolution" in formula) && formula.nosolution === true) {
        return "解なし";
    }

    const correctKeys = Object.keys(formula).filter((key) => { return key.startsWith("correct_") });
    const correctValues = correctKeys.map((key) => {
        const varname = key.replace("correct_", "");
        const value = formula[key]
        return `${varname} = ${value}`;
    });
    return correctValues.join(", ");
}
