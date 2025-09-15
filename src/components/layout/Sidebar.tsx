import { 
  LayoutDashboard, 
  Shield, 
  AlertTriangle, 
  Globe, 
  Users, 
  Database, 
  Settings, 
  FileText,
  Activity,
  Search
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const mainNavItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Live Threats", url: "/threats", icon: Activity },
  { title: "Vulnerabilities", url: "/cves", icon: AlertTriangle },
  { title: "Threat Intel", url: "/intelligence", icon: Users },
  { title: "Global Map", url: "/map", icon: Globe },
];

const analyticsItems = [
  { title: "IOC Search", url: "/search", icon: Search },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Data Sources", url: "/sources", icon: Database },
];

const systemItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export const AppSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/20 text-primary border-primary/50" : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r border-border bg-card/50 backdrop-blur-sm`}>
      <SidebarContent className="px-3 py-4">
        {/* Logo */}
        <div className={`flex items-center gap-3 mb-8 px-3 ${collapsed ? "justify-center" : ""}`}>
          <Shield className="h-8 w-8 text-primary glow-effect" />
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-gradient">ThreatWatch</h2>
              <p className="text-xs text-muted-foreground">AI Platform</p>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Main</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                      {!collapsed && item.title === "Live Threats" && (
                        <Badge className="ml-auto bg-critical/20 text-critical border-critical/50 text-xs">
                          Live
                        </Badge>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Analytics */}
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Analytics</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System */}
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>System</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};