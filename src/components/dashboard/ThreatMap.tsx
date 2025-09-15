import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, MapPin, Activity, Filter } from "lucide-react";

interface ThreatLocation {
  id: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  threatCount: number;
  severity: "critical" | "high" | "medium" | "low";
  types: string[];
  lastActivity: string;
}

const mockThreatData: ThreatLocation[] = [
  {
    id: "1",
    country: "Russia", 
    city: "Moscow",
    latitude: 55.7558,
    longitude: 37.6176,
    threatCount: 1247,
    severity: "critical",
    types: ["APT", "Malware", "Phishing"],
    lastActivity: "2 minutes ago"
  },
  {
    id: "2",
    country: "China",
    city: "Beijing", 
    latitude: 39.9042,
    longitude: 116.4074,
    threatCount: 892,
    severity: "high",
    types: ["Espionage", "Data Theft", "Supply Chain"],
    lastActivity: "5 minutes ago"
  },
  {
    id: "3",
    country: "North Korea",
    city: "Pyongyang",
    latitude: 39.0392,
    longitude: 125.7625,
    threatCount: 445,
    severity: "high", 
    types: ["Cryptocurrency", "Financial", "Ransomware"],
    lastActivity: "12 minutes ago"
  },
  {
    id: "4",
    country: "Iran",
    city: "Tehran",
    latitude: 35.6892,
    longitude: 51.3890,
    threatCount: 321,
    severity: "medium",
    types: ["Infrastructure", "Government", "Energy"],
    lastActivity: "18 minutes ago"
  },
  {
    id: "5",
    country: "Brazil",
    city: "São Paulo", 
    latitude: -23.5505,
    longitude: -46.6333,
    threatCount: 156,
    severity: "medium",
    types: ["Banking Trojans", "Mobile Malware"],
    lastActivity: "23 minutes ago"
  }
];

export const ThreatMap = () => {
  const [threats, setThreats] = useState<ThreatLocation[]>(mockThreatData);
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");

  const filteredThreats = selectedSeverity === "all" 
    ? threats 
    : threats.filter(threat => threat.severity === selectedSeverity);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-critical bg-critical/20 border-critical/50";
      case "high": return "text-high bg-high/20 border-high/50";
      case "medium": return "text-medium bg-medium/20 border-medium/50"; 
      case "low": return "text-low bg-low/20 border-low/50";
      default: return "text-muted-foreground bg-muted/20 border-border";
    }
  };

  const getThreatSize = (count: number) => {
    if (count > 1000) return "h-6 w-6";
    if (count > 500) return "h-5 w-5";
    if (count > 100) return "h-4 w-4";
    return "h-3 w-3";
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Global Threat Map
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={selectedSeverity === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSeverity("all")}
            >
              All
            </Button>
            {["critical", "high", "medium", "low"].map(severity => (
              <Button
                key={severity}
                variant={selectedSeverity === severity ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSeverity(severity)}
                className={selectedSeverity === severity ? getSeverityColor(severity) : ""}
              >
                {severity}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Simulated World Map */}
        <div className="relative bg-muted/30 rounded-lg p-6 mb-6" style={{ height: "300px" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 rounded-lg" />
          
          {/* Simplified world map representation with threat indicators */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="text-center">
              <Globe className="h-16 w-16 text-primary/50 mx-auto mb-4 animate-pulse-glow" />
              <p className="text-sm text-muted-foreground">
                Interactive threat visualization
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {filteredThreats.length} active threat sources
              </p>
            </div>
          </div>

          {/* Threat indicators overlay */}
          <div className="absolute inset-4">
            {filteredThreats.slice(0, 5).map((threat, index) => (
              <div
                key={threat.id}
                className="absolute flex items-center justify-center animate-pulse-glow"
                style={{
                  left: `${20 + index * 15}%`,
                  top: `${30 + (index % 3) * 20}%`,
                }}
              >
                <div className={`
                  ${getThreatSize(threat.threatCount)} 
                  rounded-full 
                  ${getSeverityColor(threat.severity).split(' ')[1]}
                  border-2 ${getSeverityColor(threat.severity).split(' ')[2]}
                  cursor-pointer hover:scale-125 transition-transform
                `} />
              </div>
            ))}
          </div>
        </div>

        {/* Threat Source List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Active Threat Sources</h4>
            <Badge className="bg-primary/20 text-primary border-primary/50">
              {filteredThreats.length} locations
            </Badge>
          </div>

          {filteredThreats.map((threat) => (
            <div 
              key={threat.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <MapPin className={`h-4 w-4 ${getSeverityColor(threat.severity).split(' ')[0]}`} />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{threat.city}, {threat.country}</span>
                    <Badge className={`text-xs ${getSeverityColor(threat.severity)}`}>
                      {threat.severity}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Types: {threat.types.join(", ")}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-sm mb-1">
                  {threat.threatCount.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Activity className="h-3 w-3" />
                  {threat.lastActivity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};