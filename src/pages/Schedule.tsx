
import React, { useState } from 'react';
import { Layout } from "@/components/Layout";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, isSameDay, addDays, addWeeks } from "date-fns";
import { Clock, Pill, Stethoscope, Plus, Calendar as CalendarIcon, StickyNote } from "lucide-react";

// Mock data for appointments and events
const mockEvents = [
  {
    id: '1',
    type: 'appointment',
    title: 'Cardiology Follow-up',
    date: new Date(2024, 11, 28),
    time: '10:00 AM',
    location: 'Heart Center',
    description: 'Regular check-up with Dr. Smith'
  },
  {
    id: '2',
    type: 'medication',
    title: 'Lisinopril Refill Due',
    date: new Date(2024, 11, 30),
    medication: 'Lisinopril 10mg',
    daysSupply: 30,
    description: 'Contact pharmacy for refill'
  },
  {
    id: '3',
    type: 'assessment',
    title: 'Blood Pressure Check',
    date: new Date(2025, 0, 2),
    description: 'Weekly symptom assessment'
  },
  {
    id: '4',
    type: 'appointment',
    title: 'Lab Work',
    date: new Date(2025, 0, 5),
    time: '8:00 AM',
    location: 'Medical Lab',
    description: 'Quarterly blood work'
  },
  {
    id: '5',
    type: 'medication',
    title: 'Metformin Refill Due',
    date: new Date(2025, 0, 8),
    medication: 'Metformin 500mg',
    daysSupply: 90,
    description: 'Contact pharmacy for refill'
  },
  {
    id: '6',
    type: 'note',
    title: 'Patient Note',
    date: new Date(2024, 11, 27),
    description: 'Feeling much better today. The new medication seems to be working well.'
  },
  {
    id: '7',
    type: 'note',
    title: 'Patient Note',
    date: new Date(2024, 11, 25),
    description: 'Had some mild side effects yesterday - slight nausea in the morning.'
  }
];

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get events for selected date
  const selectedDateEvents = mockEvents.filter(event => 
    isSameDay(event.date, selectedDate)
  );

  // Get upcoming events (next 7 days)
  const upcomingEvents = mockEvents
    .filter(event => {
      const today = new Date();
      const nextWeek = addDays(today, 7);
      return event.date >= today && event.date <= nextWeek;
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // Function to get events for a specific date (for calendar display)
  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(event => isSameDay(event.date, date));
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Stethoscope className="h-4 w-4" />;
      case 'medication':
        return <Pill className="h-4 w-4" />;
      case 'assessment':
        return <Clock className="h-4 w-4" />;
      case 'note':
        return <StickyNote className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'appointment':
        return 'bg-medical-100 text-medical-800 border-medical-200';
      case 'medication':
        return 'bg-health-100 text-health-800 border-health-200';
      case 'assessment':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'note':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-bg bg-clip-text text-transparent">
              Schedule
            </h1>
            <p className="text-slate-600 mt-1">
              Manage your appointments and medication schedule
            </p>
          </div>
          <Button className="mt-4 sm:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Calendar
              </CardTitle>
              <CardDescription>
                View and manage your healthcare schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                className="w-full"
                modifiers={{
                  hasEvents: (date) => getEventsForDate(date).length > 0
                }}
                modifiersClassNames={{
                  hasEvents: "bg-medical-50 text-medical-900 font-semibold"
                }}
              />
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>
                Next 7 days
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.length === 0 ? (
                <p className="text-slate-500 text-sm">No upcoming events</p>
              ) : (
                upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-slate-600">
                        {format(event.date, 'MMM d')}
                        {event.time && ` at ${event.time}`}
                      </p>
                      {event.location && (
                        <p className="text-xs text-slate-500">{event.location}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Selected Date Events */}
        <Card>
          <CardHeader>
            <CardTitle>
              Events for {format(selectedDate, 'MMMM d, yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length === 0 ? (
              <p className="text-slate-500">No events scheduled for this date</p>
            ) : (
              <div className="space-y-4">
                {selectedDateEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg border ${getEventColor(event.type)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getEventIcon(event.type)}
                        <div>
                          <h3 className="font-semibold">{event.title}</h3>
                          {event.time && (
                            <p className="text-sm opacity-80">{event.time}</p>
                          )}
                          {event.location && (
                            <p className="text-sm opacity-80">{event.location}</p>
                          )}
                          {event.medication && (
                            <p className="text-sm opacity-80">
                              Medication: {event.medication}
                            </p>
                          )}
                          <p className="text-sm mt-2">{event.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {event.type === 'note' ? 'Patient Note' : event.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Schedule;
