//
// フォーム処理
//

import { lockInputPanel, lockNextButton, updateResultPanel } from "./uicontrol.js";

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
