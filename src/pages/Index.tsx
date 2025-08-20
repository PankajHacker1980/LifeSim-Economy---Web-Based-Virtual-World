import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { Navigation } from '@/components/game/Navigation';
import { PlayerCard } from '@/components/game/PlayerCard';
import { AchievementCard } from '@/components/game/AchievementCard';
import { TaskCard } from '@/components/game/TaskCard';
import { StoreCard } from '@/components/game/StoreCard';
import { MiniGameCard } from '@/components/game/MiniGameCard';
import { LeaderboardCard } from '@/components/game/LeaderboardCard';
import { PropertyCard } from '@/components/game/PropertyCard';
import { TutorialOverlay } from '@/components/game/TutorialOverlay';
import { AvatarCustomizer } from '@/components/game/AvatarCustomizer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Trophy, 
  Target, 
  ShoppingCart, 
  Gamepad2, 
  Crown,
  Filter,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  Globe
} from 'lucide-react';

export default function LifeSimEconomy() {
  const {
    gameState,
    addXP,
    addCoins,
    addGems,
    purchaseItem,
    completeTask,
    playMiniGame,
    nextTutorialStep,
    skipTutorial,
    updatePlayerAvatar,
  } = useGameState();

  const [currentTab, setCurrentTab] = useState('dashboard');
  const [showAvatarCustomizer, setShowAvatarCustomizer] = useState(false);
  const [storeFilter, setStoreFilter] = useState('all');
  const [leaderboardFilter, setLeaderboardFilter] = useState('global');
  const [searchQuery, setSearchQuery] = useState('');

  const uncompletedTasks = gameState.tasks.filter(task => !task.completed).length;
  
  const filteredStoreItems = gameState.storeItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (storeFilter === 'all') return matchesSearch;
    if (storeFilter === 'owned') return matchesSearch && item.owned;
    if (storeFilter === 'available') return matchesSearch && !item.owned;
    return matchesSearch && item.category === storeFilter;
  });

  const handleTutorialNext = () => {
    if (gameState.currentTutorialStep >= 5) {
      skipTutorial();
    } else {
      nextTutorialStep();
    }
  };

  const handleUpgradeProperty = (propertyId: string) => {
    // Property upgrade logic would go here
    addCoins(-200); // Deduct upgrade cost
    addXP(25); // Give XP for upgrade
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation 
        currentTab={currentTab} 
        onTabChange={setCurrentTab}
        unreadTasks={uncompletedTasks}
      />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Dashboard Tab */}
        {currentTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome Back, {gameState.player.username}!
              </h1>
              <p className="text-gray-600">Ready to continue your virtual journey?</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Player Card */}
              <div className="lg:col-span-1">
                <PlayerCard 
                  player={gameState.player}
                  onAvatarClick={() => setShowAvatarCustomizer(true)}
                />
              </div>

              {/* Quick Stats */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="text-center bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
                    <CardContent className="p-4">
                      <Trophy className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-800">
                        {gameState.achievements.filter(a => a.unlocked).length}
                      </div>
                      <div className="text-xs text-green-600">Achievements</div>
                    </CardContent>
                  </Card>

                  <Card className="text-center bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200">
                    <CardContent className="p-4">
                      <Target className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-800">
                        {gameState.tasks.filter(t => t.completed).length}
                      </div>
                      <div className="text-xs text-blue-600">Tasks Done</div>
                    </CardContent>
                  </Card>

                  <Card className="text-center bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
                    <CardContent className="p-4">
                      <ShoppingCart className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-800">
                        {gameState.storeItems.filter(i => i.owned).length}
                      </div>
                      <div className="text-xs text-purple-600">Items Owned</div>
                    </CardContent>
                  </Card>

                  <Card className="text-center bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200">
                    <CardContent className="p-4">
                      <Gamepad2 className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-orange-800">
                        {Math.floor(Math.random() * 50 + 10)}
                      </div>
                      <div className="text-xs text-orange-600">Games Played</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-yellow-500" />
                      <span>Recent Activities</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                        <span>🎯 Completed daily login task</span>
                        <Badge className="bg-green-500">+50 coins</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                        <span>⭐ Leveled up to Level {gameState.player.level}</span>
                        <Badge className="bg-blue-500">Level up!</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-purple-50 rounded">
                        <span>🛍️ Ready to explore the store</span>
                        <Badge variant="outline">New items!</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {currentTab === 'tasks' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">Tasks & Objectives</h2>
              <p className="text-gray-600">Complete tasks to earn XP, coins, and gems!</p>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Tasks</TabsTrigger>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="special">Special</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gameState.tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onComplete={completeTask}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="daily" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gameState.tasks.filter(t => t.type === 'daily').map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onComplete={completeTask}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="weekly" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gameState.tasks.filter(t => t.type === 'weekly').map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onComplete={completeTask}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="special" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gameState.tasks.filter(t => t.type === 'special').map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onComplete={completeTask}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Achievements Tab */}
        {currentTab === 'achievements' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">Achievements</h2>
              <p className="text-gray-600">Unlock achievements to earn special rewards!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gameState.achievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                />
              ))}
            </div>
          </div>
        )}

        {/* Store Tab */}
        {currentTab === 'store' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">Virtual Store</h2>
              <p className="text-gray-600">Spend your coins and gems on amazing items!</p>
            </div>

            {/* Store Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex items-center space-x-2 flex-1">
                <Search className="w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <Select value={storeFilter} onValueChange={setStoreFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="owned">Owned</SelectItem>
                    <SelectItem value="avatar">Avatar</SelectItem>
                    <SelectItem value="property">Property</SelectItem>
                    <SelectItem value="skill">Skills</SelectItem>
                    <SelectItem value="consumable">Consumables</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredStoreItems.map((item) => (
                <StoreCard
                  key={item.id}
                  item={item}
                  onPurchase={purchaseItem}
                  playerCoins={gameState.player.coins}
                  playerGems={gameState.player.gems}
                />
              ))}
            </div>

            {/* Properties Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span>Properties</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gameState.properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onUpgrade={handleUpgradeProperty}
                    playerCoins={gameState.player.coins}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mini-Games Tab */}
        {currentTab === 'games' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">Mini-Games</h2>
              <p className="text-gray-600">Play games to earn XP and coins!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gameState.miniGames.map((game) => (
                <MiniGameCard
                  key={game.id}
                  game={game}
                  onPlay={playMiniGame}
                />
              ))}
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {currentTab === 'leaderboard' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">Leaderboards</h2>
              <p className="text-gray-600">See how you rank against other players!</p>
            </div>

            <div className="flex justify-center">
              <div className="flex items-center space-x-2 bg-white rounded-lg p-1 border">
                <Button
                  variant={leaderboardFilter === 'global' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLeaderboardFilter('global')}
                  className="flex items-center space-x-1"
                >
                  <Globe className="w-4 h-4" />
                  <span>Global</span>
                </Button>
                <Button
                  variant={leaderboardFilter === 'friends' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setLeaderboardFilter('friends')}
                  className="flex items-center space-x-1"
                >
                  <Users className="w-4 h-4" />
                  <span>Friends</span>
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {gameState.leaderboard.map((entry) => (
                <LeaderboardCard
                  key={entry.rank}
                  entry={entry}
                  isCurrentPlayer={entry.player.id === gameState.player.id}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Tutorial Overlay */}
      {gameState.showTutorial && (
        <TutorialOverlay
          currentStep={gameState.currentTutorialStep}
          onNext={handleTutorialNext}
          onSkip={skipTutorial}
        />
      )}

      {/* Avatar Customizer */}
      {showAvatarCustomizer && (
        <AvatarCustomizer
          currentAvatar={gameState.player.avatar}
          onAvatarSelect={updatePlayerAvatar}
          onClose={() => setShowAvatarCustomizer(false)}
        />
      )}
    </div>
  );
}