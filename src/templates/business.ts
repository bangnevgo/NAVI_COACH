import { NicheTemplate } from './types';

const business: NicheTemplate = {
  id: 'business',
  name: 'Bisnis & Leadership',
  slug: 'business',
  icon: 'Briefcase',
  description: 'Executive coaching dan leadership development untuk profesional dan entrepreneur.',
  version: '1.0',
  terminology: {
    client: 'Klien',
    session: 'Sesi',
    coach: 'Coach',
    phase: 'Tahap',
    goal: 'Target',
    note: 'Catatan',
    clientInactive: 'Tidak Aktif',
    clientPlural: 'Klien',
    sessionPlural: 'Sesi',
    goalPlural: 'Target',
    notePlural: 'Catatan',
  },
  phases: [
    { id: 'discovery', name: 'Discovery', description: 'Eksplorasi kondisi saat ini dan aspirasi klien', color: '#4C8DFF', order: 0 },
    { id: 'assessment', name: 'Assessment', description: 'Evaluasi kompetensi, kekuatan, dan area pengembangan', color: '#9D7EE8', order: 1 },
    { id: 'strategy', name: 'Strategy', description: 'Perencanaan strategi dan perumusan target', color: '#E8935D', order: 2 },
    { id: 'execution', name: 'Execution', description: 'Implementasi aksi dan akuntabilitas', color: '#4DBCC9', order: 3 },
    { id: 'review', name: 'Review', description: 'Evaluasi hasil dan penyesuaian strategi', color: '#4CAF82', order: 4 },
  ],
  sessionTypes: [
    { id: 'strategy', name: 'Strategy Session', icon: 'Target', defaultDuration: 90 },
    { id: 'coaching', name: 'Coaching Session', icon: 'MessageCircle', defaultDuration: 60 },
    { id: 'review', name: 'Review & Planning', icon: 'BarChart3', defaultDuration: 45 },
    { id: 'accountability', name: 'Accountability Check-in', icon: 'CheckCircle', defaultDuration: 30 },
    { id: 'crisis', name: 'Crisis Management', icon: 'AlertTriangle', defaultDuration: 60 },
  ],
  goalCategories: [
    { id: 'revenue', name: 'Revenue & Profit' },
    { id: 'leadership', name: 'Leadership' },
    { id: 'team', name: 'Team Building' },
    { id: 'strategy', name: 'Strategi Bisnis' },
    { id: 'operations', name: 'Operasional' },
    { id: 'personal', name: 'Pengembangan Diri' },
  ],
  noteTypes: [
    { id: 'general', name: 'Catatan Umum' },
    { id: 'session', name: 'Catatan Sesi' },
    { id: 'insight', name: 'Insight' },
    { id: 'action_item', name: 'Action Item' },
    { id: 'decision', name: 'Keputusan Kunci' },
    { id: 'stakeholder', name: 'Stakeholder Note' },
  ],
  goalFocusAreas: [
    { id: 'revenue', name: 'Revenue Growth' },
    { id: 'team', name: 'Team & Culture' },
    { id: 'strategy', name: 'Strategi & Positioning' },
    { id: 'leadership', name: 'Personal Leadership' },
    { id: 'operations', name: 'Operasional & Efisiensi' },
    { id: 'scale', name: 'Scaling & Expansion' },
  ],
  moods: [
    { id: 'motivated', name: 'Termotivasi' },
    { id: 'focused', name: 'Fokus' },
    { id: 'neutral', name: 'Netral' },
    { id: 'stressed', name: 'Stres' },
    { id: 'stuck', name: 'Mandek' },
  ],
  aiTools: [
    {
      id: 'intake',
      name: 'Business Intake Analysis',
      icon: 'ClipboardList',
      description: 'Analisis komprehensif kondisi bisnis dan leadership klien',
      systemPrompt: `Kamu adalah AI executive coach spesialis bisnis dan leadership. Analisis data klien berikut dan buat rencana coaching yang komprehensif.

Info Klien:
Nama: {{clientName}}
Perusahaan: {{clientCompany}}
Posisi: {{clientJobTitle}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}
Bio: {{clientBio}}

Buat analisis yang mencakup:
1. Ringkasan profil klien (posisi, tantangan, aspirasi)
2. Analisis situasi bisnis saat ini (strengths & gaps)
3. 3 target utama yang realistis dan measurable
4. Identifikasi area leadership yang perlu dikembangkan
5. Langkah aksi pertama (3 hal konkret minggu ini)
6. Agenda untuk sesi coaching pertama

Format profesional dalam Bahasa Indonesia.`,
      quickChips: [
        { label: 'SWOT Pribadi', query: 'Buatkan analisis SWOT personal untuk klien ini' },
        { label: 'Prioritas', query: 'Apa 3 prioritas utama klien ini dan mengapa?' },
        { label: 'Quick Win', query: 'Apa quick win yang bisa dicapai dalam 7 hari?' },
      ],
    },
    {
      id: 'assessment',
      name: '360 Leadership Assessment',
      icon: 'Users',
      description: 'Asesmen kepemimpinan dari berbagai perspektif',
      systemPrompt: `Kamu adalah AI executive coach spesialis leadership assessment. Buat framework asesmen 360 derajat untuk klien.

Info Klien:
Nama: {{clientName}}
Perusahaan: {{clientCompany}}
Posisi: {{clientJobTitle}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}

Buat:
1. 8 pertanyaan self-assessment kepemimpinan (skala 1-10)
2. 5 kompetensi leadership utama yang perlu dievaluasi
3. Framework untuk mendapatkan feedback dari tim
4. Competency matrix untuk mengukur perkembangan
5. Rencana development areas berdasarkan hasil assessment

Format dalam Bahasa Indonesia yang profesional dan actionable.`,
      quickChips: [
        { label: 'Kompetensi Kunci', query: 'Apa 5 kompetensi leadership kunci untuk posisi ini?' },
        { label: 'Feedback Questions', query: 'Pertanyaan feedback untuk tim dan atasan' },
        { label: 'Development Plan', query: 'Rencana pengembangan leadership 90 hari' },
      ],
    },
    {
      id: 'strategy',
      name: 'Strategy Generator',
      icon: 'Lightbulb',
      description: 'Generate strategi bisnis dan rencana aksi terstruktur',
      systemPrompt: `Kamu adalah AI business strategist. Buat strategi bisnis yang actionable dan terukur.

Info Klien:
Nama: {{clientName}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}
Perusahaan: {{clientCompany}}
Fase Saat Ini: {{currentPhase}}

Buat:
1. One-page strategy — ringkasan strategi dalam satu halaman
2. 3 strategic priorities untuk 90 hari ke depan
3. Key initiatives untuk setiap priority (masing-masing 3 inisiatif)
4. KPI untuk mengukur setiap prioritas
5. Resource allocation — waktu dan energi untuk setiap inisiatif
6. Risk assessment — potensi hambatan dan mitigasi

Dalam Bahasa Indonesia yang profesional dan langsung-to-the-point.`,
      quickChips: [
        { label: 'One-Page Strategy', query: 'Buat ringkasan strategi satu halaman untuk klien' },
        { label: 'Initiatives', query: 'Rekomendasi inisiatif konkret untuk 30 hari ke depan' },
        { label: 'KPIs', query: 'KPI yang harus dilacak untuk mengukur kemajuan' },
      ],
    },
    {
      id: 'progress',
      name: 'Progress & Accountability',
      icon: 'TrendingUp',
      description: 'Laporan progress dan rekomendasi penyesuaian strategi',
      systemPrompt: `Kamu adalah AI executive coach. Analisis progress klien dalam mencapai target bisnis dan leadership.

Info Klien:
Nama: {{clientName}}
Goal: {{clientGoal}}
Fase Saat Ini: {{currentPhase}}
Area Fokus: {{goalFocusArea}}
Total Sesi: {{totalSessions}}
Progress: {{progressPercent}}%

Buat laporan yang mencakup:
1. Assessment progress (skala 1-10) dengan justifikasi bisnis
2. KWN (Key Wins & Numbers) — pencapaian yang terukur
3. Gap to target — apa yang masih jauh dari target
4. Adjustment needed — penyesuaian strategi yang diperlukan
5. Next 30-day target — target spesifik berikutnya
6. Accountability check — pertanyaan untuk session berikutnya

Tone: data-driven, encouraging, accountable. Dalam Bahasa Indonesia.`,
      quickChips: [
        { label: 'Performance Review', query: 'Review performa klien dan area yang perlu disesuaikan' },
        { label: 'Accountability', query: 'Pertanyaan accountability untuk sesi berikutnya' },
        { label: 'Next Sprint', query: 'Rencana sprint 30 hari berikutnya' },
      ],
    },
    {
      id: 'team',
      name: 'Team Dynamics Analysis',
      icon: 'Users',
      description: 'Analisis dinamika tim dan rekomendasi pengembangan team',
      systemPrompt: `Kamu adalah AI organizational coach spesialis team dynamics. Analisis dan berikan rekomendasi untuk pengembangan tim klien.

Info Klien:
Nama: {{clientName}}
Posisi: {{clientJobTitle}}
Perusahaan: {{clientCompany}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}

Buat:
1. Assessment gaya kepemimpinan klien saat ini
2. 5 indikator tim berkinerja tinggi vs tim klien saat ini
3. 3 area critical untuk pengembangan tim
4. Team building action plan — langkah konkret 30-60-90 hari
5. Framework komunikasi untuk meningkatkan alignment tim
6. Rekomendasi untuk handling difficult conversations

Format dalam Bahasa Indonesia yang praktis dan applicable.`,
      quickChips: [
        { label: 'Team Assessment', query: 'Asesmen kekuatan dan kelemahan tim klien' },
        { label: 'Hard Conversations', query: 'Panduan percakapan sulit yang mungkin perlu dilakukan' },
        { label: 'Alignment Plan', query: 'Rencana alignment tim untuk 60 hari' },
      ],
    },
  ],
};

export default business;
