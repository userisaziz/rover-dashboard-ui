import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DataCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "stable";
  className?: string;
}

export default function DataCard({ title, value, unit, icon, trend, className }: DataCardProps) {
  const trendColors = {
    up: "text-success",
    down: "text-destructive",
    stable: "text-muted-foreground",
  };

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-1">
          <div className="text-2xl font-bold text-foreground">
            {value}
          </div>
          {unit && (
            <span className="text-sm text-muted-foreground">
              {unit}
            </span>
          )}
        </div>
        {trend && (
          <div className={cn("text-xs mt-1", trendColors[trend])}>
            {trend === "up" && "↗ Increasing"}
            {trend === "down" && "↘ Decreasing"}
            {trend === "stable" && "→ Stable"}
          </div>
        )}
      </CardContent>
    </Card>
  );
}