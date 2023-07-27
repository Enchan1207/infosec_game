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

    // a, b, cを生成
    const coefficientMin = 5;
    const coefficientMax = 100;
    const cMin = 1;
    const cMax = 10;
    const a = nonZeroRandom(coefficientMin, coefficientMax);
    const b = nonZeroRandom(coefficientMin, coefficientMax);
    const c = nonZeroRandom(cMin, cMax);

    // GCD(a, b) を計算
    const gcd = euclideanGCD(a, b);

    // c が GCD(a, b) の倍数かどうか = 解があるかどうか
    const hasNoSolution = (c % gcd) !== 0;

    // ax + by = gcd(a, b) となる x, y を計算
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