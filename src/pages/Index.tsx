import { useState, useEffect } from "react";
import Onboarding from "./Onboarding";
import Dashboard from "./Dashboard";
import DailyCheckin from "./DailyCheckin";
import Profile from "./Profile";
import { toast } from "@/hooks/use-toast";

type Page = 'onboarding' | 'dashboard' | 'checkin' | 'profile';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>('onboarding');
  const [userData, setUserData] = useState<{
    name: string;
    weight: string;
    height: string;
    primaryFocus: string;
  } | null>(null);

  // Load user data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('vinci4-user-data');
    if (saved) {
      setUserData(JSON.parse(saved));
      setCurrentPage('dashboard');
    }
  }, []);

  const handleOnboardingComplete = (data: {
    name: string;
    weight: string;
    height: string;
    primaryFocus: string;
  }) => {
    setUserData(data);
    localStorage.setItem('vinci4-user-data', JSON.stringify(data));
    setCurrentPage('dashboard');
    toast({
      title: "Welcome to Vinci4! 🌱",
      description: "Your journey of growth begins now.",
    });
  };

  const handleCheckinComplete = (checkinData: {
    mood: number;
    energy: number;
    stress: number;
  }) => {
    setCurrentPage('dashboard');
    toast({
      title: "Check-in complete! ✨",
      description: "Your tree appreciates the update.",
    });
  };

  const handleResetTree = () => {
    localStorage.removeItem('vinci4-user-data');
    setUserData(null);
    setCurrentPage('onboarding');
    toast({
      title: "Tree reset 🌱",
      description: "Starting fresh with a new sprout.",
    });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      
      case 'dashboard':
        return userData ? (
          <Dashboard 
            userData={userData} 
            onNavigate={(page: string) => setCurrentPage(page as Page)}
          />
        ) : null;
      
      case 'checkin':
        return (
          <DailyCheckin 
            onBack={() => setCurrentPage('dashboard')}
            onComplete={handleCheckinComplete}
          />
        );
      
      case 'profile':
        return userData ? (
          <Profile 
            userData={userData}
            onBack={() => setCurrentPage('dashboard')}
            onResetTree={handleResetTree}
          />
        ) : null;
      
      default:
        return null;
    }
  };

  return renderCurrentPage();
};

export default Index;
