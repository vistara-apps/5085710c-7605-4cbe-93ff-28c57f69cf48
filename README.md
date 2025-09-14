# CryptoPulse - Base Mini App

Your real-time edge in crypto markets. A comprehensive cryptocurrency tracking and analysis platform built as a Base Mini App.

## Features

- **Real-time Price Tracking**: Live price data and historical charts for cryptocurrency assets
- **On-Chain Activity Alerts**: Notifications for significant blockchain events and whale movements
- **Altcoin Opportunity Scanner**: Automated scanning for promising investment opportunities
- **Sentiment Analysis**: Social media and news sentiment tracking for market insights
- **Mobile-First Design**: Optimized for Base App and mobile experiences

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts for data visualization
- **Blockchain**: MiniKit for Base integration
- **APIs**: CoinGecko for market data, BaseScan for on-chain data

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cryptopulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys:
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Required for OnchainKit functionality
   - `COINGECKO_API_KEY`: Optional, for higher rate limits
   - `BASESCAN_API_KEY`: For on-chain data

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and Tailwind
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main dashboard
│   ├── providers.tsx      # MiniKit provider setup
│   ├── loading.tsx        # Loading UI
│   └── error.tsx          # Error boundary
├── components/            # React components
│   ├── AssetCard.tsx      # Asset display component
│   ├── AssetChart.tsx     # Price chart component
│   ├── AssetSearch.tsx    # Asset search modal
│   ├── MarketOverview.tsx # Market statistics
│   ├── SentimentPanel.tsx # Sentiment analysis
│   ├── AlertsPanel.tsx    # On-chain alerts
│   └── OpportunityScanner.tsx # Altcoin opportunities
├── lib/                   # Utilities and types
│   ├── api.ts            # API functions
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## Key Components

### AssetCard
Displays cryptocurrency information with price, change percentage, and market data.

### AssetChart
Interactive price charts using Recharts with responsive design.

### SentimentPanel
Shows aggregated sentiment from social media, news, and technical analysis.

### AlertsPanel
Displays on-chain activity alerts with severity indicators.

### OpportunityScanner
Automated altcoin opportunity detection with risk assessment.

## API Integration

The app integrates with several APIs:

- **CoinGecko API**: Real-time price data and market information
- **BaseScan API**: On-chain transaction and contract data
- **Social APIs**: Sentiment analysis from various sources

## Design System

The app uses a custom design system with:

- **Colors**: Dark theme with accent colors for crypto data
- **Typography**: Clear hierarchy with proper contrast
- **Components**: Consistent styling across all UI elements
- **Animations**: Smooth transitions and loading states

## Base Mini App Features

- **MiniKit Integration**: Proper Base chain configuration
- **Wallet Connection**: Seamless wallet integration
- **Mobile Optimization**: Touch-friendly interface
- **Frame Actions**: Native Base App interactions

## Development

### Adding New Features

1. Create components in the `components/` directory
2. Add types to `lib/types.ts`
3. Implement API functions in `lib/api.ts`
4. Update the main dashboard in `app/page.tsx`

### Styling Guidelines

- Use Tailwind CSS classes
- Follow the custom design tokens
- Maintain mobile-first responsive design
- Use proper semantic HTML

### API Guidelines

- Handle loading and error states
- Implement proper TypeScript types
- Use mock data for development
- Add rate limiting considerations

## Deployment

The app is optimized for deployment on Vercel or similar platforms:

```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
