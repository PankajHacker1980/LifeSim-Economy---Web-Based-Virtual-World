export interface Player {
  id: string;
  username: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNext: number;
  coins: number;
  gems: number;
  streak: number;
  joinDate: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  reward: {
    xp: number;
    coins: number;
    gems?: number;
  };
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'special';
  difficulty: 'easy' | 'medium' | 'hard';
  progress: number;
  maxProgress: number;
  completed: boolean;
  reward: {
    xp: number;
    coins: number;
    gems?: number;
  };
  deadline?: string;
}

export interface StoreItem {
  id: string;
  name: string;
  description: string;
  category: 'avatar' | 'property' | 'skill' | 'consumable';
  price: number;
  currency: 'coins' | 'gems';
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  owned: boolean;
  effect?: string;
}

export interface Property {
  id: string;
  name: string;
  type: 'house' | 'business' | 'vehicle';
  level: number;
  income: number;
  upgradePrice: number;
  image: string;
  owned: boolean;
}

export interface MiniGame {
  id: string;
  name: string;
  description: string;
  difficulty: number;
  maxReward: {
    xp: number;
    coins: number;
  };
  icon: string;
  cooldown: number;
  lastPlayed?: string;
}

export interface LeaderboardEntry {
  rank: number;
  player: Player;
  score: number;
  region: string;
}

export interface GameState {
  player: Player;
  achievements: Achievement[];
  tasks: Task[];
  storeItems: StoreItem[];
  properties: Property[];
  miniGames: MiniGame[];
  leaderboard: LeaderboardEntry[];
  showTutorial: boolean;
  currentTutorialStep: number;
}