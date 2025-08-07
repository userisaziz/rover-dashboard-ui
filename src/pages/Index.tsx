import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataCard from "@/components/DataCard";
import StatusIndicator from "@/components/StatusIndicator";
import { Camera, Activity, Upload, Info, ArrowRight, Zap, Shield, Wifi, MapPin, Navigation2, Thermometer, Compass } from "lucide-react";

const Index = () => {
  return (
    <div className="dashboard-grid">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="space-y-2">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Mission Control Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Real-time monitoring and control of autonomous rover systems
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <StatusIndicator status="connected" label="Online" />
          <StatusIndicator status="connected" label="Active" />
          <StatusIndicator status="connected" label="Ready" />
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="metrics-grid">
        <DataCard
          title="System Uptime"
          value="02:34:17"
          icon={<Zap className="h-4 w-4" />}
          trend="stable"
        />
        <DataCard
          title="Battery Level"
          value="85"
          unit="%"
          icon={<Shield className="h-4 w-4" />}
          trend="stable"
        />
        <DataCard
          title="Signal Strength"
          value="-45"
          unit="dBm"
          icon={<Wifi className="h-4 w-4" />}
          trend="stable"
        />
        <DataCard
          title="Data Rate"
          value="120"
          unit="Hz"
          icon={<Activity className="h-4 w-4" />}
          trend="stable"
        />
      </div>

      {/* Live Telemetry */}
      <div className="telemetry-section">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Live Telemetry</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Compass className="h-4 w-4" />
                  <span>Orientation</span>
                </div>
                <div className="text-lg font-semibold">45°</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Navigation2 className="h-4 w-4" />
                  <span>Distance</span>
                </div>
                <div className="text-lg font-semibold">12.3m</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Thermometer className="h-4 w-4" />
                  <span>Temperature</span>
                </div>
                <div className="text-lg font-semibold">24°C</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Location</span>
                </div>
                <div className="text-lg font-semibold">Lab-A1</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="actions-grid">
        <Link to="/camera" className="action-card group">
          <Card className="h-full hover:bg-accent/50 transition-all duration-200 group-hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Camera Feed</h3>
                  <p className="text-sm text-muted-foreground">Live video stream</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/health" className="action-card group">
          <Card className="h-full hover:bg-accent/50 transition-all duration-200 group-hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">System Health</h3>
                  <p className="text-sm text-muted-foreground">Sensor monitoring</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/upload" className="action-card group">
          <Card className="h-full hover:bg-accent/50 transition-all duration-200 group-hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Code Deploy</h3>
                  <p className="text-sm text-muted-foreground">Upload & execute</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/location" className="action-card group">
          <Card className="h-full hover:bg-accent/50 transition-all duration-200 group-hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-sm text-muted-foreground">GPS tracking</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Activity Feed */}
      <div className="activity-section">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-success rounded-full flex-shrink-0" />
                <span className="text-muted-foreground font-mono">15:42</span>
                <span className="flex-1">Code uploaded successfully - Navigation routine deployed</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                <span className="text-muted-foreground font-mono">15:38</span>
                <span className="flex-1">Camera feed accessed from control station</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                <span className="text-muted-foreground font-mono">15:35</span>
                <span className="flex-1">System health check completed - All sensors operational</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-success rounded-full flex-shrink-0" />
                <span className="text-muted-foreground font-mono">15:30</span>
                <span className="flex-1">Rover connected to wireless network successfully</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
