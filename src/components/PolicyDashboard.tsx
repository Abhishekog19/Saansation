import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Slider } from "./ui/slider";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingDown, TrendingUp, Users, Car, Factory, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

interface PolicyRecommendation {
  id: string;
  title: string;
  impact: "high" | "medium" | "low";
  timeframe: string;
  description: string;
  expectedReduction: number;
  status: "active" | "proposed" | "implemented";
}

interface SimulationResult {
  scenario: string;
  currentAQI: number;
  projectedAQI: number;
  reduction: number;
}

const policyRecommendations: PolicyRecommendation[] = [
  {
    id: "1",
    title: "Odd-Even Vehicle Scheme",
    impact: "high",
    timeframe: "Immediate (1-2 weeks)",
    description: "Implement odd-even vehicle rationing during peak pollution days",
    expectedReduction: 25,
    status: "proposed"
  },
  {
    id: "2",
    title: "Industrial Emission Standards",
    impact: "medium",
    timeframe: "Short-term (1-3 months)",
    description: "Stricter emission norms for industrial units within 50km radius",
    expectedReduction: 18,
    status: "active"
  },
  {
    id: "3",
    title: "Stubble Burning Alternative Incentives",
    impact: "high",
    timeframe: "Seasonal (pre-winter)",
    description: "Financial incentives for farmers to adopt eco-friendly stubble management",
    expectedReduction: 30,
    status: "implemented"
  },
  {
    id: "4",
    title: "Green Public Transport",
    impact: "medium",
    timeframe: "Long-term (6-12 months)",
    description: "Increase electric bus fleet and metro connectivity",
    expectedReduction: 15,
    status: "active"
  },
  {
    id: "5",
    title: "Construction Dust Control",
    impact: "low",
    timeframe: "Immediate (1 week)",
    description: "Mandatory dust suppression systems at construction sites",
    expectedReduction: 8,
    status: "implemented"
  }
];

const realtimeMetrics = {
  totalStations: 37,
  activeAlerts: 12,
  avgAQI: 192,
  trend: "increasing",
  lastUpdated: "2 minutes ago"
};

export function PolicyDashboard() {
  const [vehicularReduction, setVehicularReduction] = useState([20]);
  const [industrialReduction, setIndustrialReduction] = useState([15]);
  const [stubbleReduction, setStubbleReduction] = useState([25]);
  
  const calculateSimulation = (): SimulationResult[] => {
    const baseAQI = 192;
    const vehicularImpact = (vehicularReduction[0] / 100) * 35; // 35% vehicular contribution
    const industrialImpact = (industrialReduction[0] / 100) * 20; // 20% industrial contribution
    const stubbleImpact = (stubbleReduction[0] / 100) * 28; // 28% stubble contribution
    
    const totalReduction = (vehicularImpact + industrialImpact + stubbleImpact) / 100;
    const projectedAQI = Math.round(baseAQI * (1 - totalReduction));
    
    return [
      {
        scenario: "Current",
        currentAQI: baseAQI,
        projectedAQI: baseAQI,
        reduction: 0
      },
      {
        scenario: "With Interventions",
        currentAQI: baseAQI,
        projectedAQI: projectedAQI,
        reduction: Math.round(totalReduction * 100)
      }
    ];
  };

  const simulationResults = calculateSimulation();
  
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "implemented": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "active": return <Clock className="w-4 h-4 text-blue-600" />;
      case "proposed": return <AlertCircle className="w-4 h-4 text-orange-600" />;
      default: return null;
    }
  };

  return (
    <section className="px-4 py-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="mb-4 text-gray-800">Policy Decision Dashboard</h2>
          <p className="text-gray-600">Data-driven insights for evidence-based interventions</p>
        </div>

        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analytics">Real-time Analytics</TabsTrigger>
            <TabsTrigger value="simulator">Impact Simulator</TabsTrigger>
            <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          </TabsList>

          {/* Real-time Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Monitoring Stations</p>
                    <p className="text-xl font-semibold">{realtimeMetrics.totalStations}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-600">Active Alerts</p>
                    <p className="text-xl font-semibold">{realtimeMetrics.activeAlerts}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-600">Avg AQI</p>
                    <p className="text-xl font-semibold">{realtimeMetrics.avgAQI}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">Last Updated</p>
                    <p className="text-sm font-semibold">{realtimeMetrics.lastUpdated}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Trend Analysis */}
            <Card className="p-6">
              <h3 className="mb-4 text-gray-800">7-Day AQI Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { day: "Mon", aqi: 185 },
                    { day: "Tue", aqi: 195 },
                    { day: "Wed", aqi: 210 },
                    { day: "Thu", aqi: 192 },
                    { day: "Fri", aqi: 188 },
                    { day: "Sat", aqi: 175 },
                    { day: "Sun", aqi: 192 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="aqi" stroke="#ef4444" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Source Trends */}
            <Card className="p-6">
              <h3 className="mb-4 text-gray-800">Source Contribution Over Time</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { day: "Mon", vehicular: 32, industrial: 22, stubble: 25, domestic: 15, dust: 6 },
                    { day: "Tue", vehicular: 35, industrial: 20, stubble: 28, domestic: 12, dust: 5 },
                    { day: "Wed", vehicular: 38, industrial: 18, stubble: 30, domestic: 10, dust: 4 },
                    { day: "Thu", vehicular: 35, industrial: 20, stubble: 28, domestic: 12, dust: 5 },
                    { day: "Fri", vehicular: 34, industrial: 21, stubble: 27, domestic: 13, dust: 5 },
                    { day: "Sat", vehicular: 30, industrial: 19, stubble: 26, domestic: 18, dust: 7 },
                    { day: "Sun", vehicular: 33, industrial: 20, stubble: 28, domestic: 14, dust: 5 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="vehicular" stackId="a" fill="#ef4444" name="Vehicular" />
                    <Bar dataKey="stubble" stackId="a" fill="#f59e0b" name="Stubble" />
                    <Bar dataKey="industrial" stackId="a" fill="#8b5cf6" name="Industrial" />
                    <Bar dataKey="domestic" stackId="a" fill="#06b6d4" name="Domestic" />
                    <Bar dataKey="dust" stackId="a" fill="#10b981" name="Dust" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>

          {/* Impact Simulator Tab */}
          <TabsContent value="simulator" className="space-y-6">
            <Card className="p-6">
              <h3 className="mb-6 text-gray-800">Policy Impact Simulator</h3>
              
              {/* Controls */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-sm mb-2">Vehicular Emission Reduction</label>
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">
                    <Slider
                      value={vehicularReduction}
                      onValueChange={setVehicularReduction}
                      max={50}
                      step={5}
                      className="mb-2"
                    />
                    <p className="text-sm text-center">{vehicularReduction[0]}%</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm mb-2">Industrial Emission Reduction</label>
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">
                    <Slider
                      value={industrialReduction}
                      onValueChange={setIndustrialReduction}
                      max={50}
                      step={5}
                      className="mb-2"
                    />
                    <p className="text-sm text-center">{industrialReduction[0]}%</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm mb-2">Stubble Burning Reduction</label>
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">
                    <Slider
                      value={stubbleReduction}
                      onValueChange={setStubbleReduction}
                      max={50}
                      step={5}
                      className="mb-2"
                    />
                    <p className="text-sm text-center">{stubbleReduction[0]}%</p>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-gray-800">Simulation Results</h4>
                  {simulationResults.map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{result.scenario}</p>
                        <p className="text-sm text-gray-600">AQI: {result.projectedAQI}</p>
                      </div>
                      {result.reduction > 0 && (
                        <Badge className="bg-green-100 text-green-800">
                          -{result.reduction}%
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={simulationResults}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="scenario" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="projectedAQI" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* AI Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card className="p-6">
              <h3 className="mb-6 text-gray-800">AI-Generated Policy Recommendations</h3>
              
              <div className="space-y-4">
                {policyRecommendations.map((rec) => (
                  <Card key={rec.id} className="p-4 border-l-4" style={{ borderLeftColor: 
                    rec.impact === "high" ? "#ef4444" : 
                    rec.impact === "medium" ? "#f59e0b" : "#10b981" 
                  }}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(rec.status)}
                          <h4 className="text-gray-800">{rec.title}</h4>
                          <Badge className={getImpactColor(rec.impact)}>
                            {rec.impact} impact
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-gray-500">⏱️ {rec.timeframe}</span>
                          <span className="text-green-600">📉 -{rec.expectedReduction}% AQI reduction</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}