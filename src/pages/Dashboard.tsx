import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import TreeProgress from "@/components/TreeProgress";
import TakeActionModal from "@/components/TakeActionModal";
import CategoryNavigation from "@/components/CategoryNavigation";
import CategoryJourney from "@/components/CategoryJourney";
import { Sparkles, Calendar, User } from "lucide-react";

interface DashboardProps {
  userData: {
    name: string;
    weight: string;
    height: string;
    primaryFocus: string;
  };
  onNavigate: (page: string) => void;
}

const Dashboard = ({ userData, onNavigate }: DashboardProps) => {
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('overview');
  const [treeStage, setTreeStage] = useState<'sprout' | 'growing' | 'flourishing'>('sprout');
  const [categories, setCategories] = useState({
    finance: 0.1,
    physical: 0.15,
    mental: 0.05,
    diet: 0.2
  });

  const handleActionComplete = () => {
    // Simulate tree growth
    const currentProgress = Object.values(categories).reduce((a, b) => a + b, 0) / 4;
    
    // Randomly improve a category
    const categoryKeys = Object.keys(categories) as (keyof typeof categories)[];
    const randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
    
    setCategories(prev => ({
      ...prev,
      [randomCategory]: Math.min(prev[randomCategory] + 0.1, 1)
    }));

    // Update tree stage based on overall progress
    const newProgress = (Object.values(categories).reduce((a, b) => a + b, 0) + 0.1) / 4;
    if (newProgress > 0.7) {
      setTreeStage('flourishing');
    } else if (newProgress > 0.3) {
      setTreeStage('growing');
    }

    setIsActionModalOpen(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const overallProgress = Object.values(categories).reduce((a, b) => a + b, 0) / 4;

  const renderMainContent = () => {
    if (activeCategory === 'overview') {
      return (
        <main className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <TreeProgress stage={treeStage} categories={categories} />
          </motion.div>

          {/* Progress summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gradient-card rounded-2xl p-6 mb-8 w-full max-w-sm shadow-glow-soft"
          >
            <h3 className="text-lg font-semibold mb-4 text-center">Growth Areas</h3>
            <div className="space-y-3">
              {Object.entries(categories).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="capitalize text-sm font-medium">{key}</span>
                  <div className="flex-1 mx-3 bg-muted rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full bg-category-${key}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${value * 100}%` }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    ></motion.div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(value * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Take Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="w-full max-w-sm"
          >
            <Button
              onClick={() => setIsActionModalOpen(true)}
              variant="action"
              size="lg"
              className="w-full h-16 text-lg font-semibold rounded-3xl"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              Take Action
            </Button>
          </motion.div>
        </main>
      );
    }

    // Individual category journey
    return (
      <main className="flex-1 px-6 pb-8">
        <CategoryJourney
          category={activeCategory as 'physical' | 'finance' | 'mental' | 'diet'}
          progress={categories[activeCategory as keyof typeof categories]}
          onTakeAction={() => setIsActionModalOpen(true)}
        />
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {getGreeting()}, {userData.name}!
          </h1>
          <p className="text-muted-foreground">
            {activeCategory === 'overview' 
              ? `Your tree is ${Math.round(overallProgress * 100)}% grown`
              : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} journey progress`
            }
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('checkin')}
            className="rounded-full"
          >
            <Calendar className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('profile')}
            className="rounded-full"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Category Navigation */}
      <CategoryNavigation 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Main Content */}
      {renderMainContent()}

      <TakeActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        onComplete={handleActionComplete}
        primaryFocus={userData.primaryFocus}
      />
    </div>
  );
};

export default Dashboard;