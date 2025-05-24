
import React from 'react';
import { Layout } from '@/components/Layout';
import { DashboardStats } from '@/components/DashboardStats';
import { MedicationCard } from '@/components/MedicationCard';
import { UpcomingReminders } from '@/components/UpcomingReminders';
import { HealthMetrics } from '@/components/HealthMetrics';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Activity, User } from 'lucide-react';

const todaysMedications = [
  {
    name: "Lisinopril",
    dosage: "10mg",
    time: "8:00 AM",
    status: "taken" as const,
    frequency: "Once daily",
    pillsLeft: 25
  },
  {
    name: "Metformin",
    dosage: "500mg",
    time: "12:00 PM",
    status: "taken" as const,
    frequency: "Twice daily",
    pillsLeft: 18
  },
  {
    name: "Atorvastatin",
    dosage: "20mg",
    time: "2:30 PM",
    status: "pending" as const,
    frequency: "Once daily",
    pillsLeft: 3
  },
  {
    name: "Aspirin",
    dosage: "81mg",
    time: "8:00 PM",
    status: "pending" as const,
    frequency: "Once daily",
    pillsLeft: 45
  }
];

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6 sm:space-y-8">
        {/* Mobile-optimized Welcome Section */}
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              Good afternoon, Sarah! 👋
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Here's your medication overview for today
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-medical-500 hover:bg-medical-600 text-white touch-manipulation h-12">
              <Plus className="h-4 w-4 mr-2" />
              Add Medication
            </Button>
            <Button variant="outline" className="border-medical-200 text-medical-700 hover:bg-medical-50 touch-manipulation h-12">
              <Calendar className="h-4 w-4 mr-2" />
              View Schedule
            </Button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats />

        {/* Mobile-optimized Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Today's Medications */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">Today's Medications</h2>
              <Button variant="ghost" className="text-medical-600 hover:text-medical-700 hover:bg-medical-50 touch-manipulation">
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {todaysMedications.map((medication, index) => (
                <MedicationCard
                  key={index}
                  name={medication.name}
                  dosage={medication.dosage}
                  time={medication.time}
                  status={medication.status}
                  frequency={medication.frequency}
                  pillsLeft={medication.pillsLeft}
                />
              ))}
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            <UpcomingReminders />
            <HealthMetrics />
          </div>
        </div>

        {/* Mobile-optimized Quick Actions */}
        <div className="bg-gradient-to-r from-medical-50 to-health-50 rounded-xl p-4 sm:p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <Button variant="outline" className="h-auto p-3 sm:p-4 flex flex-col items-center gap-2 hover:bg-white touch-manipulation">
              <Plus className="h-5 w-5 text-medical-600" />
              <span className="text-xs sm:text-sm">Add Medication</span>
            </Button>
            <Button variant="outline" className="h-auto p-3 sm:p-4 flex flex-col items-center gap-2 hover:bg-white touch-manipulation">
              <Calendar className="h-5 w-5 text-health-600" />
              <span className="text-xs sm:text-sm">Set Reminder</span>
            </Button>
            <Button variant="outline" className="h-auto p-3 sm:p-4 flex flex-col items-center gap-2 hover:bg-white touch-manipulation">
              <Activity className="h-5 w-5 text-orange-600" />
              <span className="text-xs sm:text-sm">Log Vitals</span>
            </Button>
            <Button variant="outline" className="h-auto p-3 sm:p-4 flex flex-col items-center gap-2 hover:bg-white touch-manipulation">
              <User className="h-5 w-5 text-purple-600" />
              <span className="text-xs sm:text-sm">Contact Doctor</span>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
