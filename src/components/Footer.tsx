import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Brain, Database, Smartphone, ExternalLink, Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  const dataSources = [
    { name: "CPCB", description: "Central Pollution Control Board", url: "https://cpcb.nic.in/" },
    { name: "SAFAR", description: "System of Air Quality & Weather Forecasting", url: "https://safar.tropmet.res.in/" },
    { name: "NASA FIRMS", description: "Fire Information for Resource Management", url: "https://firms.modaps.eosdis.nasa.gov/map/#d:24hrs;@0.0,0.0,3.0z" },
    { name: "Delhi Govt.", description: "Real-time monitoring stations", url: "https://delhi.gov.in/" }
  ];

  const teamMembers = [
    { name: "Vandan Thakur", role: "AI Research Lead" },
    { name: "Anukul Khanolkar", role: "Data Engineering" },
    { name: "Maahir Thakar", role: "Policy Analysis" },
    { name: "Abhishek Pandey", role: "Front End Developer" },
  ];

  return (
    <footer className="bg-gray-900 text-white px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="mb-4 flex items-center space-x-2">
              <Brain className="w-5 h-5 text-blue-400" />
              <span>AI-Powered Insights</span>
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Our platform combines real-time monitoring, machine learning predictions, and policy analytics
              to provide actionable insights for both citizens and policymakers in Delhi-NCR.
            </p>
            <div className="flex space-x-3">
              <a href="https://github.com/" target="_blank">
              <Button size="sm" variant="outline" className="border-gray-600 text-gray-600 hover:bg-600 ">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              </a>
              <a href="https://X.com/" target="_blank">
              <Button size="sm" variant="outline" className="border-gray-600 text-gray-600 hover:bg-gray-600">
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              </a>
            </div>
          </div>

          {/* Data Sources */}
          <div>
            <h3 className="mb-4 flex items-center space-x-2">
              <Database className="w-5 h-5 text-green-400" />
              <span>Data Sources</span>
            </h3>
            <div className="space-y-3">
              {dataSources.map((source, index) => (
                <div key={index} className="group">
                  <a href={source.url} target="_blank" >
                    <button className="flex items-center justify-between w-full text-left hover:text-blue-400 transition-colors">
                      <div>
                        <p className="text-sm font-medium">{source.name}</p>
                        <p className="text-xs text-gray-400">{source.description}</p>
                      </div>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Team & App */}
          <div>
            <h3 className="mb-4 flex items-center space-x-2">
              <Smartphone className="w-5 h-5 text-purple-400" />
              <span>Mobile App</span>
            </h3>
            <Card className="p-4 bg-gray-800 border-gray-700 mb-4">
              <p className="text-sm text-gray-300 mb-3">
                Get personalized alerts, track your environmental impact, and join community challenges.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Smartphone className="w-4 h-4 mr-2" />
                Download App (Coming Soon)
              </Button>
            </Card>

            <div>
              <h4 className="text-sm mb-2 text-gray-400">Development Team</h4>
              <div className="space-y-1">
                {teamMembers.map((member, index) => (
                  <p key={index} className="text-xs text-gray-500">
                    {member.name} - {member.role}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-700">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              © 2024 Delhi-NCR Air Quality Dashboard
            </p>
            <span className="text-gray-600">|</span>
            <p className="text-sm text-gray-400">
              Last updated: 2 minutes ago
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-gray-800">
              Privacy Policy
            </Button>
            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-gray-800">
              Terms of Service
            </Button>
            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-gray-800">
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </Button>
          </div>
        </div>

        {/* Final Credits */}
        <div className="text-center mt-6 pt-4 border-t border-gray-800">
          <p className="text-xs text-gray-500">
            "In short, this platform ensures citizens see what matters, and policymakers act on insights — all powered by transparent, AI-driven data."
          </p>
        </div>
      </div>
    </footer>
  );
}