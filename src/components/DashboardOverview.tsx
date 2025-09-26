import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, Target, Calendar, BookOpen, TrendingUp, Plus } from "lucide-react";

interface DashboardOverviewProps {
  userData: {
    name: string;
    primaryFocus: string;
  };
  onNavigate: (section: string) => void;
  onStartCheckin: () => void;
}

const DashboardOverview = ({ userData, onNavigate, onStartCheckin }: DashboardOverviewProps) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  // Mock data - in real app this would come from state/API
  const todayStats = {
    habitsCompleted: 3,
    totalHabits: 5,
    journalStreak: 7,
    focusTime: 45,
    wellnessScore: 78
  };

  const quickActions = [
    { 
      id: 'checkin', 
      icon: Zap, 
      label: 'Daily Check-in', 
      description: 'How are you feeling today?',
      action: onStartCheckin,
      variant: 'default' as const
    },
    { 
      id: 'goals', 
      icon: Target, 
      label: 'View Goals', 
      description: 'Track your progress',
      action: () => onNavigate('goals'),
      variant: 'outline' as const
    },
    { 
      id: 'habits', 
      icon: Calendar, 
      label: 'Check Habits', 
      description: 'Mark today\'s activities',
      action: () => onNavigate('habits'),
      variant: 'outline' as const
    },
    { 
      id: 'journal', 
      icon: BookOpen, 
      label: 'Journal', 
      description: 'Reflect on your day',
      action: () => onNavigate('journal'),
      variant: 'outline' as const
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-2xl font-bold text-foreground">
          {getGreeting()}, {userData.name}
        </h1>
        <p className="text-muted-foreground">{today}</p>
      </motion.div>

      {/* Today's Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Today's Progress</h2>
              <div className="text-2xl font-bold text-primary">{todayStats.wellnessScore}%</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Daily Habits</span>
                <span>{todayStats.habitsCompleted}/{todayStats.totalHabits}</span>
              </div>
              <Progress value={(todayStats.habitsCompleted / todayStats.totalHabits) * 100} className="h-2" />
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">{todayStats.journalStreak}</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">{todayStats.focusTime}m</div>
                  <div className="text-xs text-muted-foreground">Focus Time</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Primary Focus */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Current Focus</h3>
            </div>
            <p className="text-muted-foreground">{userData.primaryFocus}</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onNavigate('goals')}
              className="w-full"
            >
              View Related Goals
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h3 className="font-semibold">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Button
                variant={action.variant}
                className="w-full h-auto p-4 justify-start"
                onClick={action.action}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <action.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{action.label}</div>
                    <div className="text-sm text-muted-foreground">{action.description}</div>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;