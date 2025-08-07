import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import Navigation from "./components/Navigation";
import TelemetrySidebar from "./components/TelemetrySidebar";
import Index from "./pages/Index";
import CameraFeed from "./pages/CameraFeed";
import RoverHealth from "./pages/RoverHealth";
import CodeUpload from "./pages/CodeUpload";
import About from "./pages/About";
import RoverLocation from "./pages/RoverLocation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [simulationMode, setSimulationMode] = useState(true);
  const [telemetrySidebarOpen, setTelemetrySidebarOpen] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
              {/* Main App Sidebar */}
              <AppSidebar 
                onTelemetryToggle={() => setTelemetrySidebarOpen(!telemetrySidebarOpen)}
              />
              
              {/* Main Content Area */}
              <div className="flex-1 flex flex-col">
                {/* Top Navigation Bar */}
                <Navigation 
                  simulationMode={simulationMode} 
                  onSimulationToggle={setSimulationMode}
                />
                
                {/* Main Content with Telemetry Sidebar */}
                <div className="flex-1 relative">
                  <TelemetrySidebar 
                    isOpen={telemetrySidebarOpen}
                    onToggle={() => setTelemetrySidebarOpen(!telemetrySidebarOpen)}
                    simulationMode={simulationMode}
                  />
                  
                  {/* Page Content (Outlet) */}
                  <main className={`transition-all duration-300 ${
                    telemetrySidebarOpen ? 'mr-80' : ''
                  } p-4 sm:p-6 lg:p-8`}>
                    <div className="max-w-7xl mx-auto">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/camera" element={<CameraFeed />} />
                        <Route path="/health" element={<RoverHealth simulationMode={simulationMode} />} />
                        <Route path="/upload" element={<CodeUpload />} />
                        <Route path="/location" element={<RoverLocation />} />
                        <Route path="/about" element={<About />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                  </main>
                </div>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;