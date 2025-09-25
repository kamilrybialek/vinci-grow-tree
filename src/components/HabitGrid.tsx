import { motion } from "framer-motion";
import { Flame, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Habit {
  id: string;
  name: string;
  icon: string;
  streak: number;
  completed: boolean;
  category: 'physical' | 'mental' | 'nutrition' | 'finance';
}

interface HabitGridProps {
  habits: Habit[];
  onToggleHabit: (habitId: string) => void;
  onAddHabit: () => void;
}

const categoryColors = {
  physical: "border-category-physical bg-category-physical/10",
  mental: "border-category-mental bg-category-mental/10",
  nutrition: "border-category-diet bg-category-diet/10",
  finance: "border-category-finance bg-category-finance/10"
};

const HabitGrid = ({ habits, onToggleHabit, onAddHabit }: HabitGridProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Daily Habits</h2>
          <p className="text-muted-foreground">Build consistency, one day at a time</p>
        </div>
        <Button onClick={onAddHabit} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Habit
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {habits.map((habit, index) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              habit.completed 
                ? `${categoryColors[habit.category]} scale-105 shadow-glow-soft` 
                : "border-muted bg-muted/20 hover:border-primary/30"
            }`}
            onClick={() => onToggleHabit(habit.id)}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{habit.icon}</div>
              <h3 className="font-semibold text-sm text-foreground mb-2">{habit.name}</h3>
              
              <div className="flex items-center justify-center gap-1 text-orange-500">
                <Flame className="w-4 h-4" />
                <span className="text-sm font-bold">{habit.streak}</span>
              </div>
              
              {habit.completed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-xs">✓</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      {habits.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No habits yet! Start building your routine.</p>
          <Button onClick={onAddHabit}>
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Habit
          </Button>
        </div>
      )}
    </div>
  );
};

export default HabitGrid;