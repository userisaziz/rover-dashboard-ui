import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import StatusHeader from "./StatusHeader";
import SimulationToggle from "./SimulationToggle";

interface NavigationProps {
  simulationMode: boolean;
  onSimulationToggle: (enabled: boolean) => void;
}

export default function Navigation({ simulationMode, onSimulationToggle }: NavigationProps) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" || !localStorage.getItem("theme");
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <header className="h-16 bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left side - Sidebar trigger */}
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="flex-shrink-0" />
          <h1 className="text-lg font-bold text-foreground hidden sm:block">
            Rover Control Dashboard
          </h1>
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center space-x-4">
          {/* Simulation Mode Toggle */}
          <SimulationToggle 
            enabled={simulationMode}
            onToggle={onSimulationToggle}
          />
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Status Header */}
          <StatusHeader simulationMode={simulationMode} />
        </div>
      </div>
    </header>
  );
}