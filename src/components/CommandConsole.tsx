import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Terminal, Send, RotateCcw } from "lucide-react";

interface Command {
  id: string;
  command: string;
  timestamp: Date;
  response: string;
  status: "success" | "error" | "pending";
}

export default function CommandConsole() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<Command[]>([
    {
      id: "1",
      command: "status",
      timestamp: new Date(Date.now() - 60000),
      response: "Rover systems operational. All sensors active.",
      status: "success"
    },
    {
      id: "2", 
      command: "move forward 100",
      timestamp: new Date(Date.now() - 30000),
      response: "Movement completed. Distance: 98cm",
      status: "success"
    }
  ]);

  const predefinedCommands = [
    "status",
    "move forward 50",
    "move backward 50",
    "rotate left 90",
    "rotate right 90",
    "stop",
    "scan",
    "led on",
    "led off"
  ];

  const sendCommand = () => {
    if (!command.trim()) return;

    const newCommand: Command = {
      id: Date.now().toString(),
      command: command.trim(),
      timestamp: new Date(),
      response: "",
      status: "pending"
    };

    setHistory(prev => [newCommand, ...prev]);
    setCommand("");

    // Simulate command execution
    setTimeout(() => {
      const responses: Record<string, string> = {
        "status": "All systems operational. Battery: 85%, Sensors: Active",
        "move forward": "Movement completed successfully",
        "move backward": "Backward movement completed",
        "rotate left": "Left rotation completed",
        "rotate right": "Right rotation completed", 
        "stop": "All motors stopped",
        "scan": "Ultrasonic scan: 147cm ahead, path clear",
        "led on": "LED indicators activated",
        "led off": "LED indicators deactivated"
      };

      const commandKey = Object.keys(responses).find(key => 
        newCommand.command.toLowerCase().includes(key)
      );

      const response = commandKey 
        ? responses[commandKey]
        : `Command '${newCommand.command}' executed`;

      setHistory(prev => prev.map(cmd => 
        cmd.id === newCommand.id 
          ? { ...cmd, response, status: "success" as const }
          : cmd
      ));
    }, 1000 + Math.random() * 2000);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendCommand();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="h-5 w-5" />
            <span>Remote Command Console</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearHistory}
            disabled={history.length === 0}
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Command Input */}
        <div className="flex space-x-2">
          <Input
            placeholder="Enter command (e.g., 'move forward 50', 'rotate left 90')"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyPress={handleKeyPress}
            className="font-mono"
          />
          <Button onClick={sendCommand} disabled={!command.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Commands */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Quick Commands:</p>
          <div className="flex flex-wrap gap-2">
            {predefinedCommands.map((cmd) => (
              <Button
                key={cmd}
                variant="outline"
                size="sm"
                onClick={() => setCommand(cmd)}
                className="text-xs"
              >
                {cmd}
              </Button>
            ))}
          </div>
        </div>

        {/* Command History */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Command History:</p>
          <ScrollArea className="h-48 border rounded-md p-3">
            <div className="space-y-3">
              {history.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No commands sent yet
                </p>
              ) : (
                history.map((cmd) => (
                  <div key={cmd.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm">$ {cmd.command}</span>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={
                            cmd.status === "success" ? "default" : 
                            cmd.status === "error" ? "destructive" : 
                            "secondary"
                          }
                          className="text-xs"
                        >
                          {cmd.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {cmd.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    {cmd.response && (
                      <p className="text-sm text-muted-foreground pl-2 border-l-2 border-muted">
                        {cmd.response}
                      </p>
                    )}
                    {cmd.status === "pending" && (
                      <p className="text-sm text-muted-foreground pl-2 border-l-2 border-muted animate-pulse">
                        Executing...
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}