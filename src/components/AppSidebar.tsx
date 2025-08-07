import {
  Camera,
  Activity,
  Upload,
  MapPin,
  Info,
  Home,
  BarChart3,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import universityLogo from "@/assets/university-logo.png";
import departmentLogo from "@/assets/department-logo.png";

const navItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Camera Feed", url: "/camera", icon: Camera },
  { title: "Rover Health", url: "/health", icon: Activity },
  { title: "Code Upload", url: "/upload", icon: Upload },
  { title: "Location", url: "/location", icon: MapPin },
  { title: "About", url: "/about", icon: Info },
];

interface AppSidebarProps {
  onTelemetryToggle: () => void;
}

export function AppSidebar({ onTelemetryToggle }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-primary  font-medium text-[#fff]"
      : "hover:bg-secondary text-muted-foreground hover:text-foreground";

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent>
        {/* Logo Section */}
        <div
          className={`p-4 border-b border-border ${
            state === "collapsed" ? "px-2" : ""
          }`}
        >
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <img
                src={universityLogo}
                alt="University Logo"
                className="h-8 w-8 object-contain flex-shrink-0"
              />
              <img
                src={departmentLogo}
                alt="Department Logo"
                className="h-8 w-8 object-contain flex-shrink-0"
              />
            </div>
            {state !== "collapsed" && (
              <div className="min-w-0">
                <h1 className="text-sm font-bold text-foreground truncate">
                  Rover Control System
                </h1>
                <p className="text-xs text-muted-foreground truncate">
                  Real-time monitoring
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={getNavClassName}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {state !== "collapsed" && (
                        <span className="ml-2">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Telemetry Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onTelemetryToggle}>
                  <BarChart3 className="h-4 w-4 flex-shrink-0" />
                  {state !== "collapsed" && (
                    <span className="ml-2">Toggle Telemetry</span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
