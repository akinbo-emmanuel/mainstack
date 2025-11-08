# Mainstack Revenue Dashboard

A modern, type-safe React dashboard for managing and filtering financial transactions with real-time data visualization.

## 🚀 Features

- **Advanced Filtering**: Multi-dimensional filtering by period, date range, transaction type, and status with active filter count badge
- **Real-time Updates**: React Query integration for efficient data fetching and caching
- **Transaction Visualization**: Smooth curved chart showing transaction trends over time
- **Empty States**: Helpful empty state with clear filter action
- **Type-Safe**: Full TypeScript coverage with strict type checking
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: Built with shadcn/ui components
- **Performance Optimized**: Efficient filtering algorithms and memoization

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **React Query** - Data fetching and caching
- **date-fns** - Date manipulation
- **React Icons** - Icon library

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── layout/         # Header, Toolbar
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   ├── revenueDashboard/
│   │   ├── filters/    # Filter components
│   │   └── sections/   # Dashboard sections
│   ├── Dashboard.tsx
│   └── FilterModal.tsx
├── constants/          # Application constants
├── features/           # React Query hooks
├── hooks/              # Custom React hooks
├── types/              # TypeScript definitions
├── utils/              # Utility functions
└── App.tsx
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation.

## 🏃 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Key Features

### Filter System
- **Period Filters**: Today, Last 7 days, This month, Last 3 months, This year, Last year, All time
- **Custom Date Range**: Select specific date ranges with calendar UI
- **Transaction Types**: Store Transactions, Get Tipped, Deposits, Withdrawals, Chargebacks, Cashbacks, Refer & Earn
- **Status Filters**: Successful, Pending, Failed
- **Active Filter Badge**: Visual indicator showing number of active filters
- **Smart Apply Button**: Disabled when no changes made

### Data Visualization
- **Transaction Chart**: Smooth curved line chart showing daily transaction totals
- **Auto-scaling**: Dynamically adjusts to data range
- **Filtered Data**: Chart updates based on applied filters
- **Date Range Labels**: Shows first and last transaction dates

### State Management
- Centralized filter state with custom `useFilters` hook
- Temporary filter state in modal (changes only apply on "Apply")
- Filter change detection for UI optimization
- Clear filters functionality

### Performance
- Efficient filtering algorithms in `utils/filterUtils.ts`
- Memoized filter results and chart calculations
- Optimized re-renders with proper dependencies
- Loading skeletons for better UX

## 🧪 Code Quality

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for React and TypeScript
- **Type Safety**: No `any` types, comprehensive interfaces
- **Clean Code**: DRY principles, single responsibility
- **Best Practices**: Custom hooks, utility functions, constants

## 📝 Development

### Adding New Filters

1. Add type to `src/types/filters.ts`
2. Add constant to `src/constants/filters.ts`
3. Add filter logic to `src/utils/filterUtils.ts`
4. Create filter component in `src/components/revenueDashboard/filters/`
5. Integrate into `FilterModal.tsx`

### Testing

```bash
# Run tests (when configured)
npm test

# Type checking
npm run type-check
```

## 🤝 Contributing

1. Follow the existing code structure
2. Maintain type safety
3. Write clean, documented code
4. Test your changes

## 📄 License

This project is private and proprietary.
