import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Clock } from "lucide-react";

interface WeeklyChallengeProps {
  title: string;
  description: string;
  progress: number;
  target: number;
  timeLeft: string;
  onJoin: () => void;
}

const WeeklyChallenge = ({ 
  title, 
  description, 
  progress, 
  target, 
  timeLeft, 
  onJoin 
}: WeeklyChallengeProps) => {
  const progressPercent = (progress / target) * 100;
  const isComplete = progress >= target;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-secondary/20 to-primary/10 border-secondary/30 p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-secondary" />
            <h3 className="font-semibold text-foreground">Weekly Challenge</h3>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{timeLeft}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-sm text-foreground mb-1">{title}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <Target className="w-3 h-3" />
                <span>Progress</span>
              </div>
              <span className="font-medium">
                {progress}/{target}
              </span>
            </div>
            
            <Progress value={progressPercent} className="h-2" />
            
            {isComplete ? (
              <div className="flex items-center gap-2 text-green-500 text-xs font-medium">
                <Trophy className="w-3 h-3" />
                <span>Challenge Complete! 🎉</span>
              </div>
            ) : (
              <Button
                onClick={onJoin}
                variant="secondary"
                size="sm"
                className="w-full h-8 text-xs font-medium rounded-lg"
              >
                Continue Challenge
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default WeeklyChallenge;