# DWMC - Copilot Coding Agent Instructions

## Repository Overview

**DWMC** (Dude, Where's My Cash?) is a modern personal finance management web application built with React 19, TypeScript, and Firebase. The app enables users to track transactions, manage multiple wallets, categorize spending, and visualize their financial data.

- **Repository Size**: ~3,200 lines of TypeScript/TSX code
- **Project Type**: Single-page React application (SPA) with Firebase backend
- **Primary Language**: TypeScript
- **Build Tool**: Vite 7.1
- **Runtime**: Node.js v20.19.6, npm 10.8.2

### Tech Stack
- **Frontend**: React 19.1 with TypeScript 5.9
- **Build**: Vite 7.1 with SWC React plugin
- **UI Framework**: Material-UI (MUI) 7.3
- **State Management**: React Context API + TanStack React Query 5.87
- **Backend**: Firebase Authentication & Firestore
- **Styling**: SCSS + Emotion
- **Forms**: React Hook Form 7.62
- **Icons**: Tabler Icons React 3.34
- **Charts**: MUI X-Charts 8.11
- **PWA**: Vite PWA Plugin 1.0

## Critical Build Information

### ⚠️ **KNOWN BUILD ISSUES** ⚠️

The repository has **persistent TypeScript compilation errors** that prevent `npm run build` from succeeding. These errors are NOT your responsibility to fix unless explicitly requested. The errors are:

1. **Type Import Errors**: 23 TypeScript errors related to `verbatimModuleSyntax` requiring type-only imports:
   - Context type imports in `src/context/*` files
   - Hook type imports in `src/hooks/*` files
   - Firebase and React Query type imports

2. **Linting Errors**: 2 ESLint errors related to `react-hooks/set-state-in-effect`:
   - `src/context/AlertProvider.tsx:37` - setState in effect
   - `src/context/DateProvider.tsx:31` - setState in effect

### Build Commands

**⚠️ IMPORTANT**: The `npm run build` command **WILL FAIL** due to TypeScript errors. This is expected behavior in the current codebase.

#### Working Commands:
```bash
# Install dependencies (ALWAYS run first after checkout)
npm install

# Start development server (WORKS - bypasses TypeScript compilation)
npm run dev
# Starts Vite dev server on http://localhost:5182/
# Takes ~238ms to start

# Build for production with Vite only (WORKS - skips TypeScript check)
npx vite build
# Takes ~12 seconds
# Outputs to dist/ directory
# Shows warnings about large chunks (>500KB)

# Run linter (WORKS but shows 2 errors)
npm run lint
# Takes ~5 seconds
```

#### Failing Commands:
```bash
# Build command (FAILS due to TypeScript errors)
npm run build
# Equivalent to: npm install && tsc -b && vite build
# Fails at tsc -b step with 23 errors
```

### Workaround for Building

If you need to build the application:
1. **Skip TypeScript compilation**: Use `npx vite build` instead of `npm run build`
2. The `tsc -b` step is the failure point - Vite build works fine on its own

### Environment Setup

1. **Node Modules**: Always run `npm install` after checkout or when switching branches
   - Takes ~15-25 seconds on CI
   - Installs 682 packages

2. **Firebase Configuration**: Requires environment variables (not checked into repo):
   ```
   VITE_FIREBASE_API_KEY
   VITE_FIREBASE_AUTH_DOMAIN
   VITE_FIREBASE_PROJECT_ID
   VITE_FIREBASE_STORAGE_BUCKET
   VITE_FIREBASE_MESSAGING_SENDER_ID
   VITE_FIREBASE_APP_ID
   VITE_FIREBASE_MEASUREMENT_ID
   ```
   These are read from `src/firebaseConfig.ts`

3. **Clean Build**: To clean and rebuild:
   ```bash
   rm -rf node_modules dist
   npm install
   npx vite build
   ```

## Project Structure

### Root Directory Files
```
.github/              # GitHub workflows and configs
.gitignore            # Git ignore patterns
.prettierrc.json      # Prettier config (tabs, single quotes)
README.md             # Project documentation
eslint.config.js      # ESLint flat config
firebase.json         # Firebase hosting config
index.html            # App entry point HTML
package.json          # Dependencies and scripts
tsconfig.json         # TypeScript project references
tsconfig.app.json     # Main TypeScript config
tsconfig.node.json    # Node/Vite TypeScript config
vite.config.ts        # Vite build configuration
```

### Source Directory Structure (`src/`)
```
src/
├── assets/           # Images and SCSS files
│   ├── img/
│   └── scss/
├── components/       # React components
│   ├── fields/       # Form field components
│   ├── forms/        # Form components
│   ├── icons/        # Icon components
│   └── widgets/      # Widget components
├── context/          # React Context providers
├── hooks/            # Custom React hooks
├── layouts/          # Layout components
├── pages/            # Page components (Login, Home, etc.)
├── routes/           # React Router config
├── services/         # Backend services (Firebase)
│   ├── authentication.ts  # Firebase Auth
│   └── firestore.ts       # Firestore operations
├── theme/            # MUI theme configuration
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── App.tsx           # Main app component
├── firebaseConfig.ts # Firebase configuration
├── main.tsx          # Application entry point
└── vite-env.d.ts     # Vite type definitions
```

### Path Aliases

TypeScript and Vite are configured with path aliases for cleaner imports:
```typescript
import { Component } from 'components/Component';
import { useHook } from 'hooks/useHook';
import { Type } from 'types';
import { utility } from 'utils/utility';
// etc.
```

Configured in `tsconfig.app.json` (baseUrl: "./src") and `vite.config.ts`.

## GitHub Actions CI/CD

### Workflows

1. **Firebase Hosting on PR** (`.github/workflows/firebase-hosting-pull-request.yml`)
   - Triggers: Pull request creation
   - Command: `npm run build`
   - **Status**: Currently failing due to TypeScript errors
   - Runs on: `ubuntu-latest`

2. **Firebase Hosting on Merge** (`.github/workflows/firebase-hosting-merge.yml`)
   - Triggers: Push to main branch
   - Command: `npm run build`
   - **Status**: Currently failing due to TypeScript errors
   - Deploys to: Firebase Hosting (dist/)

### CI Failure History

ALL recent CI builds have failed with the same TypeScript compilation errors. This is a **known issue** with the codebase. The last successful build was commit `075963c5` (September 7, 2025).

**CI Build Time**: ~30-40 seconds before failure (includes checkout, npm install, tsc failure)

## Configuration Files

### TypeScript Configuration

- **Main Config** (`tsconfig.json`): Project references only
- **App Config** (`tsconfig.app.json`):
  - Target: ES2022
  - Module: ESNext with bundler resolution
  - Strict mode enabled
  - **`verbatimModuleSyntax: true`** - This setting causes the type import errors
  - Path aliases configured
  
- **Node Config** (`tsconfig.node.json`): For Vite config file

### ESLint Configuration (`eslint.config.js`)

- Flat config format
- Extends:
  - `@eslint/js` recommended
  - `typescript-eslint` recommended
  - `react-hooks` flat recommended
  - `react-refresh` vite config
- Files: `**/*.{ts,tsx}`
- Ignores: `dist/`

### Prettier Configuration (`.prettierrc.json`)

```json
{
  "useTabs": true,
  "tabSize": 4,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": true
}
```

### Vite Configuration (`vite.config.ts`)

- Base: `./` (relative paths)
- Dev server: Port 5182, auto-opens browser
- Build output: `dist/`
- Plugins: React SWC, PWA
- Manual chunks: Firebase and hooks separated
- Path aliases matching TypeScript config

### Firebase Configuration (`firebase.json`)

- Hosting public directory: `dist/`
- Ignores: `firebase.json`, hidden files, `node_modules/`

## Development Workflow

### Making Code Changes

1. **Always start with**:
   ```bash
   npm install  # Ensure dependencies are up to date
   ```

2. **Test changes locally**:
   ```bash
   npm run dev  # Start dev server
   ```
   - Opens automatically at http://localhost:5182/
   - Hot module replacement enabled

3. **Lint your changes**:
   ```bash
   npm run lint
   ```
   - Expect 2 pre-existing errors (ignore unless fixing them)
   - Your changes should not introduce new lint errors

4. **Build for production** (if needed):
   ```bash
   npx vite build  # Use this instead of npm run build
   ```
   - DO NOT use `npm run build` (will fail on tsc)
   - Output goes to `dist/` directory

### Common Pitfalls

1. **DO NOT** try to fix the TypeScript compilation errors unless explicitly asked
2. **DO NOT** run `npm run build` expecting it to succeed
3. **DO NOT** remove or modify `verbatimModuleSyntax` in tsconfig without approval
4. **ALWAYS** run `npm install` before building or running dev server
5. **REMEMBER** the dev server works fine - only the production build with tsc fails

## Code Style Guidelines

### Import Conventions

Due to `verbatimModuleSyntax` setting, type imports should use `import type`:
```typescript
// Correct (but existing code doesn't follow this)
import type { MyType } from './types';
import { MyFunction } from './utils';

// Current code style (causes TS errors but is used throughout)
import { MyType, MyFunction } from './types';
```

**Note**: Unless fixing the TypeScript errors, maintain consistency with existing import style in the file you're editing.

### Component Style

- Functional components with hooks
- Context API for global state
- TanStack Query for server state
- React Hook Form for forms
- Material-UI components for UI

### File Naming

- Components: PascalCase (e.g., `UserProfile.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Hooks: camelCase with `use` prefix (e.g., `useAuth.tsx`)
- Types: PascalCase (e.g., `User.ts`)

## Testing

**No test framework is currently configured.** The repository has no test files or test scripts. Do not add tests unless explicitly requested.

## Deployment

- **Hosting**: Firebase Hosting
- **Deploy Command**: `npm run deploy` (requires Firebase CLI and auth)
- **Public Directory**: `dist/`
- **Automatic Deployment**: On merge to main (when CI is fixed)

## Additional Notes

### Key Files to Review

1. **`package.json`**: All npm scripts and dependencies
2. **`vite.config.ts`**: Build configuration and path aliases
3. **`tsconfig.app.json`**: TypeScript settings and path aliases
4. **`src/main.tsx`**: Application bootstrap and root setup
5. **`src/App.tsx`**: Main app structure with providers
6. **`src/services/`**: Firebase integration

### Performance Considerations

- Large bundle sizes (>500KB) - Vite warns about this
- Manual chunking for Firebase and hooks configured
- PWA support for offline functionality

## Trust These Instructions

These instructions are based on thorough analysis of the repository, including:
- Actual test runs of all npm scripts
- Review of CI/CD logs showing consistent failure patterns
- Examination of all configuration files
- Understanding of the codebase structure and dependencies

**Only perform additional searches if**:
- Information here is incomplete for your specific task
- Information here contradicts what you observe
- You need details about specific implementation not covered here
- You're asked to fix the TypeScript compilation errors
