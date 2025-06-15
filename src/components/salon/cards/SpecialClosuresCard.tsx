
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, X } from 'lucide-react';
import { AddClosureDialog } from './AddClosureDialog';
import { useToast } from '@/hooks/use-toast';

interface SpecialClosure {
  id: string;
  date: string;
  description: string;
}

interface SpecialClosuresCardProps {
  specialClosures: SpecialClosure[];
  isAddClosureOpen: boolean;
  onAddClosureOpenChange: (open: boolean) => void;
  newClosure: { date: string; description: string };
  onNewClosureChange: (closure: { date: string; description: string }) => void;
  onAddClosure: () => void;
  onRemoveClosure: (id: string) => void;
}

export const SpecialClosuresCard = ({
  specialClosures,
  isAddClosureOpen,
  onAddClosureOpenChange,
  newClosure,
  onNewClosureChange,
  onAddClosure,
  onRemoveClosure
}: SpecialClosuresCardProps) => {
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleRemoveClosure = (id: string) => {
    onRemoveClosure(id);
    toast({
      title: "Special closure removed",
      description: "The closure date has been removed from your calendar.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Special Closures / Holidays</span>
          </div>
          <AddClosureDialog
            isOpen={isAddClosureOpen}
            onOpenChange={onAddClosureOpenChange}
            newClosure={newClosure}
            onNewClosureChange={onNewClosureChange}
            specialClosures={specialClosures}
            onAddClosure={onAddClosure}
          />
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
                        onClick={() => handleRemoveClosure(closure.id)}
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
  );
};
