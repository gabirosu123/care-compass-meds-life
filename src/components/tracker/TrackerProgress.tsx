
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar, CheckCircle } from 'lucide-react';

interface TrackerProgressProps {
  currentWeek: number;
  totalWeeks: number;
}

export const TrackerProgress: React.FC<TrackerProgressProps> = ({
  currentWeek,
  totalWeeks
}) => {
  const progressPercentage = (currentWeek / totalWeeks) * 100;
  const completedWeeks = currentWeek - 1;

  return (
    <Card className="bg-gradient-to-r from-medical-50 to-health-50 border-medical-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-medical-800">
          <Calendar className="h-5 w-5" />
          Treatment Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Week {currentWeek} of {totalWeeks}</span>
          <span className="text-sm font-medium text-medical-700">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        
        <Progress value={progressPercentage} className="h-3" />
        
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span>{completedWeeks} weeks completed</span>
        </div>
        
        {currentWeek === totalWeeks && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
            <p className="text-green-800 text-sm font-medium">
              🎉 Congratulations! You've completed your treatment tracker.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
