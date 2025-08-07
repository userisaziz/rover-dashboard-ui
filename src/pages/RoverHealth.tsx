import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataCard from "@/components/DataCard";
import DataLogger from "@/components/DataLogger";
import StatusIndicator from "@/components/StatusIndicator";
import RoverLocationMap from "@/components/RoverLocationMap";
import { Activity, Battery, Compass, Gauge, Zap, Navigation } from "lucide-react";

interface SensorData {
  accelerometer: { x: number; y: number; z: number };
  gyroscope: { x: number; y: number; z: number };
  magnetometer: { x: number; y: number; z: number };
  ultrasonic: number;
  battery: number;
  temperature: number;
}

interface RoverHealthProps {
  simulationMode?: boolean;
}

export default function RoverHealth({ simulationMode = true }: RoverHealthProps) {
  const [sensorData, setSensorData] = useState<SensorData>({
    accelerometer: { x: 0, y: 0, z: 9.8 },
    gyroscope: { x: 0, y: 0, z: 0 },
    magnetometer: { x: 25.5, y: -10.2, z: 45.8 },
    ultrasonic: 150,
    battery: 85,
    temperature: 24.5,
  });

  const [updateFrequency, setUpdateFrequency] = useState(0);
  const [isLogging, setIsLogging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time sensor data updates
      setSensorData(prev => ({
        accelerometer: {
          x: prev.accelerometer.x + (Math.random() - 0.5) * 0.5,
          y: prev.accelerometer.y + (Math.random() - 0.5) * 0.5,
          z: 9.8 + (Math.random() - 0.5) * 0.2,
        },
        gyroscope: {
          x: (Math.random() - 0.5) * 10,
          y: (Math.random() - 0.5) * 10,
          z: (Math.random() - 0.5) * 10,
        },
        magnetometer: {
          x: 25.5 + (Math.random() - 0.5) * 5,
          y: -10.2 + (Math.random() - 0.5) * 5,
          z: 45.8 + (Math.random() - 0.5) * 5,
        },
        ultrasonic: Math.max(5, prev.ultrasonic + (Math.random() - 0.5) * 20),
        battery: Math.max(0, Math.min(100, prev.battery - 0.01)),
        temperature: 24.5 + (Math.random() - 0.5) * 2,
      }));
      
      setUpdateFrequency(prev => prev + 1);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const getBatteryStatus = (level: number) => {
    if (level > 30) return "connected";
    if (level > 15) return "warning";
    return "disconnected";
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Rover Health</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Real-time sensor data and system status</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <StatusIndicator 
            status="connected"
            label="Data Stream Active"
          />
          <div className="text-sm text-muted-foreground">
            Updates: {updateFrequency} Hz
          </div>
        </div>
      </div>

      {/* Quick Status Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <DataCard
          title="Battery Level"
          value={sensorData.battery.toFixed(1)}
          unit="%"
          icon={<Battery className="h-4 w-4" />}
          trend={sensorData.battery > 50 ? "stable" : "down"}
        />
        <DataCard
          title="Distance Sensor"
          value={sensorData.ultrasonic.toFixed(0)}
          unit="cm"
          icon={<Gauge className="h-4 w-4" />}
          trend="stable"
        />
        <DataCard
          title="Temperature"
          value={sensorData.temperature.toFixed(1)}
          unit="°C"
          icon={<Activity className="h-4 w-4" />}
          trend="stable"
        />
        <DataCard
          title="System Status"
          value="Nominal"
          icon={<Zap className="h-4 w-4" />}
          trend="stable"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* IMU Data - Accelerometer */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Accelerometer</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-foreground">
                  {sensorData.accelerometer.x.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">X-axis (m/s²)</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-foreground">
                  {sensorData.accelerometer.y.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Y-axis (m/s²)</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-foreground">
                  {sensorData.accelerometer.z.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Z-axis (m/s²)</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Measures linear acceleration in three dimensions
            </div>
          </CardContent>
        </Card>

        {/* IMU Data - Gyroscope */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Compass className="h-5 w-5" />
              <span>Gyroscope</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-foreground">
                  {sensorData.gyroscope.x.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">X-axis (°/s)</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-foreground">
                  {sensorData.gyroscope.y.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Y-axis (°/s)</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-foreground">
                  {sensorData.gyroscope.z.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Z-axis (°/s)</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Measures angular velocity and rotation rate
            </div>
          </CardContent>
        </Card>

        {/* Magnetometer */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Navigation className="h-5 w-5" />
              <span>Magnetometer</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-foreground">
                  {sensorData.magnetometer.x.toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">X-axis (μT)</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-foreground">
                  {sensorData.magnetometer.y.toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">Y-axis (μT)</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-foreground">
                  {sensorData.magnetometer.z.toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">Z-axis (μT)</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Measures magnetic field strength for compass heading
            </div>
          </CardContent>
        </Card>

        {/* Power & Environmental */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Battery className="h-5 w-5" />
              <span>Power & Environment</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Battery Voltage:</span>
                <span className="font-bold">{(sensorData.battery * 0.12).toFixed(2)}V</span>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    sensorData.battery > 30 ? 'bg-success' : 
                    sensorData.battery > 15 ? 'bg-warning' : 'bg-destructive'
                  }`}
                  style={{ width: `${sensorData.battery}%` }}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Temperature:</span>
                <span className="font-bold">{sensorData.temperature.toFixed(1)}°C</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">System Load:</span>
                <span className="font-bold">42%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Uptime:</span>
                <span className="font-bold">02:34:17</span>
              </div>
            </div>
            
            <StatusIndicator 
              status={getBatteryStatus(sensorData.battery)}
              label={
                sensorData.battery > 30 ? "Power Normal" :
                sensorData.battery > 15 ? "Low Battery" : "Critical Battery"
              }
            />
          </CardContent>
        </Card>
      </div>

      {/* Data Logging & Export */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <DataLogger 
          sensorData={sensorData}
          isLogging={isLogging}
          onToggleLogging={setIsLogging}
        />
        
        {/* Real-time Charts Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Real-time Data Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-muted rounded flex items-center justify-center">
              <p className="text-muted-foreground">Live sensor charts will appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* GPS Location Section */}
      <RoverLocationMap simulationMode={simulationMode} />
    </div>
  );
}