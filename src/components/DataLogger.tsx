import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Square, Download, Database } from "lucide-react";

interface LogEntry {
  timestamp: number;
  accelerometer: { x: number; y: number; z: number };
  gyroscope: { x: number; y: number; z: number };
  magnetometer: { x: number; y: number; z: number };
  ultrasonic: number;
  battery: number;
  temperature: number;
}

interface DataLoggerProps {
  sensorData: any;
  isLogging: boolean;
  onToggleLogging: (logging: boolean) => void;
}

export default function DataLogger({ sensorData, isLogging, onToggleLogging }: DataLoggerProps) {
  const [logData, setLogData] = useState<LogEntry[]>([]);
  const [logDuration, setLogDuration] = useState(0);
  const logIntervalRef = useRef<NodeJS.Timeout>();
  const durationIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isLogging) {
      // Start logging
      logIntervalRef.current = setInterval(() => {
        const entry: LogEntry = {
          timestamp: Date.now(),
          ...sensorData,
        };
        setLogData(prev => [...prev, entry]);
      }, 100); // Log every 100ms

      // Track duration
      durationIntervalRef.current = setInterval(() => {
        setLogDuration(prev => prev + 1);
      }, 1000);
    } else {
      // Stop logging
      if (logIntervalRef.current) {
        clearInterval(logIntervalRef.current);
      }
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    }

    return () => {
      if (logIntervalRef.current) clearInterval(logIntervalRef.current);
      if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
    };
  }, [isLogging, sensorData]);

  const handleToggleLogging = () => {
    if (!isLogging) {
      // Clear previous data when starting new session
      setLogData([]);
      setLogDuration(0);
    }
    onToggleLogging(!isLogging);
  };

  const exportDataAsCSV = () => {
    if (logData.length === 0) return;

    const headers = [
      'timestamp', 'accel_x', 'accel_y', 'accel_z',
      'gyro_x', 'gyro_y', 'gyro_z',
      'mag_x', 'mag_y', 'mag_z',
      'ultrasonic', 'battery', 'temperature'
    ];

    const csvContent = [
      headers.join(','),
      ...logData.map(entry => [
        new Date(entry.timestamp).toISOString(),
        entry.accelerometer.x.toFixed(3),
        entry.accelerometer.y.toFixed(3),
        entry.accelerometer.z.toFixed(3),
        entry.gyroscope.x.toFixed(3),
        entry.gyroscope.y.toFixed(3),
        entry.gyroscope.z.toFixed(3),
        entry.magnetometer.x.toFixed(3),
        entry.magnetometer.y.toFixed(3),
        entry.magnetometer.z.toFixed(3),
        entry.ultrasonic.toFixed(1),
        entry.battery.toFixed(1),
        entry.temperature.toFixed(1),
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `rover-data-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const exportDataAsJSON = () => {
    if (logData.length === 0) return;

    const jsonContent = JSON.stringify({
      session: {
        startTime: logData[0]?.timestamp,
        endTime: logData[logData.length - 1]?.timestamp,
        duration: logDuration,
        sampleCount: logData.length,
      },
      data: logData
    }, null, 2);

    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `rover-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="h-5 w-5" />
          <span>Data Logger</span>
          {isLogging && (
            <Badge variant="default" className="animate-pulse">
              Recording
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Session Duration: <span className="font-mono">{formatDuration(logDuration)}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Data Points: <span className="font-mono">{logData.length}</span>
            </p>
          </div>
          
          <Button
            onClick={handleToggleLogging}
            variant={isLogging ? "destructive" : "default"}
            size="sm"
          >
            {isLogging ? (
              <>
                <Square className="h-4 w-4 mr-2" />
                Stop Logging
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start Logging
              </>
            )}
          </Button>
        </div>

        {logData.length > 0 && (
          <div className="flex space-x-2">
            <Button
              onClick={exportDataAsCSV}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button
              onClick={exportDataAsJSON}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              Export JSON
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}