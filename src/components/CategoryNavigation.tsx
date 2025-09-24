import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, DollarSign, Brain, Apple } from "lucide-react";

interface CategoryNavigationProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'overview', label: 'Overview', icon: Heart },
  { id: 'physical', label: 'Health', icon: Heart },
  { id: 'finance', label: 'Finance', icon: DollarSign },
  { id: 'mental', label: 'Mental', icon: Brain },
  { id: 'diet', label: 'Diet', icon: Apple },
];

const CategoryNavigation = ({ activeCategory, onCategoryChange }: CategoryNavigationProps) => {
  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-2 mx-6 mb-6">
      <div className="flex gap-1 overflow-x-auto">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <motion.div
              key={category.id}
              whileTap={{ scale: 0.95 }}
              className="relative flex-shrink-0"
            >
              <Button
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onCategoryChange(category.id)}
                className={`h-12 px-4 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-glow-soft" 
                    : "hover:bg-muted/50"
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">{category.label}</span>
              </Button>
              
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryNavigation;