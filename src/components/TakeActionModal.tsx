import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, Heart, Brain, DollarSign, Apple, Star } from "lucide-react";

interface TakeActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  primaryFocus: string;
}

const TakeActionModal = ({ isOpen, onClose, onComplete, primaryFocus }: TakeActionModalProps) => {
  const [currentAction, setCurrentAction] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const actions = {
    finance: [
      "Write down today's expenses",
      "Check your bank account balance",
      "Set aside $5 for savings",
      "Review a subscription you pay for",
      "Track one unnecessary purchase",
      "Calculate your weekly coffee budget"
    ],
    physical: [
      "Do 10 jumping jacks",
      "Take a 5-minute walk",
      "Drink a glass of water",
      "Do 5 push-ups",
      "Stretch your neck and shoulders",
      "Take the stairs instead of elevator"
    ],
    mental: [
      "Take 5 deep breaths",
      "Write down 3 things you're grateful for",
      "Meditate for 2 minutes",
      "Call a friend or family member",
      "Listen to a calming song",
      "Write down one positive affirmation"
    ],
    diet: [
      "Eat a piece of fruit",
      "Drink a glass of water",
      "Plan tomorrow's breakfast",
      "Try a new healthy snack",
      "Read a nutrition label",
      "Add vegetables to your next meal"
    ]
  };

  const getRandomAction = () => {
    const allActions = Object.values(actions).flat();
    const focusedActions = actions[primaryFocus as keyof typeof actions] || [];
    
    // 70% chance to get action from primary focus, 30% from any category
    const usesFocus = Math.random() < 0.7;
    const actionPool = usesFocus && focusedActions.length > 0 ? focusedActions : allActions;
    
    return actionPool[Math.floor(Math.random() * actionPool.length)];
  };

  const handleOpenModal = () => {
    setCurrentAction(getRandomAction());
    setIsCompleted(false);
  };

  const handleComplete = () => {
    setIsCompleted(true);
    setTimeout(() => {
      onComplete();
      setCurrentAction(null);
      setIsCompleted(false);
    }, 2000);
  };

  const getCategoryIcon = () => {
    switch (primaryFocus) {
      case 'finance': return DollarSign;
      case 'physical': return Heart;
      case 'mental': return Brain;
      case 'diet': return Apple;
      default: return Star;
    }
  };

  const CategoryIcon = getCategoryIcon();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-card border-none max-w-sm mx-auto rounded-3xl">
        <AnimatePresence mode="wait">
          {!currentAction && (
            <motion.div
              key="generate"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-6 p-6"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="flex justify-center"
              >
                <CategoryIcon className={`w-16 h-16 text-category-${primaryFocus}`} />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold mb-2">Ready for a new challenge?</h3>
                <p className="text-muted-foreground">
                  Let's find a small action to help your tree grow
                </p>
              </div>
              <Button
                onClick={handleOpenModal}
                variant="golden"
                size="lg"
                className="w-full"
              >
                Generate Action
              </Button>
            </motion.div>
          )}

          {currentAction && !isCompleted && (
            <motion.div
              key="action"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-6 p-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex justify-center"
              >
                <div className="p-4 bg-primary/10 rounded-full">
                  <CategoryIcon className={`w-12 h-12 text-category-${primaryFocus}`} />
                </div>
              </motion.div>
              <div>
                <h3 className="text-lg font-bold mb-2">Your Action</h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-foreground font-medium text-lg"
                >
                  {currentAction}
                </motion.p>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={handleComplete}
                  variant="action"
                  size="lg"
                  className="w-full"
                >
                  Mark as Complete
                </Button>
                <Button
                  onClick={() => setCurrentAction(getRandomAction())}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  Try Another Action
                </Button>
              </div>
            </motion.div>
          )}

          {isCompleted && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6 p-6"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="flex justify-center"
              >
                <CheckCircle className="w-20 h-20 text-tree-green" />
              </motion.div>
              <div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-tree-green mb-2"
                >
                  Well done! 🌱
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground"
                >
                  Your tree just grew a little stronger. Keep it up!
                </motion.p>
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="text-6xl"
              >
                ✨
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default TakeActionModal;