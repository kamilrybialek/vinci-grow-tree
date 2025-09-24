import { motion } from "framer-motion";

interface TreeProgressProps {
  stage: 'sprout' | 'growing' | 'flourishing';
  categories?: {
    finance: number;
    physical: number;
    mental: number;
    diet: number;
  };
}

const TreeProgress = ({ stage, categories }: TreeProgressProps) => {
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
    <div className="flex items-center justify-center w-full">
      {getTreeContent()}
    </div>
  );
};

export default TreeProgress;