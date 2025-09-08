# Momentum Landsraad Tracker

A React application for tracking progress across noble houses in Dune Awakening's Landsraad system, proudly developed for the Momentum pro guild.

## Features

- **5x5 Grid Layout**: Visual representation of all 25 noble house slots
- **Manual House Setup**: Start with empty slots and manually assign houses for each week
- **House Management**: Click to edit house assignments for each slot
- **Quest Type Selection**: Manually set whether each house has kill quests or collection/delivery quests
- **Progress Tracking**: Track personal contribution points for each house
- **Reward Tiers**: Visual display of unlocked rewards based on contribution points
- **Vendor Status**: Mark which house vendors you've visited to collect rewards
- **Weekly Reset**: Reset functionality to clear all slots for new weeks
- **Responsive Design**: Works on both desktop and mobile devices
- **🎉 Easter Egg**: Achieve "GODLIKE" status when all 25 houses reach maximum tier (14,000+ points)!

## Quest Types

Each noble house can be configured with one of two quest types:

- **Kill Quest**: Defeat enemies to earn contribution points
- **Collection Quest**: Collect and deliver items to earn contribution points

Players can change quest types at any time using the dropdown selectors in both the grid view and house details panel.

## Reward Tiers

- **700 points**: 10,000 Solari
- **3,500 points**: 1 Acheronian Pants
- **7,000 points**: 50 Plasteel Composite Blade Parts
- **10,500 points**: 1 Compact Compactor Mk6
- **14,000 points**: 1 House Heavy Armor Swatch

## Noble Houses

The tracker includes all 30+ noble houses from Dune Awakening:
- Ecaz, Fazeel, Hagal, Heiron, Jaederan, Kio, Maros, Kolona, Moritani, Mutelli
- Imota, Novebruns, Richese, Taligari, Tantor, Thorvald, Vernius, Wayku, Alexin
- Argosaz, Dyvetz, Hurata, Spinette, Tseida, Varota, Wallach, Wydras, Lindaren, Mikarrol

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/DuneLandsraadTracker.git
cd DuneLandsraadTracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

### Deploying to GitHub Pages

1. Update the `homepage` field in `package.json` with your GitHub Pages URL
2. Deploy:
```bash
npm run deploy
```

## Usage

### Weekly Setup
1. **Start Fresh**: Each week begins with all 25 slots empty
2. **Assign Houses**: Click any empty slot to select which noble house goes there
3. **Set Quest Types**: Use the dropdown in each slot to set kill or collection quests
4. **Begin Tracking**: Click on houses to track your progress and contributions

### Basic Navigation
- **Click** on any empty slot to assign/edit house assignments
- **Click** on a house slot to view details and track progress
- **Reset Week** button to clear all slots for a new week

### Quest Type Management
- **Grid View**: Use the dropdown in each house slot to select quest type
- **Details Panel**: Change quest type from the house details view
- **Real-time Updates**: Changes sync between grid and details views

### Tracking Progress
1. Set up your week by assigning houses to slots
2. Set the appropriate quest type (kill or collection) for each house
3. Enter your contribution points in the details panel
4. View unlocked rewards and progress to next tier
5. Mark vendor as visited when you collect rewards

### Visual Indicators
- **Green**: Fully claimed (14,000+ points)
- **Orange**: High tier (7,000+ points)
- **Yellow**: Mid tier (3,500+ points)
- **Blue**: Low tier (700+ points)
- **🛒**: Vendor visited
- **✓**: Rewards claimed

## Technologies Used

- React 18
- CSS3 with custom styling
- Responsive design principles
- Local state management with React hooks
- Canvas Confetti for celebrations

Credits for the map locations and environment shots goes to https://www.method.gg/!

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

Inspired by the Landsraad system in Dune Awakening. All game mechanics and lore belong to their respective owners.
