import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import XPProgress from "@/components/XPProgress";
import JourneyPath from "@/components/JourneyPath";
import HabitGrid from "@/components/HabitGrid";
import ReflectionJournal from "@/components/ReflectionJournal";
import GoalTracker from "@/components/GoalTracker";
import TakeActionModal from "@/components/TakeActionModal";
import SwipeIndicator from "@/components/SwipeIndicator";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";
import { Sparkles, Calendar, User, ChevronLeft, ChevronRight, Trophy, Target, BookOpen, Users } from "lucide-react";

interface DashboardProps {
  userData: {
    name: string;
    weight: string;
    height: string;
    primaryFocus: string;
  };
  onNavigate: (page: string) => void;
}

const Dashboard = ({ userData, onNavigate }: DashboardProps) => {
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  
  // Gamification & Progress
  const [userLevel, setUserLevel] = useState(3);
  const [currentXP, setCurrentXP] = useState(1250);
  const [xpToNextLevel, setXpToNextLevel] = useState(350);
  const totalXPForLevel = 1000;
  
  // Habits state
  const [habits, setHabits] = useState([
    { id: '1', name: 'Morning Workout', icon: '💪', streak: 7, completed: true, category: 'physical' as const },
    { id: '2', name: 'Meditation', icon: '🧘', streak: 3, completed: false, category: 'mental' as const },
    { id: '3', name: 'Read 30min', icon: '📚', streak: 12, completed: true, category: 'mental' as const },
    { id: '4', name: 'Track Expenses', icon: '💰', streak: 5, completed: false, category: 'finance' as const }
  ]);

  // Goals state
  const [goals, setGoals] = useState([
    {
      id: '1',
      title: 'Run 5K in Under 25 Minutes',
      description: 'Improve cardiovascular fitness and endurance',
      category: 'physical' as const,
      progress: 18,
      target: 25,
      unit: 'minutes',
      deadline: '2024-12-31',
      milestones: [
        { value: 30, completed: true, reward: '50 XP' },
        { value: 27, completed: false, reward: '100 XP' },
        { value: 25, completed: false, reward: '200 XP + Badge' }
      ]
    },
    {
      id: '2', 
      title: 'Emergency Fund',
      description: 'Build 6 months of emergency savings',
      category: 'finance' as const,
      progress: 2800,
      target: 12000,
      unit: '$',
      deadline: '2025-06-30',
      milestones: [
        { value: 3000, completed: false, reward: '100 XP' },
        { value: 6000, completed: false, reward: '250 XP' },
        { value: 12000, completed: false, reward: '500 XP + Achievement' }
      ]
    }
  ]);

  const screens = ['dashboard', 'journeys', 'habits', 'goals', 'reflect'];
  const screenNames = ['Dashboard', 'Journeys', 'Habits', 'Goals', 'Reflect'];
  
  // Journey steps data
  const journeySteps = {
    physical: [
      { id: '1', title: 'Foundation Assessment', description: 'Complete fitness baseline test', xp: 50, completed: true, locked: false },
      { id: '2', title: 'First Workout Week', description: '7 days of consistent exercise', xp: 100, completed: true, locked: false },
      { id: '3', title: 'Cardio Mastery', description: 'Improve cardiovascular endurance', xp: 150, completed: false, locked: false, current: true },
      { id: '4', title: 'Strength Building', description: 'Build lean muscle mass', xp: 200, completed: false, locked: true },
      { id: '5', title: 'Athletic Performance', description: 'Peak physical conditioning', xp: 300, completed: false, locked: true }
    ],
    mental: [
      { id: '1', title: 'Mindfulness Basics', description: 'Learn meditation fundamentals', xp: 50, completed: true, locked: false },
      { id: '2', title: 'Stress Management', description: 'Develop coping strategies', xp: 100, completed: false, locked: false, current: true },
      { id: '3', title: 'Focus Training', description: 'Improve concentration skills', xp: 150, completed: false, locked: true },
      { id: '4', title: 'Emotional Intelligence', description: 'Master emotional regulation', xp: 200, completed: false, locked: true },
      { id: '5', title: 'Mental Resilience', description: 'Build unshakeable confidence', xp: 300, completed: false, locked: true }
    ],
    finance: [
      { id: '1', title: 'Money Mindset', description: 'Understand your relationship with money', xp: 50, completed: true, locked: false },
      { id: '2', title: 'Budget Mastery', description: 'Create and stick to a budget', xp: 100, completed: false, locked: false, current: true },
      { id: '3', title: 'Debt Freedom', description: 'Eliminate high-interest debt', xp: 150, completed: false, locked: true },
      { id: '4', title: 'Investment Basics', description: 'Start building wealth', xp: 200, completed: false, locked: true },
      { id: '5', title: 'Financial Independence', description: 'Achieve financial freedom', xp: 500, completed: false, locked: true }
    ],
    nutrition: [
      { id: '1', title: 'Nutrition Fundamentals', description: 'Learn healthy eating basics', xp: 50, completed: true, locked: false },
      { id: '2', title: 'Meal Planning', description: 'Plan nutritious meals weekly', xp: 100, completed: false, locked: false, current: true },
      { id: '3', title: 'Portion Control', description: 'Master appropriate serving sizes', xp: 150, completed: false, locked: true },
      { id: '4', title: 'Nutrient Timing', description: 'Optimize meal timing for energy', xp: 200, completed: false, locked: true },
      { id: '5', title: 'Metabolic Health', description: 'Achieve optimal metabolic function', xp: 300, completed: false, locked: true }
    ]
  };

  const { swipeProps } = useSwipeNavigation({
    onSwipeLeft: () => {
      setCurrentScreenIndex(prev => 
        prev < screens.length - 1 ? prev + 1 : prev
      );
    },
    onSwipeRight: () => {
      setCurrentScreenIndex(prev => prev > 0 ? prev - 1 : prev);
    }
  });

  // Action handlers
  const handleActionComplete = () => {
    // Award XP for completing actions
    const xpGained = Math.floor(Math.random() * 50) + 25; // 25-75 XP
    setCurrentXP(prev => prev + xpGained);
    
    // Level up check
    if (currentXP + xpGained >= (1000 + userLevel * 500)) {
      setUserLevel(prev => prev + 1);
      setCurrentXP(0);
      setXpToNextLevel(1000 + (userLevel + 1) * 500);
    }
    
    setIsActionModalOpen(false);
  };

  const toggleHabit = (habitId: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const newCompleted = !habit.completed;
        return {
          ...habit,
          completed: newCompleted,
          streak: newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1)
        };
      }
      return habit;
    }));
    
    // Award XP for habit completion
    setCurrentXP(prev => prev + 25);
  };

  const saveReflection = (reflection: any) => {
    // Save reflection and award XP
    setCurrentXP(prev => prev + 50);
  };

  const updateGoalProgress = (goalId: string, progress: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, progress } : goal
    ));
    // Award XP for goal progress
    setCurrentXP(prev => prev + 10);
  };

  const handleStepClick = (stepId: string) => {
    setIsActionModalOpen(true);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const completedHabits = habits.filter(h => h.completed).length;
  const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0);
  const completedGoals = goals.filter(g => g.progress >= g.target).length;

  const navigateScreen = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentScreenIndex > 0) {
      setCurrentScreenIndex(prev => prev - 1);
    } else if (direction === 'next' && currentScreenIndex < screens.length - 1) {
      setCurrentScreenIndex(prev => prev + 1);
    }
  };

  const renderScreen = () => {
    const currentScreen = screens[currentScreenIndex];

    switch (currentScreen) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* XP Progress */}
            <XPProgress 
              currentXP={currentXP}
              level={userLevel}
              xpToNextLevel={xpToNextLevel}
              totalXPForLevel={totalXPForLevel}
            />

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-card rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary">{completedHabits}</div>
                <div className="text-xs text-muted-foreground">Habits Today</div>
              </div>
              <div className="bg-gradient-card rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-500">{totalStreak}</div>
                <div className="text-xs text-muted-foreground">Total Streaks</div>
              </div>
              <div className="bg-gradient-card rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-500">{completedGoals}</div>
                <div className="text-xs text-muted-foreground">Goals Done</div>
              </div>
            </div>

            {/* Daily Focus */}
            <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2">Today's Focus: {userData.primaryFocus}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Complete 3 habits and make progress on your current goal to level up faster!
              </p>
              <Button
                onClick={() => setIsActionModalOpen(true)}
                className="w-full"
                variant="default"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Take Action & Earn XP
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-20 flex-col gap-2"
                onClick={() => setCurrentScreenIndex(2)}
              >
                <Trophy className="w-6 h-6" />
                <span className="text-sm">Check Habits</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2"
                onClick={() => setCurrentScreenIndex(4)}
              >
                <BookOpen className="w-6 h-6" />
                <span className="text-sm">Daily Reflect</span>
              </Button>
            </div>
          </div>
        );

      case 'journeys':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Choose Your Journey</h2>
              <p className="text-muted-foreground">Select a path to focus on today</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {(['physical', 'mental', 'finance', 'nutrition'] as const).map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  className="h-24 flex-col gap-2 border-2"
                  onClick={() => {
                    // Navigate to specific journey - we'll create dedicated journey screens
                    setIsActionModalOpen(true);
                  }}
                >
                  <div className="text-2xl">
                    {category === 'physical' && '💪'}
                    {category === 'mental' && '🧠'}
                    {category === 'finance' && '💰'}
                    {category === 'nutrition' && '🥗'}
                  </div>
                  <span className="text-sm font-medium capitalize">{category}</span>
                  <span className="text-xs text-muted-foreground">
                    {journeySteps[category].filter(s => s.completed).length}/{journeySteps[category].length} steps
                  </span>
                </Button>
              ))}
            </div>
            
            {/* Current Focus Journey */}
            <div className="mt-8">
              <JourneyPath
                category="physical"
                steps={journeySteps.physical}
                onStepClick={handleStepClick}
              />
            </div>
          </div>
        );

      case 'habits':
        return (
          <HabitGrid
            habits={habits}
            onToggleHabit={toggleHabit}
            onAddHabit={() => setIsActionModalOpen(true)}
          />
        );

      case 'goals':
        return (
          <GoalTracker
            goals={goals}
            onAddGoal={() => setIsActionModalOpen(true)}
            onUpdateProgress={updateGoalProgress}
          />
        );

      case 'reflect':
        return (
          <ReflectionJournal
            onSaveReflection={saveReflection}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm" {...swipeProps}>
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateScreen('prev')}
            disabled={currentScreenIndex === 0}
            className="rounded-full w-8 h-8"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div>
            <h1 className="text-xl font-bold text-foreground">
              {getGreeting()}, {userData.name}!
            </h1>
            <p className="text-sm text-muted-foreground">
              Level {userLevel} • {currentXP.toLocaleString()} XP
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('profile')}
            className="rounded-full w-8 h-8"
          >
            <User className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateScreen('next')}
            disabled={currentScreenIndex === screens.length - 1}
            className="rounded-full w-8 h-8"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Swipe Indicator */}
      <SwipeIndicator 
        currentIndex={currentScreenIndex}
        totalScreens={screens.length}
        screenNames={screenNames}
      />

      {/* Main Content */}
      <main className="flex-1 px-6 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreenIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      <TakeActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        onComplete={handleActionComplete}
        primaryFocus={userData.primaryFocus}
      />
    </div>
  );
};

export default Dashboard;