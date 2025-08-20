import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Trophy, 
  Target, 
  ShoppingCart, 
  Gamepad2, 
  Crown, 
  Settings,
  Menu,
  X
} from 'lucide-react';

interface NavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  unreadTasks?: number;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'tasks', label: 'Tasks', icon: Target },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'store', label: 'Store', icon: ShoppingCart },
  { id: 'games', label: 'Mini-Games', icon: Gamepad2 },
  { id: 'leaderboard', label: 'Leaderboard', icon: Crown },
];

export const Navigation = ({ currentTab, onTabChange, unreadTasks = 0 }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between w-full px-6 py-3">
          <div className="flex items-center space-x-2">
            <div className="text-2xl">🎮</div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              LifeSim Economy
            </h1>
          </div>
          
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              const hasNotification = item.id === 'tasks' && unreadTasks > 0;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onTabChange(item.id)}
                  className={`relative ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' 
                      : 'hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                  {hasNotification && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 bg-red-500 text-white text-xs">
                      {unreadTasks}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
          
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="text-xl">🎮</div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              LifeSim
            </h1>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="relative"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            {unreadTasks > 0 && (
              <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 bg-red-500 text-white text-xs">
                {unreadTasks}
              </Badge>
            )}
          </Button>
        </div>
        
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                const hasNotification = item.id === 'tasks' && unreadTasks > 0;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      onTabChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full justify-start relative ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' 
                        : 'hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.label}
                    {hasNotification && (
                      <Badge className="ml-auto w-5 h-5 p-0 bg-red-500 text-white text-xs">
                        {unreadTasks}
                      </Badge>
                    )}
                  </Button>
                );
              })}
              
              <div className="pt-2 border-t border-gray-200">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};