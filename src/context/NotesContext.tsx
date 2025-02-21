"use client";

import { Note } from "@prisma/client";
import { CreateNoteT, UpdateNoteT } from "@/interfaces/notes.types";

import { createContext, useContext, useState } from "react";

const NoteContext = createContext<{
  notes: Note[];
  loadNotes: () => Promise<void>;
  createNote: (note: CreateNoteT) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
  updateNote: ({
    id,
    note,
  }: {
    id: number;
    note: UpdateNoteT;
  }) => Promise<void>;
}>({
  notes: [],
  loadNotes: async () => {},
  createNote: async () => {},
  deleteNote: async () => {},
  selectedNote: null,
  setSelectedNote: () => {},
  updateNote: async () => {},
});

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const loadNotes = async () => {
    try {
      const response = await fetch("/api/notes");
      if (!response.ok) {
        throw new Error("failed to load notes");
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createNote = async (note: CreateNoteT) => {
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error creating note");
      }
      const newNote = await response.json();
      setNotes([...notes, newNote]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async (id: number) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting note");
      }
      const noteDeleted = await response.json();
      setNotes(notes.filter((note) => note.id !== noteDeleted.id));
    } catch (error) {
      console.error(error);
    }
  };

  const updateNote = async ({
    id,
    note,
  }: {
    id: number;
    note: UpdateNoteT;
  }) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error editing note");
      }
      const editedNote = await response.json();
      setNotes(
        notes.map((note) => (note.id === editedNote.id ? editedNote : note))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        loadNotes,
        createNote,
        deleteNote,
        selectedNote,
        setSelectedNote,
        updateNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
