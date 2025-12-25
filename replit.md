# NihonGo! - Japanese Language Learning Platform

## Overview

NihonGo! is an interactive web application designed for learning Japanese language fundamentals. The platform provides educational content for Japanese writing systems (Hiragana, Katakana, Kanji) along with vocabulary quizzes to reinforce learning. Built as a modern single-page application using React and styled with Tailwind CSS.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **React 18** with functional components and hooks (useState) for state management
- **Vite** as the build tool and development server for fast HMR and optimized builds
- Component-based architecture with tab-based navigation

### Styling Approach
- **Tailwind CSS** for utility-first styling with a modern, clean design
- PostCSS and Autoprefixer for CSS processing
- CDN Tailwind included in HTML for development convenience alongside proper Tailwind config

### UI Enhancement Libraries
- **Framer Motion** for animations and transitions
- **Lucide React** for icon components

### Application Structure
- Tab-based navigation between learning sections (Hiragana, Katakana, Kanji, Quiz)
- GridView component for displaying character data
- Separate Quiz component for vocabulary testing
- KarakterData module for storing Japanese character data

### Development Configuration
- Vite configured with path aliases (`@` maps to `./src`)
- Development server runs on port 5000 with host binding for Replit compatibility
- ES modules enabled via `"type": "module"` in package.json

## External Dependencies

### Core Dependencies
| Package | Purpose |
|---------|---------|
| react, react-dom | Core UI framework |
| framer-motion | Animation library |
| lucide-react | Icon components |

### Development Tools
| Package | Purpose |
|---------|---------|
| vite | Build tool and dev server |
| @vitejs/plugin-react | React support for Vite |
| tailwindcss | Utility CSS framework |
| postcss, autoprefixer | CSS processing |

### Notes for Development
- The project structure expects source files in `/src` directory
- Main entry point is `/src/main.jsx` (referenced in index.html but not yet created)
- Required files to complete: `src/main.jsx`, `src/KarakterData.js`, `src/Quiz.jsx`, and the main App component
- Current `index.js` in root should be moved to `src/App.jsx`