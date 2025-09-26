import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Target, Calendar, BookOpen, TrendingUp, Settings, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HamburgerMenuProps {
  onNavigate: (section: string) => void;
}

const menuItems = [
  { id: 'goals', icon: Target, label: 'Goals', description: 'Set and track your objectives' },
  { id: 'habits', icon: Calendar, label: 'Habits', description: 'Build lasting routines' },
  { id: 'journal', icon: BookOpen, label: 'Journal', description: 'Daily reflection & insights' },
  { id: 'progress', icon: TrendingUp, label: 'Progress', description: 'View your growth analytics' },
  { id: 'achievements', icon: Award, label: 'Achievements', description: 'Celebrate your wins' },
  { id: 'settings', icon: Settings, label: 'Settings', description: 'Customize your experience' },
];

const HamburgerMenu = ({ onNavigate }: HamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Trigger */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="rounded-full"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-80 bg-background/95 backdrop-blur-md border-r shadow-xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-lg font-semibold">Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto p-4 hover:bg-accent/50"
                      onClick={() => handleNavigate(item.id)}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-6 border-t">
                <div className="text-center text-sm text-muted-foreground">
                  Balance v1.0
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HamburgerMenu;