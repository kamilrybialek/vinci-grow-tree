import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Brain, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Reflection {
  mood: number;
  energy: number;
  gratitude: string;
  wins: string;
  challenges: string;
  tomorrow: string;
}

interface ReflectionJournalProps {
  onSaveReflection: (reflection: Reflection) => void;
}

const moodEmojis = ["😢", "😕", "😐", "😊", "😁"];
const energyLevels = ["🪫", "🔋", "🔋🔋", "🔋🔋🔋", "⚡"];

const ReflectionJournal = ({ onSaveReflection }: ReflectionJournalProps) => {
  const [reflection, setReflection] = useState<Reflection>({
    mood: 3,
    energy: 3,
    gratitude: "",
    wins: "",
    challenges: "",
    tomorrow: ""
  });

  const handleSave = () => {
    onSaveReflection(reflection);
    // Reset form
    setReflection({
      mood: 3,
      energy: 3,
      gratitude: "",
      wins: "",
      challenges: "",
      tomorrow: ""
    });
  };

  const isComplete = reflection.gratitude.trim() && reflection.wins.trim();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Daily Reflection</h2>
        <p className="text-muted-foreground">Take a moment to reflect on your day and set intentions</p>
      </div>
      
      <div className="space-y-6">
        {/* Mood & Energy */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold">How was your mood?</h3>
            </div>
            <div className="flex justify-between">
              {moodEmojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => setReflection(prev => ({ ...prev, mood: index + 1 }))}
                  className={`text-2xl p-2 rounded-full transition-all ${
                    reflection.mood === index + 1 ? 'bg-primary/20 scale-110' : 'hover:scale-105'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h3 className="font-semibold">Energy level?</h3>
            </div>
            <div className="flex justify-between">
              {energyLevels.map((level, index) => (
                <button
                  key={index}
                  onClick={() => setReflection(prev => ({ ...prev, energy: index + 1 }))}
                  className={`text-xl p-2 rounded-full transition-all ${
                    reflection.energy === index + 1 ? 'bg-primary/20 scale-110' : 'hover:scale-105'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Gratitude */}
        <div className="bg-gradient-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold">What are you grateful for today?</h3>
          </div>
          <Textarea
            placeholder="Write about 3 things that made you grateful today..."
            value={reflection.gratitude}
            onChange={(e) => setReflection(prev => ({ ...prev, gratitude: e.target.value }))}
            className="min-h-[80px] resize-none"
          />
        </div>
        
        {/* Wins */}
        <div className="bg-gradient-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold">What were your wins today?</h3>
          </div>
          <Textarea
            placeholder="Celebrate your progress, no matter how small..."
            value={reflection.wins}
            onChange={(e) => setReflection(prev => ({ ...prev, wins: e.target.value }))}
            className="min-h-[80px] resize-none"
          />
        </div>
        
        {/* Challenges */}
        <div className="bg-gradient-card rounded-xl p-4">
          <h3 className="font-semibold mb-3">What challenged you?</h3>
          <Textarea
            placeholder="What obstacles did you face and how did you handle them?"
            value={reflection.challenges}
            onChange={(e) => setReflection(prev => ({ ...prev, challenges: e.target.value }))}
            className="min-h-[60px] resize-none"
          />
        </div>
        
        {/* Tomorrow */}
        <div className="bg-gradient-card rounded-xl p-4">
          <h3 className="font-semibold mb-3">One intention for tomorrow</h3>
          <Textarea
            placeholder="What's one thing you want to focus on tomorrow?"
            value={reflection.tomorrow}
            onChange={(e) => setReflection(prev => ({ ...prev, tomorrow: e.target.value }))}
            className="min-h-[60px] resize-none"
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            onClick={handleSave}
            disabled={!isComplete}
            className="w-full h-12 text-lg font-semibold"
            variant={isComplete ? "default" : "secondary"}
          >
            Save Reflection & Earn 50 XP
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ReflectionJournal;