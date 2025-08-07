import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { TestTube } from "lucide-react";

interface SimulationToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function SimulationToggle({ enabled, onToggle }: SimulationToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <TestTube className="h-4 w-4 text-muted-foreground" />
      <Label htmlFor="simulation-mode" className="text-sm">Simulation Mode</Label>
      <Switch
        id="simulation-mode"
        checked={enabled}
        onCheckedChange={onToggle}
      />
    </div>
  );
}