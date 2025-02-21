"use client";

import { useNotes } from "@/context/NotesContext";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef } from "react";

export default function NoteForm() {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  const { createNote, selectedNote, setSelectedNote, updateNote } = useNotes();

  useEffect(() => {
    if (selectedNote) {
      if (titleRef.current) {
        titleRef.current.value = selectedNote.title;
      }
      if (contentRef.current) {
        contentRef.current.textContent = selectedNote.content;
      }
    } else {
      if (titleRef.current) {
        titleRef.current.value = "";
      }
      if (contentRef.current) {
        contentRef.current.textContent = "";
      }
    }
  }, [selectedNote]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const jsonObject: Record<string, string> = {};
    formData.forEach((value, key) => {
      jsonObject[key] = value as string;
    });

    if (selectedNote) {
      // update note
      await updateNote({
        id: selectedNote.id,
        note: {
          title: jsonObject.title,
          content: jsonObject.content,
        },
      });
      setSelectedNote(null);
    } else {
      // create note
      await createNote({
        title: jsonObject.title,
        content: jsonObject.content,
      });
    }

    formRef.current?.reset();
    titleRef.current?.focus();
    router.refresh();
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full max-w-sm flex flex-col gap-2"
    >
      <h1 className="text-2xl font-bold">Create Note</h1>
      <input
        ref={titleRef}
        type="text"
        name="title"
        autoFocus
        placeholder="title"
        className="w-full px-4 py-2 text-[#333] bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <textarea
        ref={contentRef}
        name="content"
        autoFocus
        placeholder="content"
        className="w-full px-4 py-2 text-[#333] bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <div className="flex gap-4">
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md"
        >
          {selectedNote ? "Update" : "Create"}
        </button>
        {selectedNote && (
          <button
            type="button"
            className="w-full px-4 py-2 text-white bg-slate-400 rounded-md hover:bg-red-600"
            onClick={() => setSelectedNote(null)}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
