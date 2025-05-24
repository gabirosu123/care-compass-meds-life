
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, Calendar, Bell, CheckCircle } from 'lucide-react';

const stats = [
  {
    title: "Active Medications",
    value: "8",
    description: "Currently prescribed",
    icon: Pill,
    color: "text-medical-600",
    bgColor: "bg-medical-50"
  },
  {
    title: "Today's Doses",
    value: "12",
    description: "3 remaining",
    icon: Calendar,
    color: "text-health-600",
    bgColor: "bg-health-50"
  },
  {
    title: "Adherence Rate",
    value: "94%",
    description: "This week",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    title: "Upcoming Reminders",
    value: "5",
    description: "Next 4 hours",
    icon: Bell,
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  }
];

export const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
            <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
