import "./App.css";
import Header from "./components/layout/Header";
import Toolbar from "./components/layout/Toolbar";
import Dashboard from "./components/Dashboard";
import PageLoader from "./components/PageLoader";
import { Analytics } from "@vercel/analytics/react";
import { useState, useEffect } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Show loader for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <main>
        <Header />
        <Toolbar />
        <Dashboard />
      </main>
      <Analytics />
    </>
  );
}

export default App;
