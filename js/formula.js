//
//　数式生成処理
//

/**
 * 数式を生成する
 * @returns 生成された数式オブジェクト
 */
export function generateFormula() {
    // indeterminate: 不定式
    // congruence: 合同式
    // simultaneous_congruence: 連立合同式
    return {
        "type": "indeterminate",
        "a": 1,
        "b": 5,
        "c": 6,
        "nosolution": false,
        "correct_x": 3,
        "correct_y": 4,
        "katex_strings": "2x+3y=6"
    };
}