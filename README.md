# MyLifeCode

**Daily Life Programming Personal Library**

MyLifeCodeは、日常生活のシーンをプログラミングコードとして表現し、初学者のプログラミング学習をサポートするWebアプリケーションです。

## 🌟 特徴

- 📝 **直感的なコード生成**: 日常的な行動をプログラミングの基本概念（順次実行、条件分岐、繰り返し）に当てはめてコードを自動生成
- 🔄 **多言語対応**: C言語とPythonの両方でコードを生成・表示
- ✅ **リアルタイム入力検証**: エラー状態の視覚的フィードバックと詳細なガイダンスメッセージ
- 📚 **パーソナルライブラリ**: 生成したコードを保存・管理し、いつでも参照可能
- 📱 **レスポンシブデザイン**: デスクトップからモバイルまで、あらゆるデバイスに対応
- 🎨 **シンタックスハイライト**: コードを見やすく色分け表示

## 📖 使い方

### 1. テンプレートを選択
3つの基本的なプログラミング概念から選択します：
- **順次実行**: 朝の準備ルーティンなど、順番に実行する一連の動作
- **条件分岐**: 天気による服装選びなど、条件によって行動が変わる状況
- **繰り返し**: 腕立て伏せ10回など、同じ動作を決まった回数繰り返す状況

### 2. シーンをカスタマイズ
- タイトルと説明を入力
- 各テンプレートに応じた詳細情報を設定
- ステップの追加・削除・並び替え（順次実行の場合）
- リアルタイム入力検証でエラーを即座に確認・修正

### 3. コードを生成・保存
- C言語またはPythonでコードを生成
- 生成されたコードの解説を確認
- メモやタグを追加してライブラリに保存

### 4. ライブラリで管理
- 保存したコードを一覧表示
- タグや検索機能で目的のコードを素早く発見
- コードの詳細表示・コピー機能

## 🛠️ 技術スタック

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS (Responsive Design)
- **Syntax Highlighting**: [highlight.js](https://highlightjs.org/)
- **Input Validation**: Real-time validation system using Pure JavaScript
- **Data Storage**: Browser Local Storage
- **Hosting**: GitHub Pages

## 📁 Project Structure

```
MyLifeCode/
├── index.html              # Main HTML file
├── styles.css              # Stylesheet
├── main.js                 # Main functionality and initialization
├── templateForms.js        # Template form management
├── codeGenerator.js        # Code generation engine
├── library.js              # Library functionality
├── languageSelector.js     # Language switching functionality
├── validation.js           # Input validation and error handling
└── README.md              # This file
```

## 🚀 Setup and Execution

### Local Environment Execution

1. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/MyLifeCode.git
   cd MyLifeCode
   ```

2. **Open Directly in Browser**
   ```bash
   # Open file directly in browser
   open index.html
   ```

3. **Run with Local Server (Recommended)**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Or Node.js Live Server
   npx live-server
   ```

   Access via browser at `http://localhost:8000`

### GitHub Pages Deployment

1. Create repository on GitHub
2. Push files
3. Enable GitHub Pages in repository settings
4. Access at `https://yourusername.github.io/MyLifeCode/`

## 🎯 Target Users

- **Programming Beginners**: Those who want to understand basic programming concepts through daily life examples

## 🔮 Future Vision

### Planned Improvements

1. **Natural Language Processing Integration**
   - More natural and flexible code generation through Large Language Model (LLM) utilization

2. **Template Expansion**
   - Support for more diverse programming patterns
   - Addition of functions, arrays, and object-oriented concepts

3. **Usability Enhancement**
   - UI/UX improvements based on user testing results
   - Accessibility feature strengthening

### Technical Improvements

- More advanced input validation and user guidance
- Performance optimization
- Additional programming language support (JavaScript, Java, etc.)

## 🐛 Known Issues and Limitations

- Template sentence combinations sometimes generate unnatural Japanese expressions
- Generated code patterns are limited to basic structures
- Data persistence limitations due to dependence on browser Local Storage

## ✨ New Features

### Input Validation System
- **Real-time Validation**: Immediate display of error states during input
- **Visual Feedback**: Color-coded field states (normal/error)
- **Detailed Error Messages**: Guidance showing specific correction methods
- **Template-specific Validation**: Validation rules specialized for each template

## 📄 License

This project is released under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [highlight.js](https://highlightjs.org/) - シンタックスハイライト機能
- [cdnjs](https://cdnjs.com/) - CDNサービス
- すべてのテスターとフィードバックを提供してくれた方々
