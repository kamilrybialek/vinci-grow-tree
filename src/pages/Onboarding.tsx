import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sprout, Heart, Brain, DollarSign, Apple } from "lucide-react";
import treeSproutImg from "@/assets/tree-sprout.png";

interface OnboardingProps {
  onComplete: (data: {
    name: string;
    weight: string;
    height: string;
    primaryFocus: string;
  }) => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    weight: "",
    height: "",
    primaryFocus: ""
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const focusOptions = [
    { value: "finance", label: "Finance", icon: DollarSign, color: "text-category-finance" },
    { value: "physical", label: "Physical Health", icon: Heart, color: "text-category-physical" },
    { value: "mental", label: "Mental Health", icon: Brain, color: "text-category-mental" },
    { value: "diet", label: "Diet & Nutrition", icon: Apple, color: "text-category-diet" }
  ];

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-gradient-card rounded-3xl p-8 shadow-glow-soft">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-6"
            >
              <div className="flex justify-center">
                <Sprout className="w-16 h-16 text-tree-green animate-float" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to Vinci4</h1>
                <p className="text-muted-foreground">Let's plant your tree of growth and begin your journey</p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">What's your name?</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="mt-1"
                  />
                </div>
              </div>
              <Button
                onClick={handleNext}
                disabled={!formData.name.trim()}
                variant="golden"
                size="lg"
                className="w-full"
              >
                Continue
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground mb-2">Tell us about yourself</h2>
                <p className="text-muted-foreground">This helps us personalize your experience</p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="weight" className="text-sm font-medium">Weight (optional)</Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="e.g., 70 kg"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="height" className="text-sm font-medium">Height (optional)</Label>
                  <Input
                    id="height"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    placeholder="e.g., 175 cm"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleBack} variant="outline" size="lg" className="flex-1">
                  Back
                </Button>
                <Button onClick={handleNext} variant="golden" size="lg" className="flex-1">
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground mb-2">Choose your primary focus</h2>
                <p className="text-muted-foreground">Which area would you like to improve first?</p>
              </div>
              <RadioGroup
                value={formData.primaryFocus}
                onValueChange={(value) => setFormData({ ...formData, primaryFocus: value })}
                className="space-y-3"
              >
                {focusOptions.map((option) => (
                  <motion.div
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Label
                      htmlFor={option.value}
                      className="flex items-center space-x-3 p-4 rounded-2xl border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <option.icon className={`w-6 h-6 ${option.color}`} />
                      <span className="font-medium">{option.label}</span>
                    </Label>
                  </motion.div>
                ))}
              </RadioGroup>
              <div className="flex gap-3">
                <Button onClick={handleBack} variant="outline" size="lg" className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!formData.primaryFocus}
                  variant="golden"
                  size="lg"
                  className="flex-1"
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center space-y-6"
            >
              <div className="flex justify-center">
                <motion.img
                  src={treeSproutImg}
                  alt="Tree sprout"
                  className="w-32 h-32"
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Your tree is planted! 🌱</h2>
                <p className="text-muted-foreground">
                  Welcome {formData.name}! Your journey begins now. Each action you take will help your tree grow stronger.
                </p>
              </div>
              <Button
                onClick={handleNext}
                variant="action"
                size="lg"
                className="w-full"
              >
                Begin My Journey
              </Button>
            </motion.div>
          )}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i <= step ? 'bg-primary' : 'bg-muted'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;