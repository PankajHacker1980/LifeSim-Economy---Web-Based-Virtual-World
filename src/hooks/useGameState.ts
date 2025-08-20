import { useState, useEffect, useCallback } from 'react';
import { GameState, Player, Achievement, Task, StoreItem, Property, MiniGame, LeaderboardEntry } from '@/types/game';
import { toast } from 'sonner';

const INITIAL_PLAYER: Player = {
  id: '1',
  username: 'NewPlayer',
  avatar: '👤',
  level: 1,
  xp: 0,
  xpToNext: 100,
  coins: 500,
  gems: 10,
  streak: 0,
  joinDate: new Date().toISOString(),
};

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_login',
    title: 'Welcome Aboard!',
    description: 'Log in for the first time',
    icon: '🎉',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    reward: { xp: 50, coins: 100 }
  },
  {
    id: 'coin_collector',
    title: 'Coin Collector',
    description: 'Collect 1,000 coins',
    icon: '💰',
    unlocked: false,
    progress: 500,
    maxProgress: 1000,
    reward: { xp: 100, coins: 200 }
  },
  {
    id: 'level_master',
    title: 'Level Master',
    description: 'Reach level 10',
    icon: '⭐',
    unlocked: false,
    progress: 1,
    maxProgress: 10,
    reward: { xp: 200, coins: 500, gems: 5 }
  }
];

const INITIAL_TASKS: Task[] = [
  {
    id: 'daily_login',
    title: 'Daily Login',
    description: 'Log in to the game',
    type: 'daily',
    difficulty: 'easy',
    progress: 1,
    maxProgress: 1,
    completed: true,
    reward: { xp: 20, coins: 50 }
  },
  {
    id: 'play_minigame',
    title: 'Game Master',
    description: 'Play 3 mini-games',
    type: 'daily',
    difficulty: 'medium',
    progress: 0,
    maxProgress: 3,
    completed: false,
    reward: { xp: 50, coins: 100 }
  },
  {
    id: 'buy_item',
    title: 'Shopping Spree',
    description: 'Purchase an item from the store',
    type: 'weekly',
    difficulty: 'easy',
    progress: 0,
    maxProgress: 1,
    completed: false,
    reward: { xp: 30, coins: 75 }
  }
];

const INITIAL_STORE_ITEMS: StoreItem[] = [
  {
    id: 'avatar_hat',
    name: 'Cool Hat',
    description: 'A stylish hat for your avatar',
    category: 'avatar',
    price: 100,
    currency: 'coins',
    icon: '🎩',
    rarity: 'common',
    owned: false
  },
  {
    id: 'xp_boost',
    name: 'XP Booster',
    description: 'Double XP for 1 hour',
    category: 'consumable',
    price: 50,
    currency: 'coins',
    icon: '⚡',
    rarity: 'common',
    owned: false,
    effect: 'Double XP gain for 1 hour'
  },
  {
    id: 'legendary_sword',
    name: 'Dragon Slayer',
    description: 'A legendary weapon',
    category: 'avatar',
    price: 5,
    currency: 'gems',
    icon: '⚔️',
    rarity: 'legendary',
    owned: false
  }
];

const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'starter_house',
    name: 'Cozy Cottage',
    type: 'house',
    level: 1,
    income: 10,
    upgradePrice: 200,
    image: '🏠',
    owned: true
  },
  {
    id: 'coffee_shop',
    name: 'Coffee Shop',
    type: 'business',
    level: 0,
    income: 25,
    upgradePrice: 500,
    image: '☕',
    owned: false
  }
];

const INITIAL_MINIGAMES: MiniGame[] = [
  {
    id: 'coin_clicker',
    name: 'Coin Clicker',
    description: 'Click to collect coins!',
    difficulty: 1,
    maxReward: { xp: 30, coins: 75 },
    icon: '🪙',
    cooldown: 300000 // 5 minutes
  },
  {
    id: 'memory_game',
    name: 'Memory Challenge',
    description: 'Test your memory skills',
    difficulty: 2,
    maxReward: { xp: 50, coins: 125 },
    icon: '🧠',
    cooldown: 600000 // 10 minutes
  },
  {
    id: 'puzzle_solver',
    name: 'Puzzle Master',
    description: 'Solve complex puzzles',
    difficulty: 3,
    maxReward: { xp: 100, coins: 200 },
    icon: '🧩',
    cooldown: 900000 // 15 minutes
  }
];

const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, player: { ...INITIAL_PLAYER, username: 'ProGamer', level: 25, xp: 12500, coins: 5000 }, score: 12500, region: 'Global' },
  { rank: 2, player: { ...INITIAL_PLAYER, username: 'SkillMaster', level: 22, xp: 11000, coins: 4500 }, score: 11000, region: 'Global' },
  { rank: 3, player: { ...INITIAL_PLAYER, username: 'CoinKing', level: 20, xp: 10000, coins: 4000 }, score: 10000, region: 'Global' },
];

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    player: INITIAL_PLAYER,
    achievements: INITIAL_ACHIEVEMENTS,
    tasks: INITIAL_TASKS,
    storeItems: INITIAL_STORE_ITEMS,
    properties: INITIAL_PROPERTIES,
    miniGames: INITIAL_MINIGAMES,
    leaderboard: INITIAL_LEADERBOARD,
    showTutorial: true,
    currentTutorialStep: 0,
  });

  const addXP = useCallback((amount: number) => {
    setGameState(prev => {
      const newXP = prev.player.xp + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      const leveledUp = newLevel > prev.player.level;
      
      if (leveledUp) {
        toast.success(`Level Up! You're now level ${newLevel}!`, {
          description: `You gained ${amount} XP!`
        });
      }

      return {
        ...prev,
        player: {
          ...prev.player,
          xp: newXP,
          level: newLevel,
          xpToNext: (newLevel * 100) - newXP,
        }
      };
    });
  }, []);

  const addCoins = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        coins: prev.player.coins + amount,
      }
    }));
    toast.success(`+${amount} coins!`);
  }, []);

  const addGems = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        gems: prev.player.gems + amount,
      }
    }));
    toast.success(`+${amount} gems!`);
  }, []);

  const purchaseItem = useCallback((itemId: string) => {
    setGameState(prev => {
      const item = prev.storeItems.find(i => i.id === itemId);
      if (!item || item.owned) return prev;

      const hasEnoughCurrency = item.currency === 'coins' 
        ? prev.player.coins >= item.price
        : prev.player.gems >= item.price;

      if (!hasEnoughCurrency) {
        toast.error(`Not enough ${item.currency}!`);
        return prev;
      }

      toast.success(`Purchased ${item.name}!`, {
        description: '✨ Item added to your collection!'
      });

      return {
        ...prev,
        player: {
          ...prev.player,
          coins: item.currency === 'coins' ? prev.player.coins - item.price : prev.player.coins,
          gems: item.currency === 'gems' ? prev.player.gems - item.price : prev.player.gems,
        },
        storeItems: prev.storeItems.map(i => 
          i.id === itemId ? { ...i, owned: true } : i
        )
      };
    });
  }, []);

  const completeTask = useCallback((taskId: string) => {
    setGameState(prev => {
      const task = prev.tasks.find(t => t.id === taskId);
      if (!task || task.completed) return prev;

      addXP(task.reward.xp);
      addCoins(task.reward.coins);
      if (task.reward.gems) addGems(task.reward.gems);

      toast.success(`Task completed: ${task.title}!`);

      return {
        ...prev,
        tasks: prev.tasks.map(t => 
          t.id === taskId 
            ? { ...t, completed: true, progress: t.maxProgress }
            : t
        )
      };
    });
  }, [addXP, addCoins, addGems]);

  const playMiniGame = useCallback((gameId: string) => {
    setGameState(prev => {
      const game = prev.miniGames.find(g => g.id === gameId);
      if (!game) return prev;

      const now = Date.now();
      const lastPlayed = game.lastPlayed ? new Date(game.lastPlayed).getTime() : 0;
      
      if (now - lastPlayed < game.cooldown) {
        const remaining = Math.ceil((game.cooldown - (now - lastPlayed)) / 60000);
        toast.error(`Cooldown active! Wait ${remaining} minutes.`);
        return prev;
      }

      // Simulate game result
      const performance = Math.random();
      const xpReward = Math.floor(game.maxReward.xp * performance);
      const coinReward = Math.floor(game.maxReward.coins * performance);

      addXP(xpReward);
      addCoins(coinReward);

      toast.success(`${game.name} completed!`, {
        description: `Performance: ${Math.floor(performance * 100)}%`
      });

      return {
        ...prev,
        miniGames: prev.miniGames.map(g => 
          g.id === gameId 
            ? { ...g, lastPlayed: new Date().toISOString() }
            : g
        )
      };
    });
  }, [addXP, addCoins]);

  const nextTutorialStep = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentTutorialStep: prev.currentTutorialStep + 1,
    }));
  }, []);

  const skipTutorial = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showTutorial: false,
      currentTutorialStep: 0,
    }));
  }, []);

  const updatePlayerAvatar = useCallback((avatar: string) => {
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        avatar,
      }
    }));
    toast.success('Avatar updated!');
  }, []);

  return {
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
  };
};