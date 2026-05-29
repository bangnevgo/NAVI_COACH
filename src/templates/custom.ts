import { NicheTemplate } from './types';

const custom: NicheTemplate = {
  id: 'custom',
  name: 'Custom',
  slug: 'custom',
  icon: 'Settings',
  description: 'Mulai dari kosong. Anda yang tentukan fase, tipe sesi, tools, dan terminologi.',
  version: '1.0',
  terminology: {
    client: 'Klien',
    session: 'Sesi',
    coach: 'Coach',
    phase: 'Fase',
    goal: 'Tujuan',
    note: 'Catatan',
    clientInactive: 'Tidak Aktif',
    clientPlural: 'Klien',
    sessionPlural: 'Sesi',
    goalPlural: 'Tujuan',
    notePlural: 'Catatan',
  },
  phases: [
    { id: 'phase-1', name: 'Fase 1', description: 'Definisikan fase coaching Anda', color: '#4C8DFF', order: 0 },
    { id: 'phase-2', name: 'Fase 2', description: 'Tambahkan fase sesuai kebutuhan', color: '#9D7EE8', order: 1 },
    { id: 'phase-3', name: 'Fase 3', description: 'Sesuaikan dengan metode coaching Anda', color: '#E8935D', order: 2 },
  ],
  sessionTypes: [
    { id: 'session-1', name: 'Sesi 1', icon: 'MessageCircle', defaultDuration: 60 },
    { id: 'session-2', name: 'Sesi 2', icon: 'Phone', defaultDuration: 30 },
  ],
  goalCategories: [
    { id: 'cat-1', name: 'Kategori 1' },
    { id: 'cat-2', name: 'Kategori 2' },
  ],
  noteTypes: [
    { id: 'general', name: 'Catatan Umum' },
    { id: 'session', name: 'Catatan Sesi' },
  ],
  goalFocusAreas: [
    { id: 'area-1', name: 'Area 1' },
    { id: 'area-2', name: 'Area 2' },
  ],
  moods: [
    { id: 'good', name: 'Baik' },
    { id: 'neutral', name: 'Netral' },
    { id: 'bad', name: 'Kurang Baik' },
  ],
  aiTools: [
    {
      id: 'general',
      name: 'AI Coaching Assistant',
      icon: 'Bot',
      description: 'Asisten AI general untuk coaching Anda',
      systemPrompt: `Kamu adalah AI coaching assistant. Bantu coach menganalisis data klien dan memberikan insight coaching yang berguna.

Info Klien:
Nama: {{clientName}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}
Bio: {{clientBio}}

Berikan insight coaching yang relevan berdasarkan informasi yang tersedia. Format profesional dalam Bahasa Indonesia.`,
      quickChips: [
        { label: 'Insight', query: 'Berikan insight coaching untuk klien ini' },
        { label: 'Action Plan', query: 'Buat rencana aksi untuk klien' },
        { label: 'Hambatan', query: 'Identifikasi potensi hambatan dan solusinya' },
      ],
    },
  ],
};

export default custom;
