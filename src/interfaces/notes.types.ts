import { Note } from "@prisma/client";

export type CreateNoteT = Omit<Note, "id" | "createdAt" | "updatedAt">;

export type UpdateNoteT = Partial<CreateNoteT>;
