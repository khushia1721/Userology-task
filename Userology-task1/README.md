# CryptoWeather Nexus

A modern, multi-page dashboard combining real-time weather data, cryptocurrency information, and news updates with WebSocket notifications.

![CryptoWeather Nexus Dashboard](https://via.placeholder.com/800x400?text=CryptoWeather+Nexus+Dashboard)

## 🚀 Live Demo

[View Live Demo](https://your-deployment-url.vercel.app)

## ✨ Features

- **Real-time Dashboard** with three integrated sections:

  - **Weather**: Current conditions, temperature, humidity, and wind speed for multiple cities
  - **Cryptocurrency**: Live prices, 24h change, and market cap for Bitcoin, Ethereum, and Cardano
  - **News**: Latest crypto and finance headlines

- **Detail Pages**:

  - Detailed weather information with historical data and charts
  - Comprehensive cryptocurrency metrics with price history charts

- **Real-time Updates**:

  - WebSocket integration for live cryptocurrency price updates
  - Simulated weather alerts via WebSocket events

- **User Preferences**:

  - Favorite cities and cryptocurrencies for quick access
  - Persistent state management across sessions

- **Responsive Design**:
  - Seamless experience from mobile to desktop
  - Modern UI with contextual styling (weather conditions affect card appearance)

## 🛠️ Built With

- **Framework**: [Next.js](https://nextjs.org/) (v15+)
- **State Management**: [Redux](https://redux.js.org/) with Redux Toolkit
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom design system
- **UI Components**: Custom components with [shadcn/ui](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/) for data visualization
- **Notifications**: Custom WebSocket implementation with Sonner for toasts

## 📋 API Integrations

- **Weather Data**: [wttr.in](https://wttr.in/) API providing current conditions and forecasts
- **Cryptocurrency Data**: Simulated API based on CoinGecko/CoinCap patterns
- **News Data**: Mock news service with realistic data

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/crypto-weather-nexus.git
   cd crypto-weather-nexus
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` to add your API keys:

   ```
   WEATHER_API_KEY=your_key_here
   CRYPTO_API_KEY=your_key_here
   NEWS_API_KEY=your_key_here
   ```

4. Run the development server

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## 🏗️ Project Structure

```
/
├── app/                    # Next.js app router
│   ├── crypto/             # Cryptocurrency routes
│   ├── weather/            # Weather routes
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage/Dashboard
├── components/             # React components
│   ├── crypto/             # Cryptocurrency components
│   ├── dashboard/          # Dashboard components
│   ├── layout/             # Layout components
│   ├── notifications/      # Notification components
│   ├── ui/                 # UI components
│   └── weather/            # Weather components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
│   ├── api/                # API integration
│   ├── redux/              # Redux store and slices
│   └── websocket.ts        # WebSocket connection
├── public/                 # Static assets
└── README.md               # Project documentation
```

## 🎨 Design Decisions

### Architecture

- **Next.js App Router**: Used for efficient routing and server-side rendering capabilities
- **Redux Toolkit**: Chosen for global state management with efficient and type-safe reducers
- **WebSocket Integration**: Real-time updates for cryptocurrency prices and weather alerts

### UI/UX

- **Dynamic Theming**: Color schemes change based on weather conditions and cryptocurrency types
- **Responsive Design**: Mobile-first approach with breakpoints for larger screens
- **Contextual Information**: Cards adapt visually to the data they present
- **Favorite System**: Quick access to important items with visual distinction

### Performance Optimization

- **Data Caching**: Minimize API calls with cached responses
- **Periodic Refresh**: Automatic data updates every 60 seconds
- **Suspense and Loading States**: Skeleton loaders for better UX during data fetching
- **Error Handling**: Graceful fallbacks when API calls fail

## 🔄 Data Refresh Strategy

- Weather data refreshes every 5 minutes
- Cryptocurrency data refreshes every 60 seconds
- News refreshes on page load
- WebSocket provides real-time price updates
- All data sources have graceful fallbacks with mock data if APIs fail

## 👥 Favorites Feature

Users can:

- Star cities in the weather section to mark them as favorites
- Star cryptocurrencies to track them more prominently
- View favorites in a separate, priority section
- Favorites persist across browser sessions

## 🌐 Deep Linking

The application supports deep linking to:

- `/crypto/[id]` - Detailed view for specific cryptocurrencies
- `/weather/[city]` - Detailed weather information for specific cities

## 🧪 Testing

To run tests:

```bash
npm test
# or
yarn test
# or
pnpm test
```

## 🚧 Challenges and Solutions

### Challenge: API Rate Limiting

**Solution**: Implemented caching and polling strategies to minimize API calls while keeping data fresh.

### Challenge: WebSocket Integration

**Solution**: Created a custom WebSocket manager with reconnection logic and message filtering.

### Challenge: Responsive Design for Data-Heavy UI

**Solution**: Used responsive card layouts and prioritized critical information on smaller screens.

### Challenge: State Persistence

**Solution**: Leveraged Redux with browser storage to maintain user preferences between sessions.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for accessible component primitives
- [wttr.in](https://wttr.in/) for the weather data API
- [CoinGecko](https://www.coingecko.com/) & [CoinCap](https://coincap.io/) for cryptocurrency API inspiration
