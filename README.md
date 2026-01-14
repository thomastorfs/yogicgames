# YogicGames

A conscious gaming analytics platform that quantifies the spiritual and psychological impact of video games using ancient Eastern philosophical frameworks.

## Overview

**YogicGames** is a comprehensive database and analytics tool that evaluates video games against 18 discrete psychological and spiritual drivers based on Yogic philosophy. The platform analyzes games' potential impact on consciousness and mental well-being, providing players with data-driven insights about the spiritual nutritional value of digital entertainment.

### Core Concept

We quantify the spiritual impact of digital experiences by measuring games against:
- **Positive Drivers**: Sattva (Purity), Vairagya (Detachment), Viveka (Discernment), Ekagrata (Focus), Santosha (Contentment), and more
- **Negative Drivers**: Rajas (Passion/Restlessness), Tamas (Inertia), Addiction Potential, Time Wasting, Dissociation, and more

Each game receives a **Yogic Score** calculated by weighting these attributes based on their impact on consciousness and spiritual development.

## Features

- **Game Database**: Browse and search a comprehensive database of games with detailed analysis
- **Analytics Dashboard**: Visualize correlations between psychological drivers and game attributes
- **Attribute Explorer**: Filter games by specific yogic attributes with interactive charts
- **Game Details**: In-depth breakdowns of individual games with radar charts showing attribute matrices
- **Similar Games**: Discover games with similar spiritual profiles

## Tech Stack

- **Frontend**: React + TypeScript with Vite
- **Styling**: Tailwind CSS with custom cyberpunk theme
- **Routing**: React Router with slug-based URLs
- **Data Visualization**: Recharts for interactive charts
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key

4. Run the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:3000/yogicgames/`

### Build for Production

```bash
npm run build
```

## Project Structure

```
yogicgames/
├── components/          # React components
│   ├── Home.tsx        # Landing page
│   ├── GameList.tsx    # Database view
│   ├── Analytics.tsx   # Analytics dashboard
│   ├── GameDetail.tsx  # Individual game pages
│   ├── AttributeExplorer.tsx  # Attribute filtering
│   └── ...             # Other UI components
├── App.tsx             # Main app component
├── types.ts            # TypeScript interfaces
├── utils.ts            # Utility functions
├── data.ts             # Game database
└── index.tsx           # Entry point
```

## Pages

- **Home**: Landing page with overview of the Yogic Games protocol
- **Database**: Full searchable, filterable catalog of analyzed games
- **Analytics**: Correlation matrix and attribute explorer for statistical analysis
- **Game Detail**: Individual game profiles with full attribute breakdown and similar games

## Development

Built with:
- **Anthropic Opus 4.5**: Top 100 game list retrieval, yogic scoring and calculation
- **Google AI Studio**: Primary development environment and prompt engineering tool
- **GitHub Copilot**: Final product vibe coding assistance using Claude Haiku 4.5

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## References

For more information about Yogic philosophy and the frameworks used in this analysis, refer to classical texts on Yoga and Vedantic philosophy.
