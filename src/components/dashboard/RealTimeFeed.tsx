import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Shield, Wifi, Clock, ExternalLink } from "lucide-react";

interface ThreatEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  type: "malware" | "vulnerability" | "phishing" | "ddos" | "breach";
  source: string;
  indicators: string[];
}

const mockThreatEvents: ThreatEvent[] = [
  {
    id: "1",
    timestamp: new Date().toISOString(),
    title: "CVE-2024-3400 PAN-OS Command Injection",
    description: "Critical vulnerability in Palo Alto Networks PAN-OS allowing remote code execution",
    severity: "critical",
    type: "vulnerability",
    source: "NVD",
    indicators: ["CVE-2024-3400", "192.168.1.0/24"]
  },
  {
    id: "2", 
    timestamp: new Date(Date.now() - 300000).toISOString(),
    title: "Stealer Malware Campaign Detected",
    description: "New credential harvesting campaign targeting financial institutions",
    severity: "high",
    type: "malware",
    source: "ThreatFox",
    indicators: ["malicious-domain.com", "SHA256:abc123..."]
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 600000).toISOString(), 
    title: "Suspicious Network Activity",
    description: "Anomalous traffic patterns detected from Eastern European IP ranges",
    severity: "medium",
    type: "ddos",
    source: "Internal",
    indicators: ["91.235.x.x", "Port 443"]
  }
];

export const RealTimeFeed = () => {
  const [threats, setThreats] = useState<ThreatEvent[]>(mockThreatEvents);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      const newThreat: ThreatEvent = {
        id: String(Date.now()),
        timestamp: new Date().toISOString(),
        title: `New Threat Detected #${Math.floor(Math.random() * 1000)}`,
        description: "Automated threat detection system has identified suspicious activity",
        severity: ["critical", "high", "medium", "low"][Math.floor(Math.random() * 4)] as any,
        type: ["malware", "vulnerability", "phishing", "ddos", "breach"][Math.floor(Math.random() * 5)] as any,
        source: ["AlienVault OTX", "VirusTotal", "Internal", "ThreatFox"][Math.floor(Math.random() * 4)],
        indicators: [`IOC-${Math.random().toString(36).substr(2, 9)}`]
      };
      
      setThreats(prev => [newThreat, ...prev].slice(0, 20));
    }, 8000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-critical bg-critical/20 border-critical/50";
      case "high": return "text-high bg-high/20 border-high/50";
      case "medium": return "text-medium bg-medium/20 border-medium/50";
      case "low": return "text-low bg-low/20 border-low/50";
      default: return "text-muted-foreground bg-muted/20 border-border";
    }
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wifi className={`h-5 w-5 ${isLive ? 'text-primary animate-pulse-glow' : 'text-muted-foreground'}`} />
            Real-Time Threat Feed
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLive(!isLive)}
            className={isLive ? 'border-primary text-primary' : ''}
          >
            {isLive ? 'LIVE' : 'PAUSED'}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-96">
          <div className="space-y-3 p-6 pt-0">
            {threats.map((threat) => (
              <div 
                key={threat.id}
                className="flex items-start space-x-4 p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0 mt-1">
                  <AlertTriangle className={`h-4 w-4 ${getSeverityColor(threat.severity).split(' ')[0]}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold truncate">{threat.title}</h4>
                    <Badge className={`text-xs ${getSeverityColor(threat.severity)}`}>
                      {threat.severity.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {threat.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(threat.timestamp).toLocaleTimeString()}
                      </span>
                      <span>Source: {threat.source}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {threat.indicators.slice(0, 2).map((indicator, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {indicator}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};