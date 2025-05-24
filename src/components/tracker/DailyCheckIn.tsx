
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle } from 'lucide-react';

interface DailyCheckInProps {
  week: number;
  selectedDay: number;
  onDaySelect: (day: number) => void;
}

export const DailyCheckIn: React.FC<DailyCheckInProps> = ({
  week,
  selectedDay,
  onDaySelect
}) => {
  const [checkedDays, setCheckedDays] = useState<Set<number>>(new Set());

  const toggleDay = (day: number) => {
    const newCheckedDays = new Set(checkedDays);
    if (newCheckedDays.has(day)) {
      newCheckedDays.delete(day);
    } else {
      newCheckedDays.add(day);
    }
    setCheckedDays(newCheckedDays);
  };

  const getDayPrompt = (day: number) => {
    const prompts = {
      1: "What is your plan this week with regards to taking your medicine?",
      2: "Have you found specific times that help you incorporate your medication into your routine?",
      3: "Celebrate if you can remembered to take your medication every day this week!",
      4: "What is your most bothersome symptom or side effect?",
      5: "Do you feel you know how bothersome your symptoms or side effect is?",
      6: "Remember to check off each day after you take your pill",
      7: "Think about your most bothersome symptom or side effect today"
    };
    return prompts[day as keyof typeof prompts] || `Day ${day} check-in`;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800">Daily Medication Tracking</h3>
      
      {/* Week grid */}
      <div className="grid grid-cols-7 gap-2 sm:gap-4">
        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
          <div key={day} className="flex flex-col items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`h-12 w-12 rounded-full border-2 transition-all ${
                checkedDays.has(day)
                  ? 'bg-medical-500 border-medical-500 text-white hover:bg-medical-600'
                  : 'border-slate-300 hover:border-medical-400'
              }`}
              onClick={() => toggleDay(day)}
            >
              {checkedDays.has(day) ? (
                <CheckCircle className="h-6 w-6" />
              ) : (
                <Circle className="h-6 w-6" />
              )}
            </Button>
            <span className="text-xs text-slate-600 font-medium">
              Day {day}
            </span>
          </div>
        ))}
      </div>

      {/* Daily prompt */}
      <div className="bg-slate-50 rounded-lg p-4">
        <p className="text-sm text-slate-700 text-center">
          {getDayPrompt(selectedDay)}
        </p>
      </div>
    </div>
  );
};
