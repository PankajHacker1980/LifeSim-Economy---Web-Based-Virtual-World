import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Task } from '@/types/game';
import { Clock, CheckCircle, Coins, Gem, Zap, Target } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onComplete?: (id: string) => void;
}

export const TaskCard = ({ task, onComplete }: TaskCardProps) => {
  const progressPercentage = (task.progress / task.maxProgress) * 100;
  const canComplete = task.progress >= task.maxProgress && !task.completed;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily': return '📅';
      case 'weekly': return '📊';
      case 'special': return '⭐';
      default: return '📋';
    }
  };

  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
      task.completed 
        ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-200' 
        : canComplete
        ? 'bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200 hover:scale-105'
        : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
    }`}>
      
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">{getTypeIcon(task.type)}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-bold text-gray-800 text-sm">{task.title}</h3>
                <Badge 
                  variant="secondary" 
                  className={`text-white text-xs ${getDifficultyColor(task.difficulty)}`}
                >
                  {task.difficulty}
                </Badge>
              </div>
              <p className="text-xs text-gray-600">{task.description}</p>
            </div>
          </div>

          {task.completed && (
            <Badge className="bg-green-500 text-white">
              <CheckCircle className="w-3 h-3 mr-1" />
              Done
            </Badge>
          )}
        </div>

        {!task.completed && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1 text-gray-600">
                <Target className="w-3 h-3" />
                <span>Progress</span>
              </div>
              <span className="font-medium">
                {task.progress}/{task.maxProgress}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs">
            <div className="flex items-center space-x-1 text-blue-600">
              <Zap className="w-3 h-3" />
              <span>{task.reward.xp} XP</span>
            </div>
            <div className="flex items-center space-x-1 text-yellow-600">
              <Coins className="w-3 h-3" />
              <span>{task.reward.coins}</span>
            </div>
            {task.reward.gems && (
              <div className="flex items-center space-x-1 text-purple-600">
                <Gem className="w-3 h-3" />
                <span>{task.reward.gems}</span>
              </div>
            )}
          </div>

          {canComplete && onComplete && (
            <Button
              size="sm"
              onClick={() => onComplete(task.id)}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              Complete!
            </Button>
          )}

          {task.deadline && !task.completed && (
            <div className="flex items-center space-x-1 text-xs text-orange-600">
              <Clock className="w-3 h-3" />
              <span>{new Date(task.deadline).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};