export interface NicheTemplate {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  version: string;
  terminology: {
    client: string;
    session: string;
    coach: string;
    phase: string;
    goal: string;
    note: string;
    clientInactive: string;
    clientPlural: string;
    sessionPlural: string;
    goalPlural: string;
    notePlural: string;
  };
  phases: Array<{
    id: string;
    name: string;
    description: string;
    color: string;
    order: number;
  }>;
  sessionTypes: Array<{
    id: string;
    name: string;
    icon: string;
    defaultDuration: number;
  }>;
  goalCategories: Array<{
    id: string;
    name: string;
  }>;
  noteTypes: Array<{
    id: string;
    name: string;
  }>;
  aiTools: Array<{
    id: string;
    name: string;
    icon: string;
    description: string;
    systemPrompt: string;
    quickChips: Array<{ label: string; query: string }>;
  }>;
  goalFocusAreas: Array<{
    id: string;
    name: string;
  }>;
  moods: Array<{ id: string; name: string }>;
}

export type TemplateId =
  | 'manifestasi'
  | 'business'
  | 'health'
  | 'career'
  | 'relationship'
  | 'creative'
  | 'custom';
