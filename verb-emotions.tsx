import React, { useState } from 'react';
import { Heart, HeartOff, Meh, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const VerbLearningGame = () => {
  const [reactionCounts, setReactionCounts] = useState({
    swimming: { love: 0, like: 0, "don't mind": 0, "don't like": 0, hate: 0 },
    running: { love: 0, like: 0, "don't mind": 0, "don't like": 0, hate: 0 },
    reading: { love: 0, like: 0, "don't mind": 0, "don't like": 0, hate: 0 },
    painting: { love: 0, like: 0, "don't mind": 0, "don't like": 0, hate: 0 },
    gaming: { love: 0, like: 0, "don't mind": 0, "don't like": 0, hate: 0 }
  });

  const emotions = [
    { verb: "love", icon: <Heart className="text-red-500" size={24} /> },
    { verb: "like", icon: <ThumbsUp className="text-blue-500" size={24} /> },
    { verb: "don't mind", icon: <Meh className="text-gray-500" size={24} /> },
    { verb: "don't like", icon: <ThumbsDown className="text-orange-500" size={24} /> },
    { verb: "hate", icon: <HeartOff className="text-purple-500" size={24} /> }
  ];

  const activities = [
    "🏊‍♂️ swimming",
    "🏃‍♀️ running",
    "📚 reading",
    "🎨 painting",
    "🎮 gaming"
  ];

  const handleReaction = (activity, emotion) => {
    setReactionCounts(prev => ({
      ...prev,
      [activity.split(' ')[1]]: {
        ...prev[activity.split(' ')[1]],
        [emotion]: prev[activity.split(' ')[1]][emotion] + 1
      }
    }));
  };

  const getReactionTotal = (activity) => {
    const counts = reactionCounts[activity.split(' ')[1]];
    return Object.values(counts).reduce((a, b) => a + b, 0);
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center">How do people feel about these activities?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{activity.split(' ')[0]}</span>
                  <span className="text-lg font-medium">{activity.split(' ')[1]}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {getReactionTotal(activity)} reactions
                </span>
              </div>
              <div className="flex gap-4">
                {emotions.map((emotion) => (
                  <button
                    key={emotion.verb}
                    onClick={() => handleReaction(activity, emotion.verb)}
                    className="flex flex-col items-center group"
                  >
                    <div className="p-2 rounded-lg hover:bg-gray-200 transition-all">
                      {emotion.icon}
                    </div>
                    <span className="text-xs mt-1 text-gray-600">
                      {reactionCounts[activity.split(' ')[1]][emotion.verb]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VerbLearningGame;
