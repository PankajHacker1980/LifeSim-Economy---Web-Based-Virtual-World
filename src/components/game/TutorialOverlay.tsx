import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { X, ArrowRight, ArrowLeft, Star, Target, ShoppingCart, Gamepad2 } from 'lucide-react';

interface TutorialOverlayProps {
  currentStep: number;
  onNext: () => void;
  onSkip: () => void;
  totalSteps?: number;
}

const tutorialSteps = [
  {
    title: "Welcome to LifeSim Economy!",
    content: "Ready to build your virtual empire? Let's show you around!",
    icon: <Star className="w-8 h-8 text-yellow-500" />,
    highlight: "dashboard"
  },
  {
    title: "Your Player Dashboard",
    content: "Here you can see your avatar, level, XP, coins, and gems. Click your avatar to customize it!",
    icon: <Target className="w-8 h-8 text-blue-500" />,
    highlight: "player-card"
  },
  {
    title: "Complete Tasks & Achievements",
    content: "Earn XP and coins by completing daily tasks and unlocking achievements!",
    icon: <Target className="w-8 h-8 text-green-500" />,
    highlight: "tasks"
  },
  {
    title: "Visit the Store",
    content: "Spend your coins and gems on avatar items, properties, and skill upgrades!",
    icon: <ShoppingCart className="w-8 h-8 text-purple-500" />,
    highlight: "store"
  },
  {
    title: "Play Mini-Games",
    content: "Have fun and earn rewards by playing our exciting mini-games!",
    icon: <Gamepad2 className="w-8 h-8 text-orange-500" />,
    highlight: "games"
  },
  {
    title: "Compete on Leaderboards",
    content: "See how you rank against other players globally and in your region!",
    icon: <Star className="w-8 h-8 text-red-500" />,
    highlight: "leaderboard"
  }
];

export const TutorialOverlay = ({ currentStep, onNext, onSkip, totalSteps = 6 }: TutorialOverlayProps) => {
  const step = tutorialSteps[currentStep] || tutorialSteps[0];
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const isLastStep = currentStep >= totalSteps - 1;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
        <CardHeader className="text-center space-y-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSkip}
            className="absolute top-2 right-2 w-8 h-8 p-0 hover:bg-red-100"
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="flex justify-center">
            {step.icon}
          </div>
          
          <CardTitle className="text-xl font-bold text-gray-800">
            {step.title}
          </CardTitle>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{currentStep + 1}/{totalSteps}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p className="text-gray-700 text-center leading-relaxed">
            {step.content}
          </p>
          
          <div className="flex justify-between space-x-3">
            <Button
              variant="outline"
              onClick={onSkip}
              className="flex-1"
            >
              Skip Tutorial
            </Button>
            
            <Button
              onClick={onNext}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
            >
              {isLastStep ? (
                <>
                  Start Playing!
                  <Star className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
          
          {!isLastStep && (
            <div className="text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={onNext}
                className="text-blue-600 hover:text-blue-700"
              >
                Continue Tour →
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};