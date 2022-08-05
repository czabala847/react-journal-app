export interface JournalState {
  isSaving: boolean;
  messageSaved: string;
  notes: unknown[];
  active: Note | null;
}

export interface Note {
  id: string;
  title: string;
  body: string;
  date: number;
  imageUrls: string[];
}
