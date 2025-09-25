import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import TreeProgress from "@/components/TreeProgress";
import TakeActionModal from "@/components/TakeActionModal";
import CategoryJourney from "@/components/CategoryJourney";
import SwipeIndicator from "@/components/SwipeIndicator";
import DailyStreak from "@/components/DailyStreak";
import WeeklyChallenge from "@/components/WeeklyChallenge";
import GoalSetting from "@/components/GoalSetting";
import ProgressInsights from "@/components/ProgressInsights";
import HabitTracker from "@/components/HabitTracker";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";
import { Sparkles, Calendar, User, ChevronLeft, ChevronRight, BarChart3, Target, CheckSquare } from "lucide-react";

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
  const [treeStage, setTreeStage] = useState<'sprout' | 'growing' | 'flourishing'>('sprout');
  const [currentStreak, setCurrentStreak] = useState(7);
  const [categories, setCategories] = useState({
    finance: 0.1,
    physical: 0.15,
    mental: 0.05,
    diet: 0.2
  });
  const [goals, setGoals] = useState<any[]>([]);
  const [habits, setHabits] = useState<any[]>([]);
  const [weeklyActions, setWeeklyActions] = useState(12);

  // Load data from localStorage
  useEffect(() => {
    const savedGoals = localStorage.getItem('vinci4-goals');
    const savedHabits = localStorage.getItem('vinci4-habits');
    
    if (savedGoals) setGoals(JSON.parse(savedGoals));
    if (savedHabits) setHabits(JSON.parse(savedHabits));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('vinci4-goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('vinci4-habits', JSON.stringify(habits));
  }, [habits]);

  const screens = ['overview', 'insights', 'goals', 'habits', 'physical', 'finance', 'mental', 'diet'];
  const screenNames = ['Dashboard', 'Progress Insights', 'Goals', 'Habits', 'Health Journey', 'Finance Journey', 'Mental Journey', 'Nutrition Journey'];

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

  const handleActionComplete = () => {
    // Simulate tree growth
    const currentProgress = Object.values(categories).reduce((a, b) => a + b, 0) / 4;
    
    // Randomly improve a category
    const categoryKeys = Object.keys(categories) as (keyof typeof categories)[];
    const randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
    
    setCategories(prev => ({
      ...prev,
      [randomCategory]: Math.min(prev[randomCategory] + 0.05, 1)
    }));

    // Update tree stage based on overall progress
    const newProgress = (Object.values(categories).reduce((a, b) => a + b, 0) + 0.05) / 4;
    if (newProgress > 0.7) {
      setTreeStage('flourishing');
    } else if (newProgress > 0.3) {
      setTreeStage('growing');
    }

    // Increment weekly actions
    setWeeklyActions(prev => prev + 1);

    setIsActionModalOpen(false);
  };

  const handleGoalAdded = (goal: any) => {
    setGoals(prev => [...prev, { ...goal, id: Date.now().toString() }]);
  };

  const handleGoalComplete = (goalId: string) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, completed: true } : goal
    ));
    
    // Boost category progress when goal is completed
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      setCategories(prev => ({
        ...prev,
        [goal.category]: Math.min(prev[goal.category] + 0.15, 1)
      }));
    }
  };

  const handleGoalDelete = (goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  const handleHabitAdd = (habitData: any) => {
    const newHabit = {
      ...habitData,
      id: Date.now().toString(),
      streak: 0,
      completedToday: false,
      completedDates: []
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const handleHabitToggle = (habitId: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const wasCompleted = habit.completedToday;
        const newCompletedDates = wasCompleted 
          ? habit.completedDates.filter((date: string) => date !== today)
          : [...habit.completedDates, today];
        
        return {
          ...habit,
          completedToday: !wasCompleted,
          completedDates: newCompletedDates,
          streak: !wasCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1)
        };
      }
      return habit;
    }));

    // Small category progress boost for habit completion
    const habit = habits.find(h => h.id === habitId);
    if (habit && !habit.completedToday) {
      setCategories(prev => ({
        ...prev,
        [habit.category]: Math.min(prev[habit.category] + 0.02, 1)
      }));
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const overallProgress = Object.values(categories).reduce((a, b) => a + b, 0) / 4;

  const handleChallengeJoin = () => {
    setIsActionModalOpen(true);
  };

  const navigateScreen = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentScreenIndex > 0) {
      setCurrentScreenIndex(prev => prev - 1);
    } else if (direction === 'next' && currentScreenIndex < screens.length - 1) {
      setCurrentScreenIndex(prev => prev + 1);
    }
  };

  const renderScreen = () => {
    const currentScreen = screens[currentScreenIndex];

    if (currentScreen === 'overview') {
      return (
        <div className="space-y-6">
          {/* Tree Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <TreeProgress 
              stage={treeStage} 
              categories={categories} 
              overallProgress={overallProgress}
            />
          </motion.div>

          {/* Daily Streak */}
          <DailyStreak currentStreak={currentStreak} longestStreak={14} />

          {/* Weekly Challenge */}
          <WeeklyChallenge
            title="Mindful Movement Week"
            description="Take 10 minutes of intentional movement each day. Walking, stretching, or dancing - any movement counts!"
            progress={3}
            target={7}
            timeLeft="4 days left"
            onJoin={handleChallengeJoin}
          />

          {/* Progress Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gradient-card rounded-2xl p-6 shadow-glow-soft"
          >
            <h3 className="text-lg font-semibold mb-4 text-center">Growth Areas</h3>
            <div className="space-y-3">
              {Object.entries(categories).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="capitalize text-sm font-medium">{key}</span>
                  <div className="flex-1 mx-3 bg-muted rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full bg-category-${key}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${value * 100}%` }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    ></motion.div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(value * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Take Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button
              onClick={() => setIsActionModalOpen(true)}
              variant="action"
              size="lg"
              className="w-full h-16 text-lg font-semibold rounded-3xl"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              Take Action
            </Button>
          </motion.div>
        </div>
      );
    }

    // Enhanced screens
    if (currentScreen === 'insights') {
      return (
        <ProgressInsights
          categories={categories}
          streak={currentStreak}
          weeklyActions={weeklyActions}
          completedGoals={goals.filter(g => g.completed).length}
        />
      );
    }

    if (currentScreen === 'goals') {
      return (
        <GoalSetting
          goals={goals}
          onGoalAdded={handleGoalAdded}
          onGoalComplete={handleGoalComplete}
          onGoalDelete={handleGoalDelete}
        />
      );
    }

    if (currentScreen === 'habits') {
      return (
        <HabitTracker
          habits={habits}
          onHabitToggle={handleHabitToggle}
          onHabitAdd={handleHabitAdd}
        />
      );
    }

    // Individual category journey
    return (
      <CategoryJourney
        category={currentScreen as 'physical' | 'finance' | 'mental' | 'diet'}
        progress={categories[currentScreen as keyof typeof categories]}
        onTakeAction={() => setIsActionModalOpen(true)}
      />
    );
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
              {currentScreenIndex === 0 
                ? `Your tree is ${Math.round(overallProgress * 100)}% grown`
                : currentScreenIndex === 1
                  ? `Track your growth progress`
                  : currentScreenIndex === 2
                    ? `${goals.filter(g => !g.completed).length} active goals`
                    : currentScreenIndex === 3
                      ? `${habits.filter(h => h.completedToday).length}/${habits.length} habits today`
                      : `${screens[currentScreenIndex].charAt(0).toUpperCase() + screens[currentScreenIndex].slice(1)} journey`
              }
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Quick action icons for insights, goals, habits */}
          {currentScreenIndex === 0 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentScreenIndex(1)}
                className="rounded-full w-8 h-8"
                title="View Insights"
              >
                <BarChart3 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentScreenIndex(2)}
                className="rounded-full w-8 h-8"
                title="Goals"
              >
                <Target className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentScreenIndex(3)}
                className="rounded-full w-8 h-8"
                title="Habits"
              >
                <CheckSquare className="w-4 h-4" />
              </Button>
            </>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('checkin')}
            className="rounded-full w-8 h-8"
          >
            <Calendar className="w-4 h-4" />
          </Button>
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