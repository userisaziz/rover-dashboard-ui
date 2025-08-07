import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusIndicator from "@/components/StatusIndicator";
import { Camera, Download, Maximize, Minimize } from "lucide-react";

export default function CameraFeed() {
  const [isConnected, setIsConnected] = useState(true);
  const [lastFrame, setLastFrame] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Simulate live feed updates
    const interval = setInterval(() => {
      if (isConnected) {
        setLastFrame(new Date());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isConnected]);

  const captureScreenshot = () => {
    // Simulate screenshot capture
    const link = document.createElement('a');
    link.download = `rover-screenshot-${Date.now()}.png`;
    link.href = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    link.click();
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Camera Feed</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Live video stream from rover's camera</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <StatusIndicator 
            status={isConnected ? "connected" : "disconnected"}
            label={isConnected ? "Connected" : "Disconnected"}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsConnected(!isConnected)}
          >
            {isConnected ? "Disconnect" : "Connect"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Camera Feed */}
        <Card className={`${isFullscreen ? 'fixed inset-4 z-50' : 'lg:col-span-3'} overflow-hidden`}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Camera className="h-5 w-5" />
              <span>Live Feed</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={captureScreenshot}
                disabled={!isConnected}
              >
                <Download className="h-4 w-4 mr-2" />
                Screenshot
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize className="h-4 w-4" />
                ) : (
                  <Maximize className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative bg-muted aspect-video">
              {isConnected ? (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                      <Camera className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-semibold">Live Camera Feed</p>
                      <p className="text-sm text-muted-foreground">
                        Camera stream would display here
                      </p>
                      <div className="text-xs text-muted-foreground">
                        Resolution: 1920x1080 • FPS: 30 • Codec: H.264
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-muted flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Camera className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">Camera Disconnected</p>
                  </div>
                </div>
              )}
              
              {/* Live indicator */}
              {isConnected && (
                <div className="absolute top-4 left-4 flex items-center space-x-2 bg-black/50 rounded-md px-2 py-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-white text-sm font-medium">LIVE</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Feed Status */}
        {!isFullscreen && (
          <Card>
            <CardHeader>
              <CardTitle>Feed Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Connection:</span>
                  <span className={isConnected ? "text-success" : "text-destructive"}>
                    {isConnected ? "Active" : "Inactive"}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Frame:</span>
                  <span className="text-foreground">
                    {lastFrame.toLocaleTimeString()}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Quality:</span>
                  <span className="text-foreground">HD (1080p)</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Latency:</span>
                  <span className="text-foreground">~120ms</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Camera Controls</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full text-sm">
                    Pan Left
                  </Button>
                  <Button variant="outline" className="w-full text-sm">
                    Pan Right
                  </Button>
                  <Button variant="outline" className="w-full text-sm">
                    Tilt Up
                  </Button>
                  <Button variant="outline" className="w-full text-sm">
                    Tilt Down
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}