import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, 
  Key, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Settings,
  Activity,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface APISource {
  id: string;
  name: string;
  description: string;
  status: "connected" | "error" | "disconnected";
  type: "free" | "premium";
  enabled: boolean;
  lastSync: string;
  dataPoints: number;
  endpoint: string;
  requiresKey: boolean;
}

const apiSources: APISource[] = [
  {
    id: "1",
    name: "National Vulnerability Database (NVD)",
    description: "Official U.S. government repository of standards based vulnerability management data",
    status: "connected",
    type: "free",
    enabled: true,
    lastSync: "2024-04-12T14:30:00Z",
    dataPoints: 12847,
    endpoint: "https://services.nvd.nist.gov/rest/json/cves/2.0",
    requiresKey: false
  },
  {
    id: "2", 
    name: "AlienVault OTX", 
    description: "Open Threat Exchange - Community-driven threat intelligence platform",
    status: "connected",
    type: "free",
    enabled: true,
    lastSync: "2024-04-12T14:25:00Z",
    dataPoints: 45632,
    endpoint: "https://otx.alienvault.com/api/v1",
    requiresKey: true
  },
  {
    id: "3",
    name: "VirusTotal API",
    description: "File and URL analysis service for detecting malware",
    status: "error", 
    type: "premium",
    enabled: false,
    lastSync: "2024-04-12T12:15:00Z",
    dataPoints: 8934,
    endpoint: "https://www.virustotal.com/vtapi/v2",
    requiresKey: true
  },
  {
    id: "4",
    name: "AbuseIPDB",
    description: "Collaborative IP address blacklist for reporting and checking malicious IPs",
    status: "connected",
    type: "free", 
    enabled: true,
    lastSync: "2024-04-12T14:20:00Z",
    dataPoints: 23156,
    endpoint: "https://api.abuseipdb.com/api/v2",
    requiresKey: true
  },
  {
    id: "5",
    name: "MISP Feed",
    description: "Malware Information Sharing Platform - Threat sharing community",
    status: "disconnected",
    type: "free",
    enabled: false, 
    lastSync: "2024-04-11T18:45:00Z",
    dataPoints: 5672,
    endpoint: "https://misp-feed.example.com/api",
    requiresKey: true
  }
];

export const APIIntegration = () => {
  const [sources, setSources] = useState<APISource[]>(apiSources);
  const [selectedSource, setSelectedSource] = useState<APISource | null>(null);
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected": return "text-low bg-low/20 border-low/50";
      case "error": return "text-critical bg-critical/20 border-critical/50";
      case "disconnected": return "text-muted-foreground bg-muted/20 border-border";
      default: return "text-muted-foreground bg-muted/20 border-border";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected": return CheckCircle;
      case "error": return AlertCircle;
      case "disconnected": return AlertCircle;
      default: return AlertCircle;
    }
  };

  const handleToggle = (sourceId: string, enabled: boolean) => {
    setSources(prev => prev.map(source => 
      source.id === sourceId ? { ...source, enabled } : source
    ));
    
    const source = sources.find(s => s.id === sourceId);
    toast({
      title: enabled ? "API Source Enabled" : "API Source Disabled",
      description: `${source?.name} has been ${enabled ? "enabled" : "disabled"}`,
    });
  };

  const handleTestConnection = async (source: APISource) => {
    toast({
      title: "Testing Connection",
      description: `Testing connection to ${source.name}...`,
    });
    
    // Simulate API test
    setTimeout(() => {
      toast({
        title: "Connection Test",
        description: `Successfully connected to ${source.name}`,
      });
    }, 2000);
  };

  const handleSyncNow = async (source: APISource) => {
    toast({
      title: "Syncing Data", 
      description: `Fetching latest data from ${source.name}...`,
    });
    
    // Simulate data sync
    setTimeout(() => {
      setSources(prev => prev.map(s => 
        s.id === source.id 
          ? { ...s, lastSync: new Date().toISOString(), dataPoints: s.dataPoints + Math.floor(Math.random() * 100) }
          : s
      ));
      
      toast({
        title: "Sync Complete",
        description: `Successfully synced data from ${source.name}`,
      });
    }, 3000);
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          API Integrations & Data Sources
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="sources" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="sources">Data Sources</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sources" className="space-y-4">
            {sources.map((source) => {
              const StatusIcon = getStatusIcon(source.status);
              return (
                <div
                  key={source.id}
                  className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <StatusIcon className={`h-5 w-5 mt-0.5 ${getStatusColor(source.status).split(' ')[0]}`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{source.name}</h4>
                          <Badge className={`text-xs ${getStatusColor(source.status)}`}>
                            {source.status}
                          </Badge>
                          <Badge variant={source.type === "free" ? "default" : "secondary"} className="text-xs">
                            {source.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {source.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Last sync: {new Date(source.lastSync).toLocaleString()}</span>
                          <span>{source.dataPoints.toLocaleString()} data points</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={source.enabled}
                        onCheckedChange={(enabled) => handleToggle(source.id, enabled)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ExternalLink className="h-4 w-4" />
                      <span className="font-mono text-xs">{source.endpoint}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTestConnection(source)}
                        disabled={!source.enabled}
                      >
                        <Activity className="h-4 w-4 mr-1" />
                        Test
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSyncNow(source)}
                        disabled={!source.enabled || source.status === "error"}
                      >
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Sync
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedSource(source)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </TabsContent>
          
          <TabsContent value="config" className="space-y-4">
            {selectedSource ? (
              <div className="p-4 rounded-lg border border-border bg-muted/30">
                <h4 className="font-semibold mb-4">Configure {selectedSource.name}</h4>
                
                {selectedSource.requiresKey && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        API Key
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="password"
                          placeholder="Enter API key..."
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          className="flex-1"
                        />
                        <Button>
                          <Key className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <p>Visit the official website to obtain your API key:</p>
                      <a 
                        href="#" 
                        className="text-primary hover:text-primary-glow underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get API Key →
                      </a>
                    </div>
                  </div>
                )}
                
                <div className="mt-6 p-4 rounded border border-border bg-muted/20">
                  <h5 className="font-medium mb-2">Integration Instructions</h5>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Sign up for a free account at the provider's website</li>
                    <li>Generate an API key from your dashboard</li>
                    <li>Enter the API key above and save</li>
                    <li>Test the connection to verify integration</li>
                    <li>Enable the data source to start receiving threat intelligence</li>
                  </ol>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a data source to configure its settings</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};