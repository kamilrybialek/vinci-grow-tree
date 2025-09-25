import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target, Award, Calendar, Flame } from "lucide-react";

interface ProgressInsightsProps {
  categories: {
    finance: number;
    physical: number;
    mental: number;
    diet: number;
  };
  streak: number;
  weeklyActions: number;
  completedGoals: number;
}

const ProgressInsights = ({ categories, streak, weeklyActions, completedGoals }: ProgressInsightsProps) => {
  // Calculate insights
  const categoryEntries = Object.entries(categories);
  const bestCategory = categoryEntries.reduce((a, b) => a[1] > b[1] ? a : b);
  const needsAttention = categoryEntries.reduce((a, b) => a[1] < b[1] ? a : b);
  const averageProgress = categoryEntries.reduce((sum, [_, value]) => sum + value, 0) / 4;
  const overallTrend = averageProgress > 0.5 ? 'up' : averageProgress > 0.3 ? 'stable' : 'down';

  const insights = [
    {
      icon: <TrendingUp className="w-5 h-5 text-green-500" />,
      title: "Strongest Area",
      description: `${bestCategory[0].charAt(0).toUpperCase() + bestCategory[0].slice(1)} is your top performing category`,
      value: `${Math.round(bestCategory[1] * 100)}%`,
      trend: "positive"
    },
    {
      icon: <Target className="w-5 h-5 text-orange-500" />,
      title: "Growth Opportunity",
      description: `Focus on ${needsAttention[0]} for balanced development`,
      value: `${Math.round(needsAttention[1] * 100)}%`,
      trend: "attention"
    },
    {
      icon: <Flame className="w-5 h-5 text-red-500" />,
      title: "Current Streak",
      description: `Daily consistency for ${streak} days`,
      value: `${streak} days`,
      trend: streak >= 7 ? "positive" : "neutral"
    },
    {
      icon: <Award className="w-5 h-5 text-purple-500" />,
      title: "Weekly Actions",
      description: "Actions completed this week",
      value: `${weeklyActions}`,
      trend: weeklyActions >= 5 ? "positive" : "neutral"
    }
  ];

  const motivationalMessage = () => {
    if (averageProgress >= 0.8) return "🌟 You're flourishing! Keep up the amazing work!";
    if (averageProgress >= 0.5) return "🌱 Great progress! You're growing strong!";
    if (averageProgress >= 0.3) return "🌿 Building momentum! Stay consistent!";
    return "🌱 Every small step counts! Start your journey today!";
  };

  const categoryData = [
    { name: 'Physical', key: 'physical', value: categories.physical, color: 'text-category-physical' },
    { name: 'Finance', key: 'finance', value: categories.finance, color: 'text-category-finance' },
    { name: 'Mental', key: 'mental', value: categories.mental, color: 'text-category-mental' },
    { name: 'Diet', key: 'diet', value: categories.diet, color: 'text-category-diet' }
  ];

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Card className="p-6 bg-gradient-card">
          <div className="flex items-center justify-center gap-2 mb-4">
            {overallTrend === 'up' && <TrendingUp className="w-6 h-6 text-green-500" />}
            {overallTrend === 'stable' && <Target className="w-6 h-6 text-orange-500" />}
            {overallTrend === 'down' && <TrendingDown className="w-6 h-6 text-red-500" />}
            <h3 className="text-lg font-bold">Overall Progress</h3>
          </div>
          
          <div className="space-y-4">
            <div className="text-3xl font-bold text-primary">
              {Math.round(averageProgress * 100)}%
            </div>
            <Progress value={averageProgress * 100} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {motivationalMessage()}
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Category Progress
          </h4>
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${category.color}`}>
                    {category.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">
                      {Math.round(category.value * 100)}%
                    </span>
                    {category.value === Math.max(...Object.values(categories)) && (
                      <Badge variant="secondary" className="text-xs">
                        Leading
                      </Badge>
                    )}
                  </div>
                </div>
                <Progress value={category.value * 100} className="h-2" />
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Key Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-3"
      >
        {insights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05 }}
          >
            <Card className={`p-4 transition-all hover:shadow-glow-soft ${
              insight.trend === 'positive' ? 'border-green-200' : 
              insight.trend === 'attention' ? 'border-orange-200' : 
              'border-border'
            }`}>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  {insight.icon}
                  <span className="text-lg font-bold text-primary">
                    {insight.value}
                  </span>
                </div>
                <div>
                  <h5 className="font-medium text-sm">{insight.title}</h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-4 bg-muted/30">
          <div className="flex items-center justify-around text-center">
            <div>
              <div className="text-lg font-bold text-primary">{completedGoals}</div>
              <div className="text-xs text-muted-foreground">Goals Completed</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="text-lg font-bold text-primary">{streak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="text-lg font-bold text-primary">
                {Math.round(averageProgress * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">Overall</div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProgressInsights;