
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { WeeklyTracker } from '@/components/tracker/WeeklyTracker';
import { TrackerProgress } from '@/components/tracker/TrackerProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const medicationData = {
  "lisinopril": { name: "Lisinopril", dosage: "10mg" },
  "metformin": { name: "Metformin", dosage: "500mg" },
  "atorvastatin": { name: "Atorvastatin", dosage: "20mg" },
  "aspirin": { name: "Aspirin", dosage: "81mg" },
  "vitamin-d3": { name: "Vitamin D3", dosage: "1000 IU" },
  "omega-3": { name: "Omega-3", dosage: "1000mg" }
};

const TreatmentTracker = () => {
  const { medicationId } = useParams();
  const navigate = useNavigate();
  const [currentWeek, setCurrentWeek] = useState(1);
  const totalWeeks = 10;

  const medication = medicationId ? medicationData[medicationId as keyof typeof medicationData] : null;
  const isGeneralTracker = !medicationId;

  const getPageTitle = () => {
    if (isGeneralTracker) {
      return "Treatment Tracker";
    }
    return medication ? `${medication.name} Treatment Tracker` : "Medication Tracker";
  };

  const getPageDescription = () => {
    if (isGeneralTracker) {
      return "A personal planner to help you incorporate your treatment into your daily routine";
    }
    return medication 
      ? `Track your ${medication.name} ${medication.dosage} treatment progress`
      : "Track your medication treatment progress";
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/medications')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Medications
            </Button>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{getPageTitle()}</h1>
            <p className="text-slate-600">
              {getPageDescription()}
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        <TrackerProgress currentWeek={currentWeek} totalWeeks={totalWeeks} />

        {/* Taking Medication Guidelines */}
        <Card className="bg-gradient-to-r from-medical-50 to-health-50 border-medical-200">
          <CardHeader>
            <CardTitle className="text-lg text-medical-800">
              {medication ? `Taking Your ${medication.name}` : "Taking Your Medication"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-700">Take once per day with or without food</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-700">Swallow tablets whole with water at about the same time each day</p>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-700">Do NOT split, crush or chew the tablets</p>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-700">Do not change your dose</p>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-700">Do not stop taking medication without first talking to your health care professional</p>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Tracker */}
        <WeeklyTracker 
          currentWeek={currentWeek} 
          onWeekChange={setCurrentWeek}
          totalWeeks={totalWeeks}
        />

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
            disabled={currentWeek === 1}
          >
            Previous Week
          </Button>
          <Button 
            onClick={() => setCurrentWeek(Math.min(totalWeeks, currentWeek + 1))}
            disabled={currentWeek === totalWeeks}
            className="bg-medical-500 hover:bg-medical-600"
          >
            Next Week
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default TreatmentTracker;
