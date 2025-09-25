import { motion } from "framer-motion";
import { Check, Lock, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JourneyStep {
  id: string;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
  locked: boolean;
  current?: boolean;
}

interface JourneyPathProps {
  category: 'physical' | 'mental' | 'finance' | 'nutrition';
  steps: JourneyStep[];
  onStepClick: (stepId: string) => void;
}

const categoryConfig = {
  physical: {
    title: "Fitness Mastery",
    color: "category-physical",
    gradient: "from-category-physical to-category-physical/70"
  },
  mental: {
    title: "Mind Expansion", 
    color: "category-mental",
    gradient: "from-category-mental to-category-mental/70"
  },
  finance: {
    title: "Wealth Building",
    color: "category-finance", 
    gradient: "from-category-finance to-category-finance/70"
  },
  nutrition: {
    title: "Nutrition Optimization",
    color: "category-diet",
    gradient: "from-category-diet to-category-diet/70"
  }
};

const JourneyPath = ({ category, steps, onStepClick }: JourneyPathProps) => {
  const config = categoryConfig[category];
  
  return (
    <div className="space-y-6">
      <div className={`bg-gradient-to-r ${config.gradient} rounded-2xl p-6 text-white`}>
        <h2 className="text-2xl font-bold mb-2">{config.title}</h2>
        <p className="text-white/90">Your personalized journey to mastery</p>
        <div className="mt-4 flex items-center gap-4">
          <div className="text-sm">
            <span className="font-semibold">{steps.filter(s => s.completed).length}</span>
            <span className="opacity-75"> / {steps.length} completed</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-gradient-card rounded-xl p-4 border-2 transition-all ${
              step.current ? 'border-primary shadow-glow-soft' : 
              step.completed ? 'border-green-500/30' :
              step.locked ? 'border-muted opacity-60' : 'border-transparent hover:border-primary/30'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                step.completed ? 'bg-green-500' :
                step.current ? 'bg-primary' :
                step.locked ? 'bg-muted' : 'bg-muted'
              }`}>
                {step.completed ? (
                  <Check className="w-6 h-6 text-white" />
                ) : step.locked ? (
                  <Lock className="w-6 h-6 text-muted-foreground" />
                ) : (
                  <Play className="w-6 h-6 text-white" />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    +{step.xp} XP
                  </span>
                  {step.current && (
                    <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full">
                      Current
                    </span>
                  )}
                </div>
              </div>
              
              {!step.locked && (
                <Button
                  variant={step.completed ? "secondary" : "default"}
                  size="sm"
                  onClick={() => onStepClick(step.id)}
                  className="shrink-0"
                >
                  {step.completed ? "Review" : step.current ? "Continue" : "Start"}
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JourneyPath;