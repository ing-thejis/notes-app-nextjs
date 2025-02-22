"use client";

import { useEffect } from "react";
import { useNotes } from "@/context/NotesContext";
import { LoaderSpinner, NoteCard, NoteForm } from "@/components";

export default function Home() {
  const { notes, loadNotes, loading } = useNotes();

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="w-full h-full mx-auto max-w-4xl flex items-start justify-center gap-5 py-5">
      <NoteForm />
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-5">
          {notes.map((note) => (
            <NoteCard key={note.id} {...note} />
          ))}
        </div>
      )}
    </div>
  );
}
