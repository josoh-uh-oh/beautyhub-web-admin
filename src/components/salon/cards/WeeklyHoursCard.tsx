
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { DayScheduleRow } from './DayScheduleRow';
import { useLanguage } from '@/hooks/useLanguage';

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
  const { t } = useLanguage();
  const daysOfWeek = [
    { key: 'monday', label: t('monday') },
    { key: 'tuesday', label: t('tuesday') },
    { key: 'wednesday', label: t('wednesday') },
    { key: 'thursday', label: t('thursday') },
    { key: 'friday', label: t('friday') },
    { key: 'saturday', label: t('saturday') },
    { key: 'sunday', label: t('sunday') }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>{t('weeklyHoursTitle')}</span>
        </CardTitle>
        <CardDescription>
          {t('weeklyHoursDescription')}
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
