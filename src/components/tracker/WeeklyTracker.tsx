
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DailyCheckIn } from './DailyCheckIn';
import { WeeklyQuestions } from './WeeklyQuestions';

interface WeeklyTrackerProps {
  currentWeek: number;
  onWeekChange: (week: number) => void;
  totalWeeks: number;
}

export const WeeklyTracker: React.FC<WeeklyTrackerProps> = ({
  currentWeek,
  onWeekChange,
  totalWeeks
}) => {
  const [selectedDay, setSelectedDay] = useState(1);

  const getWeekTitle = (week: number) => {
    const titles = {
      1: "Check off the numbered circles as you take your medication each day",
      2: "Are you incorporating your medication into your routine?",
      3: "Could mindfulness improve your physical and mental health?",
      4: "Take a moment to think about anything you would like to discuss with your doctor",
      5: "Positivity is key. Keep going!",
      6: "Having consistent triggers to prompt you to take your medication is really important",
      7: "Are you remembering to think of your reward every time you remember to take your medication?",
      8: "Having consistent triggers to prompt you to take your treatment is really important",
      9: "Reflect on your journey with your treatment",
      10: "You've reached the end of this tracker, but don't stop now!"
    };
    return titles[week as keyof typeof titles] || `Week ${week}`;
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-t-lg">
        <CardTitle className="text-xl font-bold">
          Week {currentWeek}
        </CardTitle>
        <p className="text-sm text-white/90">
          {getWeekTitle(currentWeek)}
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Daily Check-in Grid */}
          <DailyCheckIn 
            week={currentWeek}
            selectedDay={selectedDay}
            onDaySelect={setSelectedDay}
          />
          
          {/* Weekly Questions */}
          <WeeklyQuestions week={currentWeek} />
        </div>
      </CardContent>
    </Card>
  );
};
