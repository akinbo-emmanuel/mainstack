import "./App.css";
import Header from "./components/layout/Header";
import Toolbar from "./components/layout/Toolbar";
import Dashboard from "./components/Dashboard";
import { Analytics } from "@vercel/analytics/react";

function App() {
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
