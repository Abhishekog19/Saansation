import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Brain, TrendingUp, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface ForecastData {
  time: string;
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
  o3: number;
}

const generateForecastData = (): ForecastData[] => {
  const data: ForecastData[] = [];
  const baseTime = new Date();
  
  for (let i = 0; i < 72; i++) {
    const time = new Date(baseTime.getTime() + i * 60 * 60 * 1000);
    const hour = time.getHours();
    
    // Simulate pollution patterns (higher during rush hours and winter months)
    let baseAqi = 150;
    if (hour >= 7 && hour <= 10) baseAqi += 30; // Morning rush
    if (hour >= 17 && hour <= 20) baseAqi += 25; // Evening rush
    if (hour >= 22 || hour <= 5) baseAqi -= 20; // Night time
    
    // Add some randomness and trends
    const randomFactor = (Math.random() - 0.5) * 40;
    const aqi = Math.max(50, Math.min(400, baseAqi + randomFactor + Math.sin(i / 12) * 15));
    
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      aqi: Math.round(aqi),
      pm25: Math.round(aqi * 0.45),
      pm10: Math.round(aqi * 0.75),
      no2: Math.round(aqi * 0.25),
      o3: Math.round(aqi * 0.15)
    });
  }
  
  return data;
};

export function ForecastSection() {
  const [selectedPollutant, setSelectedPollutant] = useState<string>("aqi");
  const [timeRange, setTimeRange] = useState<string>("24");
  
  const forecastData = generateForecastData();
  const displayData = forecastData.slice(0, parseInt(timeRange));
  
  const getLineColor = (pollutant: string) => {
    switch (pollutant) {
      case "aqi": return "#ef4444";
      case "pm25": return "#f59e0b";
      case "pm10": return "#8b5cf6";
      case "no2": return "#06b6d4";
      case "o3": return "#10b981";
      default: return "#ef4444";
    }
  };
  
  const getPollutantUnit = (pollutant: string) => {
    return pollutant === "aqi" ? "AQI" : "µg/m³";
  };
  
  const getDataKey = () => {
    return selectedPollutant;
  };
  
  const getCurrentTrend = () => {
    if (displayData.length < 2) return "stable";
    const current = displayData[0][getDataKey() as keyof ForecastData] as number;
    const next6Hours = displayData.slice(1, 7);
    const avgNext = next6Hours.reduce((sum, item) => sum + (item[getDataKey() as keyof ForecastData] as number), 0) / next6Hours.length;
    
    if (avgNext > current * 1.1) return "increasing";
    if (avgNext < current * 0.9) return "decreasing";
    return "stable";
  };
  
  const trend = getCurrentTrend();

  return (
    <section className="px-4 py-8 my-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="w-6 h-6 text-blue-600" />
            <h2 className="text-gray-800">AI-Powered Forecast</h2>
          </div>
          <p className="text-gray-600">LSTM & ARIMA models predict air quality trends</p>
        </div>

        {/* Controls */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm mb-2">Pollutant</label>
                <Select value={selectedPollutant} onValueChange={setSelectedPollutant}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aqi">AQI</SelectItem>
                    <SelectItem value="pm25">PM2.5</SelectItem>
                    <SelectItem value="pm10">PM10</SelectItem>
                    <SelectItem value="no2">NO₂</SelectItem>
                    <SelectItem value="o3">O₃</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm mb-2">Time Range</label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24">24 Hours</SelectItem>
                    <SelectItem value="48">48 Hours</SelectItem>
                    <SelectItem value="72">72 Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Trend Indicator */}
            <div className="flex items-center space-x-2">
              <TrendingUp className={`w-5 h-5 ${
                trend === "increasing" ? "text-red-500" : 
                trend === "decreasing" ? "text-green-500" : "text-gray-500"
              }`} />
              <Badge variant={trend === "increasing" ? "destructive" : trend === "decreasing" ? "default" : "secondary"}>
                {trend === "increasing" ? "Rising" : trend === "decreasing" ? "Improving" : "Stable"}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Chart */}
        <Card className="p-6 mb-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={displayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  label={{ value: getPollutantUnit(selectedPollutant), angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  labelFormatter={(label) => `Time: ${label}`}
                  formatter={(value: number) => [value, selectedPollutant.toUpperCase()]}
                />
                <Line 
                  type="monotone" 
                  dataKey={getDataKey()} 
                  stroke={getLineColor(selectedPollutant)}
                  strokeWidth={3}
                  dot={{ fill: getLineColor(selectedPollutant), strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* AI Insights */}
        <Card className="p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-orange-500 mt-1" />
            <div>
              <h3 className="mb-2 text-gray-800">AI Insights</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Peak pollution expected during morning rush hours (8-10 AM)</p>
                <p>• Weather patterns suggest {trend === "increasing" ? "worsening" : trend === "decreasing" ? "improving" : "stable"} conditions over next 24 hours</p>
                <p>• Vehicular emissions likely to be the dominant contributor tomorrow</p>
                <p>• Recommendation: {trend === "increasing" ? "Avoid outdoor activities during peak hours" : "Good time for outdoor activities in the evening"}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}