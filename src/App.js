"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
var HeroSection_1 = require("./components/HeroSection");
var ForecastSection_1 = require("./components/ForecastSection");
var SourceAttribution_1 = require("./components/SourceAttribution");
var PolicyDashboard_1 = require("./components/PolicyDashboard");
var CitizenEngagement_1 = require("./components/CitizenEngagement");
var Footer_1 = require("./components/Footer");
function App() {
    return (<div className="min-h-screen bg-background">
      {/* Hero Section - Real-time AQI Overview */}
      <HeroSection_1.HeroSection />
      
      {/* Forecast Section - AI Predictions */}
      <ForecastSection_1.ForecastSection />
      
      {/* Source Attribution - Pollution Breakdown */}
      <SourceAttribution_1.SourceAttribution />
      
      {/* Policy Dashboard - Data for Decision Makers */}
      <PolicyDashboard_1.PolicyDashboard />
      
      {/* Citizen Engagement Section */}
      <CitizenEngagement_1.CitizenEngagement />
      
      {/* Footer */}
      <Footer_1.Footer />
    </div>);
}
