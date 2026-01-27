# Dude, Where's My Cash?

A modern personal finance management application built with React, TypeScript, and Firebase.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.2-orange.svg)](https://firebase.google.com/)

## About

**Dude, Where's My Cash?** helps you track your expenses, manage multiple wallets, organize transactions by categories, and monitor your budgets in real-time. Built with modern web technologies for a fast, secure, and responsive experience.

## Features

- **User Authentication** - Secure login with Firebase Authentication
- **Multi-Wallet Support** - Manage multiple accounts with custom icons and colors
- **Transaction Tracking** - Record and categorize income and expenses
- **Custom Categories** - Organize spending with personalized categories
- **Budget Management** - Set and monitor monthly budgets
- **Real-time Sync** - Data synced across all your devices
- **Responsive Design** - Beautiful UI that works on desktop, tablet, and mobile
- **Date Navigation** - Browse transactions by month and year
- **Visual Analytics** - Charts and insights for your spending patterns

## Tech Stack

- **Frontend:** React 19, TypeScript
- **Build Tool:** Vite 7
- **UI Framework:** Material-UI (MUI) v7
- **State Management:** React Context + TanStack Query
- **Forms:** React Hook Form
- **Backend:** Firebase (Auth + Firestore)
- **Routing:** React Router v7
- **Testing:** Vitest + Testing Library
- **Styling:** Sass/SCSS + Emotion

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/dwmc.git
cd dwmc
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173)

## Scripts

| Command                 | Description              |
| ----------------------- | ------------------------ |
| `npm run dev`           | Start development server |
| `npm run build`         | Build for production     |
| `npm run preview`       | Preview production build |
| `npm run lint`          | Run ESLint               |
| `npm test`              | Run tests                |
| `npm run test:ui`       | Open test UI             |
| `npm run test:coverage` | Generate coverage report |
| `npm run deploy`        | Deploy to Firebase       |

## Project Structure

```
src/
├── components/      # Reusable UI components
├── context/         # React Context providers
├── hooks/           # Custom React hooks
├── layouts/         # Layout components
├── pages/           # Page components
├── routes/          # Routing configuration
├── services/        # Firebase services
├── theme/           # MUI theme config
├── types/           # TypeScript types
└── utils/           # Utility functions
```

## Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Generate coverage
npm run test:coverage
```

## Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Add security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{collection}/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Material-UI](https://mui.com/) for the component library
- [Firebase](https://firebase.google.com/) for backend services
- [Vite](https://vitejs.dev/) for the build tool
- [TanStack Query](https://tanstack.com/query) for data management
