
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Pill } from 'lucide-react';

const upcomingReminders = [
  {
    medication: "Lisinopril",
    time: "2:30 PM",
    dosage: "10mg",
    priority: "high"
  },
  {
    medication: "Metformin",
    time: "6:00 PM",
    dosage: "500mg",
    priority: "medium"
  },
  {
    medication: "Vitamin D3",
    time: "8:00 PM",
    dosage: "1000 IU",
    priority: "low"
  },
  {
    medication: "Omega-3",
    time: "8:00 PM",
    dosage: "1000mg",
    priority: "low"
  }
];

export const UpcomingReminders: React.FC = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-800">
          <Clock className="h-5 w-5 text-medical-600" />
          Upcoming Reminders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingReminders.map((reminder, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-medical-100 rounded-lg">
                  <Pill className="h-4 w-4 text-medical-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">{reminder.medication}</h4>
                  <p className="text-sm text-slate-600">{reminder.dosage}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-slate-800">{reminder.time}</p>
                <Badge className={`text-xs ${getPriorityColor(reminder.priority)}`}>
                  {reminder.priority}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
