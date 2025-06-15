
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Plus, X, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

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
    if (schedule[day].slots.length <= 1) {
      toast({
        title: "Cannot remove slot",
        description: "At least one time slot is required when the day is open.",
        variant: "destructive"
      });
      return;
    }

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
    if (!newClosure.date || !newClosure.description.trim()) {
      toast({
        title: "Invalid input",
        description: "Please provide both date and description for the special closure.",
        variant: "destructive"
      });
      return;
    }

    // Check if date is not in the past
    const selectedDate = new Date(newClosure.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      toast({
        title: "Invalid date",
        description: "Cannot add closure for a past date.",
        variant: "destructive"
      });
      return;
    }

    // Check for duplicate dates
    const isDuplicate = specialClosures.some(closure => closure.date === newClosure.date);
    if (isDuplicate) {
      toast({
        title: "Duplicate date",
        description: "A closure already exists for this date.",
        variant: "destructive"
      });
      return;
    }

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
    toast({
      title: "Special closure removed",
      description: "The closure date has been removed from your calendar.",
    });
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Business Hours & Closures</h2>
        <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
          Save All Changes
        </Button>
      </div>

      {/* Standard Weekly Hours */}
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
            <div key={day.key} className="flex items-start space-x-4 p-4 border rounded-lg">
              <div className="w-20 font-medium text-sm pt-2">
                {day.label}
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={schedule[day.key].isOpen}
                    onCheckedChange={() => toggleDay(day.key)}
                  />
                  <Label className="text-sm">
                    {schedule[day.key].isOpen ? 'Open' : 'Closed'}
                  </Label>
                </div>
              </div>
              {schedule[day.key].isOpen ? (
                <div className="flex-1 space-y-2">
                  {schedule[day.key].slots.map((slot, slotIndex) => (
                    <div key={slotIndex} className="flex items-center space-x-2">
                      <Input
                        type="time"
                        value={slot.from}
                        onChange={(e) => updateTimeSlot(day.key, slotIndex, 'from', e.target.value)}
                        className="w-32"
                      />
                      <span className="text-gray-500 text-sm">to</span>
                      <Input
                        type="time"
                        value={slot.to}
                        onChange={(e) => updateTimeSlot(day.key, slotIndex, 'to', e.target.value)}
                        className="w-32"
                      />
                      {schedule[day.key].slots.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeTimeSlot(day.key, slotIndex)}
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
                    onClick={() => addTimeSlot(day.key)}
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
          ))}
        </CardContent>
      </Card>

      {/* Special Closures */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Special Closures / Holidays</span>
            </div>
            <Dialog open={isAddClosureOpen} onOpenChange={setIsAddClosureOpen}>
              <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Special Closure
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Special Closure</DialogTitle>
                  <DialogDescription>
                    Add specific dates your salon is closed. These will override your standard weekly hours.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="closure-date">Date</Label>
                    <Input
                      id="closure-date"
                      type="date"
                      value={newClosure.date}
                      onChange={(e) => setNewClosure(prev => ({ ...prev, date: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="closure-description">Description</Label>
                    <Input
                      id="closure-description"
                      placeholder="e.g., New Year's Day, Staff Training"
                      value={newClosure.description}
                      onChange={(e) => setNewClosure(prev => ({ ...prev, description: e.target.value }))}
                      maxLength={100}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddClosureOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={addSpecialClosure} className="bg-orange-500 hover:bg-orange-600">
                    Add Closure
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardTitle>
          <CardDescription>
            Add specific dates your salon is closed. These will override your standard weekly hours.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {specialClosures.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {specialClosures
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((closure) => (
                    <TableRow key={closure.id}>
                      <TableCell className="font-medium">
                        {formatDate(closure.date)}
                      </TableCell>
                      <TableCell>{closure.description}</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeSpecialClosure(closure.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No special closures configured. Add closure dates for holidays or special events.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
