export interface JournalState {
  isSaving: boolean;
  messageSaved: string;
  notes: Note[];
  active: Note | null;
}

export interface Note {
  id: string;
  title: string;
  body: string;
  date: number;
  imageUrls: string[];
}

export interface NoteDTOCreate extends Omit<Note, "id" | "imageUrls"> {}
