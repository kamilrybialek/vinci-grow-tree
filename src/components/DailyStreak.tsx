import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Flame, Calendar } from "lucide-react";

interface DailyStreakProps {
  currentStreak: number;
  longestStreak: number;
}

const DailyStreak = ({ currentStreak, longestStreak }: DailyStreakProps) => {
  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return "🔥";
    if (streak >= 14) return "⚡";
    if (streak >= 7) return "✨";
    if (streak >= 3) return "🌱";
    return "💫";
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "text-orange-500";
    if (streak >= 14) return "text-yellow-500";
    if (streak >= 7) return "text-green-500";
    if (streak >= 3) return "text-blue-500";
    return "text-purple-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Flame className={`w-5 h-5 ${getStreakColor(currentStreak)}`} />
              <span className="text-2xl">{getStreakEmoji(currentStreak)}</span>
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">
                {currentStreak} day streak
              </p>
              <p className="text-xs text-muted-foreground">
                Personal best: {longestStreak} days
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <Calendar className="w-5 h-5 text-muted-foreground mb-1" />
            <p className="text-xs text-muted-foreground">
              Keep it growing!
            </p>
          </div>
        </div>
        
        {currentStreak > 0 && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <div className="flex gap-1">
              {Array.from({ length: Math.min(currentStreak, 7) }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="w-3 h-3 rounded-full bg-primary/60"
                />
              ))}
              {currentStreak > 7 && (
                <span className="text-xs text-muted-foreground ml-2">
                  +{currentStreak - 7} more
                </span>
              )}
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default DailyStreak;