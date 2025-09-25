import { motion } from "framer-motion";
import { Star, Zap } from "lucide-react";

interface XPProgressProps {
  currentXP: number;
  level: number;
  xpToNextLevel: number;
  totalXPForLevel: number;
}

const XPProgress = ({ currentXP, level, xpToNextLevel, totalXPForLevel }: XPProgressProps) => {
  const progress = ((totalXPForLevel - xpToNextLevel) / totalXPForLevel) * 100;
  
  return (
    <div className="bg-gradient-card rounded-2xl p-6 border border-primary/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">Level {level}</h3>
            <p className="text-sm text-muted-foreground">Growth Master</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-primary font-semibold">
            <Zap className="w-4 h-4" />
            <span>{currentXP.toLocaleString()}</span>
          </div>
          <p className="text-xs text-muted-foreground">Total XP</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress to Level {level + 1}</span>
          <span className="text-foreground font-medium">{xpToNextLevel} XP to go</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
};

export default XPProgress;