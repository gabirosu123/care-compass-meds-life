
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Pill, CheckCircle, AlertTriangle } from 'lucide-react';

interface MedicationCardProps {
  name: string;
  dosage: string;
  time: string;
  status: 'taken' | 'pending' | 'missed';
  frequency: string;
  pillsLeft?: number;
}

export const MedicationCard: React.FC<MedicationCardProps> = ({
  name,
  dosage,
  time,
  status,
  frequency,
  pillsLeft
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'taken':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'missed':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'taken':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'missed':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Pill className="h-4 w-4" />;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800">{name}</CardTitle>
          <Badge className={`${getStatusColor()} flex items-center gap-1`}>
            {getStatusIcon()}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-500">Dosage</p>
            <p className="font-medium text-slate-800">{dosage}</p>
          </div>
          <div>
            <p className="text-slate-500">Time</p>
            <p className="font-medium text-slate-800">{time}</p>
          </div>
          <div>
            <p className="text-slate-500">Frequency</p>
            <p className="font-medium text-slate-800">{frequency}</p>
          </div>
          {pillsLeft && (
            <div>
              <p className="text-slate-500">Pills Left</p>
              <p className={`font-medium ${pillsLeft < 5 ? 'text-red-600' : 'text-slate-800'}`}>
                {pillsLeft}
              </p>
            </div>
          )}
        </div>
        
        {status === 'pending' && (
          <div className="flex gap-2">
            <Button className="flex-1 bg-health-500 hover:bg-health-600 text-white">
              Mark as Taken
            </Button>
            <Button variant="outline" className="flex-1">
              Skip Dose
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
