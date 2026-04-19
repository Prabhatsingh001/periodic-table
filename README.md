# Periodic Table

An interactive periodic table application built with React, featuring all 118 elements with detailed information, dark/light mode support, and a discovery history timeline.

## Features

- **Interactive Element Display**: Browse all 118 elements in a grid layout with color-coded categories
- **Element Details Modal**: Click any element to view comprehensive information including:
  - Atomic number, symbol, and name
  - Atomic mass (normalized to 3 decimal places)
  - Category and phase
  - Group and period information
- **Dark/Light Mode Toggle**: Switch between dark and light themes with persistent user preference stored in localStorage
- **Discovery Timeline**: Explore the history of element discovery with an interactive timeline showing:
  - Year of discovery
  - Geographic location
  - Elements discovered in that period
  - Comic-style card layout with dotted timeline visualization
- **Tailwind CSS Styling**: Modern utility-first CSS framework for responsive and maintainable styling
- **Responsive Design**: Optimized for desktop viewing with smooth hover effects and transitions

## Technology Stack

- **React 18**: Modern UI framework with hooks
- **Vite**: Lightning-fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript ES6+**: Modern JavaScript features
- **localStorage API**: Persistent theme preference storage

## Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

## Running the Application

### Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```text
src/
├── App.jsx                 # Main application component with all UI elements
├── main.jsx               # React entry point
├── index.css              # Global styles (Tailwind import)
├── data/
│   ├── elements.js        # 118 element database with properties
│   └── discoveryTimeline.js # 21 timeline entries for element discovery history
public/
├── index.html             # HTML template
```

## Key Components

### App Component (src/App.jsx)

The main component handles:

- Theme state management (dark/light mode)
- Element selection and modal display
- Timeline modal rendering
- All sub-components and UI rendering

### Data Files

- **elements.js**: Contains all 118 elements with properties: atomic number, mass, symbol, name, category, group, period, and phase
- **discoveryTimeline.js**: Chronological timeline entries from ancient times through 2016 with element discoveries and locations

## Usage

### Viewing Element Details

Click on any element tile to open a modal displaying complete information about that element.

### Switching Theme

Use the theme toggle button in the top-right corner to switch between dark and light modes. Your preference is saved automatically.

### Exploring Discovery History

Click the "Discovery Timeline" button to view an interactive timeline of how elements were discovered throughout history.

## Element Categories

Elements are color-coded by category:

- Alkali metals
- Alkaline earth metals
- Transition metals
- Lanthanides
- Actinides
- Nonmetals
- Halogens
- Noble gases
- And more...

## Browser Support

Works best in modern browsers (Chrome, Firefox, Safari, Edge) that support ES6+ JavaScript and CSS Grid/Flexbox.
