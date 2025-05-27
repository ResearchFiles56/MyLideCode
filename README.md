
# MyLifeCode

**Daily Life Programming Personal Library**

MyLifeCode is a web application that represents daily life scenarios as programming code to support programming learning for beginners.

## 🌟 Features

- 📝 **Intuitive Code Generation**: Automatically generate code by mapping daily activities to fundamental programming concepts (sequential execution, conditional branching, loops)
- 🔄 **Multi-language Support**: Generate and display code in both C and Python
- ✅ **Real-time Input Validation**: Visual feedback for error states with detailed guidance messages
- 📚 **Personal Library**: Save and manage generated code for reference anytime
- 📱 **Responsive Design**: Compatible with all devices from desktop to mobile
- 🎨 **Syntax Highlighting**: Color-coded code display for better readability

## 🚀 Demo

[View Live Demo](https://yourusername.github.io/MyLifeCode/)

## 📖 Usage

### 1. Select Template
Choose from three fundamental programming concepts:
- **Sequential Execution**: Series of actions executed in order (morning routines, cooking procedures, etc.)
- **Conditional Branching**: Situations where actions change based on conditions (clothing selection based on weather, time-based actions, etc.)
- **Loops**: Repeating the same action a set number of times (10 push-ups, climbing 5 floors, etc.)

### 2. Customize Scenario
- Enter title and description
- Set detailed information according to each template
- Add, delete, and reorder steps (for sequential execution)
- Real-time input validation for immediate error checking and correction

### 3. Generate and Save Code
- Generate code in C or Python
- Review explanations of the generated code
- Add memos and tags to save in library

### 4. Library Management
- Display saved code in list view
- Quickly find target code using tags and search functionality
- View code details and copy functionality

## 🛠️ Technology Stack

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

- [highlight.js](https://highlightjs.org/) - Syntax highlighting functionality
- [cdnjs](https://cdnjs.com/) - CDN service
- All testers and those who provided feedback