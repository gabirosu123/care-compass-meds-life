
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Pill, CheckCircle, AlertTriangle, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MedicationCardProps {
  name: string;
  dosage: string;
  time: string;
  status: 'taken' | 'pending' | 'missed';
  frequency: string;
  pillsLeft?: number;
  medicationId?: string;
}

export const MedicationCard: React.FC<MedicationCardProps> = ({
  name,
  dosage,
  time,
  status,
  frequency,
  pillsLeft,
  medicationId
}) => {
  const navigate = useNavigate();

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

  const handleTrackerClick = () => {
    const medId = medicationId || name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/medications/${medId}/tracker`);
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
        
        <div className="flex gap-2">
          {status === 'pending' && (
            <>
              <Button className="flex-1 bg-health-500 hover:bg-health-600 text-white">
                Mark as Taken
              </Button>
              <Button variant="outline" className="flex-1">
                Skip Dose
              </Button>
            </>
          )}
          <Button 
            onClick={handleTrackerClick}
            variant="outline" 
            className="w-full border-medical-300 text-medical-600 hover:bg-medical-50"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Tracker
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
