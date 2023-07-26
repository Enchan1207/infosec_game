//
//　数式生成処理
//

import { euclideanGCD, extGCD, nonZeroRandom } from "./math.js"

/**
 * 数式を生成する
 * @returns 生成された数式オブジェクト
 */
export function generateFormula() {

    // 合同式か不定式か
    const formulaType = "indeterminate";

    // a, bを生成
    const coefficientMin = 5;
    const coefficientMax = 100;
    const a = nonZeroRandom(coefficientMin, coefficientMax);
    const b = nonZeroRandom(coefficientMin, coefficientMax);

    // 解なしにするかどうかの抽選
    const hasNoSolution = Math.random() < 0.1;

    // GCD(a, b) を計算
    let gcd = euclideanGCD(a, b);

    // 特定の確率で解なしにするためgcdをいじる
    if (hasNoSolution && gcd != 1) {
        gcd += nonZeroRandom(2, 3);
    }

    // gcdを適当に乗算してcとする
    const gcdAmplitudeMin = 1;
    const gcdAmplitudeMax = 5;
    const c = gcd * nonZeroRandom(gcdAmplitudeMin, gcdAmplitudeMax);

    // 一応計算しておく
    let correctX = 0;
    let correctY = 0;
    if (!hasNoSolution) {
        const [_, x, y] = extGCD(a, b);
        correctX = x;
        correctY = y;
    }
    const signedStr = (a) => { return `${(Math.sign(a) > 0) ? "+" : "-"}${Math.abs(a)}` };

    return {
        "type": formulaType,
        "a": a, "b": b, "c": c,
        "nosolution": hasNoSolution,
        "correct_x": correctX,
        "correct_y": correctY,
        "katex_strings": `${a}x${signedStr(b)}y= ${c}`
    };
}