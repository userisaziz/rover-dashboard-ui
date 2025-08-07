import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Compass, Gauge, Thermometer, Wifi } from "lucide-react";

interface TelemetryData {
  orientation: { roll: number; pitch: number; yaw: number };
  distance: number;
  temperature: number;
  signalStrength: number;
}

interface TelemetrySidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  simulationMode: boolean;
}

export default function TelemetrySidebar({ isOpen, onToggle, simulationMode }: TelemetrySidebarProps) {
  const [telemetryData, setTelemetryData] = useState<TelemetryData>({
    orientation: { roll: 0, pitch: 0, yaw: 0 },
    distance: 150,
    temperature: 24.5,
    signalStrength: -45,
  });

  useEffect(() => {
    if (!simulationMode) return;

    const interval = setInterval(() => {
      setTelemetryData(prev => ({
        orientation: {
          roll: prev.orientation.roll + (Math.random() - 0.5) * 2,
          pitch: prev.orientation.pitch + (Math.random() - 0.5) * 2,
          yaw: (prev.orientation.yaw + (Math.random() - 0.5) * 5) % 360,
        },
        distance: Math.max(5, prev.distance + (Math.random() - 0.5) * 10),
        temperature: 24.5 + (Math.random() - 0.5) * 3,
        signalStrength: -45 + (Math.random() - 0.5) * 10,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [simulationMode]);

  const getSignalBars = (strength: number) => {
    const bars = Math.max(1, Math.min(4, Math.floor((strength + 100) / 15)));
    return bars;
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`fixed top-16 right-0 h-[calc(100vh-4rem)] bg-card border-l border-border transition-transform duration-300 z-30 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } w-80`}>
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Live Telemetry</h2>
            <Button variant="ghost" size="sm" onClick={onToggle}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {/* Orientation */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Compass className="h-4 w-4" />
                  <span>Orientation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Roll:</span>
                  <span className="font-mono">{telemetryData.orientation.roll.toFixed(1)}°</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pitch:</span>
                  <span className="font-mono">{telemetryData.orientation.pitch.toFixed(1)}°</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Yaw:</span>
                  <span className="font-mono">{telemetryData.orientation.yaw.toFixed(1)}°</span>
                </div>
              </CardContent>
            </Card>

            {/* Distance */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Gauge className="h-4 w-4" />
                  <span>Obstacle Distance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-mono font-bold text-primary">
                  {telemetryData.distance.toFixed(0)} cm
                </div>
                <div className="w-full bg-secondary rounded-full h-2 mt-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (telemetryData.distance / 200) * 100)}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Temperature */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Thermometer className="h-4 w-4" />
                  <span>Temperature</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-mono font-bold">
                  {telemetryData.temperature.toFixed(1)}°C
                </div>
              </CardContent>
            </Card>

            {/* Signal Strength */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Wifi className="h-4 w-4" />
                  <span>Signal Strength</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((bar) => (
                      <div
                        key={bar}
                        className={`w-1 rounded-sm ${
                          bar <= getSignalBars(telemetryData.signalStrength)
                            ? 'bg-primary'
                            : 'bg-secondary'
                        }`}
                        style={{ height: `${bar * 4 + 4}px` }}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-mono">{telemetryData.signalStrength} dBm</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Toggle Button (when closed) */}
      {!isOpen && (
        <Button
          variant="outline"
          size="sm"
          onClick={onToggle}
          className="fixed top-20 right-4 z-30 bg-card"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="ml-1 text-xs">Telemetry</span>
        </Button>
      )}
    </>
  );
}