import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Globe, Users, Database, TrendingUp, MapPin, Clock } from "lucide-react";

interface ThreatActor {
  id: string;
  name: string;
  aliases: string[];
  origin: string;
  motivation: string;
  targets: string[];
  activity: "active" | "dormant" | "unknown";
  campaigns: number;
  lastSeen: string;
  risk: "critical" | "high" | "medium" | "low";
}

interface Campaign {
  id: string;
  name: string;
  actor: string;
  status: "active" | "inactive";
  targets: string[];
  techniques: string[];
  startDate: string;
  indicators: number;
  severity: "critical" | "high" | "medium" | "low";
}

const mockActors: ThreatActor[] = [
  {
    id: "1",
    name: "APT29 (Cozy Bear)",
    aliases: ["The Dukes", "CozyDuke", "Yttrium"],
    origin: "Russia",
    motivation: "Espionage",
    targets: ["Government", "Healthcare", "Energy"],
    activity: "active",
    campaigns: 23,
    lastSeen: "2024-04-10",
    risk: "critical"
  },
  {
    id: "2", 
    name: "Lazarus Group",
    aliases: ["HIDDEN COBRA", "Zinc", "Diamond Sleet"],
    origin: "North Korea", 
    motivation: "Financial",
    targets: ["Financial", "Cryptocurrency", "Entertainment"],
    activity: "active",
    campaigns: 18,
    lastSeen: "2024-04-08",
    risk: "high"
  },
  {
    id: "3",
    name: "FIN7",
    aliases: ["Carbanak Group", "Navigator Group"],
    origin: "Unknown",
    motivation: "Financial",
    targets: ["Retail", "Restaurant", "Financial"],
    activity: "dormant",
    campaigns: 15,
    lastSeen: "2024-02-15",
    risk: "medium"
  }
];

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "SolarWinds Supply Chain Attack",
    actor: "APT29",
    status: "inactive",
    targets: ["Government", "Technology", "Consulting"],
    techniques: ["Supply Chain", "Code Signing", "Living off the Land"],
    startDate: "2020-03-01",
    indicators: 1247,
    severity: "critical"
  },
  {
    id: "2",
    name: "MATA Framework Campaign", 
    actor: "Lazarus Group",
    status: "active",
    targets: ["Financial", "Aerospace", "Automotive"],
    techniques: ["Spear Phishing", "Zero-day Exploits", "Credential Harvesting"],
    startDate: "2024-01-15",
    indicators: 342,
    severity: "high"
  }
];

export const ThreatIntelligence = () => {
  const [actors, setActors] = useState<ThreatActor[]>(mockActors);
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critical": return "text-critical bg-critical/20 border-critical/50";
      case "high": return "text-high bg-high/20 border-high/50";
      case "medium": return "text-medium bg-medium/20 border-medium/50";
      case "low": return "text-low bg-low/20 border-low/50";
      default: return "text-muted-foreground bg-muted/20 border-border";
    }
  };

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case "active": return "text-critical bg-critical/20 border-critical/50";
      case "dormant": return "text-medium bg-medium/20 border-medium/50";
      case "unknown": return "text-muted-foreground bg-muted/20 border-border";
      default: return "text-muted-foreground bg-muted/20 border-border";
    }
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Threat Intelligence
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="actors" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="actors">Threat Actors</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="actors">
            <ScrollArea className="h-80">
              <div className="space-y-4">
                {actors.map((actor) => (
                  <div 
                    key={actor.id}
                    className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-primary mb-1">{actor.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          Aliases: {actor.aliases.join(", ")}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={`text-xs ${getRiskColor(actor.risk)}`}>
                          {actor.risk.toUpperCase()}
                        </Badge>
                        <Badge className={`text-xs ${getActivityColor(actor.activity)}`}>
                          {actor.activity.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>Origin: {actor.origin}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span>Motivation: {actor.motivation}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Targets: </span>
                        <span>{actor.targets.join(", ")}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-muted-foreground" />
                          <span>{actor.campaigns} campaigns</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          Last seen: {new Date(actor.lastSeen).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="campaigns">
            <ScrollArea className="h-80">
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div 
                    key={campaign.id}
                    className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-primary mb-1">{campaign.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Attribution: {campaign.actor}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={`text-xs ${getRiskColor(campaign.severity)}`}>
                          {campaign.severity.toUpperCase()}
                        </Badge>
                        <Badge className={`text-xs ${
                          campaign.status === "active" ? "bg-critical/20 text-critical border-critical/50" : 
                          "bg-muted/20 text-muted-foreground border-border"
                        }`}>
                          {campaign.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Targets: </span>
                        <span>{campaign.targets.join(", ")}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Techniques: </span>
                        <span>{campaign.techniques.join(", ")}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-muted-foreground" />
                        <span>{campaign.indicators} indicators</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Started: {new Date(campaign.startDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};