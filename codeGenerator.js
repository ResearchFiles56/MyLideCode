// codeGenerator.js - コード生成関連の処理（言語切り替え対応版）

// コード生成
function generateCode() {
    // タイトルと説明を取得
    const title = document.getElementById('scene-title').value;
    const description = document.getElementById('scene-description').value;
    
    // 必須入力チェック
    if (!title || !description) {
        alert('タイトルと説明を入力してください');
        return;
    }
    
    // 選択された言語を取得
    const language = getSelectedLanguage(); // 'c' または 'python'
    
    let generatedCode = '';
    let explanation = '';
    
    // ファイル名を設定（言語に応じた拡張子）
    const extension = language === 'python' ? '.py' : '.c';
    document.getElementById('code-filename').textContent = title.replace(/\s+/g, '_').toLowerCase() + extension;
    
    // テンプレートと言語に応じたコード生成
    switch (selectedTemplate) {
        case 'sequence':
            const sequenceResult = language === 'python' 
                ? generatePythonSequenceCode(title, description) 
                : generateCSequenceCode(title, description);
            generatedCode = sequenceResult.code;
            explanation = sequenceResult.explanation;
            break;
            
        case 'condition':
            const conditionResult = language === 'python'
                ? generatePythonConditionCode(title, description)
                : generateCConditionCode(title, description);
            generatedCode = conditionResult.code;
            explanation = conditionResult.explanation;
            break;
            
        case 'loop':
            const loopResult = language === 'python'
                ? generatePythonLoopCode(title, description)
                : generateCLoopCode(title, description);
            generatedCode = loopResult.code;
            explanation = loopResult.explanation;
            break;
    }
    
    // 生成したコードと解説を表示
    document.getElementById('generated-code').textContent = generatedCode;
    document.getElementById('code-explanation').innerHTML = explanation;
    
    // result-section を表示
    document.getElementById('result-section').style.display = 'block';
    
    // シンタックスハイライトを適用
    updateSyntaxHighlighting();
    
    // ページを result-section までスクロール
    document.getElementById('result-section').scrollIntoView({ behavior: 'smooth' });
}

// C言語: 順次実行のコード生成
function generateCSequenceCode(title, description) {
    // ステップを取得
    const steps = [];
    document.querySelectorAll('#sequence-steps .step-input').forEach(input => {
        if (input.value.trim()) {
            steps.push(input.value.trim());
        }
    });
    
    // コードを生成
    let code = `// ${title}\n// ${description}\n\n#include <stdio.h>\n\n`;
    
    // 各ステップの関数を定義
    steps.forEach(step => {
        code += `void ${step.replace(/\s+/g, '_')}() {\n    printf("${step}を実行中...\\n");\n}\n\n`;
    });
    
    // メイン関数を定義
    code += `// メイン関数\nvoid ${title.replace(/\s+/g, '_')}() {\n`;
    steps.forEach(step => {
        code += `    ${step.replace(/\s+/g, '_')}();\n`;
    });
    code += `    printf("${title}が完了しました！\\n");\n}\n\n`;
    
    // main関数を定義
    code += `int main() {\n    ${title.replace(/\s+/g, '_')}();\n    return 0;\n}`;
    
    // 解説を生成
    let explanation = `
        <p>このC言語コードは「${title}」という日常行動を順番に実行するプログラムです。</p>
        <p>コードの構成:</p>
        <ul>
            <li>各ステップ（${steps.join('、')}）を個別の関数として定義しています。</li>
            <li>「${title.replace(/\s+/g, '_')}」という関数でこれらのステップを順番に呼び出しています。</li>
            <li>main関数から「${title.replace(/\s+/g, '_')}」関数を呼び出してプログラムを実行します。</li>
        </ul>
        <p>プログラミングの順次実行（シーケンス）は、このように上から下へ順番に処理が実行されていく基本的な流れです。</p>
    `;
    
    return { code, explanation };
}

// Python: 順次実行のコード生成
function generatePythonSequenceCode(title, description) {
    // ステップを取得
    const steps = [];
    document.querySelectorAll('#sequence-steps .step-input').forEach(input => {
        if (input.value.trim()) {
            steps.push(input.value.trim());
        }
    });
    
    // Pythonコードを生成
    let code = `# ${title}\n# ${description}\n\n`;
    
    // 各ステップの関数を定義
    steps.forEach(step => {
        const funcName = step.replace(/\s+/g, '_');
        code += `def ${funcName}():\n    print("${step}を実行中...")\n\n`;
    });
    
    // メイン関数を定義
    code += `# メイン関数\ndef ${title.replace(/\s+/g, '_')}():\n`;
    steps.forEach(step => {
        const funcName = step.replace(/\s+/g, '_');
        code += `    ${funcName}()\n`;
    });
    code += `    print("${title}が完了しました！")\n\n`;
    
    // Pythonでのエントリポイント
    code += `if __name__ == "__main__":\n    ${title.replace(/\s+/g, '_')}()`;
    
    // 解説を生成（Pythonバージョン用に少し調整）
    let explanation = `
        <p>このPythonコードは「${title}」という日常行動を順番に実行するプログラムです。</p>
        <p>コードの構成:</p>
        <ul>
            <li>各ステップ（${steps.join('、')}）を個別の関数として定義しています。</li>
            <li>「${title.replace(/\s+/g, '_')}」という関数でこれらのステップを順番に呼び出しています。</li>
            <li><code>if __name__ == "__main__":</code> ブロックから「${title.replace(/\s+/g, '_')}」関数を呼び出してプログラムを実行します。</li>
        </ul>
        <p>プログラミングの順次実行（シーケンス）は、このように上から下へ順番に処理が実行されていく基本的な流れです。</p>
    `;
    
    return { code, explanation };
}

// C言語: 条件分岐のコード生成
function generateCConditionCode(title, description) {
    // 状況、条件、行動を取得
    const situation = document.getElementById('condition-situation').value;
    const condition1 = document.getElementById('condition1').value;
    const action1 = document.getElementById('action1').value;
    const condition2 = document.getElementById('condition2').value;
    const action2 = document.getElementById('action2').value;
    const action3 = document.getElementById('action3').value;
    
    // コードを生成
    let code = `// ${title}\n// ${description}\n\n#include <stdio.h>\n\n`;
    
    // 各行動の関数を定義
    code += `void ${action1.replace(/\s+/g, '_')}() {\n    printf("${action1}を実行中...\\n");\n}\n\n`;
    code += `void ${action2.replace(/\s+/g, '_')}() {\n    printf("${action2}を実行中...\\n");\n}\n\n`;
    code += `void ${action3.replace(/\s+/g, '_')}() {\n    printf("${action3}を実行中...\\n");\n}\n\n`;
    
    // メイン関数を定義
    code += `// メイン関数\nvoid ${title.replace(/\s+/g, '_')}(int ${situation.replace(/\s+/g, '_')}) {\n`;
    code += `    printf("${situation}を確認中...\\n");\n\n`;
    code += `    if (${situation.replace(/\s+/g, '_')} == 1) { // ${condition1}の場合\n`;
    code += `        printf("${condition1}なので、");\n`;
    code += `        ${action1.replace(/\s+/g, '_')}();\n`;
    code += `    } else if (${situation.replace(/\s+/g, '_')} == 2) { // ${condition2}の場合\n`;
    code += `        printf("${condition2}なので、");\n`;
    code += `        ${action2.replace(/\s+/g, '_')}();\n`;
    code += `    } else { // それ以外の場合\n`;
    code += `        printf("特に条件がないので、");\n`;
    code += `        ${action3.replace(/\s+/g, '_')}();\n`;
    code += `    }\n`;
    code += `}\n\n`;
    
    // main関数を定義
    code += `int main() {\n`;
    code += `    // 実行例: 1 = ${condition1}、2 = ${condition2}、その他 = それ以外\n`;
    code += `    ${title.replace(/\s+/g, '_')}(1); // ${condition1}の場合\n`;
    code += `    printf("\\n");\n`;
    code += `    ${title.replace(/\s+/g, '_')}(2); // ${condition2}の場合\n`;
    code += `    printf("\\n");\n`;
    code += `    ${title.replace(/\s+/g, '_')}(3); // それ以外の場合\n`;
    code += `    return 0;\n}`;
    
    // 解説を生成
    let explanation = `
        <p>このC言語コードは「${title}」という条件によって行動が変わる状況を表現しています。</p>
        <p>コードの構成:</p>
        <ul>
            <li>3つの行動（${action1}、${action2}、${action3}）を個別の関数として定義しています。</li>
            <li>「${title.replace(/\s+/g, '_')}」関数では「${situation}」を確認し、条件に応じて異なる行動を実行します。</li>
            <li>条件分岐には if-else if-else 構文を使用しています。</li>
        </ul>
        <p>プログラミングの条件分岐（if文）は、条件によって実行する処理を切り替える制御構造です。日常生活の「もし〜なら〜する、そうでなければ〜する」という判断と同じです。</p>
    `;
    
    return { code, explanation };
}

// Python: 条件分岐のコード生成
function generatePythonConditionCode(title, description) {
    // 状況、条件、行動を取得
    const situation = document.getElementById('condition-situation').value;
    const condition1 = document.getElementById('condition1').value;
    const action1 = document.getElementById('action1').value;
    const condition2 = document.getElementById('condition2').value;
    const action2 = document.getElementById('action2').value;
    const action3 = document.getElementById('action3').value;
    
    // Pythonコードを生成
    let code = `# ${title}\n# ${description}\n\n`;
    
    // 各行動の関数を定義
    code += `def ${action1.replace(/\s+/g, '_')}():\n    print("${action1}を実行中...")\n\n`;
    code += `def ${action2.replace(/\s+/g, '_')}():\n    print("${action2}を実行中...")\n\n`;
    code += `def ${action3.replace(/\s+/g, '_')}():\n    print("${action3}を実行中...")\n\n`;
    
    // メイン関数を定義
    code += `# メイン関数\ndef ${title.replace(/\s+/g, '_')}(${situation.replace(/\s+/g, '_')}):\n`;
    code += `    print("${situation}を確認中...")\n\n`;
    code += `    if ${situation.replace(/\s+/g, '_')} == 1:  # ${condition1}の場合\n`;
    code += `        print("${condition1}なので、")\n`;
    code += `        ${action1.replace(/\s+/g, '_')}()\n`;
    code += `    elif ${situation.replace(/\s+/g, '_')} == 2:  # ${condition2}の場合\n`;
    code += `        print("${condition2}なので、")\n`;
    code += `        ${action2.replace(/\s+/g, '_')}()\n`;
    code += `    else:  # それ以外の場合\n`;
    code += `        print("特に条件がないので、")\n`;
    code += `        ${action3.replace(/\s+/g, '_')}()\n\n`;
    
    // Pythonでのエントリポイント
    code += `if __name__ == "__main__":\n`;
    code += `    # 実行例: 1 = ${condition1}、2 = ${condition2}、その他 = それ以外\n`;
    code += `    ${title.replace(/\s+/g, '_')}(1)  # ${condition1}の場合\n`;
    code += `    print()\n`;
    code += `    ${title.replace(/\s+/g, '_')}(2)  # ${condition2}の場合\n`;
    code += `    print()\n`;
    code += `    ${title.replace(/\s+/g, '_')}(3)  # それ以外の場合`;
    
    // 解説を生成
    let explanation = `
        <p>このPythonコードは「${title}」という条件によって行動が変わる状況を表現しています。</p>
        <p>コードの構成:</p>
        <ul>
            <li>3つの行動（${action1}、${action2}、${action3}）を個別の関数として定義しています。</li>
            <li>「${title.replace(/\s+/g, '_')}」関数では「${situation}」を確認し、条件に応じて異なる行動を実行します。</li>
            <li>条件分岐には if-elif-else 構文を使用しています。</li>
        </ul>
        <p>プログラミングの条件分岐（if文）は、条件によって実行する処理を切り替える制御構造です。日常生活の「もし〜なら〜する、そうでなければ〜する」という判断と同じです。</p>
    `;
    
    return { code, explanation };
}

// C言語: 繰り返しのコード生成
function generateCLoopCode(title, description) {
    // 繰り返し回数、行動、カウンター変数名、ループ後の行動を取得
    const loopCount = document.getElementById('loop-count').value;
    const action = document.getElementById('loop-action').value;
    const countVar = document.getElementById('loop-count-var').value || "i"; // デフォルトは "i"
    const afterLoop = document.getElementById('after-loop').value;
    
    // コードを生成
    let code = `// ${title}\n// ${description}\n\n#include <stdio.h>\n\n`;
    
    // 行動の関数を定義
    code += `void ${action.replace(/\s+/g, '_')}(int ${countVar}) {\n`;
    code += `    printf("${countVar}=%d回目: ${action}\\n", ${countVar});\n`;
    code += `}\n\n`;
    
    // ループ後の行動の関数を定義
    code += `void ${afterLoop.replace(/\s+/g, '_')}() {\n`;
    code += `    printf("${afterLoop}を実行中...\\n");\n`;
    code += `}\n\n`;
    
    // メイン関数を定義
    code += `// メイン関数\nvoid ${title.replace(/\s+/g, '_')}(int 繰り返し回数) {\n`;
    code += `    printf("${title}を開始します...\\n");\n\n`;
    code += `    // ${loopCount}回の繰り返し処理\n`;
    code += `    for (int ${countVar} = 1; ${countVar} <= 繰り返し回数; ${countVar}++) {\n`;
    code += `        ${action.replace(/\s+/g, '_')}(${countVar});\n`;
    code += `    }\n\n`;
    code += `    // ループ後の処理\n`;
    code += `    ${afterLoop.replace(/\s+/g, '_')}();\n`;
    code += `    printf("${title}が完了しました！\\n");\n`;
    code += `}\n\n`;
    
    // main関数を定義
    code += `int main() {\n`;
    code += `    ${title.replace(/\s+/g, '_')}(${loopCount}); // ${loopCount}回繰り返す\n`;
    code += `    return 0;\n}`;
    
    // 解説を生成
    let explanation = `
        <p>このC言語コードは「${title}」という繰り返し行動を表現しています。</p>
        <p>コードの構成:</p>
        <ul>
            <li>「${action}」という行動を${loopCount}回繰り返します。</li>
            <li>各繰り返しで、現在何回目かを「${countVar}」という変数で管理します。</li>
            <li>すべての繰り返し後に「${afterLoop}」という処理を行います。</li>
            <li>繰り返しには for ループを使用しています。</li>
        </ul>
        <p>プログラミングのループ（繰り返し）は、同じような処理を複数回実行する制御構造です。日常生活でも「腕立て伏せを10回する」「階段を5階まで上る」など、同じ操作を繰り返す場面でよく使われます。</p>
    `;
    
    return { code, explanation };
}

// Python: 繰り返しのコード生成
function generatePythonLoopCode(title, description) {
    // 繰り返し回数、行動、カウンター変数名、ループ後の行動を取得
    const loopCount = document.getElementById('loop-count').value;
    const action = document.getElementById('loop-action').value;
    const countVar = document.getElementById('loop-count-var').value || "i"; // デフォルトは "i"
    const afterLoop = document.getElementById('after-loop').value;
    
    // Pythonコードを生成
    let code = `# ${title}\n# ${description}\n\n`;
    
    // 行動の関数を定義
    code += `def ${action.replace(/\s+/g, '_')}(${countVar}):\n`;
    code += `    print(f"${countVar}={${countVar}}回目: ${action}")\n\n`;
    
    // ループ後の行動の関数を定義
    code += `def ${afterLoop.replace(/\s+/g, '_')}():\n`;
    code += `    print("${afterLoop}を実行中...")\n\n`;
    
    // メイン関数を定義
    code += `# メイン関数\ndef ${title.replace(/\s+/g, '_')}(繰り返し回数):\n`;
    code += `    print("${title}を開始します...")\n\n`;
    code += `    # ${loopCount}回の繰り返し処理\n`;
    code += `    for ${countVar} in range(1, 繰り返し回数 + 1):\n`;
    code += `        ${action.replace(/\s+/g, '_')}(${countVar})\n\n`;
    code += `    # ループ後の処理\n`;
    code += `    ${afterLoop.replace(/\s+/g, '_')}()\n`;
    code += `    print("${title}が完了しました！")\n\n`;
    
    // Pythonでのエントリポイント
    code += `if __name__ == "__main__":\n`;
    code += `    ${title.replace(/\s+/g, '_')}(${loopCount})  # ${loopCount}回繰り返す`;
    
    // 解説を生成
    let explanation = `
        <p>このPythonコードは「${title}」という繰り返し行動を表現しています。</p>
        <p>コードの構成:</p>
        <ul>
            <li>「${action}」という行動を${loopCount}回繰り返します。</li>
            <li>各繰り返しで、現在何回目かを「${countVar}」という変数で管理します。</li>
            <li>すべての繰り返し後に「${afterLoop}」という処理を行います。</li>
            <li>繰り返しには for ループと range() 関数を使用しています。</li>
        </ul>
        <p>プログラミングのループ（繰り返し）は、同じような処理を複数回実行する制御構造です。日常生活でも「腕立て伏せを10回する」「階段を5階まで上る」など、同じ操作を繰り返す場面でよく使われます。</p>
    `;
    
    return { code, explanation };
}