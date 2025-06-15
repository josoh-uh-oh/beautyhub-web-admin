
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SpecialClosure {
  id: string;
  date: string;
  description: string;
}

interface AddClosureDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newClosure: { date: string; description: string };
  onNewClosureChange: (closure: { date: string; description: string }) => void;
  specialClosures: SpecialClosure[];
  onAddClosure: () => void;
}

export const AddClosureDialog = ({
  isOpen,
  onOpenChange,
  newClosure,
  onNewClosureChange,
  specialClosures,
  onAddClosure
}: AddClosureDialogProps) => {
  const { toast } = useToast();

  const handleAddClosure = () => {
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

    onAddClosure();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
              onChange={(e) => onNewClosureChange({ ...newClosure, date: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="closure-description">Description</Label>
            <Input
              id="closure-description"
              placeholder="e.g., New Year's Day, Staff Training"
              value={newClosure.description}
              onChange={(e) => onNewClosureChange({ ...newClosure, description: e.target.value })}
              maxLength={100}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddClosure} className="bg-orange-500 hover:bg-orange-600">
            Add Closure
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
