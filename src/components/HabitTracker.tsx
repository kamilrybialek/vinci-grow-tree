import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarDays, CheckCircle2, Plus, Flame, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Habit {
  id: string;
  title: string;
  category: 'finance' | 'physical' | 'mental' | 'diet';
  streak: number;
  completedToday: boolean;
  completedDates: string[];
}

interface HabitTrackerProps {
  habits: Habit[];
  onHabitToggle: (habitId: string) => void;
  onHabitAdd: (habit: Omit<Habit, 'id' | 'streak' | 'completedToday' | 'completedDates'>) => void;
}

const HabitTracker = ({ habits, onHabitToggle, onHabitAdd }: HabitTrackerProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHabit, setNewHabit] = useState({
    title: "",
    category: "physical" as const
  });
  const { toast } = useToast();

  const categories = [
    { key: 'physical', label: 'Physical', color: 'text-category-physical bg-category-physical/10' },
    { key: 'finance', label: 'Finance', color: 'text-category-finance bg-category-finance/10' },
    { key: 'mental', label: 'Mental', color: 'text-category-mental bg-category-mental/10' },
    { key: 'diet', label: 'Diet', color: 'text-category-diet bg-category-diet/10' }
  ];

  const suggestedHabits = {
    physical: ["10 minute walk", "5 push-ups", "Stretch for 5 minutes", "Take stairs"],
    finance: ["Check bank balance", "Track one expense", "Read financial article", "Save loose change"],
    mental: ["5 minute meditation", "Write 3 gratitudes", "Read 10 pages", "Practice breathing"],
    diet: ["Drink 1 glass water", "Eat a fruit", "Cook one meal", "Avoid processed snacks"]
  };

  const handleAddHabit = () => {
    if (!newHabit.title.trim()) {
      toast({
        title: "Habit name required",
        description: "Please enter a name for your habit.",
        variant: "destructive"
      });
      return;
    }

    onHabitAdd({
      title: newHabit.title.trim(),
      category: newHabit.category
    });

    setNewHabit({ title: "", category: "physical" });
    setShowAddForm(false);
    
    toast({
      title: "Habit added! 🎯",
      description: "Start building your new habit today.",
    });
  };

  const handleHabitToggle = (habitId: string) => {
    onHabitToggle(habitId);
    const habit = habits.find(h => h.id === habitId);
    if (habit && !habit.completedToday) {
      toast({
        title: "Great job! ✨",
        description: `${habit.title} completed for today.`,
      });
    }
  };

  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);
  const completedToday = habits.filter(h => h.completedToday).length;

  // Get last 7 days for mini calendar
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    return days;
  };

  const last7Days = getLast7Days();

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Daily Habits
          </h3>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              {completedToday}/{habits.length} today
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Flame className="w-4 h-4 text-orange-500" />
              {totalStreak} total streak
            </div>
          </div>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Habit
        </Button>
      </div>

      {/* Add Habit Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="p-4 space-y-4 bg-gradient-card">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter habit name..."
                  value={newHabit.title}
                  onChange={(e) => setNewHabit(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Category:</p>
                  <div className="flex gap-2">
                    {categories.map(cat => (
                      <Button
                        key={cat.key}
                        variant={newHabit.category === cat.key ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNewHabit(prev => ({ ...prev, category: cat.key as any }))}
                        className="text-xs"
                      >
                        {cat.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Suggested Habits */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Quick suggestions:</p>
                  <div className="flex flex-wrap gap-1">
                    {suggestedHabits[newHabit.category].map((suggestion, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/10 text-xs"
                        onClick={() => setNewHabit(prev => ({ ...prev, title: suggestion }))}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleAddHabit} size="sm" variant="action">
                  Add Habit
                </Button>
                <Button
                  onClick={() => setShowAddForm(false)}
                  size="sm"
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Habits List */}
      <div className="space-y-3">
        {habits.map((habit, index) => {
          const category = categories.find(c => c.key === habit.category);
          
          return (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <Card className={`p-4 transition-all hover:shadow-glow-soft ${
                habit.completedToday ? 'bg-green-50 border-green-200' : ''
              }`}>
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={habit.completedToday}
                    onCheckedChange={() => handleHabitToggle(habit.id)}
                    className="h-5 w-5"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className={`font-medium ${habit.completedToday ? 'line-through text-muted-foreground' : ''}`}>
                        {habit.title}
                      </h5>
                      {category && (
                        <Badge variant="secondary" className={`${category.color} text-xs`}>
                          {category.label}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-orange-500" />
                        <span className="text-muted-foreground">
                          {habit.streak} day{habit.streak !== 1 ? 's' : ''} streak
                        </span>
                      </div>
                      
                      {/* Mini completion calendar */}
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-3 h-3 text-muted-foreground" />
                        <div className="flex gap-0.5">
                          {last7Days.map((date, i) => {
                            const dateStr = date.toISOString().split('T')[0];
                            const completed = habit.completedDates.includes(dateStr);
                            
                            return (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-sm ${
                                  completed ? 'bg-green-500' : 'bg-muted'
                                }`}
                                title={date.toLocaleDateString()}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {habit.completedToday && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {habits.length === 0 && (
        <Card className="p-8 text-center bg-muted/30">
          <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h4 className="font-semibold mb-2">No Habits Yet</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Start building positive habits to accelerate your growth
          </p>
          <Button onClick={() => setShowAddForm(true)} variant="action">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Habit
          </Button>
        </Card>
      )}
    </div>
  );
};

export default HabitTracker;