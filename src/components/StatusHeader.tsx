import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Battery, Wifi, Activity, Radio } from "lucide-react";

interface StatusHeaderProps {
  simulationMode: boolean;
}

export default function StatusHeader({ simulationMode }: StatusHeaderProps) {
  const [roverOnline, setRoverOnline] = useState(true);
  const [dataReceiving, setDataReceiving] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [signalStrength, setSignalStrength] = useState(-45);
  const [heartbeat, setHeartbeat] = useState(false);

  useEffect(() => {
    if (!simulationMode) return;

    // Simulate battery drain
    const batteryInterval = setInterval(() => {
      setBatteryLevel(prev => Math.max(0, prev - 0.01));
    }, 5000);

    // Simulate signal fluctuation
    const signalInterval = setInterval(() => {
      setSignalStrength(prev => prev + (Math.random() - 0.5) * 5);
    }, 3000);

    // Heartbeat animation
    const heartbeatInterval = setInterval(() => {
      setHeartbeat(prev => !prev);
    }, 1000);

    return () => {
      clearInterval(batteryInterval);
      clearInterval(signalInterval);
      clearInterval(heartbeatInterval);
    };
  }, [simulationMode]);

  const getBatteryColor = (level: number) => {
    if (level > 50) return "text-success";
    if (level > 20) return "text-warning";
    return "text-destructive";
  };

  const getSignalBars = (strength: number) => {
    return Math.max(1, Math.min(4, Math.floor((strength + 100) / 15)));
  };

  return (
    <div className="flex items-center space-x-3 text-sm">
      {/* Rover Status */}
      <div className="flex items-center space-x-1">
        <div className={`w-2 h-2 rounded-full ${roverOnline ? 'bg-success' : 'bg-destructive'}`} />
        <span className="text-xs text-muted-foreground">
          {roverOnline ? 'Online' : 'Offline'}
        </span>
      </div>

      {/* Data Receiving */}
      <div className="flex items-center space-x-1">
        <Activity 
          className={`h-3 w-3 ${dataReceiving ? 'text-success' : 'text-muted-foreground'} ${
            heartbeat && dataReceiving ? 'animate-pulse' : ''
          }`} 
        />
        <span className="text-xs text-muted-foreground">Data</span>
      </div>

      {/* Battery Level */}
      <div className="flex items-center space-x-1">
        <Battery className={`h-3 w-3 ${getBatteryColor(batteryLevel)}`} />
        <span className={`text-xs ${getBatteryColor(batteryLevel)}`}>
          {batteryLevel.toFixed(0)}%
        </span>
      </div>

      {/* Signal Strength */}
      <div className="flex items-center space-x-1">
        <div className="flex space-x-0.5">
          {[1, 2, 3, 4].map((bar) => (
            <div
              key={bar}
              className={`w-0.5 rounded-sm ${
                bar <= getSignalBars(signalStrength)
                  ? 'bg-primary'
                  : 'bg-muted'
              }`}
              style={{ height: `${bar * 2 + 4}px` }}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {signalStrength.toFixed(0)} dBm
        </span>
      </div>
    </div>
  );
}