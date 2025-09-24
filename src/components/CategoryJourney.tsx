import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Target, TrendingUp } from "lucide-react";

interface CategoryJourneyProps {
  category: 'physical' | 'finance' | 'mental' | 'diet';
  progress: number;
  onTakeAction: () => void;
}

const journeyData = {
  physical: {
    title: "Physical Health Journey",
    description: "Build strength, endurance, and vitality through consistent movement and healthy habits.",
    milestones: [
      { progress: 25, title: "First Steps", desc: "Start moving daily" },
      { progress: 50, title: "Building Habits", desc: "Consistent exercise routine" },
      { progress: 75, title: "Strong Foundation", desc: "Improved fitness level" },
      { progress: 100, title: "Peak Vitality", desc: "Optimal physical health" }
    ],
    color: "text-category-physical",
    gradient: "from-category-physical/20 to-category-physical/5"
  },
  finance: {
    title: "Financial Wellness Journey",
    description: "Take control of your finances through smart budgeting, saving, and investing habits.",
    milestones: [
      { progress: 25, title: "Financial Awareness", desc: "Track your spending" },
      { progress: 50, title: "Smart Budgeting", desc: "Create and follow budget" },
      { progress: 75, title: "Growing Savings", desc: "Build emergency fund" },
      { progress: 100, title: "Financial Freedom", desc: "Secure financial future" }
    ],
    color: "text-category-finance",
    gradient: "from-category-finance/20 to-category-finance/5"
  },
  mental: {
    title: "Mental Wellness Journey",
    description: "Develop emotional resilience, mindfulness, and mental clarity for a balanced life.",
    milestones: [
      { progress: 25, title: "Self Awareness", desc: "Understand your emotions" },
      { progress: 50, title: "Mindful Practices", desc: "Regular meditation" },
      { progress: 75, title: "Emotional Balance", desc: "Manage stress effectively" },
      { progress: 100, title: "Mental Clarity", desc: "Peak cognitive wellness" }
    ],
    color: "text-category-mental",
    gradient: "from-category-mental/20 to-category-mental/5"
  },
  diet: {
    title: "Nutrition Journey",
    description: "Nourish your body with wholesome foods and develop a healthy relationship with eating.",
    milestones: [
      { progress: 25, title: "Mindful Eating", desc: "Understand nutrition basics" },
      { progress: 50, title: "Balanced Meals", desc: "Regular healthy eating" },
      { progress: 75, title: "Sustained Energy", desc: "Optimal meal planning" },
      { progress: 100, title: "Nutritional Mastery", desc: "Perfect food relationship" }
    ],
    color: "text-category-diet",
    gradient: "from-category-diet/20 to-category-diet/5"
  }
};

const CategoryJourney = ({ category, progress, onTakeAction }: CategoryJourneyProps) => {
  const data = journeyData[category];
  const progressPercent = progress * 100;
  
  return (
    <div className="space-y-6">
      {/* Journey Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <h2 className={`text-2xl font-bold ${data.color}`}>
          {data.title}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
          {data.description}
        </p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className={`bg-gradient-to-br ${data.gradient} rounded-2xl p-6 border border-white/10`}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Journey Progress</span>
          <span className={`text-lg font-bold ${data.color}`}>
            {Math.round(progressPercent)}%
          </span>
        </div>
        <Progress value={progressPercent} className="h-3 mb-3" />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <TrendingUp className="w-3 h-3" />
          <span>Keep going to unlock the next milestone!</span>
        </div>
      </motion.div>

      {/* Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Target className="w-5 h-5" />
          Milestones
        </h3>
        
        <div className="space-y-3">
          {data.milestones.map((milestone, index) => {
            const isCompleted = progressPercent >= milestone.progress;
            const isNext = progressPercent < milestone.progress && 
              (index === 0 || progressPercent >= data.milestones[index - 1].progress);
            
            return (
              <motion.div
                key={milestone.progress}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className={`p-4 transition-all duration-300 ${
                  isCompleted 
                    ? `bg-gradient-to-r ${data.gradient} border-current shadow-glow-soft` 
                    : isNext 
                      ? "border-primary/30 bg-primary/5" 
                      : "bg-muted/30"
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? `bg-gradient-to-br ${data.gradient} border-2 border-current` 
                        : isNext 
                          ? "bg-primary/20 border-2 border-primary/50" 
                          : "bg-muted border-2 border-muted-foreground/20"
                    }`}>
                      {isCompleted && <Sparkles className="w-4 h-4 text-primary" />}
                      {isNext && <Target className="w-4 h-4 text-primary" />}
                      {!isCompleted && !isNext && (
                        <span className="text-xs font-bold text-muted-foreground">
                          {milestone.progress}%
                        </span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className={`font-semibold ${
                        isCompleted ? data.color : isNext ? "text-primary" : "text-muted-foreground"
                      }`}>
                        {milestone.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {milestone.desc}
                      </p>
                    </div>
                    
                    {isCompleted && (
                      <div className="text-right">
                        <span className="text-xs font-medium text-green-500">
                          Complete
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Take Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="pt-4"
      >
        <Button
          onClick={onTakeAction}
          variant="action"
          size="lg"
          className="w-full h-14 text-lg font-semibold rounded-2xl"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Take Action for {category.charAt(0).toUpperCase() + category.slice(1)}
        </Button>
      </motion.div>
    </div>
  );
};

export default CategoryJourney;