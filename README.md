# StyleDNA - AI-Powered Fashion Style Assessment

StyleDNA is a React Native mobile application that uses AI to analyze users' fashion preferences and provide personalized style recommendations through an interactive quiz interface.

## 🚀 Features

- **Interactive Style Quiz**: Rate fashion items to discover your style preferences
- **AI-Powered Analysis**: Advanced algorithm analyzes your choices to create a unique style genome
- **Personalized Recommendations**: Get 4 curated fashion recommendations based on your preferences
- **Visual Style Genome**: See your style broken down into chromatic, silhouette, texture, and context preferences
- **Clean UI/UX**: Modern, dark-themed interface optimized for mobile

## 📱 Screenshots

The app includes:
- Welcome/Onboarding screen
- Interactive quiz with fashion item rating
- Results screen showing your Style DNA™
- Recommendations screen with personalized fashion items

## 🛠️ Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for screen navigation
- **Redux Toolkit** for state management
- **React Native Gesture Handler** for smooth interactions

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd StyleDNA-Production
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your device:
- Install Expo Go app on your phone
- Scan the QR code from the terminal
- Or press `a` for Android emulator, `i` for iOS simulator

## 📦 Build Commands

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS  
npm run ios

# Run on web
npm run web

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## 🏗️ Project Structure

```
StyleDNA-Production/
├── src/
│   ├── screens/           # App screens
│   │   ├── OnboardingScreen.tsx
│   │   ├── QuizScreen.tsx
│   │   ├── ResultsScreen.tsx
│   │   └── RecommendationsScreen.tsx
│   ├── navigation/        # Navigation setup
│   │   └── AppNavigator.tsx
│   └── store/            # Redux store
│       └── index.ts
├── App.tsx               # Main app component
├── package.json          # Dependencies
└── README.md            # This file
```

## 🎨 Key Features Explained

### Style Quiz
- Users rate 8 randomly selected fashion items
- Clean interface with just images and like/dislike buttons
- Progress tracking throughout the quiz

### Style Genome Analysis
- Analyzes user preferences across multiple dimensions:
  - **Chromatic**: Color preferences (Bold & Dramatic, Cool & Sophisticated, etc.)
  - **Silhouette**: Shape preferences (Classic & Versatile, Refined & Structured, etc.)
  - **Texture**: Material preferences (Structured & Layered, Flowing & Feminine, etc.)
  - **Context**: Occasion preferences (Professional & Polished, Relaxed & Approachable, etc.)

### Personalized Recommendations
- Advanced scoring algorithm matches items to user preferences
- Shows 4 top recommendations in a clean 2x2 grid
- Match percentages for personalized items
- High-quality fashion images from Unsplash

## 🔧 Configuration

The app is configured for:
- **Dark theme** throughout the interface
- **Portrait orientation** only
- **iOS and Android** compatibility
- **Web deployment** ready

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or issues, please open an issue in the repository.

---

**StyleDNA** - Discover Your Visual Style Genome™
