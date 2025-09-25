import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Target, Calendar, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Goal {
  id: string;
  title: string;
  category: 'finance' | 'physical' | 'mental' | 'diet';
  targetDate: string;
  completed: boolean;
  createdAt: string;
}

interface GoalSettingProps {
  onGoalAdded: (goal: Goal) => void;
  goals: Goal[];
  onGoalComplete: (goalId: string) => void;
  onGoalDelete: (goalId: string) => void;
}

const GoalSetting = ({ onGoalAdded, goals, onGoalComplete, onGoalDelete }: GoalSettingProps) => {
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    category: "physical" as const,
    targetDate: ""
  });
  const { toast } = useToast();

  const categories = [
    { key: 'physical', label: 'Physical', color: 'text-category-physical bg-category-physical/10' },
    { key: 'finance', label: 'Finance', color: 'text-category-finance bg-category-finance/10' },
    { key: 'mental', label: 'Mental', color: 'text-category-mental bg-category-mental/10' },
    { key: 'diet', label: 'Diet', color: 'text-category-diet bg-category-diet/10' }
  ];

  const handleAddGoal = () => {
    if (!newGoal.title.trim() || !newGoal.targetDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to create a goal.",
        variant: "destructive"
      });
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title.trim(),
      category: newGoal.category,
      targetDate: newGoal.targetDate,
      completed: false,
      createdAt: new Date().toISOString()
    };

    onGoalAdded(goal);
    setNewGoal({ title: "", category: "physical", targetDate: "" });
    setIsAddingGoal(false);
    
    toast({
      title: "Goal created! 🎯",
      description: "Your new goal has been added to your journey.",
    });
  };

  const activeGoals = goals.filter(g => !g.completed);
  const completedGoals = goals.filter(g => g.completed);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Personal Goals
          </h3>
          <p className="text-sm text-muted-foreground">
            Set specific targets to accelerate your growth
          </p>
        </div>
        <Button
          onClick={() => setIsAddingGoal(true)}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Goal
        </Button>
      </div>

      {/* Add Goal Form */}
      <AnimatePresence>
        {isAddingGoal && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="p-4 space-y-4 bg-gradient-card">
              <div className="space-y-2">
                <Label htmlFor="goal-title">Goal Title</Label>
                <Input
                  id="goal-title"
                  placeholder="e.g., Run 5K without stopping"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Category</Label>
                <div className="flex gap-2">
                  {categories.map(cat => (
                    <Button
                      key={cat.key}
                      variant={newGoal.category === cat.key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewGoal(prev => ({ ...prev, category: cat.key as any }))}
                      className="text-xs"
                    >
                      {cat.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="target-date">Target Date</Label>
                <Input
                  id="target-date"
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, targetDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleAddGoal} size="sm" variant="action">
                  Create Goal
                </Button>
                <Button
                  onClick={() => setIsAddingGoal(false)}
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

      {/* Active Goals */}
      {activeGoals.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-muted-foreground">Active Goals ({activeGoals.length})</h4>
          {activeGoals.map((goal) => {
            const category = categories.find(c => c.key === goal.category);
            const daysLeft = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                layout
              >
                <Card className="p-4 hover:shadow-glow-soft transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h5 className="font-medium">{goal.title}</h5>
                        {category && (
                          <Badge variant="secondary" className={category.color}>
                            {category.label}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {daysLeft > 0 ? `${daysLeft} days left` : daysLeft === 0 ? 'Due today' : `${Math.abs(daysLeft)} days overdue`}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => onGoalComplete(goal.id)}
                        size="sm"
                        variant="outline"
                        className="gap-1"
                      >
                        <CheckCircle className="w-3 h-3" />
                        Complete
                      </Button>
                      <Button
                        onClick={() => onGoalDelete(goal.id)}
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-muted-foreground">Completed Goals ({completedGoals.length})</h4>
          {completedGoals.slice(0, 3).map((goal) => {
            const category = categories.find(c => c.key === goal.category);
            
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layout
              >
                <Card className="p-3 bg-muted/30 border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium line-through text-muted-foreground">
                        {goal.title}
                      </span>
                      {category && (
                        <Badge variant="outline" className="text-xs">
                          {category.label}
                        </Badge>
                      )}
                    </div>
                    <Button
                      onClick={() => onGoalDelete(goal.id)}
                      size="sm"
                      variant="ghost"
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
          {completedGoals.length > 3 && (
            <p className="text-xs text-muted-foreground text-center">
              +{completedGoals.length - 3} more completed goals
            </p>
          )}
        </div>
      )}

      {/* Empty State */}
      {goals.length === 0 && (
        <Card className="p-8 text-center bg-muted/30">
          <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h4 className="font-semibold mb-2">No Goals Set Yet</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Set your first goal to accelerate your growth journey
          </p>
          <Button onClick={() => setIsAddingGoal(true)} variant="action">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Goal
          </Button>
        </Card>
      )}
    </div>
  );
};

export default GoalSetting;