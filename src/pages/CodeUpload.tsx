import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import StatusIndicator from "@/components/StatusIndicator";
import CommandConsole from "@/components/CommandConsole";
import { Upload, Play, Code, History, CheckCircle, XCircle } from "lucide-react";

interface UploadHistory {
  id: string;
  timestamp: Date;
  status: "success" | "failed";
  message: string;
  codePreview: string;
}

export default function CodeUpload() {
  const [code, setCode] = useState(`// Arduino-compatible rover control code
#include <WiFi.h>
#include <ESP32Servo.h>

// Motor pins
const int leftMotorForward = 12;
const int leftMotorBackward = 14;
const int rightMotorForward = 27;
const int rightMotorBackward = 26;

// Sensor pins
const int ultrasonicTrig = 5;
const int ultrasonicEcho = 18;

void setup() {
  Serial.begin(115200);
  
  // Initialize motor pins
  pinMode(leftMotorForward, OUTPUT);
  pinMode(leftMotorBackward, OUTPUT);
  pinMode(rightMotorForward, OUTPUT);
  pinMode(rightMotorBackward, OUTPUT);
  
  // Initialize ultrasonic sensor
  pinMode(ultrasonicTrig, OUTPUT);
  pinMode(ultrasonicEcho, INPUT);
  
  Serial.println("Rover initialized successfully!");
}

void loop() {
  // Read distance from ultrasonic sensor
  long distance = getDistance();
  
  if (distance > 20) {
    moveForward();
  } else {
    stopMotors();
    delay(500);
    turnRight();
    delay(1000);
  }
  
  delay(100);
}

long getDistance() {
  digitalWrite(ultrasonicTrig, LOW);
  delayMicroseconds(2);
  digitalWrite(ultrasonicTrig, HIGH);
  delayMicroseconds(10);
  digitalWrite(ultrasonicTrig, LOW);
  
  long duration = pulseIn(ultrasonicEcho, HIGH);
  long distance = duration * 0.034 / 2;
  
  return distance;
}

void moveForward() {
  digitalWrite(leftMotorForward, HIGH);
  digitalWrite(leftMotorBackward, LOW);
  digitalWrite(rightMotorForward, HIGH);
  digitalWrite(rightMotorBackward, LOW);
}

void stopMotors() {
  digitalWrite(leftMotorForward, LOW);
  digitalWrite(leftMotorBackward, LOW);
  digitalWrite(rightMotorForward, LOW);
  digitalWrite(rightMotorBackward, LOW);
}

void turnRight() {
  digitalWrite(leftMotorForward, HIGH);
  digitalWrite(leftMotorBackward, LOW);
  digitalWrite(rightMotorForward, LOW);
  digitalWrite(rightMotorBackward, HIGH);
}`);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "failed">("idle");
  const [uploadHistory, setUploadHistory] = useState<UploadHistory[]>([
    {
      id: "1",
      timestamp: new Date(Date.now() - 300000),
      status: "success",
      message: "Code uploaded successfully to rover",
      codePreview: "Basic movement control with obstacle avoidance"
    },
    {
      id: "2", 
      timestamp: new Date(Date.now() - 600000),
      status: "failed",
      message: "Upload failed: Connection timeout",
      codePreview: "Camera control integration attempt"
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 900000),
      status: "success",
      message: "Code uploaded and compiled successfully",
      codePreview: "IMU sensor calibration routine"
    }
  ]);

  const handleUpload = async () => {
    setIsUploading(true);
    setUploadStatus("idle");
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const success = Math.random() > 0.3; // 70% success rate
    
    if (success) {
      setUploadStatus("success");
      const newUpload: UploadHistory = {
        id: Date.now().toString(),
        timestamp: new Date(),
        status: "success",
        message: "Code uploaded and compiled successfully",
        codePreview: code.split('\n')[1]?.slice(0, 50) + "..." || "Custom code"
      };
      setUploadHistory(prev => [newUpload, ...prev]);
    } else {
      setUploadStatus("failed");
      const newUpload: UploadHistory = {
        id: Date.now().toString(),
        timestamp: new Date(),
        status: "failed",
        message: "Upload failed: Compilation error on line 23",
        codePreview: code.split('\n')[1]?.slice(0, 50) + "..." || "Custom code"
      };
      setUploadHistory(prev => [newUpload, ...prev]);
    }
    
    setIsUploading(false);
  };

  const testCode = () => {
    // Simulate code testing
    alert("Code syntax check passed! Ready for upload.");
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Code Upload</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Write and deploy code to the rover wirelessly</p>
        </div>
        
        <StatusIndicator 
          status="connected"
          label="Rover Connected"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Code Editor */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code className="h-5 w-5" />
              <span>Arduino Code Editor</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[500px] font-mono text-sm"
              placeholder="Enter your Arduino-compatible code here..."
            />
            
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={handleUpload}
                disabled={isUploading || !code.trim()}
                className="flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>{isUploading ? "Uploading..." : "Upload to Rover"}</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={testCode}
                className="flex items-center space-x-2"
              >
                <Play className="h-4 w-4" />
                <span>Test Code</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setCode("")}
                className="flex items-center space-x-2"
              >
                <span>Clear</span>
              </Button>
            </div>
            
            {uploadStatus !== "idle" && (
              <div className={`p-4 rounded-lg flex items-center space-x-2 ${
                uploadStatus === "success" 
                  ? "bg-success/10 text-success-foreground border border-success/20" 
                  : "bg-destructive/10 text-destructive-foreground border border-destructive/20"
              }`}>
                {uploadStatus === "success" ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
                <span>
                  {uploadStatus === "success" 
                    ? "Code uploaded successfully!" 
                    : "Upload failed. Check your code and try again."
                  }
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upload Status & History */}
        <div className="space-y-6">
          {/* Upload Status */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Connection:</span>
                  <span className="text-success">Active</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Upload:</span>
                  <span className="text-foreground">
                    {uploadHistory[0]?.timestamp.toLocaleTimeString() || "None"}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Code Size:</span>
                  <span className="text-foreground">{code.length} chars</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Target:</span>
                  <span className="text-foreground">ESP32 Rover</span>
                </div>
              </div>
              
              {isUploading && (
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Uploading...</div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full animate-pulse w-2/3" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upload History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <History className="h-5 w-5" />
                <span>Recent Uploads</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-3">
                  {uploadHistory.map((upload) => (
                    <div
                      key={upload.id}
                      className={`p-3 rounded-lg border ${
                        upload.status === "success" 
                          ? "border-success/20 bg-success/5" 
                          : "border-destructive/20 bg-destructive/5"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {upload.status === "success" ? (
                          <CheckCircle className="h-4 w-4 text-success" />
                        ) : (
                          <XCircle className="h-4 w-4 text-destructive" />
                        )}
                        <div className="text-xs text-muted-foreground">
                          {upload.timestamp.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-sm font-medium mb-1">
                        {upload.message}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {upload.codePreview}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Command Console */}
      <CommandConsole />
    </div>
  );
}