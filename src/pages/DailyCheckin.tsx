import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Smile, Zap, Brain } from "lucide-react";

interface DailyCheckinProps {
  onBack: () => void;
  onComplete: (data: { mood: number; energy: number; stress: number }) => void;
}

const DailyCheckin = ({ onBack, onComplete }: DailyCheckinProps) => {
  const [mood, setMood] = useState([50]);
  const [energy, setEnergy] = useState([50]);
  const [stress, setStress] = useState([50]);

  const handleSubmit = () => {
    onComplete({
      mood: mood[0],
      energy: energy[0],
      stress: stress[0]
    });
  };

  const getMoodEmoji = (value: number) => {
    if (value < 20) return "😢";
    if (value < 40) return "😟";
    if (value < 60) return "😐";
    if (value < 80) return "😊";
    return "😄";
  };

  const getEnergyColor = (value: number) => {
    if (value < 30) return "text-red-500";
    if (value < 70) return "text-yellow-500";
    return "text-green-500";
  };

  const getStressColor = (value: number) => {
    if (value < 30) return "text-green-500";
    if (value < 70) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="flex items-center p-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="rounded-full mr-3"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Daily Check-in</h1>
      </header>

      {/* Main Content */}
      <main className="px-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-xl font-semibold mb-2">How are you feeling today?</h2>
          <p className="text-muted-foreground">
            A quick check-in helps your tree understand your progress
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Mood Slider */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="bg-gradient-card rounded-2xl p-6 shadow-glow-soft"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Smile className="w-6 h-6 text-category-mental" />
                <span className="font-semibold">Mood</span>
              </div>
              <span className="text-2xl">{getMoodEmoji(mood[0])}</span>
            </div>
            <Slider
              value={mood}
              onValueChange={setMood}
              max={100}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low</span>
              <span>High</span>
            </div>
          </motion.div>

          {/* Energy Slider */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-gradient-card rounded-2xl p-6 shadow-glow-soft"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Zap className={`w-6 h-6 ${getEnergyColor(energy[0])}`} />
                <span className="font-semibold">Energy</span>
              </div>
              <span className="text-lg font-bold">{energy[0]}%</span>
            </div>
            <Slider
              value={energy}
              onValueChange={setEnergy}
              max={100}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Drained</span>
              <span>Energized</span>
            </div>
          </motion.div>

          {/* Stress Slider */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gradient-card rounded-2xl p-6 shadow-glow-soft"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Brain className={`w-6 h-6 ${getStressColor(stress[0])}`} />
                <span className="font-semibold">Stress</span>
              </div>
              <span className="text-lg font-bold">{stress[0]}%</span>
            </div>
            <Slider
              value={stress}
              onValueChange={setStress}
              max={100}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Calm</span>
              <span>Stressed</span>
            </div>
          </motion.div>
        </div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="pt-8 pb-8"
        >
          <Button
            onClick={handleSubmit}
            variant="action"
            size="lg"
            className="w-full h-14 text-lg font-semibold"
          >
            Complete Check-in
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default DailyCheckin;