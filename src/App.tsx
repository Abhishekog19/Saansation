import { HeroSection } from "./components/HeroSection";
import { ForecastSection } from "./components/ForecastSection";
import { SourceAttribution } from "./components/SourceAttribution";
import { PolicyDashboard } from "./components/PolicyDashboard";
import { CitizenEngagement } from "./components/CitizenEngagement";
import { Footer } from "./components/Footer";
import HeatmapSection from "./components/HeatmapSection";
export default function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Real-time AQI Overview */}
      <HeroSection />
      
      <HeatmapSection />

      {/* Forecast Section - AI Predictions */}
      <ForecastSection />
      
      {/* Source Attribution - Pollution Breakdown */}
      <SourceAttribution />
      
      {/* Policy Dashboard - Data for Decision Makers */}
      <PolicyDashboard />
      
      {/* Citizen Engagement Section */}
      <CitizenEngagement />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}