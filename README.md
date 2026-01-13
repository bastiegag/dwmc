# Dude, where's my cash? - Personal Finance Manager

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.2.1-orange.svg)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF.svg)](https://vitejs.dev/)
[![MUI](https://img.shields.io/badge/MUI-7.3.7-007FFF.svg)](https://mui.com/)

A modern personal finance management application built with React, TypeScript, and Firebase. Track your transactions, manage multiple wallets, organize expenses by categories, and monitor your budgets all in one place.

## ✨ Features

- 🔐 **User Authentication** - Secure sign-up and login with Firebase Authentication
- 💼 **Multi-Wallet Support** - Create and manage multiple wallets with custom icons and colors
- 💸 **Transaction Tracking** - Record income and expenses with detailed categorization
- 📂 **Category Management** - Organize transactions with customizable categories
- 📊 **Budget Planning** - Set and monitor budgets for better financial control
- ⚡ **Real-time Sync** - Data synchronized across devices via Firebase Firestore
- 📱 **Responsive Design** - Beautiful Material-UI interface that works on all devices
- 📅 **Date Navigation** - Browse transactions by month and year
- 📈 **Visual Analytics** - Charts and statistics to visualize your spending patterns

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **UI Framework**: Material-UI (MUI) v7
- **State Management**: React Context API + TanStack Query (React Query)
- **Testing**: Vitest + Testing Library

## 🚀 **Backend**: Firebase (Authentication & Firestore)

- **Routing**: React Router v7
- **Icons**: Tabler Icons
- **Date Management**: Day.js
- **Charts**: MUI X Charts
- **Styling**: Sass/SCSS + Emotion

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase project with Firestore and Authentication enabled

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd App
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Firebase:

   - Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase config and update `src/firebaseConfig.ts`

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run test` - Run tests with Vitest
- `npm run test:ui` - Open Vitest UI
- `npm run test:coverage` - Generate test coverage report
- `npm run deploy` - Deploy to Firebase Hosting

## 📁 Project Structure

```
src/
├── assets/          # Images and global styles
├── components/      # Reusable UI components
│   ├── fields/      # Form field components
│   ├── forms/       # Form components
│   ├── icons/       # Icon components
│   └── widgets/     # Widget components
├── context/         # React Context providers
├── hooks/           # Custom React hooks
├── layouts/         # Layout components
├── pages/           # Page components
├── routes/          # Routing configuration
├── services/        # API and Firebase services
├── theme/           # MUI theme configuration
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Firebase Security Rules

Make sure to set up appropriate Firestore security rules to protect user data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
    }
  }
}

## Author

Sébastien Gagné

## Acknowledgments

- Material-UI for the beautiful component library
- Firebase for the backend infrastructure
- The React and TypeScript communities for excellent documentation and support
```
