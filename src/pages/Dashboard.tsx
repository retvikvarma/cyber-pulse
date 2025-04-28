import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ShieldCheck, Activity, Settings, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Mock data for the dashboard
const trafficData = [
  { timestamp: '12:45:00', normal: 423, intrusion: 0 },
  { timestamp: '12:50:00', normal: 512, intrusion: 2 },
  { timestamp: '12:55:00', normal: 478, intrusion: 1 },
  { timestamp: '13:00:00', normal: 562, intrusion: 0 },
  { timestamp: '13:05:00', normal: 498, intrusion: 3 },
  { timestamp: '13:10:00', normal: 534, intrusion: 1 },
];

const protocolData = [
  { name: 'TCP', value: 65 },
  { name: 'UDP', value: 28 },
  { name: 'ICMP', value: 5 },
  { name: 'Other', value: 2 },
];

const packetLogs = [
  { id: '128,290', timestamp: '4-28 12:56:58', src_ip: '443-53308', dst_ip: 'N/A', protocol: '17', prediction: '0', label: 'Normal Traffic', packet_length: '166', ttl: '60' },
  { id: '128,256', timestamp: '4-28 12:56:58', src_ip: '443-53308', dst_ip: 'N/A', protocol: '17', prediction: '0', label: 'Normal Traffic', packet_length: '1,296', ttl: '59' },
  { id: '128,265', timestamp: '4-28 12:56:58', src_ip: '53308-443', dst_ip: 'N/A', protocol: '17', prediction: '0', label: 'Normal Traffic', packet_length: '1,292', ttl: '128' },
  { id: '128,264', timestamp: '4-28 12:56:58', src_ip: '443-53308', dst_ip: 'N/A', protocol: '17', prediction: '0', label: 'Normal Traffic', packet_length: '345', ttl: '59' },
  { id: '128,263', timestamp: '4-28 12:56:58', src_ip: '443-53308', dst_ip: 'N/A', protocol: '17', prediction: '0', label: 'Normal Traffic', packet_length: '1,296', ttl: '59' },
  { id: '128,262', timestamp: '4-28 12:56:58', src_ip: '443-53308', dst_ip: 'N/A', protocol: '17', prediction: '0', label: 'Normal Traffic', packet_length: '1,296', ttl: '59' },
  { id: '128,261', timestamp: '4-28 12:56:58', src_ip: '443-53308', dst_ip: 'N/A', protocol: '17', prediction: '0', label: 'Normal Traffic', packet_length: '86', ttl: '59' },
  { id: '128,260', timestamp: '4-28 12:56:58', src_ip: '52977-443', dst_ip: 'N/A', protocol: '6', prediction: '0', label: 'Normal Traffic', packet_length: '54', ttl: '128' },
  { id: '128,259', timestamp: '4-28 12:56:58', src_ip: '53308-443', dst_ip: 'N/A', protocol: '17', prediction: '0', label: 'Normal Traffic', packet_length: '1,292', ttl: '128' },
  { id: '128,258', timestamp: '4-28 12:56:58', src_ip: '53308-443', dst_ip: 'N/A', protocol: '17', prediction: '0', label: 'Normal Traffic', packet_length: '260', ttl: '128' },
];

const Dashboard = () => {
  const { toast } = useToast();
  const [showLogs, setShowLogs] = useState(true);
  const [showOnlyIntrusions, setShowOnlyIntrusions] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(3);
  const [activeTab, setActiveTab] = useState('overview');

  // Simulating real-time updates
  const handleRefresh = () => {
    toast({
      title: 'Dashboard Refreshed',
      description: 'Latest network traffic data loaded',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Network Traffic Dashboard</h1>
          <p className="text-gray-400">Real-time monitoring and intrusion detection</p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <Button variant="outline" className="mr-2" onClick={handleRefresh}>
            <Activity className="mr-2 h-4 w-4" /> Refresh
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" /> Apr 28, 2025
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-cyberpulse-darker border-green-800/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Normal Packets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-2xl font-bold">128,291</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-cyberpulse-darker border-red-800/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Intrusions Detected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-2xl font-bold">0</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-cyberpulse-darker border-blue-800/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Packets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Activity className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-2xl font-bold">128,291</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-cyberpulse-darker border-purple-800/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                  <span className="text-green-500">Running</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <Card className="bg-cyberpulse-darker">
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
              <CardDescription>Normal vs. intrusion traffic over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="timestamp" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#221F26', border: '1px solid #444', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="normal" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="intrusion" stroke="#ea384c" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-cyberpulse-darker">
              <CardHeader>
                <CardTitle>Protocol Distribution</CardTitle>
                <CardDescription>Breakdown by protocol type</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={protocolData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#221F26', border: '1px solid #444', borderRadius: '0.5rem' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="value" fill="#9b87f5" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Logs Section */}
          <Card className="bg-cyberpulse-darker">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Network Logs</CardTitle>
                <CardDescription>Recent packet data and classifications</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setShowLogs(!showLogs)}
              >
                {showLogs ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CardHeader>
            {showLogs && (
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-2 px-2">ID</th>
                        <th className="text-left py-2 px-2">Timestamp</th>
                        <th className="text-left py-2 px-2">Src-Dst</th>
                        <th className="text-left py-2 px-2">Protocol</th>
                        <th className="text-left py-2 px-2">Status</th>
                        <th className="text-left py-2 px-2">Length</th>
                        <th className="text-left py-2 px-2">TTL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packetLogs.map((log) => (
                        <tr key={log.id} className="border-b border-gray-800/50">
                          <td className="py-2 px-2 font-mono">{log.id}</td>
                          <td className="py-2 px-2 font-mono">{log.timestamp}</td>
                          <td className="py-2 px-2 font-mono">{log.src_ip}</td>
                          <td className="py-2 px-2 font-mono">{log.protocol}</td>
                          <td className="py-2 px-2">
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                              <span>{log.label}</span>
                            </div>
                          </td>
                          <td className="py-2 px-2 font-mono">{log.packet_length}</td>
                          <td className="py-2 px-2 font-mono">{log.ttl}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-cyberpulse-darker">
            <CardHeader>
              <CardTitle>Dashboard Settings</CardTitle>
              <CardDescription>Configure your dashboard preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="show-intrusions">Show only Intrusions</Label>
                  <p className="text-sm text-gray-400">Filter to display only intrusion events</p>
                </div>
                <Switch
                  id="show-intrusions"
                  checked={showOnlyIntrusions}
                  onCheckedChange={setShowOnlyIntrusions}
                />
              </div>

              <div className="space-y-3">
                <Label>Refresh Interval (seconds)</Label>
                <div className="flex items-center gap-2">
                  <span className="w-4">1</span>
                  <Slider
                    value={[refreshInterval]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(value) => setRefreshInterval(value[0])}
                    className="flex-1"
                  />
                  <span className="w-4">10</span>
                </div>
                <p className="text-sm text-gray-400">Current interval: {refreshInterval} seconds</p>
              </div>

              <div className="pt-4 flex justify-end">
                <Button className="bg-cyberpulse-purple hover:bg-cyberpulse-purple/90">
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
