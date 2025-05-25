
import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  CreditCard, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Phone,
  Calendar,
  DollarSign
} from 'lucide-react';

const medicationFunding = [
  {
    id: "lisinopril",
    name: "Lisinopril",
    dosage: "10mg",
    monthlyOOP: 25,
    interimStatus: "approved",
    insuranceStatus: "approved",
    priorAuthRequired: false,
    approvalDate: "2024-01-15",
    expiryDate: "2024-12-31",
    copayCard: true,
    copayAmount: 10
  },
  {
    id: "metformin",
    name: "Metformin",
    dosage: "500mg",
    monthlyOOP: 40,
    interimStatus: "pending",
    insuranceStatus: "under_review",
    priorAuthRequired: true,
    submissionDate: "2024-01-10",
    expectedDecision: "2024-01-25",
    copayCard: false,
    copayAmount: null
  },
  {
    id: "atorvastatin",
    name: "Atorvastatin",
    dosage: "20mg",
    monthlyOOP: 75,
    interimStatus: "expired",
    insuranceStatus: "denied",
    priorAuthRequired: true,
    denialDate: "2024-01-08",
    appealDeadline: "2024-02-08",
    copayCard: true,
    copayAmount: 25
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'pending':
    case 'under_review':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'denied':
    case 'expired':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'approved':
      return <CheckCircle className="h-4 w-4" />;
    case 'pending':
    case 'under_review':
      return <Clock className="h-4 w-4" />;
    case 'denied':
    case 'expired':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const MedicationFundingCard = ({ medication }: { medication: typeof medicationFunding[0] }) => {
  const insuranceProgress = medication.insuranceStatus === 'approved' ? 100 : 
                          medication.insuranceStatus === 'under_review' ? 50 : 0;

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800">
            {medication.name} {medication.dosage}
          </CardTitle>
          <div className="flex gap-2">
            <Badge className={getStatusColor(medication.interimStatus)}>
              {getStatusIcon(medication.interimStatus)}
              Interim: {medication.interimStatus}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-500">Monthly Out-of-Pocket</p>
            <p className="font-semibold text-lg text-slate-800">${medication.monthlyOOP}</p>
          </div>
          {medication.copayCard && (
            <div>
              <p className="text-slate-500">Copay Card</p>
              <p className="font-semibold text-green-600">${medication.copayAmount}/month</p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Insurance Progress</span>
              <Badge className={getStatusColor(medication.insuranceStatus)}>
                {getStatusIcon(medication.insuranceStatus)}
                {medication.insuranceStatus.replace('_', ' ')}
              </Badge>
            </div>
            <Progress value={insuranceProgress} className="h-2" />
          </div>

          {medication.priorAuthRequired && (
            <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 text-orange-800">
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">Prior Authorization Required</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2 text-sm">
          {medication.approvalDate && (
            <div className="flex justify-between">
              <span className="text-slate-500">Approved:</span>
              <span className="font-medium">{medication.approvalDate}</span>
            </div>
          )}
          {medication.expiryDate && (
            <div className="flex justify-between">
              <span className="text-slate-500">Expires:</span>
              <span className="font-medium">{medication.expiryDate}</span>
            </div>
          )}
          {medication.expectedDecision && (
            <div className="flex justify-between">
              <span className="text-slate-500">Expected Decision:</span>
              <span className="font-medium">{medication.expectedDecision}</span>
            </div>
          )}
          {medication.appealDeadline && (
            <div className="flex justify-between">
              <span className="text-slate-500 text-red-600">Appeal Deadline:</span>
              <span className="font-medium text-red-600">{medication.appealDeadline}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          {medication.insuranceStatus === 'denied' && (
            <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
              File Appeal
            </Button>
          )}
          {medication.interimStatus === 'expired' && (
            <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700">
              Renew Coverage
            </Button>
          )}
          <Button size="sm" variant="outline" className="flex-1">
            <Phone className="h-4 w-4 mr-1" />
            Contact Support
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Funding = () => {
  const totalMonthlyOOP = medicationFunding.reduce((sum, med) => sum + med.monthlyOOP, 0);
  const totalCopayReduction = medicationFunding.reduce((sum, med) => 
    sum + (med.copayCard ? (med.monthlyOOP - (med.copayAmount || 0)) : 0), 0);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Medication Funding</h1>
          <p className="text-slate-600">Track insurance coverage and financial assistance for your medications</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <DollarSign className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-600">Total Monthly OOP</p>
                  <p className="text-2xl font-bold text-blue-800">${totalMonthlyOOP}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CreditCard className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm text-green-600">Copay Savings</p>
                  <p className="text-2xl font-bold text-green-800">${totalCopayReduction}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-sm text-orange-600">Pending Reviews</p>
                  <p className="text-2xl font-bold text-orange-800">
                    {medicationFunding.filter(m => m.insuranceStatus === 'under_review').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Coverage Overview</TabsTrigger>
            <TabsTrigger value="interim">Interim Coverage</TabsTrigger>
            <TabsTrigger value="assistance">Financial Assistance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {medicationFunding.map((medication) => (
                <MedicationFundingCard key={medication.id} medication={medication} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="interim" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Interim Coverage Programs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {medicationFunding.map((med) => (
                    <div key={med.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{med.name}</span>
                        <Badge className={getStatusColor(med.interimStatus)}>
                          {med.interimStatus}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">
                        Provides temporary coverage while insurance reviews your case
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assistance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Financial Assistance Programs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Manufacturer Copay Cards</h4>
                    <p className="text-sm text-green-700 mb-3">
                      Reduce your out-of-pocket costs with manufacturer-sponsored copay assistance programs.
                    </p>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Find Copay Cards
                    </Button>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Patient Assistance Programs (PAP)</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Income-based programs that may provide medications at reduced or no cost.
                    </p>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Check Eligibility
                    </Button>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Foundation Grants</h4>
                    <p className="text-sm text-purple-700 mb-3">
                      Non-profit organizations that provide financial assistance for specific conditions.
                    </p>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Search Foundations
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Funding;
