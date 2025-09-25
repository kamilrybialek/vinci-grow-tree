import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface TreeProgressProps {
  stage: 'sprout' | 'growing' | 'flourishing';
  categories?: {
    finance: number;
    physical: number;
    mental: number;
    diet: number;
  };
  overallProgress?: number;
}

const TreeProgress = ({ stage, categories, overallProgress = 0 }: TreeProgressProps) => {
  const getTreeContent = () => {
    switch (stage) {
      case 'sprout':
        return (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex items-center justify-center h-64 w-64"
          >
            <div className="w-16 h-20 bg-tree-trunk rounded-b-full"></div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute top-8 w-8 h-8 bg-tree-green rounded-full shadow-tree-glow"
            ></motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute top-6 left-8 w-6 h-6 bg-tree-green rounded-full shadow-tree-glow"
            ></motion.div>
          </motion.div>
        );
      
      case 'growing':
        return (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex flex-col items-center h-80 w-64"
          >
            {/* Trunk */}
            <div className="w-20 h-32 bg-tree-trunk rounded-b-full"></div>
            
            {/* Branches */}
            <div className="absolute top-16 w-full h-full">
              {/* Finance branch */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: categories?.finance || 0.3 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="absolute left-4 top-4 h-3 bg-category-finance rounded-full origin-left"
                style={{ width: `${(categories?.finance || 0.3) * 60}px` }}
              ></motion.div>
              
              {/* Physical branch */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: categories?.physical || 0.4 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute right-4 top-8 h-3 bg-category-physical rounded-full origin-right"
                style={{ width: `${(categories?.physical || 0.4) * 50}px` }}
              ></motion.div>
              
              {/* Mental branch */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: categories?.mental || 0.2 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="absolute left-6 top-16 h-3 bg-category-mental rounded-full origin-left"
                style={{ width: `${(categories?.mental || 0.2) * 45}px` }}
              ></motion.div>
              
              {/* Diet branch */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: categories?.diet || 0.5 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="absolute right-6 top-20 h-3 bg-category-diet rounded-full origin-right"
                style={{ width: `${(categories?.diet || 0.5) * 55}px` }}
              ></motion.div>
            </div>
            
            {/* Leaves */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.6 }}
                className="absolute w-4 h-4 bg-tree-green rounded-full shadow-tree-glow animate-leaf-appear"
                style={{
                  top: `${20 + Math.random() * 40}%`,
                  left: `${30 + Math.random() * 40}%`,
                }}
              ></motion.div>
            ))}
          </motion.div>
        );
      
      case 'flourishing':
        return (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative flex flex-col items-center h-96 w-80 animate-glow-pulse"
          >
            {/* Large trunk */}
            <div className="w-24 h-40 bg-tree-trunk rounded-b-full shadow-tree-glow"></div>
            
            {/* Major branches */}
            <div className="absolute top-12 w-full h-full">
              {/* Finance branch - fully grown */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                className="absolute left-2 top-8 h-4 w-20 bg-category-finance rounded-full shadow-glow-soft"
              ></motion.div>
              
              {/* Physical branch */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="absolute right-2 top-12 h-4 w-24 bg-category-physical rounded-full shadow-glow-soft"
              ></motion.div>
              
              {/* Mental branch */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="absolute left-4 top-20 h-4 w-18 bg-category-mental rounded-full shadow-glow-soft"
              ></motion.div>
              
              {/* Diet branch */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute right-4 top-24 h-4 w-22 bg-category-diet rounded-full shadow-glow-soft"
              ></motion.div>
            </div>
            
            {/* Many leaves and blossoms */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1 + i * 0.05, duration: 0.6 }}
                className={`absolute w-3 h-3 rounded-full shadow-tree-glow animate-leaf-appear ${
                  i % 4 === 0 ? 'bg-primary-glow' : 'bg-tree-green'
                }`}
                style={{
                  top: `${15 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                }}
              ></motion.div>
            ))}
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-6">
      {/* Overall Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Growth Progress</span>
          <span className="text-lg font-bold text-primary">
            {Math.round(overallProgress * 100)}%
          </span>
        </div>
        <Progress 
          value={overallProgress * 100} 
          className="h-4 bg-muted/50"
        />
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>Sprout</span>
          <span>Growing</span>
          <span>Flourishing</span>
        </div>
      </motion.div>

      {/* Tree Visualization */}
      <div className="relative">
        {getTreeContent()}
        
        {/* Category Progress Rings */}
        {categories && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2"
          >
            {Object.entries(categories).map(([key, value]) => (
              <div key={key} className="flex flex-col items-center">
                <div className="relative w-8 h-8">
                  <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-muted/30"
                    />
                    <motion.circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className={`text-category-${key}`}
                      strokeDasharray={`${2 * Math.PI * 14}`}
                      strokeDashoffset={`${2 * Math.PI * 14 * (1 - value)}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 14 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 14 * (1 - value) }}
                      transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
                    />
                  </svg>
                </div>
                <span className="text-xs text-muted-foreground capitalize mt-1">
                  {key.slice(0, 3)}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TreeProgress;