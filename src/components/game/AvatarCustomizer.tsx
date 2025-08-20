import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface AvatarCustomizerProps {
  currentAvatar: string;
  onAvatarSelect: (avatar: string) => void;
  onClose: () => void;
}

const avatarOptions = [
  '👤', '🧑', '👨', '👩', '🧔', '👱', '👨‍💼', '👩‍💼', 
  '👨‍🎓', '👩‍🎓', '👨‍💻', '👩‍💻', '👨‍🚀', '👩‍🚀',
  '🦸‍♂️', '🦸‍♀️', '🧙‍♂️', '🧙‍♀️', '🧚‍♂️', '🧚‍♀️',
  '🤖', '👽', '👻', '🎭', '🤡', '🤠', '🥷', '🦹‍♂️'
];

export const AvatarCustomizer = ({ currentAvatar, onAvatarSelect, onClose }: AvatarCustomizerProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-white to-blue-50 border-2 border-blue-200 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
        <CardHeader className="text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-2 right-2 w-8 h-8 p-0 hover:bg-red-100"
          >
            <X className="w-4 h-4" />
          </Button>
          
          <CardTitle className="text-xl font-bold text-gray-800">
            Choose Your Avatar
          </CardTitle>
          
          <div className="text-4xl p-4 bg-white/80 rounded-full inline-block">
            {currentAvatar}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-6 gap-2">
            {avatarOptions.map((avatar, index) => (
              <Button
                key={index}
                variant="ghost"
                size="lg"
                onClick={() => onAvatarSelect(avatar)}
                className={`h-12 text-2xl hover:scale-110 transition-transform ${
                  currentAvatar === avatar 
                    ? 'bg-blue-100 border-2 border-blue-400' 
                    : 'hover:bg-blue-50'
                }`}
              >
                {avatar}
              </Button>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
            >
              Done
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};