// main.js - メインのJavaScriptファイル（テンプレート自動選択解除版）

// グローバル変数
let selectedTemplate = null;
let codeLibrary = [];

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // ナビゲーションタブの切り替え
    initTabs();
    
    // テンプレート選択の初期化
    initTemplateSelection();
    
    // ボタン操作の初期化
    initButtons();
    
    // 言語選択の初期化
    initLanguageSelection();
    
    // ローカルストレージからライブラリを読み込む
    loadLibrary();
    
    // シンタックスハイライト適用
    hljs.highlightAll();
    
    // 最初のガイドテキストを表示
    showInitialGuide();
});

// 最初のガイドテキストを表示・制御
function showInitialGuide() {
    // customize-sectionを非表示
    document.getElementById('customize-section').style.display = 'none';
    
    // 既存のガイド要素を確認
    let guideElement = document.getElementById('initial-guide');
    
    // 存在しない場合のみ新規作成
    if (!guideElement) {
        guideElement = document.createElement('div');
        guideElement.className = 'card guide-card';
        guideElement.id = 'initial-guide';
        guideElement.innerHTML = `
            <div class="card-title">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%234a6da7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='12' y1='16' x2='12' y2='12'%3E%3C/line%3E%3Cline x1='12' y1='8' x2='12.01' y2='8'%3E%3C/line%3E%3C/svg%3E" alt="ガイド">
                テンプレートを選択してください
            </div>
            <div class="card-description">
                上記のテンプレートから、コード化したい日常シーンのタイプを選んでください。選択するとカスタマイズフォームが表示されます。
            </div>
        `;
        
        // テンプレートグリッドの後に挿入
        const templateGrid = document.querySelector('.template-grid');
        templateGrid.parentNode.insertBefore(guideElement, templateGrid.nextSibling);
    } else {
        // 既に存在する場合は表示状態にする
        guideElement.style.display = 'block';
    }
}

// タブ切り替え機能の初期化
function initTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // すべてのタブから active クラスを削除
            tabs.forEach(t => t.classList.remove('active'));
            
            // クリックされたタブに active クラスを追加
            this.classList.add('active');
            
            // すべてのタブコンテンツを非表示
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // 対応するタブコンテンツを表示
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId + '-tab').classList.add('active');
            
            // ライブラリタブが選択された場合、ライブラリを更新
            if (tabId === 'library') {
                renderLibrary();
            }
            
            // 作成タブが選択された場合、テンプレートが未選択なら初期ガイドを表示
            if (tabId === 'create' && !selectedTemplate) {
                showInitialGuide();
            }
        });
    });
}

// 追加の便利な関数: ガイドを非表示にする
function hideInitialGuide() {
    const guideElement = document.getElementById('initial-guide');
    if (guideElement) {
        guideElement.style.display = 'none';
    }
}

// テンプレート選択関数も修正
function initTemplateSelection() {
    const templates = document.querySelectorAll('.template-card');
    
    templates.forEach(template => {
        template.addEventListener('click', function() {
            // すべてのテンプレートから selected クラスを削除
            templates.forEach(t => t.classList.remove('selected'));
            
            // クリックされたテンプレートに selected クラスを追加
            this.classList.add('selected');
            
            // 選択されたテンプレートを保存
            selectedTemplate = this.getAttribute('data-template');
            
            // 初期ガイドを非表示
            hideInitialGuide();
            
            // テンプレートに応じたカスタマイズフォームを表示
            showCustomizeForm(selectedTemplate);
        });
    });
}

// ボタン操作の初期化
function initButtons() {
    // 順次実行のステップ追加ボタン
    const addStepButton = document.getElementById('add-sequence-step');
    if (addStepButton) {
        addStepButton.addEventListener('click', addSequenceStep);
    }
    
    // コード生成ボタン
    const generateButton = document.getElementById('generate-btn');
    if (generateButton) {
        generateButton.addEventListener('click', generateCode);
    }
    
    // コードコピーボタン
    const copyCodeButton = document.getElementById('copy-code-btn');
    if (copyCodeButton) {
        copyCodeButton.addEventListener('click', () => copyToClipboard('generated-code'));
    }
    
    // 詳細コードコピーボタン
    const copyDetailButton = document.getElementById('copy-detail-btn');
    if (copyDetailButton) {
        copyDetailButton.addEventListener('click', () => copyToClipboard('detail-code'));
    }
    
    // 編集ボタン
    const editButton = document.getElementById('edit-btn');
    if (editButton) {
        editButton.addEventListener('click', editGeneratedCode);
    }
    
    // 保存ボタン
    const saveButton = document.getElementById('save-btn');
    if (saveButton) {
        saveButton.addEventListener('click', saveToLibrary);
    }
    
    // 新規作成ボタン
    const createNewButton = document.getElementById('create-new-btn');
    if (createNewButton) {
        createNewButton.addEventListener('click', goToCreateTab);
    }
    
    // スタート作成ボタン（空のライブラリ用）
    const startCreateButton = document.getElementById('start-create-btn');
    if (startCreateButton) {
        startCreateButton.addEventListener('click', goToCreateTab);
    }
    
    // モーダル閉じるボタン
    const closeDetailButton = document.getElementById('close-detail-btn');
    if (closeDetailButton) {
        closeDetailButton.addEventListener('click', closeDetailModal);
    }
    
    // 検索ボックス
    const searchBox = document.getElementById('library-search');
    if (searchBox) {
        searchBox.addEventListener('input', filterLibrary);
    }
    
    // 結果セクション内の言語切り替えトグル
    const resultLanguageToggles = document.querySelectorAll('.result-language-selection .language-toggle');
    resultLanguageToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const language = this.getAttribute('data-language');
            setSelectedLanguage(language);
            
            // 他のトグルのアクティブ状態を更新
            updateLanguageToggles(language);
            
            // コードを再生成
            generateCode();
        });
    });
    
    // モーダル内の言語切り替えトグル
    const modalLanguageToggles = document.querySelectorAll('.modal-language-selection .language-toggle');
    modalLanguageToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const language = this.getAttribute('data-language');
            setSelectedLanguage(language);
            
            // 他のトグルのアクティブ状態を更新
            updateLanguageToggles(language);
            
            // 現在表示中のコード詳細を更新
            updateDetailCodeLanguage();
        });
    });
}

// すべての言語トグルのアクティブ状態を更新
function updateLanguageToggles(language) {
    const allToggles = document.querySelectorAll('.language-toggle');
    allToggles.forEach(toggle => {
        if (toggle.getAttribute('data-language') === language) {
            toggle.classList.add('active');
        } else {
            toggle.classList.remove('active');
        }
    });
}

// コード詳細モーダルの言語を更新
function updateDetailCodeLanguage() {
    // 現在開いているコード詳細のIDを取得
    const detailTitle = document.getElementById('detail-title').textContent;
    const detailItem = codeLibrary.find(item => item.title === detailTitle);
    
    if (detailItem) {
        // 選択された言語に基づいてコードと説明を更新
        const language = getSelectedLanguage();
        const codeKey = language === 'python' ? 'pythonCode' : 'code';
        const explanationKey = language === 'python' ? 'pythonExplanation' : 'explanation';
        
        document.getElementById('detail-code').textContent = detailItem[codeKey] || detailItem.code;
        document.getElementById('detail-explanation').innerHTML = detailItem[explanationKey] || detailItem.explanation;
        
        // ファイル名の拡張子を更新
        const extension = language === 'python' ? '.py' : '.c';
        const baseFileName = detailItem.fileName.replace(/\.[^/.]+$/, "");
        document.getElementById('detail-filename').textContent = baseFileName + extension;
        
        // シンタックスハイライトを更新
        updateSyntaxHighlighting();
    }
}

// コードをクリップボードにコピー
function copyToClipboard(elementId) {
    const codeElement = document.getElementById(elementId);
    const codeText = codeElement.textContent;
    
    navigator.clipboard.writeText(codeText)
        .then(() => {
            alert('コードをクリップボードにコピーしました！');
        })
        .catch(err => {
            console.error('コピーに失敗しました:', err);
            alert('コピーに失敗しました。');
        });
}

// 作成タブに移動
function goToCreateTab() {
    // 作成タブをアクティブに
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector('.nav-tab[data-tab="create"]').classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById('create-tab').classList.add('active');
    
    // テンプレート選択がまだなら初期ガイドを表示
    if (!selectedTemplate) {
        showInitialGuide();
    }
}