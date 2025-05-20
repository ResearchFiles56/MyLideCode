// library.js - ライブラリ関連の処理（言語切り替え対応版）

// コードをライブラリに保存
function saveToLibrary() {
    // タイトル、説明、コード、解説を取得
    const title = document.getElementById('scene-title').value;
    const description = document.getElementById('scene-description').value;
    const memo = document.getElementById('code-memo').value;
    const tagsInput = document.getElementById('code-tags').value;
    const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    // デフォルトタグを追加
    if (selectedTemplate && !tags.includes(selectedTemplate)) {
        tags.push(selectedTemplate);
    }
    
    // C言語とPythonのコードと解説を保存
    const cLangCode = document.getElementById('generated-code').textContent;
    const cLangExplanation = document.getElementById('code-explanation').innerHTML;
    
    // いったんPythonに切り替えてPythonコードを生成
    const currentLanguage = getSelectedLanguage();
    setSelectedLanguage('python');
    updateLanguageToggles('python');
    generateCode();
    
    const pythonCode = document.getElementById('generated-code').textContent;
    const pythonExplanation = document.getElementById('code-explanation').innerHTML;
    
    // 元の言語に戻す
    setSelectedLanguage(currentLanguage);
    updateLanguageToggles(currentLanguage);
    generateCode();
    
    // ライブラリに追加
    const codeItem = {
        id: Date.now(), // ユニークIDとして現在のタイムスタンプを使用
        title,
        description,
        code: cLangCode,
        explanation: cLangExplanation,
        pythonCode,
        pythonExplanation,
        memo,
        tags,
        template: selectedTemplate,
        fileName: title.replace(/\s+/g, '_').toLowerCase() + '.c',
        createdAt: new Date().toISOString()
    };
    
    // ライブラリに追加
    codeLibrary.push(codeItem);
    
    // ローカルストレージに保存
    saveLibrary();
    
    // 保存成功メッセージ
    alert(`「${title}」をライブラリに保存しました！`);
    
    // ライブラリタブに切り替え
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector('.nav-tab[data-tab="library"]').classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById('library-tab').classList.add('active');
    
    // ライブラリの表示を更新
    renderLibrary();
}

// ライブラリをローカルストレージから読み込む
function loadLibrary() {
    const savedLibrary = localStorage.getItem('myLifeCodeLibrary');
    if (savedLibrary) {
        codeLibrary = JSON.parse(savedLibrary);
        renderLibrary();
    } else {
        codeLibrary = [];
        renderLibrary();
    }
}

// ライブラリをローカルストレージに保存
function saveLibrary() {
    localStorage.setItem('myLifeCodeLibrary', JSON.stringify(codeLibrary));
}

// ライブラリからコードを削除
function deleteFromLibrary(id) {
    codeLibrary = codeLibrary.filter(item => item.id !== id);
    saveLibrary();
    renderLibrary();
}

// ライブラリの検索/フィルタリング
function filterLibrary() {
    const searchText = document.getElementById('library-search').value.toLowerCase();
    const libraryContainer = document.getElementById('library-container');
    const emptyLibrary = document.getElementById('empty-library');
    
    // 検索テキストが空の場合、すべてのライブラリカードを表示
    if (!searchText) {
        renderLibrary();
        return;
    }
    
    // 検索テキストに一致するアイテムをフィルタリング
    const filteredLibrary = codeLibrary.filter(item => {
        // タイトル、説明、タグを検索
        return item.title.toLowerCase().includes(searchText) ||
               item.description.toLowerCase().includes(searchText) ||
               item.tags.some(tag => tag.toLowerCase().includes(searchText));
    });
    
    // 検索結果が空の場合
    if (filteredLibrary.length === 0) {
        libraryContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <div class="empty-state-text">検索結果が見つかりませんでした</div>
            </div>
        `;
        emptyLibrary.style.display = 'none';
        return;
    }
    
    // 検索結果を表示
    emptyLibrary.style.display = 'none';
    libraryContainer.innerHTML = '';
    
    filteredLibrary.forEach(item => {
        renderLibraryItem(item, libraryContainer);
    });
    
    // カード内のアクションボタンにイベントリスナーを追加
    addLibraryCardListeners();
}

// ライブラリの表示を更新
function renderLibrary() {
    const libraryContainer = document.getElementById('library-container');
    const emptyLibrary = document.getElementById('empty-library');
    
    // ライブラリが空の場合
    if (codeLibrary.length === 0) {
        libraryContainer.innerHTML = '';
        emptyLibrary.style.display = 'block';
        return;
    }
    
    // 空ではない場合
    emptyLibrary.style.display = 'none';
    
    // ライブラリの内容を表示
    libraryContainer.innerHTML = '';
    
    codeLibrary.forEach(item => {
        renderLibraryItem(item, libraryContainer);
    });
    
    // カード内のアクションボタンにイベントリスナーを追加
    addLibraryCardListeners();
}

// ライブラリアイテムをレンダリング
function renderLibraryItem(item, container) {
    const card = document.createElement('div');
    card.className = 'card library-card';
    
    // タグのHTML生成
    const tagsHtml = item.tags.map(tag => `<div class="tag">${tag}</div>`).join('');
    
    card.innerHTML = `
        <div class="library-card-actions">
            <div class="library-card-action" data-action="view" data-id="${item.id}">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%234a6da7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'%3E%3C/path%3E%3Ccircle cx='12' cy='12' r='3'%3E%3C/circle%3E%3C/svg%3E" alt="表示">
            </div>
            <div class="library-card-action" data-action="delete" data-id="${item.id}">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23ff6b6b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='3 6 5 6 21 6'%3E%3C/polyline%3E%3Cpath d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'%3E%3C/path%3E%3C/svg%3E" alt="削除">
            </div>
        </div>
        <div class="card-title">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%234a6da7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'%3E%3C/path%3E%3Cpolyline points='14 2 14 8 20 8'%3E%3C/polyline%3E%3Cline x1='16' y1='13' x2='8' y2='13'%3E%3C/line%3E%3Cline x1='16' y1='17' x2='8' y2='17'%3E%3C/line%3E%3Cpolyline points='10 9 9 9 8 9'%3E%3C/polyline%3E%3C/svg%3E" alt="コード">
            ${item.title}
        </div>
        <div class="card-description">${item.description}</div>
        <div class="library-card-tags">
            ${tagsHtml}
        </div>
    `;
    
    container.appendChild(card);
}

// ライブラリカードにイベントリスナーを追加
function addLibraryCardListeners() {
    const libraryContainer = document.getElementById('library-container');
    
    // カード内のアクションボタンにイベントリスナーを追加
    libraryContainer.querySelectorAll('.library-card-action').forEach(action => {
        action.addEventListener('click', function(e) {
            e.stopPropagation(); // イベントの伝播を停止
            
            const actionType = this.getAttribute('data-action');
            const itemId = Number(this.getAttribute('data-id'));
            
            if (actionType === 'view') {
                showCodeDetail(itemId);
            } else if (actionType === 'delete') {
                if (confirm('このコードをライブラリから削除しますか？')) {
                    deleteFromLibrary(itemId);
                }
            }
        });
    });
    
    // カード全体をクリックしたときも詳細表示
    libraryContainer.querySelectorAll('.library-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = this.querySelector('.library-card-action').getAttribute('data-id');
            showCodeDetail(Number(id));
        });
    });
}

// コード詳細を表示
function showCodeDetail(id) {
    const item = codeLibrary.find(i => i.id === id);
    if (!item) return;
    
    // 現在選択されている言語を取得
    const language = getSelectedLanguage();
    
    // 言語に応じたコードと説明を選択
    const code = language === 'python' ? (item.pythonCode || item.code) : item.code;
    const explanation = language === 'python' ? (item.pythonExplanation || item.explanation) : item.explanation;
    
    // モーダルの内容を設定
    document.getElementById('detail-title').textContent = item.title;
    document.getElementById('detail-description').textContent = item.description;
    
    // ファイル名の拡張子を設定
    const extension = language === 'python' ? '.py' : '.c';
    const baseFileName = item.fileName.replace(/\.[^/.]+$/, "");
    document.getElementById('detail-filename').textContent = baseFileName + extension;
    
    document.getElementById('detail-code').textContent = code;
    document.getElementById('detail-explanation').innerHTML = explanation;
    
    // 言語切り替えタブのアクティブ状態を更新
    const modalLanguageToggles = document.querySelectorAll('.modal-language-selection .language-toggle');
    modalLanguageToggles.forEach(toggle => {
        toggle.classList.remove('active');
        if (toggle.getAttribute('data-language') === language) {
            toggle.classList.add('active');
        }
    });
    
    // メモの表示/非表示
    const memoContainer = document.getElementById('detail-memo-container');
    const memoContent = document.getElementById('detail-memo');
    
    if (item.memo) {
        memoContent.textContent = item.memo;
        memoContainer.style.display = 'block';
    } else {
        memoContainer.style.display = 'none';
    }
    
    // タグの表示
    const tagsContainer = document.getElementById('detail-tags');
    tagsContainer.innerHTML = '';
    
    item.tags.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
    });
    
    // モーダルを表示
    document.getElementById('detail-modal').classList.add('active');
    
    // シンタックスハイライトを適用
    updateSyntaxHighlighting();
}

// 詳細モーダルを閉じる
function closeDetailModal() {
    document.getElementById('detail-modal').classList.remove('active');
}