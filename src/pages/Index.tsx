import { Layout } from "@/components/layout/Layout";
import { ThreatOverview } from "@/components/dashboard/ThreatOverview";
import { RealTimeFeed } from "@/components/dashboard/RealTimeFeed";
import { CVETracker } from "@/components/dashboard/CVETracker";
import { ThreatIntelligence } from "@/components/dashboard/ThreatIntelligence";
import { ThreatMap } from "@/components/dashboard/ThreatMap";
import { APIIntegration } from "@/components/dashboard/APIIntegration";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-lg bg-gradient-cyber p-8 text-white">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">ThreatWatch AI Platform</h1>
            <p className="text-lg opacity-90 mb-4">
              AI-Powered Cyber Threat Intelligence & Real-Time Monitoring
            </p>
            <p className="text-sm opacity-75">
              Comprehensive threat analysis • Real-time monitoring • Global intelligence feeds
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-glow opacity-30" />
        </div>

        {/* Threat Overview Metrics */}
        <ThreatOverview />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RealTimeFeed />
          <CVETracker />
        </div>

        {/* Intelligence & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ThreatIntelligence />
          <ThreatMap />
        </div>

        {/* API Integration */}
        <APIIntegration />
      </div>
    </Layout>
  );
};

export default Index;
