import { motion } from "framer-motion";
import { Target, Calendar, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'physical' | 'mental' | 'finance' | 'nutrition';
  progress: number;
  target: number;
  unit: string;
  deadline: string;
  milestones: { value: number; completed: boolean; reward: string }[];
}

interface GoalTrackerProps {
  goals: Goal[];
  onAddGoal: () => void;
  onUpdateProgress: (goalId: string, progress: number) => void;
}

const categoryConfig = {
  physical: { color: "text-category-physical", bg: "bg-category-physical/10" },
  mental: { color: "text-category-mental", bg: "bg-category-mental/10" },
  finance: { color: "text-category-finance", bg: "bg-category-finance/10" },
  nutrition: { color: "text-category-diet", bg: "bg-category-diet/10" }
};

const GoalTracker = ({ goals, onAddGoal, onUpdateProgress }: GoalTrackerProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Your Goals</h2>
          <p className="text-muted-foreground">Track your progress towards meaningful objectives</p>
        </div>
        <Button onClick={onAddGoal} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Goal
        </Button>
      </div>
      
      <div className="space-y-4">
        {goals.map((goal, index) => {
          const progressPercentage = (goal.progress / goal.target) * 100;
          const config = categoryConfig[goal.category];
          const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-card rounded-2xl p-6 border border-primary/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className={`w-5 h-5 ${config.color}`} />
                    <h3 className="font-semibold text-foreground">{goal.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color} ${config.bg}`}>
                      {goal.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {goal.progress} / {goal.target} {goal.unit}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span>{Math.round(progressPercentage)}% complete</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}</span>
                    </div>
                  </div>
                </div>
                
                {/* Milestones */}
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Milestones
                  </h4>
                  <div className="flex gap-2 overflow-x-auto">
                    {goal.milestones.map((milestone, idx) => (
                      <div
                        key={idx}
                        className={`flex-shrink-0 p-2 rounded-lg border text-xs ${
                          milestone.completed
                            ? 'bg-green-500/10 border-green-500/30 text-green-500'
                            : goal.progress >= milestone.value
                            ? 'bg-primary/10 border-primary/30 text-primary'
                            : 'bg-muted border-muted-foreground/20 text-muted-foreground'
                        }`}
                      >
                        <div className="font-medium">{milestone.value} {goal.unit}</div>
                        <div className="opacity-75">{milestone.reward}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateProgress(goal.id, Math.min(goal.progress + 1, goal.target))}
                  className="w-full"
                  disabled={goal.progress >= goal.target}
                >
                  {goal.progress >= goal.target ? 'Goal Completed! 🎉' : 'Update Progress'}
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {goals.length === 0 && (
        <div className="text-center py-12">
          <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No goals yet</h3>
          <p className="text-muted-foreground mb-4">Set your first goal and start your transformation journey</p>
          <Button onClick={onAddGoal}>
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Goal
          </Button>
        </div>
      )}
    </div>
  );
};

export default GoalTracker;