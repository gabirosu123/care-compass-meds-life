
import React from 'react';
import { Layout } from '@/components/Layout';
import { MedicationCard } from '@/components/MedicationCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const allMedications = [
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
    time: "12:00 PM & 6:00 PM",
    status: "taken" as const,
    frequency: "Twice daily",
    pillsLeft: 18
  },
  {
    name: "Atorvastatin",
    dosage: "20mg",
    time: "8:00 PM",
    status: "pending" as const,
    frequency: "Once daily",
    pillsLeft: 3
  },
  {
    name: "Aspirin",
    dosage: "81mg",
    time: "8:00 AM",
    status: "taken" as const,
    frequency: "Once daily",
    pillsLeft: 45
  },
  {
    name: "Vitamin D3",
    dosage: "1000 IU",
    time: "8:00 AM",
    status: "taken" as const,
    frequency: "Once daily",
    pillsLeft: 60
  },
  {
    name: "Omega-3",
    dosage: "1000mg",
    time: "8:00 PM",
    status: "pending" as const,
    frequency: "Once daily",
    pillsLeft: 30
  }
];

const Medications = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col justify-start items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">My Medications</h1>
            <p className="text-slate-600">View your current prescriptions and medication schedule</p>
          </div>
          
          {/* Treatment Tracker Button */}
          <Button 
            onClick={() => navigate('/medications/tracker')}
            className="bg-medical-500 hover:bg-medical-600 text-white"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Treatment Tracker
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-200">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search medications..." 
                className="pl-10 border-gray-300 focus:ring-medical-500 focus:border-medical-500"
              />
            </div>
          </div>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Medications</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="low-stock">Low Stock</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="time">Next Dose</SelectItem>
              <SelectItem value="stock">Stock Level</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Medications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allMedications.map((medication, index) => (
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

        {/* Low Stock Alert */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-orange-800 mb-2">⚠️ Low Stock Alert</h3>
          <p className="text-orange-700 mb-4">
            You have medications running low. Please contact your healthcare provider for refills.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              Atorvastatin (3 pills left)
            </span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              Metformin (18 pills left)
            </span>
          </div>
          <Button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white">
            Contact Healthcare Provider
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Medications;
