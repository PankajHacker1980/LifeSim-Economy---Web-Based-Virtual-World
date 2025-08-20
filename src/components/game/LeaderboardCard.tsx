import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LeaderboardEntry } from '@/types/game';
import { Crown, Medal, Trophy, Star } from 'lucide-react';

interface LeaderboardCardProps {
  entry: LeaderboardEntry;
  isCurrentPlayer?: boolean;
}

export const LeaderboardCard = ({ entry, isCurrentPlayer }: LeaderboardCardProps) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Trophy className="w-5 h-5 text-amber-600" />;
      default: return <Star className="w-4 h-4 text-gray-400" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-100 to-amber-100 border-yellow-300';
      case 2: return 'from-gray-100 to-slate-100 border-gray-300';
      case 3: return 'from-amber-100 to-orange-100 border-amber-300';
      default: return 'from-white to-gray-50 border-gray-200';
    }
  };

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
      isCurrentPlayer
        ? 'bg-gradient-to-br from-blue-100 to-indigo-100 border-blue-300 ring-2 ring-blue-400'
        : `bg-gradient-to-br ${getRankColor(entry.rank)}`
    } ${entry.rank <= 3 ? 'hover:scale-105' : ''}`}>
      
      {isCurrentPlayer && (
        <div className="absolute top-2 right-2">
          <Badge className="bg-blue-500 text-white">You</Badge>
        </div>
      )}

      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {/* Rank */}
          <div className="flex items-center space-x-2">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              entry.rank <= 3 
                ? 'bg-white/80' 
                : 'bg-gray-100'
            }`}>
              {entry.rank <= 3 ? getRankIcon(entry.rank) : (
                <span className="text-sm font-bold text-gray-600">#{entry.rank}</span>
              )}
            </div>
          </div>

          {/* Player Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">{entry.player.avatar}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 text-sm truncate">
                  {entry.player.username}
                </h3>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <span>Level {entry.player.level}</span>
                  <span>•</span>
                  <span>{entry.region}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Score */}
          <div className="text-right">
            <div className="text-lg font-bold text-gray-800">
              {entry.score.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600">XP</div>
          </div>
        </div>

        {/* Additional Stats for Top 3 */}
        {entry.rank <= 3 && (
          <div className="mt-3 pt-3 border-t border-gray-200/50">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <span className="text-yellow-600">
                  💰 {entry.player.coins.toLocaleString()}
                </span>
                <span className="text-purple-600">
                  💎 {entry.player.gems}
                </span>
              </div>
              <div className="text-gray-600">
                Joined {new Date(entry.player.joinDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};