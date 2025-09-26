import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardOverview from "@/components/DashboardOverview";
import HamburgerMenu from "@/components/HamburgerMenu";
import BottomNavigation from "@/components/BottomNavigation";
import JourneySteps from "@/components/JourneySteps";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NewDashboardProps {
  userData: {
    name: string;
    weight: string;
    height: string;
    primaryFocus: string;
  };
  onNavigate: (page: string) => void;
}

const NewDashboard = ({ userData, onNavigate }: NewDashboardProps) => {
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  const handleSectionNavigate = (section: string) => {
    setCurrentSection(section);
  };

  const handleBackToDashboard = () => {
    setCurrentSection(null);
  };

  const handleTaskComplete = (stepId: string, taskType: 'daily' | 'milestone') => {
    // Handle task completion logic here
    console.log(`Completed ${taskType} task for step ${stepId}`);
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'goals':
        return <JourneySteps journeyType="finance" onTaskComplete={handleTaskComplete} />;
      
      case 'habits':
        return (
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Habits</h2>
            <p className="text-muted-foreground">Build lasting daily routines.</p>
            <div className="space-y-3">
              {['Morning Exercise', 'Meditation', 'Reading', 'Journaling', 'Water Intake'].map((habit, index) => (
                <div key={habit} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">{habit}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{7 - index} day streak</span>
                    <div className={`w-4 h-4 rounded-full ${index < 3 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );
      
      case 'journal':
        return (
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Journal</h2>
            <p className="text-muted-foreground">Reflect and gain insights about your journey.</p>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium text-sm text-muted-foreground">Today's Reflection</h3>
                <textarea 
                  className="w-full mt-2 p-2 border rounded resize-none h-24" 
                  placeholder="How did today go? What did you learn?"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Recent Entries</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-sm">Yesterday: Great progress on my fitness goals...</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-sm">2 days ago: Struggled with meditation but learned...</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      
      case 'progress':
        return (
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Progress Analytics</h2>
            <p className="text-muted-foreground">Visualize your growth over time.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-secondary rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">85%</div>
                <div className="text-sm text-muted-foreground">Habit Completion</div>
              </div>
              <div className="p-4 bg-secondary rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">12</div>
                <div className="text-sm text-muted-foreground">Active Goals</div>
              </div>
              <div className="p-4 bg-secondary rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">28</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
              <div className="p-4 bg-secondary rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">4.2</div>
                <div className="text-sm text-muted-foreground">Avg Wellness</div>
              </div>
            </div>
          </Card>
        );
      
      case 'achievements':
        return (
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Achievements</h2>
            <p className="text-muted-foreground">Celebrate your accomplishments.</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'First Week', emoji: '🌱', unlocked: true },
                { name: 'Habit Master', emoji: '🏆', unlocked: true },
                { name: 'Goal Getter', emoji: '🎯', unlocked: false },
                { name: 'Mindful Month', emoji: '🧘', unlocked: false },
              ].map((achievement) => (
                <div 
                  key={achievement.name}
                  className={`p-4 border rounded-lg text-center ${
                    achievement.unlocked ? 'bg-secondary' : 'bg-gray-100 opacity-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{achievement.emoji}</div>
                  <div className="font-medium text-sm">{achievement.name}</div>
                </div>
              ))}
            </div>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background font-jakarta">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center space-x-2">
          <HamburgerMenu onNavigate={handleSectionNavigate} />
          {currentSection && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToDashboard}
              className="ml-2"
            >
              ← Back
            </Button>
          )}
          <h1 className="text-xl font-semibold">Balance</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pt-6 pb-24">
        <AnimatePresence mode="wait">
          {currentSection ? (
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderSection()}
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DashboardOverview
                userData={userData}
                onNavigate={handleSectionNavigate}
                onStartCheckin={() => onNavigate('checkin')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation 
        currentPage="dashboard" 
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default NewDashboard;