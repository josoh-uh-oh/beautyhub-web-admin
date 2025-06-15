
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { DayScheduleRow } from './DayScheduleRow';

interface TimeSlot {
  from: string;
  to: string;
}

interface DaySchedule {
  isOpen: boolean;
  slots: TimeSlot[];
}

interface WeeklyHoursCardProps {
  schedule: Record<string, DaySchedule>;
  onToggleDay: (day: string) => void;
  onUpdateTimeSlot: (day: string, slotIndex: number, field: 'from' | 'to', value: string) => void;
  onAddTimeSlot: (day: string) => void;
  onRemoveTimeSlot: (day: string, slotIndex: number) => void;
}

export const WeeklyHoursCard = ({
  schedule,
  onToggleDay,
  onUpdateTimeSlot,
  onAddTimeSlot,
  onRemoveTimeSlot
}: WeeklyHoursCardProps) => {
  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Standard Weekly Hours</span>
        </CardTitle>
        <CardDescription>
          Set your salon's regular opening and closing times. This defines the overall availability for online booking and staff scheduling.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {daysOfWeek.map((day) => (
          <DayScheduleRow
            key={day.key}
            day={day}
            schedule={schedule[day.key]}
            onToggleDay={onToggleDay}
            onUpdateTimeSlot={onUpdateTimeSlot}
            onAddTimeSlot={onAddTimeSlot}
            onRemoveTimeSlot={onRemoveTimeSlot}
          />
        ))}
      </CardContent>
    </Card>
  );
};
