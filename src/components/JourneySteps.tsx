import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Lock, Play, DollarSign, Target, BookOpen, Banknote } from "lucide-react";

interface JourneyStep {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isUnlocked: boolean;
  dailyTasks: string[];
  milestoneTask: string;
  progress: number;
}

interface JourneyStepsProps {
  journeyType: string;
  onTaskComplete: (stepId: string, taskType: 'daily' | 'milestone') => void;
}

const daveRamseySteps: JourneyStep[] = [
  {
    id: "step1",
    title: "Baby Step 1: Emergency Fund",
    description: "Save $1,000 for your starter emergency fund",
    isCompleted: false,
    isUnlocked: true,
    dailyTasks: [
      "Track every expense today",
      "Find one thing to sell or cut from budget",
      "Add loose change to emergency fund jar"
    ],
    milestoneTask: "Save $1,000 in emergency fund",
    progress: 25
  },
  {
    id: "step2", 
    title: "Baby Step 2: Debt Snowball",
    description: "Pay off all debt except the house using the debt snowball method",
    isCompleted: false,
    isUnlocked: false,
    dailyTasks: [
      "List all debts smallest to largest",
      "Pay minimum on all debts except smallest",
      "Attack smallest debt with everything extra"
    ],
    milestoneTask: "Pay off all non-mortgage debt",
    progress: 0
  },
  {
    id: "step3",
    title: "Baby Step 3: Full Emergency Fund", 
    description: "Save 3-6 months of expenses in a fully funded emergency fund",
    isCompleted: false,
    isUnlocked: false,
    dailyTasks: [
      "Calculate monthly expenses",
      "Automate emergency fund contributions", 
      "Keep emergency fund in separate account"
    ],
    milestoneTask: "Save 3-6 months of expenses",
    progress: 0
  },
  {
    id: "step4",
    title: "Baby Step 4: Retirement",
    description: "Invest 15% of household income for retirement",
    isCompleted: false,
    isUnlocked: false,
    dailyTasks: [
      "Research 401k match options",
      "Open Roth IRA if needed",
      "Increase retirement contribution by 1%"
    ],
    milestoneTask: "Consistently invest 15% for retirement",
    progress: 0
  },
  {
    id: "step5",
    title: "Baby Step 5: Children's College",
    description: "Save for children's college fund",
    isCompleted: false,
    isUnlocked: false,
    dailyTasks: [
      "Research 529 college savings plans",
      "Set up automatic college savings",
      "Review education savings options"
    ],
    milestoneTask: "Establish college savings plan",
    progress: 0
  },
  {
    id: "step6",
    title: "Baby Step 6: Pay Off Mortgage",
    description: "Pay off your home mortgage early",
    isCompleted: false,
    isUnlocked: false,
    dailyTasks: [
      "Make one extra mortgage payment per year",
      "Apply windfalls to mortgage principal",
      "Consider bi-weekly payments"
    ],
    milestoneTask: "Pay off mortgage completely",
    progress: 0
  },
  {
    id: "step7",
    title: "Baby Step 7: Build Wealth",
    description: "Build wealth and give generously",
    isCompleted: false,
    isUnlocked: false,
    dailyTasks: [
      "Invest in growth stock mutual funds",
      "Give generously to causes you believe in",
      "Help others with their financial journey"
    ],
    milestoneTask: "Achieve financial independence",
    progress: 0
  }
];

const JourneySteps = ({ journeyType, onTaskComplete }: JourneyStepsProps) => {
  const [steps, setSteps] = useState<JourneyStep[]>(daveRamseySteps);
  const [completedDailyTasks, setCompletedDailyTasks] = useState<Record<string, boolean>>({});

  const handleDailyTaskToggle = (stepId: string, taskIndex: number) => {
    const taskKey = `${stepId}-${taskIndex}`;
    setCompletedDailyTasks(prev => ({
      ...prev,
      [taskKey]: !prev[taskKey]
    }));
  };

  const handleMilestoneComplete = (stepId: string) => {
    setSteps(prev => prev.map(step => {
      if (step.id === stepId) {
        return { ...step, isCompleted: true, progress: 100 };
      }
      // Unlock next step
      const stepIndex = prev.findIndex(s => s.id === stepId);
      if (stepIndex < prev.length - 1 && step.id === prev[stepIndex + 1].id) {
        return { ...step, isUnlocked: true };
      }
      return step;
    }));
    onTaskComplete(stepId, 'milestone');
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Dave Ramsey's Baby Steps</h2>
        <p className="text-muted-foreground">Transform your financial life step by step</p>
      </div>

      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={`p-6 border-2 transition-colors ${
            step.isCompleted ? 'border-green-500 bg-green-50/50' :
            step.isUnlocked ? 'border-primary' : 'border-muted bg-muted/30'
          }`}>
            <div className="flex items-start space-x-4">
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                step.isCompleted ? 'bg-green-500 border-green-500' :
                step.isUnlocked ? 'bg-primary border-primary' : 'bg-muted border-muted'
              }`}>
                {step.isCompleted ? (
                  <CheckCircle className="w-6 h-6 text-white" />
                ) : step.isUnlocked ? (
                  <DollarSign className="w-6 h-6 text-white" />
                ) : (
                  <Lock className="w-6 h-6 text-muted-foreground" />
                )}
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                  {step.isUnlocked && (
                    <Progress value={step.progress} className="mt-2" />
                  )}
                </div>

                {step.isUnlocked && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        Daily Tasks
                      </h4>
                      <div className="space-y-2">
                        {step.dailyTasks.map((task, taskIndex) => (
                          <label key={taskIndex} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={completedDailyTasks[`${step.id}-${taskIndex}`] || false}
                              onChange={() => handleDailyTaskToggle(step.id, taskIndex)}
                              className="rounded border-primary"
                            />
                            <span className={`text-sm ${
                              completedDailyTasks[`${step.id}-${taskIndex}`] ? 'line-through text-muted-foreground' : ''
                            }`}>
                              {task}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <Banknote className="w-4 h-4 mr-2" />
                        Milestone Goal
                      </h4>
                      <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                        <span className="text-sm font-medium">{step.milestoneTask}</span>
                        {!step.isCompleted && (
                          <Button
                            size="sm"
                            onClick={() => handleMilestoneComplete(step.id)}
                            className="ml-2"
                          >
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default JourneySteps;