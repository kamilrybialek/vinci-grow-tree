import { motion } from "framer-motion";
import { Home, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BottomNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'dashboard', icon: Home, label: 'Home' },
  { id: 'checkin', icon: Heart, label: 'Check-in' },
  { id: 'profile', icon: User, label: 'Profile' },
];

const BottomNavigation = ({ currentPage, onNavigate }: BottomNavigationProps) => {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-30"
    >
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <motion.div
              key={item.id}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col h-auto py-2 px-3 space-y-1 ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="w-1 h-1 rounded-full bg-primary"
                  />
                )}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default BottomNavigation;