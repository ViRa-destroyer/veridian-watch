import { AlertTriangle, Shield, TrendingUp, Clock, Eye, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ThreatMetric {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
  severity: "critical" | "high" | "medium" | "low";
}

const threatMetrics: ThreatMetric[] = [
  {
    title: "Active Threats",
    value: "1,247",
    change: "+23%",
    trend: "up",
    icon: AlertTriangle,
    severity: "critical"
  },
  {
    title: "CVE Alerts",
    value: "89",
    change: "+12%",
    trend: "up",
    icon: AlertCircle,
    severity: "high"
  },
  {
    title: "Protected Assets",
    value: "15,432",
    change: "-2%",
    trend: "down",
    icon: Shield,
    severity: "low"
  },
  {
    title: "IOCs Detected",
    value: "342",
    change: "+45%",
    trend: "up",
    icon: Eye,
    severity: "medium"
  }
];

export const ThreatOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {threatMetrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title} className="relative overflow-hidden bg-card/80 backdrop-blur-sm border-border hover:shadow-cyber transition-all duration-300">
            {/* Glow effect based on severity */}
            <div className={`absolute inset-0 opacity-10 bg-gradient-to-br from-${metric.severity} to-transparent`} />
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <Icon className={`h-5 w-5 text-${metric.severity}`} />
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold">{metric.value}</div>
                <Badge 
                  variant={metric.trend === "up" ? "destructive" : "default"}
                  className="text-xs"
                >
                  {metric.change}
                </Badge>
              </div>
              
              <div className="text-xs text-muted-foreground mb-2">
                {metric.trend === "up" ? "↗" : "↘"} from last week
              </div>
              
              <Progress 
                value={Math.random() * 100} 
                className={`h-2 bg-muted`}
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};