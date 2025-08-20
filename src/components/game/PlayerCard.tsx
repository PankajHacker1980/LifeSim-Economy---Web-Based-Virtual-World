import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Player } from '@/types/game';
import { Crown, Coins, Gem, Zap, Calendar } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  onAvatarClick?: () => void;
}

export const PlayerCard = ({ player, onAvatarClick }: PlayerCardProps) => {
  const xpProgress = (player.xp % 100) / 100 * 100;

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 hover:shadow-lg transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10" />
      
      <CardContent className="relative p-6 space-y-4">
        {/* Avatar Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="lg"
            onClick={onAvatarClick}
            className="w-16 h-16 rounded-full text-3xl bg-white/80 hover:bg-white hover:scale-105 transition-all duration-200"
          >
            {player.avatar}
          </Button>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-gray-800">{player.username}</h2>
              <Badge variant="secondary" className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                <Crown className="w-3 h-3 mr-1" />
                Lv.{player.level}
              </Badge>
            </div>
            
            <div className="space-y-2 mt-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">XP Progress</span>
                <span className="font-medium text-gray-800">
                  {player.xp % 100}/{100}
                </span>
              </div>
              <Progress value={xpProgress} className="h-2" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/60 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center space-x-1 text-yellow-600 mb-1">
              <Coins className="w-4 h-4" />
              <span className="text-sm font-medium">Coins</span>
            </div>
            <p className="text-lg font-bold text-gray-800">{player.coins.toLocaleString()}</p>
          </div>
          
          <div className="bg-white/60 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center space-x-1 text-purple-600 mb-1">
              <Gem className="w-4 h-4" />
              <span className="text-sm font-medium">Gems</span>
            </div>
            <p className="text-lg font-bold text-gray-800">{player.gems}</p>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Zap className="w-4 h-4 text-orange-500" />
            <span>Streak: {player.streak} days</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>Since {new Date(player.joinDate).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};