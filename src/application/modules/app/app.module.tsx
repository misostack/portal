import { useEffect } from "react";

const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE || "Portal";
const VITE_APP_VERSION = import.meta.env.VITE_APP_VERSION || 1.0;

function AppModule() {
  useEffect(() => {});

  return (
    <div className="App">
      <header className="App-header">{VITE_APP_TITLE}</header>
      <p>Version: {VITE_APP_VERSION}</p>
    </div>
  );
}

export default AppModule;
