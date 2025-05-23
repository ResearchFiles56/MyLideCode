// validation.js - 統合修正版（重複削除・動作確認済み）

// 入力検証関数
function validateInputs() {
    const errors = [];
    
    // 共通項目の検証
    const title = document.getElementById('scene-title').value.trim();
    const description = document.getElementById('scene-description').value.trim();
    
    if (!title) {
        errors.push('タイトルを入力してください');
        markFieldAsError('scene-title');
    } else {
        markFieldAsValid('scene-title');
    }
    
    if (!description) {
        errors.push('説明を入力してください');
        markFieldAsError('scene-description');
    } else {
        markFieldAsValid('scene-description');
    }
    
    // テンプレート別の検証
    switch (selectedTemplate) {
        case 'sequence':
            validateSequenceInputs(errors);
            break;
        case 'condition':
            validateConditionInputs(errors);
            break;
        case 'loop':
            validateLoopInputs(errors);
            break;
    }
    
    return errors;
}

// 順次実行テンプレートの検証（厳密版）
function validateSequenceInputs(errors) {
    const stepInputs = document.querySelectorAll('#sequence-steps .step-input');
    let hasError = false;
    let emptyStepsNumbers = [];
    
    console.log(`順次処理検証開始: ${stepInputs.length}個のステップをチェック`);
    
    stepInputs.forEach((input, index) => {
        const value = input.value.trim();
        const stepNumber = index + 1;
        
        console.log(`ステップ${stepNumber}: "${value}" (${value ? '入力あり' : '空欄'})`);
        
        if (!value) {
            // 未入力のステップがある場合
            hasError = true;
            emptyStepsNumbers.push(stepNumber);
            markFieldAsError(input.id || `step-${index}`);
        } else {
            // 入力されている場合
            markFieldAsValid(input.id || `step-${index}`);
        }
    });
    
    // エラーがある場合、具体的なメッセージを追加
    if (hasError) {
        if (emptyStepsNumbers.length === 1) {
            errors.push(`ステップ${emptyStepsNumbers[0]}を入力してください`);
        } else {
            errors.push(`ステップ${emptyStepsNumbers.join('、')}を入力してください`);
        }
        console.log(`順次処理エラー検出: ステップ${emptyStepsNumbers.join('、')}が未入力`);
    }
    
    // ステップが1つもない場合のチェック
    if (stepInputs.length === 0) {
        errors.push('少なくとも1つのステップを追加してください');
        console.log('順次処理エラー: ステップが存在しません');
    }
    
    console.log(`順次処理検証完了: ${hasError ? 'エラーあり' : 'エラーなし'}`);
}

// 条件分岐テンプレートの検証
function validateConditionInputs(errors) {
    const fields = [
        { id: 'condition-situation', name: '状況' },
        { id: 'condition1', name: '条件1' },
        { id: 'action1', name: '行動1' },
        { id: 'condition2', name: '条件2' },
        { id: 'action2', name: '行動2' },
        { id: 'action3', name: 'デフォルト行動' }
    ];
    
    fields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element) {
            console.warn(`要素が見つかりません: ${field.id}`);
            return;
        }
        
        const value = element.value.trim();
        
        if (!value) {
            errors.push(`${field.name}を入力してください`);
            markFieldAsError(field.id);
        } else {
            markFieldAsValid(field.id);
        }
    });
}

// 繰り返しテンプレートの検証
function validateLoopInputs(errors) {
    const fields = [
        { id: 'loop-count', name: '繰り返し回数', type: 'number' },
        { id: 'loop-action', name: '繰り返す行動', type: 'text' },
        { id: 'after-loop', name: 'ループ後の行動', type: 'text' }
    ];
    
    fields.forEach(field => {
        const element = document.getElementById(field.id);
        if (!element) {
            console.warn(`要素が見つかりません: ${field.id}`);
            return;
        }
        
        const value = element.value.trim();
        
        if (!value) {
            errors.push(`${field.name}を入力してください`);
            markFieldAsError(field.id);
        } else if (field.type === 'number') {
            const numValue = parseInt(value);
            if (isNaN(numValue) || numValue <= 0 || numValue > 1000) {
                errors.push('繰り返し回数は1から1000の間の数値を入力してください');
                markFieldAsError(field.id);
            } else {
                markFieldAsValid(field.id);
            }
        } else {
            markFieldAsValid(field.id);
        }
    });
    
    // カウンター変数名は任意なので検証しない（空でもOK）
    const countVar = document.getElementById('loop-count-var');
    if (countVar) {
        markFieldAsValid('loop-count-var'); // 任意フィールドなので常に有効
    }
}

// フィールドをエラー状態にマーク
function markFieldAsError(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('error');
        field.classList.remove('valid');
        console.log(`フィールドエラー設定: ${fieldId}`);
    } else {
        console.warn(`フィールドが見つかりません: ${fieldId}`);
    }
}

// フィールドを有効状態にマーク
function markFieldAsValid(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.remove('error');
        field.classList.add('valid');
    }
}

// エラーメッセージを表示
function showErrorMessage(errors) {
    console.log('エラーメッセージ表示:', errors);
    
    // 既存のエラーメッセージを削除
    removeErrorMessage();
    
    if (errors.length === 0) return;
    
    // エラーメッセージ要素を作成
    const errorContainer = document.createElement('div');
    errorContainer.id = 'error-message-container';
    errorContainer.className = 'error-message-container';
    
    const errorTitle = document.createElement('div');
    errorTitle.className = 'error-title';
    errorTitle.textContent = '入力エラーがあります：';
    
    const errorList = document.createElement('ul');
    errorList.className = 'error-list';
    
    errors.forEach(error => {
        const listItem = document.createElement('li');
        listItem.textContent = error;
        errorList.appendChild(listItem);
    });
    
    errorContainer.appendChild(errorTitle);
    errorContainer.appendChild(errorList);
    
    // 生成ボタンの前に挿入
    const generateButton = document.getElementById('generate-btn');
    if (generateButton) {
        generateButton.parentNode.insertBefore(errorContainer, generateButton);
        
        // エラーメッセージまでスクロール
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        console.error('生成ボタンが見つかりません');
    }
}

// エラーメッセージを削除
function removeErrorMessage() {
    const existingError = document.getElementById('error-message-container');
    if (existingError) {
        existingError.remove();
    }
}

// 成功メッセージを表示
function showSuccessMessage() {
    removeErrorMessage(); // エラーメッセージがあれば削除
    
    // 簡単な成功メッセージ（必要に応じて）
    const allFields = document.querySelectorAll('.form-control');
    allFields.forEach(field => {
        field.classList.remove('error');
    });
}

// 修正されたgenerateCode関数（検証を統合）
function generateCodeWithValidation() {
    console.log('コード生成検証開始');
    console.log('選択されたテンプレート:', selectedTemplate);
    
    // 入力検証を実行
    const errors = validateInputs();
    
    console.log('検証結果:', errors);
    
    if (errors.length > 0) {
        showErrorMessage(errors);
        return; // エラーがある場合は処理を停止
    }
    
    // 検証が成功した場合、成功状態を表示
    showSuccessMessage();
    
    console.log('検証成功 - コード生成を実行');
    
    // 既存のコード生成処理を実行
    generateCode();
}

// 検証状態を即座に更新する関数
function updateValidationStatus() {
    // 現在エラーメッセージが表示されている場合のみ更新
    const existingError = document.getElementById('error-message-container');
    if (existingError) {
        const errors = validateInputs();
        if (errors.length === 0) {
            removeErrorMessage();
        } else {
            // エラーメッセージを更新
            removeErrorMessage();
            showErrorMessage(errors);
        }
    }
}

// リアルタイム検証（入力時にエラー状態をクリア）
function initRealTimeValidation() {
    // 全ての入力フィールドに対してイベントリスナーを追加
    document.addEventListener('input', function(event) {
        if (event.target.classList.contains('form-control')) {
            // 入力があったフィールドのエラー状態をクリア
            if (event.target.value.trim() !== '') {
                markFieldAsValid(event.target.id);
                
                // エラーメッセージも更新（全体を再検証）
                const errors = validateInputs();
                if (errors.length === 0) {
                    removeErrorMessage();
                }
            }
        }
    });
}

// デバッグ用：現在の状態を確認する関数
function debugValidationStatus() {
    console.log('=== デバッグ情報 ===');
    console.log('選択されたテンプレート:', selectedTemplate);
    
    if (selectedTemplate === 'sequence') {
        const stepInputs = document.querySelectorAll('#sequence-steps .step-input');
        console.log('ステップ数:', stepInputs.length);
        stepInputs.forEach((input, index) => {
            console.log(`ステップ${index + 1}: "${input.value}" (ID: ${input.id})`);
        });
    }
    
    const errors = validateInputs();
    console.log('現在のエラー:', errors);
    console.log('==================');
}