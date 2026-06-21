import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Heart, Share2, Trophy, AlertTriangle, CheckCircle, Users, Target, Calendar } from "lucide-react";
import { useState } from "react";

interface HealthAlert {
  id: string;
  type: "warning" | "danger" | "info";
  title: string;
  message: string;
  time: string;
  icon: React.ReactNode;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  reward: string;
  unlocked: boolean;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  daysLeft: number;
  reward: string;
  userParticipating: boolean;
}

const healthAlerts: HealthAlert[] = [
  {
    id: "1",
    type: "danger",
    title: "Avoid Morning Jogs",
    message: "AQI expected to reach 220+ tomorrow morning (6-10 AM). Consider indoor exercise.",
    time: "2 hours ago",
    icon: <AlertTriangle className="w-5 h-5" />
  },
  {
    id: "2",
    type: "warning",
    title: "Mask Recommended",
    message: "PM2.5 levels are high. Wear N95 masks when outdoors, especially for children & elderly.",
    time: "4 hours ago",
    icon: <Heart className="w-5 h-5" />
  },
  {
    id: "3",
    type: "info",
    title: "Air Purifier Settings",
    message: "Set air purifiers to high mode. Keep windows closed until 2 PM.",
    time: "6 hours ago",
    icon: <CheckCircle className="w-5 h-5" />
  }
];

const achievements: Achievement[] = [
  {
    id: "1",
    title: "Pollution Awareness Champion",
    description: "Share pollution data 10 times",
    progress: 7,
    maxProgress: 10,
    reward: "Digital Badge + 50 Points",
    unlocked: false
  },
  {
    id: "2",
    title: "Metro Warrior",
    description: "Use public transport for 30 days",
    progress: 30,
    maxProgress: 30,
    reward: "Green Commuter Badge",
    unlocked: true
  },
  {
    id: "3",
    title: "Quiz Master",
    description: "Complete 20 daily pollution quizzes",
    progress: 15,
    maxProgress: 20,
    reward: "Knowledge Badge + 100 Points",
    unlocked: false
  },
  {
    id: "4",
    title: "Community Leader",
    description: "Invite 5 friends to join the platform",
    progress: 3,
    maxProgress: 5,
    reward: "Leader Badge + 200 Points",
    unlocked: false
  }
];

const challenges: Challenge[] = [
  {
    id: "1",
    title: "Car-Free Week Challenge",
    description: "Avoid personal vehicles for 7 consecutive days",
    participants: 1247,
    daysLeft: 4,
    reward: "500 Points + Tree Planting Certificate",
    userParticipating: true
  },
  {
    id: "2",
    title: "Air Quality Ambassador",
    description: "Share daily AQI updates with 3 unique social media posts",
    participants: 892,
    daysLeft: 2,
    reward: "Ambassador Badge + Local Recognition",
    userParticipating: false
  },
  {
    id: "3",
    title: "Indoor Plant Challenge",
    description: "Add 5 air-purifying plants to your home",
    participants: 634,
    daysLeft: 10,
    reward: "Green Home Badge + Plant Care Guide",
    userParticipating: true
  }
];

const dailyQuiz = {
  question: "Which pollutant is most harmful to respiratory health in Delhi?",
  options: ["PM10", "PM2.5", "NO₂", "O₃"],
  correctAnswer: 1,
  explanation: "PM2.5 particles are small enough to penetrate deep into lungs and enter bloodstream.",
  userPoints: 1250
};

export function CitizenEngagement() {
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [shareMessage, setShareMessage] = useState("Delhi AQI today: 192 (Unhealthy) - Let's work together for cleaner air! 🌱 #DelhiAir #CleanAir");

  const getAlertColor = (type: string) => {
    switch (type) {
      case "danger": return "border-red-200 bg-red-50 text-red-800";
      case "warning": return "border-orange-200 bg-orange-50 text-orange-800";
      case "info": return "border-blue-200 bg-blue-50 text-blue-800";
      default: return "border-gray-200 bg-gray-50 text-gray-800";
    }
  };

  const getAlertIconColor = (type: string) => {
    switch (type) {
      case "danger": return "text-red-600";
      case "warning": return "text-orange-600";
      case "info": return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Delhi Air Quality Update',
        text: shareMessage,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareMessage);
      alert("Message copied to clipboard!");
    }
  };

  return (
    <section className="px-4 py-8 bg-gradient-to-b from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="mb-4 text-gray-800">Citizen Engagement Hub</h2>
          <p className="text-gray-600">Stay informed, stay healthy, make a difference</p>
        </div>

        <Tabs defaultValue="alerts" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="alerts">Health Alerts</TabsTrigger>
            <TabsTrigger value="gamification">Challenges</TabsTrigger>
            <TabsTrigger value="quiz">Daily Quiz</TabsTrigger>
            <TabsTrigger value="share">Share & Connect</TabsTrigger>
          </TabsList>

          {/* Health Alerts Tab */}
          <TabsContent value="alerts" className="space-y-4">
            <Card className="p-6">
              <h3 className="mb-4 text-gray-800">Personalized Health Alerts</h3>
              <div className="space-y-4">
                {healthAlerts.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
                    <div className="flex items-start space-x-3">
                      <div className={getAlertIconColor(alert.type)}>
                        {alert.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{alert.title}</h4>
                        <p className="text-sm mb-2">{alert.message}</p>
                        <p className="text-xs opacity-75">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Health Tips */}
            <Card className="p-6 bg-gradient-to-r from-green-100 to-blue-100">
              <h4 className="text-gray-800">Today's Health Tips</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Drink warm water with honey & lemon</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Use air purifier in main living areas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Avoid outdoor exercise before 10 AM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Keep indoor plants watered & clean</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Gamification Tab */}
          <TabsContent value="gamification" className="space-y-6">
            {/* User Stats */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-800">Your Impact Score</h3>
                <Badge className="bg-green-100 text-green-800">{dailyQuiz.userPoints} Points</Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">7</p>
                  <p className="text-sm text-gray-600">Days Active</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">3</p>
                  <p className="text-sm text-gray-600">Achievements</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">15</p>
                  <p className="text-sm text-gray-600">Friends Invited</p>
                </div>
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6">
              <h3 className="mb-4 text-gray-800">Achievements</h3>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Trophy className={`w-5 h-5 ${achievement.unlocked ? "text-yellow-500" : "text-gray-400"}`} />
                        <h4 className="font-medium">{achievement.title}</h4>
                        {achievement.unlocked && (
                          <Badge className="bg-yellow-100 text-yellow-800">Unlocked!</Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress: {achievement.progress}/{achievement.maxProgress}</span>
                        <span className="text-gray-500">{achievement.reward}</span>
                      </div>
                      <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Active Challenges */}
            <Card className="p-6">
              <h3 className="mb-4 text-gray-800">Community Challenges</h3>
              <div className="space-y-4">
                {challenges.map((challenge) => (
                  <div key={challenge.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{challenge.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{challenge.participants} participants</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{challenge.daysLeft} days left</span>
                          </span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant={challenge.userParticipating ? "default" : "outline"}
                        className={challenge.userParticipating ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        {challenge.userParticipating ? "Participating" : "Join Challenge"}
                      </Button>
                    </div>
                    <p className="text-sm text-green-600">🏆 {challenge.reward}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Daily Quiz Tab */}
          <TabsContent value="quiz" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-800">Daily Pollution Quiz</h3>
                <Badge className="bg-blue-100 text-blue-800">+10 Points</Badge>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg">{dailyQuiz.question}</h4>
                
                <div className="space-y-2">
                  {dailyQuiz.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => !quizSubmitted && setSelectedQuizAnswer(index)}
                      disabled={quizSubmitted}
                      className={`w-full p-3 text-left border rounded-lg transition-colors ${
                        quizSubmitted && index === dailyQuiz.correctAnswer
                          ? "bg-green-100 border-green-500 text-green-800"
                          : quizSubmitted && index === selectedQuizAnswer && index !== dailyQuiz.correctAnswer
                          ? "bg-red-100 border-red-500 text-red-800"
                          : selectedQuizAnswer === index
                          ? "bg-blue-100 border-blue-500"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                
                {!quizSubmitted ? (
                  <Button 
                    onClick={handleQuizSubmit}
                    disabled={selectedQuizAnswer === null}
                    className="w-full"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 mb-2">
                      {selectedQuizAnswer === dailyQuiz.correctAnswer ? "Correct! 🎉" : "Not quite right, but you learned something! 📚"}
                    </p>
                    <p className="text-sm text-green-700">{dailyQuiz.explanation}</p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Share & Connect Tab */}
          <TabsContent value="share" className="space-y-6">
            <Card className="p-6">
              <h3 className="mb-4 text-gray-800">Share Air Quality Update</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Share Message</label>
                  <textarea
                    value={shareMessage}
                    onChange={(e) => setShareMessage(e.target.value)}
                    className="w-full p-3 border rounded-lg resize-none h-20"
                    placeholder="Customize your message..."
                  />
                </div>
                
                <Button onClick={handleShare} className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share on Social Media
                </Button>
              </div>
            </Card>

            {/* Community Stats */}
            <Card className="p-6">
              <h3 className="mb-4 text-gray-800">Community Impact</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">12,847</p>
                  <p className="text-sm text-blue-700">Active Citizens</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">3,924</p>
                  <p className="text-sm text-green-700">Shares This Week</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">48,392</p>
                  <p className="text-sm text-purple-700">Trees Pledged</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">156</p>
                  <p className="text-sm text-orange-700">Car-Free Days</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}