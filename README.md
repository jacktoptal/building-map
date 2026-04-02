# Building Map

A sophisticated 3D mapping application built with React, Deck.gl, and Three.js that visualizes building models on interactive maps with multimedia content integration.

## 🏗️ Project Overview

This application provides an immersive 3D mapping experience featuring:
- **Interactive 3D Building Visualization**: Renders GLB/GLTF building models on maps
- **Dual Map Styles**: Terrain and Street map views with seamless switching
- **Multimedia Integration**: Clickable markers for images and videos
- **Advanced WebGL Rendering**: Custom WebGL layers and Three.js integration
- **Real-time Lighting**: PBR lighting effects for realistic 3D models

## 🚀 Features

### Core Functionality
- **3D Building Models**: Displays "Enclave at Kelsey Creek" building model using GLB format
- **Map Integration**: Built on Mapbox with Deck.gl for advanced visualization
- **Interactive Markers**: Clickable icons for image galleries and video content
- **Responsive Design**: Optimized for various screen sizes and devices

### Technical Highlights
- **Custom WebGL Layers**: Direct WebGL shader programming for custom rendering
- **Three.js Integration**: Seamless Three.js scene rendering within Deck.gl
- **PBR Lighting**: Physically Based Rendering for realistic material appearance
- **Terrain Support**: 3D terrain visualization with elevation data
- **Sky Atmosphere**: Dynamic sky rendering with sun positioning

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.2.0** - Modern React with hooks and concurrent features
- **Vite 3.2.1** - Fast build tool and development server
- **React Router DOM 7.1.5** - Client-side routing

### 3D Graphics & Mapping
- **Deck.gl 9.1.1** - WebGL-powered data visualization framework
- **Three.js 0.173.0** - 3D graphics library
- **Mapbox GL JS 3.10.0** - Interactive maps
- **React Map GL 8.0.1** - React wrapper for Mapbox

### State Management & Data
- **Zustand 3.5.10** - Lightweight state management
- **TanStack React Query 4.13.4** - Server state management
- **Axios 1.3.4** - HTTP client

### UI Components & Styling
- **PrimeReact 10.9.2** - UI component library
- **Styled Components 5.3.0** - CSS-in-JS styling
- **Framer Motion 6.5.1** - Animation library
- **PrimeFlex 4.0.0** - CSS utility framework

### Media & Content
- **React Image Gallery 1.4.0** - Image gallery component
- **React Player 2.16.0** - Video player with Vimeo support
- **Loaders.gl** - GLB/GLTF model loading

## 📁 Project Structure

```
src/
├── api/                    # API configuration and endpoints
│   ├── country.js         # Country data API
│   ├── index.js           # Axios configuration
│   └── trade.js           # Trade data API
├── components/            # Reusable UI components
│   ├── Containers/        # Container components
│   ├── Labels/            # Label components
│   ├── Loader/            # Loading components
│   ├── Navbar/            # Navigation components
│   └── ...
├── pages/Main/            # Main application page
│   ├── components/         # Page-specific components
│   │   ├── ImageDialog.jsx        # Image gallery modal
│   │   ├── VideoDialog.jsx        # Video player modal
│   │   ├── TerrainMap.jsx         # Terrain map view
│   │   ├── StreetMap.jsx          # Street map view
│   │   ├── ThreeLayer.js          # Three.js integration layer
│   │   └── MyWebGLLayer.js        # Custom WebGL layer
│   └── Main.jsx           # Main page component
├── state/                 # State management
│   └── store.js           # Zustand store configuration
├── theme/                 # Theming system
│   ├── ThemeProvider.js   # Theme context provider
│   └── theme.js           # Theme configuration
└── utils/                 # Utility functions
```

## 🎯 Key Components

### Map Components
- **TerrainMap**: 3D terrain visualization with satellite imagery
- **StreetMap**: Custom street map style with building models
- **ThreeLayer**: Custom Deck.gl layer integrating Three.js scenes
- **MyWebGLLayer**: Direct WebGL shader implementation

### Interactive Elements
- **ImageDialog**: Modal displaying image galleries
- **VideoDialog**: Modal with Vimeo video player
- **IconLayer**: Clickable markers for multimedia content

### State Management
- **Zustand Store**: Manages UI state (modals, menu visibility)
- **React Query**: Handles server state and caching

## 🚀 Getting Started

### Prerequisites
- **Node.js 20+** - JavaScript runtime
- **Yarn** - Package manager (recommended)

### Installation

1. **Install Yarn globally** (if not already installed):
   ```bash
   npm install --global yarn
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Start development server**:
   ```bash
   yarn start
   ```

4. **Open your browser** and navigate to `http://localhost:4000`

### Available Scripts

- **`yarn start`** - Start development server with hot reload
- **`yarn build`** - Build production bundle
- **`yarn lint`** - Run ESLint with auto-fix
- **`yarn format`** - Format code with Prettier

## 🗺️ Map Configuration

### Mapbox Integration
- **Access Token**: Configured for Mapbox services
- **Map Styles**:
  - Terrain: `mapbox://styles/mapbox/satellite-streets-v12`
  - Street: Custom style `mapbox://styles/belopot/ckbt1oxxw0gjr1jlahbsj7c3s`
- **Terrain Source**: `mapbox://mapbox.mapbox-terrain-dem-v1`

### 3D Model Configuration
- **Building Model**: GLB format from GitHub CDN
- **Location**: Enclave at Kelsey Creek (Bellevue, WA)
- **Coordinates**: `[-122.142386, 47.61232]`
- **Lighting**: PBR with ambient and directional lighting

## 🎨 Customization

### Adding New Buildings
1. Add GLB/GLTF model to public directory or CDN
2. Update coordinates in map components
3. Configure ScenegraphLayer with new model path

### Styling
- **Theme**: Modify `src/theme/` files
- **Components**: Update styled-components in respective files
- **Map Styles**: Configure Mapbox styles in map components

### Adding Media Content
1. Update `public/images/` with new images
2. Modify `ImageGalleryViewer` component
3. Update marker coordinates in IconLayer

## 🔧 Development Notes

### WebGL Integration
- Custom WebGL layers provide direct shader control
- Three.js integration enables complex 3D scenes
- Deck.gl handles WebGL context management

### Performance Considerations
- GLB models are loaded asynchronously
- Terrain data uses Mapbox's optimized tiles
- WebGL layers are efficiently managed by Deck.gl

### Browser Support
- Modern browsers with WebGL support required
- ES2020+ features utilized (BigInt support)
- Responsive design for mobile and desktop

## 📄 License

This project is licensed under the terms specified in the LICENSE file.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📞 Support

For questions or issues, please refer to the project's issue tracker or contact the development team.
