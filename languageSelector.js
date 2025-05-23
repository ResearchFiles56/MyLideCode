// languageSelector.js - プログラミング言語選択関連の処理

// グローバル変数
let selectedLanguage = 'c'; // デフォルトはC言語

// 言語選択の初期化
function initLanguageSelection() {
    languageToggles = document.querySelectorAll('.language-toggle');
    
    languageToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // すべてのトグルからactive classを削除
            languageToggles.forEach(t => t.classList.remove('active'));
            
            // クリックされたトグルにactive classを追加
            this.classList.add('active');
            
            // 選択された言語を保存
            selectedLanguage = this.getAttribute('data-language');
            
            // 結果セクションが表示されている場合は、コードを再生成
            if (document.getElementById('result-section').style.display === 'block') {
                generateCode();
            }
            
            // ファイル名の拡張子を更新
            updateFileExtension();
            
            // シンタックスハイライトの言語クラスを更新
            updateSyntaxHighlighting();
        });
    });
}

// ファイル名の拡張子を更新
function updateFileExtension() {
    const filenameElements = document.querySelectorAll('#code-filename, #detail-filename');
    
    filenameElements.forEach(element => {
        if (element.textContent) {
            // 現在の拡張子を削除
            const baseName = element.textContent.replace(/\.[^/.]+$/, "");
            
            // 選択された言語に基づいて新しい拡張子を追加
            const extension = selectedLanguage === 'python' ? '.py' : '.c';
            element.textContent = baseName + extension;
        }
    });
}

// シンタックスハイライトの言語クラスを更新
function updateSyntaxHighlighting() {
    const codeElements = document.querySelectorAll('code');
    
    codeElements.forEach(element => {
        // すべての言語クラスを削除
        element.classList.remove('language-c', 'language-python');
        
        // 選択された言語に基づいて新しいクラスを追加
        element.classList.add(`language-${selectedLanguage}`);
    });
    
    // シンタックスハイライトを再適用
    hljs.highlightAll();
}

// 言語に応じたファイル拡張子を取得
function getFileExtension() {
    return selectedLanguage === 'python' ? '.py' : '.c';
}

// 現在選択されている言語を取得
function getSelectedLanguage() {
    return selectedLanguage;
}

// 言語を設定する関数（library.jsから呼び出される）
function setSelectedLanguage(language) {
    selectedLanguage = language;
}