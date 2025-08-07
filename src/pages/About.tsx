import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Mail, ExternalLink, Users, Target, Zap } from "lucide-react";
import universityLogo from "@/assets/university-logo.png";
import departmentLogo from "@/assets/department-logo.png";

export default function About() {
  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Principal Investigator",
      email: "s.chen@university.edu",
      specialization: "Robotics & Autonomous Systems"
    },
    {
      name: "Alex Rodriguez",
      role: "Lead Engineer",
      email: "a.rodriguez@university.edu", 
      specialization: "Embedded Systems & IoT"
    },
    {
      name: "Maya Patel",
      role: "Software Developer",
      email: "m.patel@university.edu",
      specialization: "Real-time Systems & UI/UX"
    },
    {
      name: "James Kim",
      role: "Research Assistant",
      email: "j.kim@university.edu",
      specialization: "Sensor Integration & Data Analysis"
    }
  ];

  const objectives = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Autonomous Navigation",
      description: "Develop advanced algorithms for real-time obstacle detection and path planning using sensor fusion."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Wireless Communication",
      description: "Implement robust wireless protocols for remote monitoring and code deployment capabilities."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Educational Platform",
      description: "Create an accessible platform for students to learn robotics, programming, and system integration."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center space-x-6 mb-6">
          <img 
            src={universityLogo} 
            alt="University Logo" 
            className="h-16 w-16 object-contain"
          />
          <img 
            src={departmentLogo} 
            alt="Department Logo" 
            className="h-16 w-16 object-contain"
          />
        </div>
        <h1 className="text-4xl font-bold text-foreground">
          Wireless Rover Control System
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          An advanced research platform for autonomous rover control, real-time monitoring, 
          and wireless code deployment in educational and research environments.
        </p>
      </div>

      {/* Project Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            The Wireless Rover Control System is a comprehensive research project developed by the 
            Department of Electrical and Computer Engineering at our university. This project combines 
            cutting-edge hardware and software technologies to create an autonomous rover platform 
            capable of real-time data collection, wireless communication, and remote programming.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Built around a Raspberry Pi core with ESP32 co-processors, the rover integrates multiple 
            sensor systems including IMU, ultrasonic sensors, and camera modules. The system features 
            a modern web-based interface for monitoring, control, and code deployment, making it an 
            ideal platform for both research and educational applications.
          </p>
        </CardContent>
      </Card>

      {/* Research Objectives */}
      <Card>
        <CardHeader>
          <CardTitle>Research Objectives</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {objectives.map((objective, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="flex justify-center text-primary">
                  {objective.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {objective.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {objective.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hardware Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Main Controller:</span>
                <span className="text-foreground font-medium">Raspberry Pi 4B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Co-processor:</span>
                <span className="text-foreground font-medium">ESP32 DevKit</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">IMU Sensor:</span>
                <span className="text-foreground font-medium">MPU6050</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Distance Sensor:</span>
                <span className="text-foreground font-medium">HC-SR04 Ultrasonic</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Camera:</span>
                <span className="text-foreground font-medium">Raspberry Pi Camera v2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Wireless:</span>
                <span className="text-foreground font-medium">Wi-Fi 802.11ac</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Power:</span>
                <span className="text-foreground font-medium">LiPo 3S 2200mAh</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Software Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frontend:</span>
                <span className="text-foreground font-medium">React + TypeScript</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Styling:</span>
                <span className="text-foreground font-medium">Tailwind CSS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">UI Components:</span>
                <span className="text-foreground font-medium">shadcn/ui</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rover OS:</span>
                <span className="text-foreground font-medium">Raspberry Pi OS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Microcontroller:</span>
                <span className="text-foreground font-medium">Arduino Framework</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Communication:</span>
                <span className="text-foreground font-medium">WebSocket + HTTP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Video Streaming:</span>
                <span className="text-foreground font-medium">WebRTC</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Research Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map((member, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-muted">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  <p className="text-xs text-muted-foreground mb-2">{member.specialization}</p>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Mail className="h-3 w-3 mr-1" />
                    Contact
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact & Links */}
      <Card>
        <CardHeader>
          <CardTitle>Contact & Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-foreground">Department</h3>
              <p className="text-sm text-muted-foreground">
                Electrical & Computer Engineering<br />
                University Research Center<br />
                Building A, Room 204
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-foreground">Project Resources</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Github className="h-4 w-4 mr-2" />
                  Source Code
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Documentation
                </Button>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-foreground">Support</h3>
              <p className="text-sm text-muted-foreground">
                For technical support or collaboration inquiries, 
                please contact the project team.
              </p>
              <Button size="sm" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Get in Touch
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground pt-6 border-t">
        <p>
          © 2024 University Research Center - Department of Electrical & Computer Engineering
        </p>
        <p>
          This project is supported by the National Science Foundation Grant #ECE-2024-001
        </p>
      </div>
    </div>
  );
}