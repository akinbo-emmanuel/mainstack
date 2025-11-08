import "./App.css";
import Header from "./components/layout/Header";
import Toolbar from "./components/layout/Toolbar";
import Dashboard from "./components/Dashboard";
import PageLoader from "./components/PageLoader";
import { Analytics } from "@vercel/analytics/react";
import { useState, useEffect } from "react";
import FilterModal from "./components/FilterModal";
import { useFilters } from "./hooks/useFilters";
import { DEFAULT_PERIOD, DEFAULT_TRANSACTION_TYPES, DEFAULT_STATUSES } from "./constants/filters";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const {
    selectedPeriod,
    setSelectedPeriod,
    dateRange,
    setDateRange,
    transactionTypes,
    setTransactionTypes,
    statuses,
    setStatuses,
  } = useFilters();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClearFilters = () => {
    setSelectedPeriod(DEFAULT_PERIOD);
    setDateRange({ from: "", to: "" });
    setTransactionTypes(DEFAULT_TRANSACTION_TYPES);
    setStatuses(DEFAULT_STATUSES);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <main>
        <Header />
        <Toolbar />
        <Dashboard 
          setIsFilterOpen={setIsFilterOpen} 
          selectedPeriod={selectedPeriod}
          dateRange={dateRange}
          transactionTypes={transactionTypes}
          statuses={statuses}
          onClearFilters={handleClearFilters}
        />
      </main>

      <Analytics />
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        transactionTypes={transactionTypes}
        onTransactionTypesChange={setTransactionTypes}
        statuses={statuses}
        onStatusesChange={setStatuses}
      />
    </>
  );
}

export default App;
