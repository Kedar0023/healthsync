'use client'
import React, { useState } from 'react';
import { trpc } from '@/tRPC/client/client';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Calendar, Pill, FileText, AlertTriangle, Activity, Clock } from "lucide-react";

const Page = () => {
  const { id } = useParams();
  const [darkMode, setDarkMode] = useState(false);

  // Fetch user data using TRPC
  const { data: userData, isLoading } = trpc.getUserData.useQuery({ userId: id as string });

  // Fetch additional data
  const { data: chronicConditions, isLoading: conditionsLoading } = trpc.user.getChronicConditions.useQuery(undefined, { enabled: !!id });
  const { data: allergies, isLoading: allergiesLoading } = trpc.user.getAllergies.useQuery(undefined, { enabled: !!id });
  const { data: currentMedications, isLoading: medicationsLoading } = trpc.user.getCurrentMedications.useQuery(undefined, { enabled: !!id });

  if (isLoading || conditionsLoading || allergiesLoading || medicationsLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!userData) {
    return <div className='flex items-center justify-center text-6xl h-screen'>No data available</div>;
  }

  const formatDate = (date: string | null) => {
    if (!date) return 'Not specified';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'dark bg-neutral-900 text-white' : 'bg-neutral-50'}`}>
      {/* Header with Toggle */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{userData.name}'s Medical Details</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Profile */}
        <Card className="shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-neutral-800 dark:border-neutral-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">Basic Profile</CardTitle>
            <Activity className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-neutral-500 dark:text-neutral-400">Date of Birth:</span>
                <span className="font-medium">{formatDate(userData.dateOfBirth)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500 dark:text-neutral-400">Blood Type:</span>
                <span className="font-medium">{userData.bloodGroup || 'Not specified'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500 dark:text-neutral-400">Gender:</span>
                <span className="font-medium">{userData.gender || 'Not specified'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chronic Conditions */}
        <Card className="shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-neutral-800 dark:border-neutral-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">Chronic Conditions</CardTitle>
            <AlertTriangle className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
          </CardHeader>
          <CardContent>
            {(chronicConditions ?? []).length > 0 ? (
              <div className="space-y-2">
                {(chronicConditions ?? []).map((condition) => (
                  <div
                    key={condition.id}
                    className="p-3 rounded-lg bg-yellow-50/80 border border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800 transition-colors duration-200 hover:bg-yellow-100/80 dark:hover:bg-yellow-900/30"
                  >
                    <div className="font-medium">{condition.condition}</div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      Severity: {condition.severity || 'Not specified'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 dark:text-neutral-400">No chronic conditions recorded</p>
            )}
          </CardContent>
        </Card>

        {/* Allergies */}
        <Card className="shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-neutral-800 dark:border-neutral-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">Allergies</CardTitle>
            <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400" />
          </CardHeader>
          <CardContent>
            {(allergies ?? []).length > 0 ? (
              <div className="space-y-2">
                {(allergies ?? []).map((allergy) => (
                  <div
                    key={allergy.id}
                    className="p-3 rounded-lg bg-red-50/80 border border-red-200 dark:bg-red-900/20 dark:border-red-800 transition-colors duration-200 hover:bg-red-100/80 dark:hover:bg-red-900/30"
                  >
                    <div className="font-medium">{allergy.name}</div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      Severity: {allergy.severity || 'Not specified'}
                      {allergy.reaction && <div>Reaction: {allergy.reaction}</div>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 dark:text-neutral-400">No allergies recorded</p>
            )}
          </CardContent>
        </Card>

        {/* Current Medications */}
        <Card className="shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-neutral-800 dark:border-neutral-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">Current Medications</CardTitle>
            <Pill className="h-5 w-5 text-green-500 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            {(currentMedications ?? []).length > 0 ? (
              <div className="space-y-2">
                {(currentMedications ?? []).map((medication) => (
                  <div
                    key={medication.id}
                    className="p-3 rounded-lg bg-green-50/80 border border-green-200 dark:bg-green-900/20 dark:border-green-800 transition-colors duration-200 hover:bg-green-100/80 dark:hover:bg-green-900/30"
                  >
                    <div className="font-medium">{medication.name}</div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      <div>Dosage: {medication.dosage}</div>
                      <div>Frequency: {medication.frequency}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 dark:text-neutral-400">No current medications</p>
            )}
          </CardContent>
        </Card>

        {/* Appointments */}
        <Card className="shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-neutral-800 dark:border-neutral-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">Recent Appointments</CardTitle>
            <Calendar className="h-5 w-5 text-purple-500 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            {userData.appointments && userData.appointments.length > 0 ? (
              <div className="space-y-2">
                {userData.appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-3 rounded-lg bg-purple-50/80 border border-purple-200 dark:bg-purple-900/20 dark:border-purple-800 transition-colors duration-200 hover:bg-purple-100/80 dark:hover:bg-purple-900/30"
                  >
                    <div className="font-medium">{appointment.doctorName}</div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      <div>Date: {formatDate(appointment.date as string)}</div>
                      <div>Type: {appointment.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 dark:text-neutral-400">No appointments recorded</p>
            )}
          </CardContent>
        </Card>

        {/* Medical Records */}
        <Card className="shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-neutral-800 dark:border-neutral-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">Medical Records</CardTitle>
            <FileText className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            {userData.medicalRecords && userData.medicalRecords.length > 0 ? (
              <div className="space-y-2">
                {userData.medicalRecords.map((record) => (
                  <div
                    key={record.id}
                    className="p-3 rounded-lg bg-blue-50/80 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 transition-colors duration-200 hover:bg-blue-100/80 dark:hover:bg-blue-900/30"
                  >
                    <div className="font-medium">{record.title}</div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      <div>Type: {record.recordType}</div>
                      <div>Date: {formatDate(record.date as string)}</div>
                      {record.doctorName && <div>Doctor: {record.doctorName}</div>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 dark:text-neutral-400">No medical records available</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;