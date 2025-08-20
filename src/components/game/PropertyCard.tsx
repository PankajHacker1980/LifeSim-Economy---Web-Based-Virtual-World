import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Property } from '@/types/game';
import { Home, Building, Car, TrendingUp, Coins, Lock } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onUpgrade?: (id: string) => void;
  playerCoins: number;
}

export const PropertyCard = ({ property, onUpgrade, playerCoins }: PropertyCardProps) => {
  const canUpgrade = property.owned && playerCoins >= property.upgradePrice;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'house': return <Home className="w-5 h-5" />;
      case 'business': return <Building className="w-5 h-5" />;
      case 'vehicle': return <Car className="w-5 h-5" />;
      default: return <Home className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'house': return 'from-green-500 to-emerald-500';
      case 'business': return 'from-blue-500 to-indigo-500';
      case 'vehicle': return 'from-purple-500 to-violet-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
      property.owned 
        ? 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:scale-105' 
        : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300 opacity-75'
    }`}>
      
      {!property.owned && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="secondary" className="bg-gray-500 text-white">
            <Lock className="w-3 h-3 mr-1" />
            Locked
          </Badge>
        </div>
      )}

      <CardContent className="p-4 space-y-3">
        <div className="text-center">
          <div className="text-4xl mb-2">{property.image}</div>
          <h3 className="font-bold text-gray-800 text-sm">{property.name}</h3>
          <Badge 
            variant="secondary" 
            className={`text-white text-xs bg-gradient-to-r ${getTypeColor(property.type)} mt-1`}
          >
            {getTypeIcon(property.type)}
            <span className="ml-1 capitalize">{property.type}</span>
          </Badge>
        </div>

        {property.owned && (
          <div className="space-y-2">
            <div className="bg-green-50 border border-green-200 rounded-lg p-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-green-700 font-medium">Level {property.level}</span>
                <div className="flex items-center space-x-1 text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>+{property.income}/hr</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-600">Upgrade Cost:</div>
              <div className="flex items-center space-x-1 text-yellow-600">
                <Coins className="w-3 h-3" />
                <span className="font-bold text-xs">{property.upgradePrice}</span>
              </div>
            </div>

            {onUpgrade && (
              <Button
                size="sm"
                onClick={() => onUpgrade(property.id)}
                disabled={!canUpgrade}
                className={`w-full ${
                  canUpgrade
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {canUpgrade ? 'Upgrade' : 'Need More Coins'}
              </Button>
            )}
          </div>
        )}

        {!property.owned && (
          <div className="text-center space-y-2">
            <p className="text-xs text-gray-500">Complete tasks to unlock</p>
            <div className="flex items-center justify-center space-x-1 text-xs text-gray-400">
              <TrendingUp className="w-3 h-3" />
              <span>Income: +{property.income}/hr</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};