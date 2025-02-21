import { useNotes } from "@/context/NotesContext";
import { Note } from "@prisma/client";

const NoteCard = (note: Note) => {
  const { deleteNote, setSelectedNote } = useNotes();

  return (
    <div className="w-full max-w-2xl px-4 py-2 bg-white rounded-md shadow-md text-neutral-800 flex justify-between">
      <div>
        <h2 className="text-2xl font-bold">{note.title}</h2>
        <p>{note.content}</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <button
          type="button"
          className="text-white bg-red-600 rounded-md px-4"
          onClick={() => deleteNote(note.id)}
        >
          Delete
        </button>
        <button
          type="button"
          className="text-white bg-blue-600 rounded-md px-4"
          onClick={() => setSelectedNote(note)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
