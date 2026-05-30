export type ClientStatus = 'active' | 'on_progress' | 'completed' | 'inactive';
export type SessionType = string;
export type FileType = 'pdf' | 'txt' | 'md' | 'doc' | 'image' | 'audio' | 'other';
export type NoteType = string;
export type SessionMood = string;
export type GoalStatus = 'active' | 'completed' | 'paused' | 'archived';

export interface Client {
  id: string;
  orgId: string;
  coachId: string;
  name: string;
  email?: string | null;
  whatsapp?: string | null;
  phone?: string | null;
  company?: string | null;
  jobTitle?: string | null;
  avatar?: string | null;
  status: ClientStatus;
  phase: string;
  goal?: string | null;
  bio?: string | null;
  tags: string[];
  progress: number;
  totalSessions: number;
  nextSession?: string | null;
  lastSessionAt?: string | null;
  goalFocusArea?: string | null;
  templateData?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientFile {
  id: string;
  clientId: string;
  name: string;
  type: FileType;
  size: number;
  category: string;
  description?: string | null;
  uploadedAt: string;
  content?: string | null;
}

export interface Session {
  id: string;
  clientId: string;
  type: SessionType;
  title: string;
  date: string;
  duration: number;
  notes: string;
  summary?: string | null;
  actionItems: string[];
  mood?: string | null;
  insights: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ClientNote {
  id: string;
  clientId: string;
  content: string;
  type: NoteType;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClientGoal {
  id: string;
  clientId: string;
  title: string;
  description?: string | null;
  targetDate?: string | null;
  progress: number;
  status: GoalStatus;
  category?: string | null;
  milestones: { title: string; completed: boolean; date?: string }[];
  createdAt: string;
  updatedAt: string;
}
