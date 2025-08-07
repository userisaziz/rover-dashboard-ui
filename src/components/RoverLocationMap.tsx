import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Settings, Navigation, Target } from "lucide-react";

interface GPSCoordinate {
  lat: number;
  lng: number;
  timestamp: number;
  altitude?: number;
  accuracy?: number;
}

interface RoverLocationMapProps {
  simulationMode: boolean;
}

const RoverLocationMap: React.FC<RoverLocationMapProps> = ({ simulationMode }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState(() => 
    localStorage.getItem('mapbox_token') || ''
  );
  const [isTokenSet, setIsTokenSet] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<GPSCoordinate>({
    lat: 37.7749,  // San Francisco coordinates as default
    lng: -122.4194,
    timestamp: Date.now(),
    altitude: 45,
    accuracy: 3
  });
  const [pathHistory, setPathHistory] = useState<GPSCoordinate[]>([]);
  const [isTracking, setIsTracking] = useState(true);

  // Initialize map when token is set
  useEffect(() => {
    if (!mapboxToken || !mapContainer.current || map.current) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [currentLocation.lng, currentLocation.lat],
        zoom: 16,
        pitch: 45,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add scale control
      map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left');

      // Add rover marker
      const roverMarker = new mapboxgl.Marker({
        color: '#00ff00',
        scale: 1.2
      })
        .setLngLat([currentLocation.lng, currentLocation.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`
          <div class="p-2">
            <h3 class="font-bold">Rover Location</h3>
            <p>Lat: ${currentLocation.lat.toFixed(6)}</p>
            <p>Lng: ${currentLocation.lng.toFixed(6)}</p>
            <p>Alt: ${currentLocation.altitude}m</p>
          </div>
        `))
        .addTo(map.current);

      setIsTokenSet(true);
      localStorage.setItem('mapbox_token', mapboxToken);

      // Store marker reference for updates
      (map.current as any).roverMarker = roverMarker;

    } catch (error) {
      console.error('Error initializing map:', error);
      setIsTokenSet(false);
    }

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [mapboxToken]);

  // Simulate GPS movement in simulation mode
  useEffect(() => {
    if (!simulationMode || !isTracking) return;

    const interval = setInterval(() => {
      setCurrentLocation(prev => {
        const newLocation = {
          lat: prev.lat + (Math.random() - 0.5) * 0.0001, // Small movement
          lng: prev.lng + (Math.random() - 0.5) * 0.0001,
          timestamp: Date.now(),
          altitude: 45 + (Math.random() - 0.5) * 10,
          accuracy: 2 + Math.random() * 3
        };

        // Add to path history
        setPathHistory(history => [...history.slice(-50), newLocation]); // Keep last 50 points

        return newLocation;
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [simulationMode, isTracking]);

  // Update map when location changes
  useEffect(() => {
    if (!map.current || !isTokenSet) return;

    const roverMarker = (map.current as any).roverMarker;
    if (roverMarker) {
      roverMarker.setLngLat([currentLocation.lng, currentLocation.lat]);
      roverMarker.getPopup().setHTML(`
        <div class="p-2">
          <h3 class="font-bold">Rover Location</h3>
          <p>Lat: ${currentLocation.lat.toFixed(6)}</p>
          <p>Lng: ${currentLocation.lng.toFixed(6)}</p>
          <p>Alt: ${currentLocation.altitude?.toFixed(1)}m</p>
          <p>Accuracy: ±${currentLocation.accuracy?.toFixed(1)}m</p>
        </div>
      `);
    }

    // Update path trace
    if (pathHistory.length > 1) {
      const coordinates = pathHistory.map(point => [point.lng, point.lat]);
      
      if (map.current.getSource('rover-path')) {
        (map.current.getSource('rover-path') as mapboxgl.GeoJSONSource).setData({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates
          }
        });
      } else {
        map.current.addSource('rover-path', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coordinates
            }
          }
        });

        map.current.addLayer({
          id: 'rover-path',
          type: 'line',
          source: 'rover-path',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#ff6b35',
            'line-width': 3,
            'line-opacity': 0.8
          }
        });
      }
    }
  }, [currentLocation, pathHistory, isTokenSet]);

  const centerOnRover = () => {
    if (map.current) {
      map.current.flyTo({
        center: [currentLocation.lng, currentLocation.lat],
        zoom: 18,
        duration: 2000
      });
    }
  };

  const clearPath = () => {
    setPathHistory([]);
    if (map.current && map.current.getSource('rover-path')) {
      (map.current.getSource('rover-path') as mapboxgl.GeoJSONSource).setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: []
        }
      });
    }
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      // Trigger map initialization
      setIsTokenSet(false);
      setTimeout(() => {
        if (mapContainer.current) {
          map.current?.remove();
          map.current = null;
        }
      }, 100);
    }
  };

  if (!isTokenSet) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Rover Location - Setup Required</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            To display the live GPS map, please enter your Mapbox public token.
            You can get one from{" "}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
            {" "}(Tokens section in dashboard).
          </p>
          <div className="flex space-x-2">
            <Input
              type="password"
              placeholder="Enter Mapbox public token (pk.ey...)"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTokenSubmit} disabled={!mapboxToken.trim()}>
              <Settings className="h-4 w-4 mr-2" />
              Set Token
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Rover Location</span>
            {simulationMode && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                Simulation
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearPath}
              disabled={pathHistory.length === 0}
            >
              Clear Path
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={centerOnRover}
            >
              <Target className="h-4 w-4 mr-1" />
              Center
            </Button>
            <Button
              variant={isTracking ? "default" : "outline"}
              size="sm"
              onClick={() => setIsTracking(!isTracking)}
            >
              <Navigation className="h-4 w-4 mr-1" />
              {isTracking ? "Tracking" : "Paused"}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* GPS Coordinates Display */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Latitude</div>
            <div className="font-mono font-bold">{currentLocation.lat.toFixed(6)}°</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Longitude</div>
            <div className="font-mono font-bold">{currentLocation.lng.toFixed(6)}°</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Altitude</div>
            <div className="font-mono font-bold">{currentLocation.altitude?.toFixed(1)}m</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Accuracy</div>
            <div className="font-mono font-bold">±{currentLocation.accuracy?.toFixed(1)}m</div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative h-80 rounded-lg overflow-hidden border">
          <div ref={mapContainer} className="absolute inset-0" />
          <div className="absolute top-2 left-2 bg-card/90 backdrop-blur px-2 py-1 rounded text-xs">
            Path Points: {pathHistory.length}
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Last Update: {new Date(currentLocation.timestamp).toLocaleTimeString()}
          {simulationMode && " (Simulated GPS data)"}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoverLocationMap;