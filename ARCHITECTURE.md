# Project Architecture

## Overview
This is a React + TypeScript dashboard application for managing and filtering financial transactions.

## Project Structure

```
src/
├── components/          # React components
│   ├── layout/         # Layout components (Header, Toolbar)
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   ├── revenueDashboard/
│   │   ├── filters/    # Filter components (Period, DateRange, TransactionType, Status)
│   │   └── sections/   # Dashboard sections (Wallet, Transactions)
│   ├── Dashboard.tsx   # Main dashboard component
│   ├── FilterModal.tsx # Filter modal component
│   └── PageLoader.tsx  # Loading component
├── constants/          # Application constants
│   └── filters.ts      # Filter-related constants
├── features/           # Feature-specific code
│   └── queries.ts      # React Query hooks
├── hooks/              # Custom React hooks
│   └── useFilters.ts   # Filter state management hook
├── types/              # TypeScript type definitions
│   ├── api.ts          # API response types
│   └── filters.ts      # Filter-related types
├── utils/              # Utility functions
│   └── filterUtils.ts  # Filter logic utilities
└── App.tsx             # Root component
```

## Key Design Patterns

### 1. **Separation of Concerns**
- **Components**: Pure presentation logic
- **Hooks**: State management and side effects
- **Utils**: Business logic and data transformation
- **Types**: Type definitions shared across the app
- **Constants**: Centralized configuration

### 2. **Type Safety**
- All components use TypeScript interfaces
- Shared types prevent duplication
- Type-only imports for better tree-shaking

### 3. **Custom Hooks**
- `useFilters`: Manages all filter state in one place
- `useWallet`: Fetches wallet data
- `useTransactions`: Fetches transaction data

### 4. **Utility Functions**
- `filterTransactions`: Main filtering logic
- `filterByPeriod`: Period-based filtering
- `filterByStatus`: Status-based filtering
- `filterByTransactionType`: Type-based filtering
- `hasFilterChanges`: Detects filter modifications

### 5. **Constants**
- `DEFAULT_TRANSACTION_TYPES`: Default transaction type selections
- `DEFAULT_STATUSES`: Default status selections
- `DEFAULT_PERIOD`: Default time period
- `PERIODS`: Available time period options
- `TRANSACTION_TYPE_OPTIONS`: Transaction type configuration
- `STATUS_OPTIONS`: Status configuration

## Component Hierarchy

```
App
├── Header
├── Toolbar
├── Dashboard
│   ├── Wallet
│   └── TransactionsSection
└── FilterModal
    ├── PeriodFilter
    ├── DateRangeFilter
    ├── TransactionTypeFilter
    └── StatusFilter
```

## State Management

### Filter State
Managed by `useFilters` hook:
- `selectedPeriod`: Current time period filter
- `dateRange`: Custom date range
- `transactionTypes`: Selected transaction types
- `statuses`: Selected statuses

### Data Fetching
Using React Query:
- `useWallet`: Wallet balance and stats
- `useTransactions`: Transaction list

## Filtering Logic

Filters are applied in sequence:
1. **Period Filter**: Filters by time period or custom date range
2. **Status Filter**: Filters by transaction status (successful/pending/failed)
3. **Type Filter**: Filters by transaction type (store/tip/withdrawal/etc.)

All filtering logic is centralized in `utils/filterUtils.ts` for:
- Testability
- Reusability
- Maintainability

## Best Practices Implemented

1. ✅ **DRY (Don't Repeat Yourself)**: Shared types, constants, and utilities
2. ✅ **Single Responsibility**: Each component/function has one clear purpose
3. ✅ **Type Safety**: Comprehensive TypeScript coverage
4. ✅ **Separation of Concerns**: Clear boundaries between UI, logic, and data
5. ✅ **Custom Hooks**: Reusable state management
6. ✅ **Utility Functions**: Pure functions for business logic
7. ✅ **Constants**: Centralized configuration
8. ✅ **Clean Code**: No console.logs, no commented code, clear naming
