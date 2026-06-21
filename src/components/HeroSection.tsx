import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Wind, Eye, Thermometer } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AQIData {
  value: number;
  status: string;
  color: string;
  description: string;
}

const getAQIColor = (aqi: number): string => {
  if (aqi < 50) return "green-500";
  if (aqi > 50 && aqi<=150) return "yellow-500";
  if (aqi>150 && aqi<=200) return "orange-500";
  if (aqi > 200 && aqi<=300) return "red-500";
  if (aqi > 300) return "purple-500";
  return "red-900";
};
const getLightAQIColor = (aqi: number): string => {
  if (aqi < 50) return "green-50";
  if (aqi > 50 && aqi<=150) return "yellow-50";
  if (aqi>150 && aqi<=200) return "orange-50";
  if (aqi > 200) return "red-50";
  if (aqi > 300) return "purple-50";
  return "red-200";
};

const getAQIStatus = (aqi: number): string => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
};

export function HeroSection() {
  const currentAQI = 250;
  const aqiStatus = getAQIStatus(currentAQI);
  const aqiColor = getAQIColor(currentAQI);

  const hotspots = [
    { name: "Anand Vihar", aqi:19, lat: 28.6469, lng: 77.3158 },
    { name: "Punjabi Bagh", aqi: 75, lat: 28.6741, lng: 77.1328 },
    { name: "Dwarka", aqi: 120, lat: 28.5921, lng: 77.0460 },
    { name: "Rohini", aqi: 20, lat: 28.7041, lng: 77.1025 }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 pb-6 ">
      <div className="logo text-white w-100 p-4 mb-4 flex">
        Saanstation
        <Button size="lg" className="bg-green-600 hover:bg--700 text-white">
          Logout          
        </Button> 
      </div>
      <div className="absolute inset-0 opacity-20">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1579438856884-aedd20549c9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxoaSUyMHBvbGx1dGlvbiUyMHNtb2clMjBjaXR5JTIwc2t5bGluZXxlbnwxfHx8fDE3NTk3NjI0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Delhi skyline with pollution"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="mb-2 text-gray-800">Delhi-NCR Air Quality</h1>
          <p className="text-gray-600">Real-time pollution monitoring powered by AI</p>
        </div>

        {/* Current AQI Display */}
        <Card className="mb-8 p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <div className="text-center">
            <div className="mb-4">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-${aqiColor} text-white mb-4`}>
                <span className="text-2xl font-bold">{currentAQI}</span>
              </div>
              <h2 className="text-gray-800 mb-2">Current AQI</h2>
              <Badge
                variant={currentAQI > 150 ? "destructive" : currentAQI > 100 ? "secondary" : "default"}
                className={`mb-4 bg-${getAQIColor(currentAQI)}`}>
                {aqiStatus}
              </Badge>
              <p className="text-sm text-gray-600">
                {currentAQI > 150 ? "Unhealthy air quality. Limit outdoor activities." :
                  currentAQI > 100 ? "Moderate air quality. Sensitive groups should be cautious." :
                    "Good air quality. Safe for outdoor activities."}
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-0">
            <div className="flex items-center space-x-2">
              <Wind className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-xs text-gray-600">PM2.5</p>
                <p className="font-semibold">85 µg/m³</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-0">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-xs text-gray-600">PM10</p>
                <p className="font-semibold">142 µg/m³</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-0">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-xs text-gray-600">NO₂</p>
                <p className="font-semibold">45 µg/m³</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-0">
            <div className="flex items-center space-x-2">
              <Wind className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-xs text-gray-600">O₃</p>
                <p className="font-semibold">28 µg/m³</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Pollution Hotspots Map View */}
        <Card className="mb-8 p-6 bg-white/90 backdrop-blur-sm shadow-lg">
          <h3 className="mb-4 text-gray-800">Pollution Hotspots</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotspots.map((spot, index) => (
              <div key={index} className={`flex items-center justify-between bg-${getLightAQIColor(spot.aqi)} p-4 rounded-lg border border-${getAQIColor(spot.aqi)}`}>
                <div className="flex items-center space-x-3 ">
                  <MapPin className={`w-4 h-4 text-${getAQIColor(spot.aqi)}`} />
                  <div>
                    <p className="font-medium">{spot.name}</p>
                    <p className="text-sm text-gray-600">AQI: {spot.aqi}</p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full bg-${getAQIColor(spot.aqi)}`}></div>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA Buttons */}
        <div className="flex pb-8 flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            View AI Forecast
          </Button>
          <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
            Policy Dashboard
          </Button>
        </div>
      </div>
    </section>
  );
}