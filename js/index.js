//
//
//

import { initializeGame } from "./initialize.js";
import { onSubmitForm } from "./form.js";

document.addEventListener("DOMContentLoaded", initializeGame);

document.addEventListener("DOMContentLoaded", () => {

    // 「次の問題へ」がクリックされたら、ゲームを初期化する
    const nextQuestionButton = document.getElementById("next");
    nextQuestionButton.addEventListener("click", initializeGame);

    // フォーム送信時の処理
    const submitForm = document.querySelector("form.input-form");
    submitForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // 前処理
        const clickedButtonID = event.submitter.id;
        const formData = new FormData(submitForm);
        let formDataDict = {};
        [...formData.keys()].map((key) => { formDataDict[key] = formData.get(key); });

        // コールバックを呼び出す
        onSubmitForm(clickedButtonID, formDataDict);
    });
});
