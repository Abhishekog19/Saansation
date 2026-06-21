import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Car, Leaf, Factory, Home, Wind } from "lucide-react";
import { useState } from "react";

interface SourceData {
  name: string;
  value: number;
  color: string;
  icon: React.ReactNode;
  description: string;
}

interface DailyTrend {
  hour: string;
  vehicular: number;
  industrial: number;
  stubble: number;
  domestic: number;
  dust: number;
}

const sourceData: SourceData[] = [
  {
    name: "Vehicular",
    value: 35,
    color: "#ef4444",
    icon: <Car className="w-5 h-5" />,
    description: "Cars, trucks, buses, and two-wheelers"
  },
  {
    name: "Stubble Burning",
    value: 28,
    color: "#f59e0b",
    icon: <Leaf className="w-5 h-5" />,
    description: "Agricultural residue burning in neighboring states"
  },
  {
    name: "Industrial",
    value: 20,
    color: "#8b5cf6",
    icon: <Factory className="w-5 h-5" />,
    description: "Manufacturing plants and industrial activities"
  },
  {
    name: "Domestic",
    value: 12,
    color: "#06b6d4",
    icon: <Home className="w-5 h-5" />,
    description: "Cooking, heating, and household activities"
  },
  {
    name: "Dust",
    value: 5,
    color: "#10b981",
    icon: <Wind className="w-5 h-5" />,
    description: "Construction dust and road dust"
  }
];

const generateDailyTrends = (): DailyTrend[] => {
  const trends: DailyTrend[] = [];
  
  for (let hour = 0; hour < 24; hour++) {
    let vehicular = 15;
    let industrial = 20;
    let stubble = 25;
    let domestic = 10;
    let dust = 5;
    
    // Rush hour patterns
    if (hour >= 7 && hour <= 10) {
      vehicular += 25;
      dust += 3;
    }
    if (hour >= 17 && hour <= 20) {
      vehicular += 20;
      dust += 2;
    }
    
    // Industrial patterns
    if (hour >= 8 && hour <= 18) {
      industrial += 10;
    }
    
    // Domestic patterns
    if (hour >= 6 && hour <= 9) {
      domestic += 8;
    }
    if (hour >= 18 && hour <= 22) {
      domestic += 12;
    }
    
    // Stubble burning (seasonal, more in evening)
    if (hour >= 16 && hour <= 20) {
      stubble += 15;
    }
    
    trends.push({
      hour: `${hour.toString().padStart(2, '0')}:00`,
      vehicular,
      industrial,
      stubble,
      domestic,
      dust
    });
  }
  
  return trends;
};

export function SourceAttribution() {
  const [viewMode, setViewMode] = useState<"breakdown" | "trends">("breakdown");
  const dailyTrends = generateDailyTrends();
  
  const dominantSource = sourceData.reduce((prev, current) => 
    prev.value > current.value ? prev : current
  );

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null; // Don't show labels for slices smaller than 5%
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <section className="px-4 py-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="mb-4 text-gray-800">Pollution Source Analysis</h2>
          <p className="text-gray-600">AI-powered identification of dominant pollution contributors</p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white p-1 rounded-lg shadow-sm">
            <button
              onClick={() => setViewMode("breakdown")}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewMode === "breakdown" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Current Breakdown
            </button>
            <button
              onClick={() => setViewMode("trends")}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewMode === "trends" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Daily Trends
            </button>
          </div>
        </div>

        {viewMode === "breakdown" ? (
          <>
            <Card className="p-4 mb-6 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
              <div className="flex items-center space-x-3">
                {dominantSource.icon}
                <div>
                  <p className="font-medium text-orange-800">
                    Dominant Contributor: {dominantSource.name} ({dominantSource.value}%)
                  </p>
                  <p className="text-sm text-orange-600">{dominantSource.description}</p>
                </div>
              </div>
            </Card>

            {/* Charts Container */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Pie Chart */}
              <Card className="p-6">
                <h3 className="mb-4 text-center text-gray-800">Source Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`${value}%`, "Contribution"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Bar Chart */}
              <Card className="p-6">
                <h3 className="mb-4 text-center text-gray-800">Contribution Levels</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sourceData} layout="horizontal">
                      <CartesianGrid strokeDasharray="1 3" />
                      <XAxis type="number" domain={[0, 40]} />
                      <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
                      <Tooltip formatter={(value: number) => [`${value}%`, "Contribution"]} />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sourceData.map((source, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg`} style={{ backgroundColor: source.color + "20" }}>
                      <div style={{ color: source.color }}>
                        {source.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-gray-800">{source.name}</h4>
                        <Badge variant="secondary">{source.value}%</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{source.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        ) : (
          /* Daily Trends View */
          <Card className="p-6">
            <h3 className="mb-4 text-center text-gray-800">24-Hour Source Contribution Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
                  <YAxis label={{ value: 'Contribution (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="vehicular" stackId="a" fill="#ef4444" name="Vehicular" />
                  <Bar dataKey="stubble" stackId="a" fill="#f59e0b" name="Stubble" />
                  <Bar dataKey="industrial" stackId="a" fill="#8b5cf6" name="Industrial" />
                  <Bar dataKey="domestic" stackId="a" fill="#06b6d4" name="Domestic" />
                  <Bar dataKey="dust" stackId="a" fill="#10b981" name="Dust" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>🚗 Peak vehicular emissions during rush hours (7-10 AM, 5-8 PM)</p>
              <p>🏭 Industrial activity higher during working hours</p>
              <p>🔥 Stubble burning intensifies in the evening</p>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
}