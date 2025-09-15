import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Search, ExternalLink, Calendar, Award } from "lucide-react";

interface CVEItem {
  id: string;
  cveId: string;
  title: string;
  description: string;
  cvssScore: number;
  severity: "critical" | "high" | "medium" | "low";
  publishedDate: string;
  vendor: string;
  product: string;
  status: "new" | "analyzing" | "patched" | "mitigated";
}

const mockCVEs: CVEItem[] = [
  {
    id: "1",
    cveId: "CVE-2024-3400",
    title: "PAN-OS Command Injection Vulnerability",
    description: "A command injection vulnerability in PAN-OS allows remote code execution through the GlobalProtect feature.",
    cvssScore: 10.0,
    severity: "critical",
    publishedDate: "2024-04-12",
    vendor: "Palo Alto Networks",
    product: "PAN-OS",
    status: "new"
  },
  {
    id: "2", 
    cveId: "CVE-2024-1086",
    title: "Linux Kernel Use-After-Free Vulnerability",
    description: "A use-after-free vulnerability in the Linux kernel's netfilter subsystem allows privilege escalation.",
    cvssScore: 7.8,
    severity: "high",
    publishedDate: "2024-01-31",
    vendor: "Linux",
    product: "Kernel",
    status: "analyzing"
  },
  {
    id: "3",
    cveId: "CVE-2024-0519",
    title: "Out-of-bounds Write in NVIDIA GPU Display Driver", 
    description: "An out-of-bounds write vulnerability in NVIDIA GPU Display Driver for Windows and Linux.",
    cvssScore: 6.1,
    severity: "medium",
    publishedDate: "2024-03-27",
    vendor: "NVIDIA",
    product: "GPU Driver",
    status: "patched"
  }
];

export const CVETracker = () => {
  const [cves, setCves] = useState<CVEItem[]>(mockCVEs);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCVEs = cves.filter(cve => 
    cve.cveId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cve.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cve.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-critical bg-critical/20 border-critical/50";
      case "high": return "text-high bg-high/20 border-high/50"; 
      case "medium": return "text-medium bg-medium/20 border-medium/50";
      case "low": return "text-low bg-low/20 border-low/50";
      default: return "text-muted-foreground bg-muted/20 border-border";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-critical/20 text-critical border-critical/50";
      case "analyzing": return "bg-medium/20 text-medium border-medium/50";
      case "patched": return "bg-low/20 text-low border-low/50";
      case "mitigated": return "bg-primary/20 text-primary border-primary/50";
      default: return "bg-muted/20 text-muted-foreground border-border";
    }
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            CVE Vulnerability Tracker
          </CardTitle>
          <Badge className="bg-primary/20 text-primary border-primary/50">
            {filteredCVEs.length} CVEs
          </Badge>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search CVEs, vendors, products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-muted/30 border-border"
          />
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-96">
          <div className="space-y-3 p-6 pt-0">
            {filteredCVEs.map((cve) => (
              <div 
                key={cve.id}
                className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-primary hover:text-primary-glow cursor-pointer">
                      {cve.cveId}
                    </h4>
                    <Badge className={`text-xs ${getSeverityColor(cve.severity)}`}>
                      {cve.severity.toUpperCase()}
                    </Badge>
                    <Badge className={`text-xs ${getStatusColor(cve.status)}`}>
                      {cve.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span className="font-bold">{cve.cvssScore}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <h5 className="font-medium mb-2 text-sm">{cve.title}</h5>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {cve.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-4">
                    <span>Vendor: {cve.vendor}</span>
                    <span>Product: {cve.product}</span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(cve.publishedDate).toLocaleDateString()}
                  </span>
                </div>
                
                {/* CVSS Score visualization */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>CVSS Score</span>
                    <span>{cve.cvssScore}/10.0</span>
                  </div>
                  <Progress 
                    value={(cve.cvssScore / 10) * 100} 
                    className={`h-2 ${
                      cve.cvssScore >= 9 ? 'text-critical' :
                      cve.cvssScore >= 7 ? 'text-high' :
                      cve.cvssScore >= 4 ? 'text-medium' : 'text-low'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};