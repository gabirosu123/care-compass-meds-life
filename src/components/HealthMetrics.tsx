
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Activity, Eye } from 'lucide-react';

const healthMetrics = [
  {
    title: "Blood Pressure",
    value: "120/80",
    unit: "mmHg",
    status: "Normal",
    icon: Heart,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    title: "Heart Rate",
    value: "72",
    unit: "bpm",
    status: "Good",
    icon: Activity,
    color: "text-medical-600",
    bgColor: "bg-medical-50"
  },
  {
    title: "Medication Adherence",
    value: "94",
    unit: "%",
    status: "Excellent",
    icon: Eye,
    color: "text-health-600",
    bgColor: "bg-health-50"
  }
];

export const HealthMetrics: React.FC = () => {
  return (
    <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-slate-800">Health Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {healthMetrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <metric.icon className={`h-4 w-4 ${metric.color}`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">{metric.title}</h4>
                    <p className="text-sm text-slate-600">{metric.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-slate-800">
                    {metric.value}
                    <span className="text-sm font-normal text-slate-500 ml-1">
                      {metric.unit}
                    </span>
                  </p>
                </div>
              </div>
              {metric.title === "Medication Adherence" && (
                <Progress value={parseInt(metric.value)} className="h-2" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
