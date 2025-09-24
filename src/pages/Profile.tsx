import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, User, Settings, RotateCcw, Crown } from "lucide-react";

interface ProfileProps {
  userData: {
    name: string;
    weight: string;
    height: string;
    primaryFocus: string;
  };
  onBack: () => void;
  onResetTree: () => void;
}

const Profile = ({ userData, onBack, onResetTree }: ProfileProps) => {
  const getFocusDisplay = (focus: string) => {
    const focusMap = {
      finance: "💰 Finance",
      physical: "❤️ Physical Health",
      mental: "🧠 Mental Health",
      diet: "🍎 Diet & Nutrition"
    };
    return focusMap[focus as keyof typeof focusMap] || focus;
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
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
      </header>

      {/* Main Content */}
      <main className="px-6 space-y-6">
        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-card p-6 shadow-glow-soft border-none">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-golden rounded-full flex items-center justify-center shadow-glow-medium">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{userData.name}</h2>
                <p className="text-muted-foreground">Tree Grower 🌱</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Primary Focus</span>
                <span className="font-medium">{getFocusDisplay(userData.primaryFocus)}</span>
              </div>
              
              {userData.weight && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Weight</span>
                  <span className="font-medium">{userData.weight}</span>
                </div>
              )}
              
              {userData.height && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Height</span>
                  <span className="font-medium">{userData.height}</span>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <Card className="bg-gradient-card p-6 shadow-glow-soft border-none">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Crown className="w-5 h-5 mr-2 text-primary" />
              Your Achievements
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">7</div>
                <div className="text-sm text-muted-foreground">Days Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-tree-green">23</div>
                <div className="text-sm text-muted-foreground">Actions Taken</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-category-finance">4</div>
                <div className="text-sm text-muted-foreground">Growth Areas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">12</div>
                <div className="text-sm text-muted-foreground">Tree Leaves</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-3"
        >
          <Button
            variant="outline"
            className="w-full justify-start h-14 rounded-2xl"
          >
            <Settings className="w-5 h-5 mr-3" />
            <span>App Settings</span>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start h-14 rounded-2xl text-destructive hover:text-destructive"
            onClick={onResetTree}
          >
            <RotateCcw className="w-5 h-5 mr-3" />
            <span>Reset Tree Progress</span>
          </Button>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="pt-8 text-center"
        >
          <p className="text-sm text-muted-foreground mb-2">Vinci4 - Tree of Progress</p>
          <p className="text-xs text-muted-foreground">Version 1.0.0</p>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;