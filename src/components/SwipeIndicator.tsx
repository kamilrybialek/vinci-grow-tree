import { motion } from "framer-motion";

interface SwipeIndicatorProps {
  currentIndex: number;
  totalScreens: number;
  screenNames: string[];
}

const SwipeIndicator = ({ currentIndex, totalScreens, screenNames }: SwipeIndicatorProps) => {
  return (
    <div className="flex flex-col items-center gap-3 py-4">
      {/* Dots indicator */}
      <div className="flex gap-2">
        {Array.from({ length: totalScreens }).map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "w-8 bg-primary shadow-glow-soft" 
                : "w-2 bg-muted-foreground/30"
            }`}
            layout
          />
        ))}
      </div>
      
      {/* Screen name */}
      <motion.p 
        key={currentIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm font-medium text-muted-foreground"
      >
        {screenNames[currentIndex]}
      </motion.p>
      
      {/* Swipe hint */}
      {currentIndex === 0 && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-xs text-muted-foreground/60 animate-pulse"
        >
          Swipe to explore journeys →
        </motion.p>
      )}
    </div>
  );
};

export default SwipeIndicator;