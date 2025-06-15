
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TimeSlot {
  from: string;
  to: string;
}

interface DaySchedule {
  isOpen: boolean;
  slots: TimeSlot[];
}

interface DayScheduleRowProps {
  day: { key: string; label: string };
  schedule: DaySchedule;
  onToggleDay: (day: string) => void;
  onUpdateTimeSlot: (day: string, slotIndex: number, field: 'from' | 'to', value: string) => void;
  onAddTimeSlot: (day: string) => void;
  onRemoveTimeSlot: (day: string, slotIndex: number) => void;
}

export const DayScheduleRow = ({
  day,
  schedule,
  onToggleDay,
  onUpdateTimeSlot,
  onAddTimeSlot,
  onRemoveTimeSlot
}: DayScheduleRowProps) => {
  const { toast } = useToast();

  const handleRemoveTimeSlot = (slotIndex: number) => {
    if (schedule.slots.length <= 1) {
      toast({
        title: "Cannot remove slot",
        description: "At least one time slot is required when the day is open.",
        variant: "destructive"
      });
      return;
    }
    onRemoveTimeSlot(day.key, slotIndex);
  };

  return (
    <div className="flex items-start space-x-4 p-4 border rounded-lg">
      <div className="w-20 font-medium text-sm pt-2">
        {day.label}
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={schedule.isOpen}
            onCheckedChange={() => onToggleDay(day.key)}
          />
          <Label className="text-sm">
            {schedule.isOpen ? 'Open' : 'Closed'}
          </Label>
        </div>
      </div>
      {schedule.isOpen ? (
        <div className="flex-1 space-y-2">
          {schedule.slots.map((slot, slotIndex) => (
            <div key={slotIndex} className="flex items-center space-x-2">
              <Input
                type="time"
                value={slot.from}
                onChange={(e) => onUpdateTimeSlot(day.key, slotIndex, 'from', e.target.value)}
                className="w-32"
              />
              <span className="text-gray-500 text-sm">to</span>
              <Input
                type="time"
                value={slot.to}
                onChange={(e) => onUpdateTimeSlot(day.key, slotIndex, 'to', e.target.value)}
                className="w-32"
              />
              {schedule.slots.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveTimeSlot(slotIndex)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddTimeSlot(day.key)}
            className="mt-2"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Slot
          </Button>
        </div>
      ) : (
        <div className="flex-1 text-gray-500 text-sm pt-2">Closed</div>
      )}
    </div>
  );
};
