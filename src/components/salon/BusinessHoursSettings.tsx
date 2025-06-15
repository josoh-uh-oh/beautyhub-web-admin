import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { WeeklyHoursCard } from './cards/WeeklyHoursCard';
import { SpecialClosuresCard } from './cards/SpecialClosuresCard';

interface TimeSlot {
  from: string;
  to: string;
}

interface DaySchedule {
  isOpen: boolean;
  slots: TimeSlot[];
}

interface SpecialClosure {
  id: string;
  date: string;
  description: string;
}

export const BusinessHoursSettings = () => {
  const { toast } = useToast();
  const [schedule, setSchedule] = useState<Record<string, DaySchedule>>({
    monday: { isOpen: true, slots: [{ from: '09:00', to: '18:00' }] },
    tuesday: { isOpen: true, slots: [{ from: '09:00', to: '18:00' }] },
    wednesday: { isOpen: true, slots: [{ from: '09:00', to: '18:00' }] },
    thursday: { isOpen: true, slots: [{ from: '09:00', to: '18:00' }] },
    friday: { isOpen: true, slots: [{ from: '09:00', to: '18:00' }] },
    saturday: { isOpen: true, slots: [{ from: '09:00', to: '17:00' }] },
    sunday: { isOpen: false, slots: [] }
  });

  const [specialClosures, setSpecialClosures] = useState<SpecialClosure[]>([
    { id: '1', date: '2024-01-01', description: 'New Year\'s Day' },
    { id: '2', date: '2024-12-25', description: 'Christmas Day' }
  ]);

  const [isAddClosureOpen, setIsAddClosureOpen] = useState(false);
  const [newClosure, setNewClosure] = useState({ date: '', description: '' });

  const toggleDay = (day: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        isOpen: !prev[day].isOpen,
        slots: !prev[day].isOpen ? [{ from: '09:00', to: '18:00' }] : []
      }
    }));
  };

  const updateTimeSlot = (day: string, slotIndex: number, field: 'from' | 'to', value: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.map((slot, index) =>
          index === slotIndex ? { ...slot, [field]: value } : slot
        )
      }
    }));
  };

  const addTimeSlot = (day: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { from: '09:00', to: '18:00' }]
      }
    }));
  };

  const removeTimeSlot = (day: string, slotIndex: number) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((_, index) => index !== slotIndex)
      }
    }));
  };

  const validateTimeSlots = (slots: TimeSlot[]): boolean => {
    for (const slot of slots) {
      if (slot.from >= slot.to) {
        return false;
      }
    }
    
    // Check for overlapping slots
    const sortedSlots = [...slots].sort((a, b) => a.from.localeCompare(b.from));
    for (let i = 0; i < sortedSlots.length - 1; i++) {
      if (sortedSlots[i].to > sortedSlots[i + 1].from) {
        return false;
      }
    }
    
    return true;
  };

  const addSpecialClosure = () => {
    setSpecialClosures(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        date: newClosure.date,
        description: newClosure.description.trim()
      }
    ]);
    
    setNewClosure({ date: '', description: '' });
    setIsAddClosureOpen(false);
    
    toast({
      title: "Special closure added",
      description: "The closure date has been added to your calendar.",
    });
  };

  const removeSpecialClosure = (id: string) => {
    setSpecialClosures(prev => prev.filter(closure => closure.id !== id));
  };

  const handleSave = () => {
    // Validate all time slots
    for (const [day, daySchedule] of Object.entries(schedule)) {
      if (daySchedule.isOpen && !validateTimeSlots(daySchedule.slots)) {
        toast({
          title: "Invalid time configuration",
          description: `Please check the time slots for ${day}. Times cannot overlap and end time must be after start time.`,
          variant: "destructive"
        });
        return;
      }
    }

    // Here you would typically save to your backend
    console.log('Saving business hours:', { schedule, specialClosures });
    
    toast({
      title: "Business hours saved",
      description: "Your business hours and special closures have been updated successfully!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
          Save All Changes
        </Button>
      </div>

      <WeeklyHoursCard
        schedule={schedule}
        onToggleDay={toggleDay}
        onUpdateTimeSlot={updateTimeSlot}
        onAddTimeSlot={addTimeSlot}
        onRemoveTimeSlot={removeTimeSlot}
      />

      <SpecialClosuresCard
        specialClosures={specialClosures}
        isAddClosureOpen={isAddClosureOpen}
        onAddClosureOpenChange={setIsAddClosureOpen}
        newClosure={newClosure}
        onNewClosureChange={setNewClosure}
        onAddClosure={addSpecialClosure}
        onRemoveClosure={removeSpecialClosure}
      />
    </div>
  );
};
