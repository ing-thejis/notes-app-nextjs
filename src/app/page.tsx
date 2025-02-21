"use client";

import { useEffect } from "react";
import { useNotes } from "@/context/NotesContext";
import NoteForm from "../components/noteForm";
import NoteCard from "@/components/noteCard";

export default function Home() {
  const { notes, loadNotes } = useNotes();

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="w-full h-full mx-auto max-w-4xl flex flex-col items-center justify-center gap-5 py-5">
      <NoteForm />
      {notes.map((note) => (
        <NoteCard key={note.id} {...note} />
      ))}
    </div>
  );
}
