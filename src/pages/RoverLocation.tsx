import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusIndicator from "@/components/StatusIndicator";
import { MapPin, Navigation, RotateCcw, Zap } from "lucide-react";

interface GPSData {
  latitude: number;
  longitude: number;
  altitude: number;
  accuracy: number;
  speed: number;
  heading: number;
}

export default function RoverLocation() {
  const [gpsData, setGpsData] = useState<GPSData>({
    latitude: 40.7128,
    longitude: -74.0060,
    altitude: 10.5,
    accuracy: 3.2,
    speed: 0.8,
    heading: 135,
  });

  const [gpsEnabled, setGpsEnabled] = useState(true);

  useEffect(() => {
    if (!gpsEnabled) return;

    const interval = setInterval(() => {
      setGpsData(prev => ({
        ...prev,
        latitude: prev.latitude + (Math.random() - 0.5) * 0.0001,
        longitude: prev.longitude + (Math.random() - 0.5) * 0.0001,
        altitude: prev.altitude + (Math.random() - 0.5) * 0.5,
        accuracy: 2 + Math.random() * 2,
        speed: Math.max(0, prev.speed + (Math.random() - 0.5) * 0.3),
        heading: (prev.heading + (Math.random() - 0.5) * 10) % 360,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [gpsEnabled]);

  const formatCoordinate = (coord: number, isLatitude: boolean) => {
    const abs = Math.abs(coord);
    const degrees = Math.floor(abs);
    const minutes = (abs - degrees) * 60;
    const direction = isLatitude 
      ? (coord >= 0 ? 'N' : 'S')
      : (coord >= 0 ? 'E' : 'W');
    
    return `${degrees}°${minutes.toFixed(4)}' ${direction}`;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Rover Location</h1>
          <p className="text-sm sm:text-base text-muted-foreground">GPS tracking and positioning data</p>
        </div>
        
        <StatusIndicator 
          status={gpsEnabled ? "connected" : "disconnected"}
          label={gpsEnabled ? "GPS Active" : "GPS Disabled"}
        />
      </div>

      {/* GPS Status and Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Current Position</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="font-mono text-sm">
              <div>Lat: {formatCoordinate(gpsData.latitude, true)}</div>
              <div>Lon: {formatCoordinate(gpsData.longitude, false)}</div>
            </div>
            <div className="text-xs text-muted-foreground">
              Accuracy: ±{gpsData.accuracy.toFixed(1)}m
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Navigation className="h-4 w-4" />
              <span>Movement</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="font-mono text-sm">
              <div>Speed: {gpsData.speed.toFixed(1)} m/s</div>
              <div>Heading: {gpsData.heading.toFixed(0)}°</div>
            </div>
            <div className="text-xs text-muted-foreground">
              Altitude: {gpsData.altitude.toFixed(1)}m
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => alert('Home position set!')}
            >
              <MapPin className="h-3 w-3 mr-1" />
              Set Home
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => alert('Returning to home position...')}
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Live Map View</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-96 bg-muted rounded-lg flex items-center justify-center">
            {/* Map placeholder */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Map Integration Ready</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  This area will display a live map with the rover's current location, 
                  path history, and waypoints when GPS data is available.
                </p>
                <div className="mt-4 p-3 bg-card rounded border border-border">
                  <p className="text-xs text-muted-foreground">
                    Current coordinates: {gpsData.latitude.toFixed(6)}, {gpsData.longitude.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>

            {/* Simulated rover position indicator */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </CardContent>
      </Card>

      {/* Position History */}
      <Card>
        <CardHeader>
          <CardTitle>Position History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between text-sm border-b border-border pb-2">
                <div className="font-mono">
                  {formatCoordinate(gpsData.latitude + i * 0.0001, true)}, {formatCoordinate(gpsData.longitude + i * 0.0001, false)}
                </div>
                <div className="text-muted-foreground">
                  {new Date(Date.now() - i * 60000).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}