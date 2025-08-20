import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MiniGame } from '@/types/game';
import { Play, Clock, Coins, Zap, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MiniGameCardProps {
  game: MiniGame;
  onPlay?: (id: string) => void;
}

export const MiniGameCard = ({ game, onPlay }: MiniGameCardProps) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!game.lastPlayed) {
      setTimeLeft(0);
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const lastPlayed = new Date(game.lastPlayed!).getTime();
      const remaining = Math.max(0, game.cooldown - (now - lastPlayed));
      setTimeLeft(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [game.lastPlayed, game.cooldown]);

  const isOnCooldown = timeLeft > 0;
  const cooldownMinutes = Math.ceil(timeLeft / 60000);
  const cooldownProgress = game.lastPlayed 
    ? ((game.cooldown - timeLeft) / game.cooldown) * 100 
    : 100;

  const getDifficultyStars = (difficulty: number) => {
    return '⭐'.repeat(difficulty) + '☆'.repeat(3 - difficulty);
  };

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
      isOnCooldown 
        ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 hover:scale-105 cursor-pointer'
    }`}>
      
      <CardContent className="p-4 space-y-3">
        <div className="text-center">
          <div className={`text-4xl mb-2 p-3 rounded-full inline-block transition-all duration-300 ${
            isOnCooldown ? 'bg-gray-200' : 'bg-white/80 hover:scale-110'
          }`}>
            {game.icon}
          </div>
          <h3 className="font-bold text-gray-800 text-sm">{game.name}</h3>
          <p className="text-xs text-gray-600 mt-1">{game.description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Difficulty</span>
            <span className="font-medium">{getDifficultyStars(game.difficulty)}</span>
          </div>
          
          <div className="bg-white/80 rounded-lg p-2 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1 text-blue-600">
                <Zap className="w-3 h-3" />
                <span>Up to {game.maxReward.xp} XP</span>
              </div>
              <div className="flex items-center space-x-1 text-yellow-600">
                <Coins className="w-3 h-3" />
                <span>Up to {game.maxReward.coins}</span>
              </div>
            </div>
          </div>
        </div>

        {isOnCooldown && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1 text-orange-600">
                <Clock className="w-3 h-3" />
                <span>Cooldown</span>
              </div>
              <span className="font-medium">{cooldownMinutes}m left</span>
            </div>
            <Progress value={cooldownProgress} className="h-2" />
          </div>
        )}

        <div className="flex justify-center">
          {onPlay && (
            <Button
              onClick={() => onPlay(game.id)}
              disabled={isOnCooldown}
              size="sm"
              className={`${
                isOnCooldown
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'
              }`}
            >
              {isOnCooldown ? (
                <>
                  <Clock className="w-3 h-3 mr-1" />
                  {cooldownMinutes}m
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 mr-1" />
                  Play Now
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};