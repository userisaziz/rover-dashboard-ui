import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "connected" | "disconnected" | "warning";
  label: string;
  className?: string;
}

export default function StatusIndicator({ status, label, className }: StatusIndicatorProps) {
  const statusColors = {
    connected: "bg-success",
    disconnected: "bg-destructive",
    warning: "bg-warning",
  };

  const statusTextColors = {
    connected: "text-success-foreground",
    disconnected: "text-destructive-foreground", 
    warning: "text-warning-foreground",
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className={cn("w-3 h-3 rounded-full animate-pulse", statusColors[status])} />
      <span className={cn("text-sm font-medium", statusTextColors[status])}>
        {label}
      </span>
    </div>
  );
}