import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StoreItem } from '@/types/game';
import { Coins, Gem, ShoppingCart, CheckCircle, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface StoreCardProps {
  item: StoreItem;
  onPurchase?: (id: string) => void;
  playerCoins: number;
  playerGems: number;
}

export const StoreCard = ({ item, onPurchase, playerCoins, playerGems }: StoreCardProps) => {
  const canAfford = item.currency === 'coins' 
    ? playerCoins >= item.price 
    : playerGems >= item.price;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'shadow-lg shadow-yellow-500/50';
      case 'epic': return 'shadow-lg shadow-purple-500/50';
      case 'rare': return 'shadow-lg shadow-blue-500/50';
      default: return '';
    }
  };

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 ${
      item.owned 
        ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200' 
        : canAfford
        ? 'bg-gradient-to-br from-white to-gray-50 border-gray-200 cursor-pointer'
        : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300 opacity-75'
    } ${getRarityGlow(item.rarity)}`}>
      
      {item.owned && (
        <div className="absolute top-2 right-2 z-10">
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            Owned
          </Badge>
        </div>
      )}

      <div className="absolute top-2 left-2 z-10">
        <Badge 
          variant="secondary" 
          className={`text-white text-xs ${getRarityColor(item.rarity)}`}
        >
          {item.rarity}
        </Badge>
      </div>

      <CardContent className="p-4 space-y-3 pt-8">
        <div className="text-center">
          <div className="text-4xl mb-2 p-3 bg-white/80 rounded-full inline-block">
            {item.icon}
          </div>
          <h3 className="font-bold text-gray-800 text-sm">{item.name}</h3>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.description}</p>
        </div>

        {item.effect && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
            <div className="flex items-center space-x-1 text-xs text-blue-700">
              <Info className="w-3 h-3" />
              <span className="font-medium">Effect:</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">{item.effect}</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {item.currency === 'coins' ? (
              <div className="flex items-center space-x-1 text-yellow-600">
                <Coins className="w-4 h-4" />
                <span className="font-bold">{item.price}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-purple-600">
                <Gem className="w-4 h-4" />
                <span className="font-bold">{item.price}</span>
              </div>
            )}
          </div>

          {!item.owned && onPurchase && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  onClick={() => onPurchase(item.id)}
                  disabled={!canAfford}
                  className={`${
                    canAfford
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Buy
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {canAfford ? 'Purchase this item' : `Need ${item.price} ${item.currency}`}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardContent>
    </Card>
  );
};