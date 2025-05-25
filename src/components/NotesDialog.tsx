import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StickyNote, Plus } from "lucide-react";
import { format } from "date-fns";

interface Note {
  id: string;
  date: Date;
  content: string;
}

// Mock data for existing notes
const mockNotes: Note[] = [
  {
    id: '1',
    date: new Date(2024, 11, 27),
    content: "Feeling much better today. The new medication seems to be working well. Energy levels are up and I'm sleeping better."
  },
  {
    id: '2',
    date: new Date(2024, 11, 25),
    content: "Had some mild side effects yesterday - slight nausea in the morning. Will monitor and discuss with doctor if it continues."
  }
];

export const NotesDialog = () => {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [newNote, setNewNote] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSaveNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        date: new Date(),
        content: newNote.trim()
      };
      setNotes([note, ...notes]);
      setNewNote('');
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-10 w-10 touch-manipulation">
          <StickyNote className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <StickyNote className="h-5 w-5" />
            Patient Notes
          </DialogTitle>
          <DialogDescription>
            Record how you're feeling and track your progress over time.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* New Note Entry */}
          <div className="space-y-3 p-4 bg-slate-50 rounded-lg border">
            <Label htmlFor="new-note" className="text-base font-medium">
              How are you feeling?
            </Label>
            <Textarea
              id="new-note"
              placeholder="Share how you're feeling today, any symptoms, improvements, or concerns..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setNewNote('')}>
                Clear
              </Button>
              <Button onClick={handleSaveNote} disabled={!newNote.trim()}>
                <Plus className="h-4 w-4 mr-2" />
                Save Note
              </Button>
            </div>
          </div>

          {/* Existing Notes */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">Previous Notes</h3>
            {notes.length === 0 ? (
              <p className="text-slate-500 text-sm">No notes recorded yet.</p>
            ) : (
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {notes.map((note) => (
                  <div key={note.id} className="p-3 bg-white border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-600">
                        {format(note.date, 'MMMM d, yyyy')}
                      </span>
                      <span className="text-xs text-slate-400">
                        {format(note.date, 'h:mm a')}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 whitespace-pre-wrap">
                      {note.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
