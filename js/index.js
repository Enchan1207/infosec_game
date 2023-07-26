let correctX, correctY;

// ランダムな係数を生成する関数
function getRandomCoefficient() {
    return Math.floor(Math.random() * 41) - 20; // -20から20までの整数
}

// ランダムな一次不定方程式を生成する関数
function generateRandomEquation() {
    const a = getRandomCoefficient();
    const b = getRandomCoefficient();
    const c = getRandomCoefficient();

    correctX = (c - b) / a;
    correctY = (c - a) / b;

    // 数式を構築
    let equationString = `${a}x`;
    if (b >= 0) {
        equationString += ` + ${b}y`;
    } else {
        equationString += ` - ${Math.abs(b)}y`;
    }
    equationString += ` = ${c}`;

    // KaTeXを使って数式を表示
    const element = document.getElementById("equation");
    element.innerHTML = "";
    katex.render(equationString, element);
}

// 解答をチェックする関数
function checkAnswer() {
    const inputX = Number(document.getElementById("inputX").value);
    const inputY = Number(document.getElementById("inputY").value);

    let resultString = "";

    if (isNaN(inputX) || isNaN(inputY)) {
        resultString = "Please enter valid numbers for x and y.";
    } else if (inputX === correctX && inputY === correctY) {
        resultString = "Correct! You found the solution.";
    } else {
        resultString = "Incorrect. Please try again.";
    }

    const resultElement = document.getElementById("result");
    resultElement.innerHTML = resultString;
}

// 「解なし」ボタンをクリックした際の挙動
function noSolutionClicked() {
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = "Correct! The equation has no solution.";
}

// 初期表示とボタンのイベントリスナーを設定
document.addEventListener("DOMContentLoaded", function () {
    generateRandomEquation();

    const checkButton = document.getElementById("checkButton");
    checkButton.addEventListener("click", checkAnswer);

    const noSolutionButton = document.getElementById("noSolutionButton");
    noSolutionButton.addEventListener("click", noSolutionClicked);
});