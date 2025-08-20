import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Achievement } from '@/types/game';
import { Lock, Trophy, Coins, Gem, Zap } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
  onClaim?: (id: string) => void;
}

export const AchievementCard = ({ achievement, onClaim }: AchievementCardProps) => {
  const isCompleted = achievement.progress >= achievement.maxProgress;
  const canClaim = isCompleted && !achievement.unlocked;
  const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
      achievement.unlocked 
        ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200' 
        : canClaim
        ? 'bg-gradient-to-br from-yellow-50 to-amber-100 border-yellow-200 hover:scale-105'
        : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
    }`}>
      {achievement.unlocked && (
        <div className="absolute top-2 right-2">
          <Badge className="bg-green-500 text-white">
            <Trophy className="w-3 h-3 mr-1" />
            Unlocked
          </Badge>
        </div>
      )}

      <CardContent className="p-4 space-y-3">
        <div className="flex items-start space-x-3">
          <div className={`text-3xl p-2 rounded-lg ${
            achievement.unlocked
              ? 'bg-green-200'
              : canClaim
              ? 'bg-yellow-200 animate-pulse'
              : 'bg-gray-200'
          }`}>
            {achievement.unlocked ? '🏆' : achievement.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-800 text-sm">{achievement.title}</h3>
            <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
          </div>
        </div>

        {!achievement.unlocked && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">
                {achievement.progress}/{achievement.maxProgress}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs">
            <div className="flex items-center space-x-1 text-blue-600">
              <Zap className="w-3 h-3" />
              <span>{achievement.reward.xp} XP</span>
            </div>
            <div className="flex items-center space-x-1 text-yellow-600">
              <Coins className="w-3 h-3" />
              <span>{achievement.reward.coins}</span>
            </div>
            {achievement.reward.gems && (
              <div className="flex items-center space-x-1 text-purple-600">
                <Gem className="w-3 h-3" />
                <span>{achievement.reward.gems}</span>
              </div>
            )}
          </div>

          {canClaim && onClaim && (
            <Button
              size="sm"
              onClick={() => onClaim(achievement.id)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white animate-pulse"
            >
              Claim!
            </Button>
          )}
        </div>

        {!achievement.unlocked && !canClaim && (
          <div className="flex items-center justify-center text-xs text-gray-500">
            <Lock className="w-3 h-3 mr-1" />
            <span>Keep playing to unlock!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};