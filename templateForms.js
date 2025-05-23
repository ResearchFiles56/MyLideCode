// templateForms.js - 統合修正版（重複削除・動作確認済み）

// テンプレートに応じたカスタマイズフォームの表示
function showCustomizeForm(template) {
    // カスタマイズセクションを表示
    document.getElementById('customize-section').style.display = 'block';
    
    // 既存のエラーメッセージを削除
    if (typeof removeErrorMessage === 'function') {
        removeErrorMessage();
    }
    
    // 全てのフィールドのエラー状態をクリア
    const allFields = document.querySelectorAll('.form-control');
    allFields.forEach(field => {
        field.classList.remove('error', 'valid');
    });
    
    // すべての入力フォームを非表示
    document.getElementById('sequence-inputs').style.display = 'none';
    document.getElementById('condition-inputs').style.display = 'none';
    document.getElementById('loop-inputs').style.display = 'none';
    
    // テンプレートの説明を更新
    const templateDescription = document.getElementById('template-description');
    
    // 選択されたテンプレートに応じたフォームを表示
    switch (template) {
        case 'sequence':
            templateDescription.textContent = '日常の一連の行動を順番に実行するコードを作成します。各ステップを入力してください。ドラッグ&ドロップで順序を変更できます。数字をクリックするとステップを削除できます。';
            document.getElementById('sequence-inputs').style.display = 'block';
            document.getElementById('scene-title').value = '朝の準備ルーティン';
            document.getElementById('scene-description').value = '平日の朝に行う一連の準備行動';
            // 既存のステップに削除イベントを追加
            initSequenceStepEvents();
            // ドラッグ&ドロップの初期化
            initDragAndDrop();
            break;
            
        case 'condition':
            templateDescription.textContent = '条件によって行動が変わる状況をコード化します。各条件と行動を入力してください。';
            document.getElementById('condition-inputs').style.display = 'block';
            document.getElementById('scene-title').value = '天気による服装選び';
            document.getElementById('scene-description').value = '天気予報に基づいて外出時の服装や持ち物を決める';
            break;
            
        case 'loop':
            templateDescription.textContent = '同じ行動を指定回数繰り返す状況をコード化します。繰り返す回数と行動を入力してください。';
            document.getElementById('loop-inputs').style.display = 'block';
            document.getElementById('scene-title').value = '腕立て伏せのトレーニング';
            document.getElementById('scene-description').value = '毎朝の筋トレルーティンで腕立て伏せを指定回数行う';
            break;
    }
    
    // 結果セクションを非表示
    document.getElementById('result-section').style.display = 'none';
    
    // ページをカスタマイズセクションまでスクロール
    document.getElementById('customize-section').scrollIntoView({ behavior: 'smooth' });
}

// 順次実行のステップ追加
function addSequenceStep() {
    const stepsContainer = document.getElementById('sequence-steps');
    const stepCount = stepsContainer.children.length + 1;
    
    const stepItem = document.createElement('div');
    stepItem.className = 'step-item';
    stepItem.draggable = true;
    
    stepItem.innerHTML = `
        <div class="step-handle">⋮⋮</div>
        <div class="step-number" title="クリックでステップを削除">${stepCount}</div>
        <input type="text" class="form-control step-input" id="step-input-${stepCount-1}" placeholder="例: 新しいステップ">
    `;
    
    // 番号クリックでステップ削除
    addStepDeleteEvent(stepItem);
    
    // ドラッグ&ドロップイベントを追加
    addDragEvents(stepItem);
    
    stepsContainer.appendChild(stepItem);
    
    // 新しいステップにフォーカス
    const newInput = stepItem.querySelector('.step-input');
    newInput.focus();
    
    // リアルタイム検証イベントを追加
    newInput.addEventListener('input', function() {
        if (typeof markFieldAsValid === 'function' && typeof markFieldAsError === 'function') {
            if (this.value.trim() !== '') {
                markFieldAsValid(this.id);
            } else {
                markFieldAsError(this.id);
            }
        }
        
        // エラーメッセージの更新
        if (typeof updateValidationStatus === 'function') {
            updateValidationStatus();
        }
    });
}

// 既存のステップに削除イベントを追加
function initSequenceStepEvents() {
    const stepsContainer = document.getElementById('sequence-steps');
    const stepItems = stepsContainer.querySelectorAll('.step-item');
    
    stepItems.forEach((stepItem, index) => {
        const stepNumber = stepItem.querySelector('.step-number');
        const stepInput = stepItem.querySelector('.step-input');
        
        // IDを設定
        stepInput.id = `step-input-${index}`;
        
        // ステップ番号要素にタイトルと削除イベントを追加
        stepNumber.title = "クリックでステップを削除";
        addStepDeleteEvent(stepItem);
        
        // リアルタイム検証イベントを追加
        stepInput.addEventListener('input', function() {
            if (typeof markFieldAsValid === 'function' && typeof markFieldAsError === 'function') {
                if (this.value.trim() !== '') {
                    markFieldAsValid(this.id);
                } else {
                    markFieldAsError(this.id);
                }
            }
            
            // エラーメッセージの更新
            if (typeof updateValidationStatus === 'function') {
                updateValidationStatus();
            }
        });
    });
}

// ステップに削除イベントを追加する
function addStepDeleteEvent(stepItem) {
    const stepNumber = stepItem.querySelector('.step-number');
    
    // 番号クリックでステップ削除
    stepNumber.addEventListener('click', function() {
        if (confirm('このステップを削除しますか？')) {
            deleteSequenceStep(stepItem);
        }
    });
    
    // カーソルをポインターに変更してクリック可能と示す
    stepNumber.style.cursor = 'pointer';
}

// 順次実行のステップ削除
function deleteSequenceStep(stepItem) {
    const stepsContainer = document.getElementById('sequence-steps');
    
    // 最後の1つのステップは削除できないようにする（オプション）
    if (stepsContainer.children.length <= 1) {
        alert('最低1つのステップが必要です。');
        return;
    }
    
    // ステップを削除
    stepsContainer.removeChild(stepItem);
    
    // 残りのステップの番号とIDを振り直す
    renumberSteps();
    
    // 検証状態を更新
    if (typeof updateValidationStatus === 'function') {
        updateValidationStatus();
    }
}

// ステップの番号を振り直す
function renumberSteps() {
    const stepsContainer = document.getElementById('sequence-steps');
    const remainingSteps = stepsContainer.querySelectorAll('.step-item');
    
    remainingSteps.forEach((step, index) => {
        const stepNumber = step.querySelector('.step-number');
        const stepInput = step.querySelector('.step-input');
        
        // 番号を更新
        stepNumber.textContent = index + 1;
        
        // IDを更新
        stepInput.id = `step-input-${index}`;
    });
}

// ドラッグ&ドロップの初期化
function initDragAndDrop() {
    const stepsContainer = document.getElementById('sequence-steps');
    const stepItems = stepsContainer.querySelectorAll('.step-item');
    
    stepItems.forEach(stepItem => {
        addDragEvents(stepItem);
    });
    
    // コンテナにドロップエリアイベントを追加
    stepsContainer.addEventListener('dragover', function(e) {
        e.preventDefault();
        const afterElement = getDragAfterElement(stepsContainer, e.clientY);
        const draggable = document.querySelector('.dragging');
        
        if (afterElement == null) {
            stepsContainer.appendChild(draggable);
        } else {
            stepsContainer.insertBefore(draggable, afterElement);
        }
    });
    
    stepsContainer.addEventListener('drop', function(e) {
        e.preventDefault();
        const draggable = document.querySelector('.dragging');
        draggable.classList.remove('dragging');
        
        // ドロップ後に番号とIDを振り直す
        renumberSteps();
        
        // 検証状態を更新
        if (typeof updateValidationStatus === 'function') {
            updateValidationStatus();
        }
    });
}

// ステップにドラッグイベントを追加
function addDragEvents(stepItem) {
    stepItem.addEventListener('dragstart', function() {
        stepItem.classList.add('dragging');
    });
    
    stepItem.addEventListener('dragend', function() {
        stepItem.classList.remove('dragging');
    });
    
    // ドラッグハンドルの処理
    const handle = stepItem.querySelector('.step-handle');
    handle.addEventListener('mousedown', function() {
        stepItem.draggable = true;
    });
    
    stepItem.addEventListener('mouseup', function() {
        stepItem.draggable = false;
    });
    
    // 入力フィールドではドラッグをキャンセル
    const input = stepItem.querySelector('.step-input');
    input.addEventListener('mousedown', function(e) {
        stepItem.draggable = false;
        e.stopPropagation();
    });
}

// ドラッグ中のアイテムの次の要素を取得
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.step-item:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// 生成したコードを編集する
function editGeneratedCode() {
    // カスタマイズフォームを表示
    document.getElementById('customize-section').style.display = 'block';
    
    // ページをカスタマイズセクションまでスクロール
    document.getElementById('customize-section').scrollIntoView({ behavior: 'smooth' });
}