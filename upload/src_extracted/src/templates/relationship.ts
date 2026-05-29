import { NicheTemplate } from './types';

const relationship: NicheTemplate = {
  id: 'relationship',
  name: 'Relationship & Family',
  slug: 'relationship',
  icon: 'Heart',
  description: 'Coaching untuk hubungan percintaan, keluarga, dan relasi interpersonal yang lebih sehat.',
  version: '1.0',
  terminology: {
    client: 'Klien',
    session: 'Sesi',
    coach: 'Coach',
    phase: 'Fase',
    goal: 'Tujuan Hubungan',
    note: 'Catatan',
    clientInactive: 'Tidak Aktif',
    clientPlural: 'Klien',
    sessionPlural: 'Sesi',
    goalPlural: 'Tujuan',
    notePlural: 'Catatan',
  },
  phases: [
    { id: 'awareness', name: 'Awareness', description: 'Membangun kesadaran atas pola hubungan dan dinamika', color: '#4C8DFF', order: 0 },
    { id: 'understanding', name: 'Understanding', description: 'Memahami akar masalah dan kebutuhan masing-masing pihak', color: '#9D7EE8', order: 1 },
    { id: 'healing', name: 'Healing', description: 'Proses penyembuhan luka emosi dan trauma relasional', color: '#E8935D', order: 2 },
    { id: 'growth', name: 'Growth', description: 'Membangun pola hubungan baru yang sehat', color: '#4DBCC9', order: 3 },
    { id: 'thriving', name: 'Thriving', description: 'Hubungan yang terjalin kuat dan memuaskan', color: '#4CAF82', order: 4 },
  ],
  sessionTypes: [
    { id: 'coaching', name: 'Relationship Coaching', icon: 'MessageCircle', defaultDuration: 60 },
    { id: 'couple', name: 'Couple Session', icon: 'Heart', defaultDuration: 90 },
    { id: 'individual', name: 'Individual Reflection', icon: 'User', defaultDuration: 45 },
    { id: 'communication', name: 'Communication Workshop', icon: 'MessageSquare', defaultDuration: 60 },
    { id: 'crisis', name: 'Crisis Support', icon: 'HeartCrack', defaultDuration: 45 },
  ],
  goalCategories: [
    { id: 'communication', name: 'Komunikasi' },
    { id: 'trust', name: 'Kepercayaan' },
    { id: 'intimacy', name: 'Keintiman' },
    { id: 'boundaries', name: 'Batasan Sehat' },
    { id: 'conflict', name: 'Resolusi Konflik' },
    { id: 'family', name: 'Dinamika Keluarga' },
  ],
  noteTypes: [
    { id: 'general', name: 'Catatan Umum' },
    { id: 'session', name: 'Catatan Sesi' },
    { id: 'insight', name: 'Insight' },
    { id: 'action_item', name: 'Action Item' },
    { id: 'pattern', name: 'Pola Relasi' },
    { id: 'boundary', name: 'Boundary Note' },
    { id: 'milestone', name: 'Relationship Milestone' },
  ],
  goalFocusAreas: [
    { id: 'romantic', name: 'Hubungan Romantis' },
    { id: 'family', name: 'Hubungan Keluarga' },
    { id: 'friendship', name: 'Pertemanan' },
    { id: 'workplace', name: 'Relasi Kerja' },
    { id: 'self-love', name: 'Self-Love & Self-Worth' },
    { id: 'communication', name: 'Komunikasi Efektif' },
  ],
  moods: [
    { id: 'connected', name: 'Terhubung' },
    { id: 'hopeful', name: 'Penuh Harap' },
    { id: 'neutral', name: 'Netral' },
    { id: 'conflicted', name: 'Berkonflik' },
    { id: 'drained', name: 'Terbebani' },
  ],
  aiTools: [
    {
      id: 'intake',
      name: 'Relationship Intake',
      icon: 'ClipboardList',
      description: 'Analisis dinamika hubungan dan pola relasi klien',
      systemPrompt: `Kamu adalah AI relationship coach yang empatik dan profesional. Analisis data klien berikut dan buat rencana coaching yang komprehensif.

Info Klien:
Nama: {{clientName}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}
Bio: {{clientBio}}

Buat analisis yang mencakup:
1. Ringkasan dinamika hubungan klien (berdasarkan informasi yang tersedia)
2. Identifikasi pola relasi yang mungkin menjadi akar masalah
3. Love languages assessment — kemungkinan love language klien
4. Attachment style indicators — tanda-tanda attachment style
5. 3 area prioritas untuk dikembangkan
6. Langkah aksi pertama untuk perbaikan hubungan

Format empatik dan non-judgmental dalam Bahasa Indonesia.`,
      quickChips: [
        { label: 'Love Language', query: 'Apa kemungkinan love language klien dan cara menggunakannya?' },
        { label: 'Pola Relasi', query: 'Identifikasi pola relasi berulang yang mungkin menghambat klien' },
        { label: 'Quick Practice', query: '3 latihan komunikasi yang bisa dimulai hari ini' },
      ],
    },
    {
      id: 'communication',
      name: 'Communication Guide',
      icon: 'MessageSquare',
      description: 'Panduan komunikasi efektif untuk hubungan yang lebih sehat',
      systemPrompt: `Kamu adalah AI communication coach untuk relationship. Buat panduan komunikasi yang personal dan applicable.

Info Klien:
Nama: {{clientName}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}

Buat:
1. Non-violent communication framework — cara menyampaikan kebutuhan tanpa menyakiti
2. Active listening techniques — 5 teknik mendengar aktif yang bisa dipraktikkan
3. Conflict de-escalation — cara meredakan konflik sebelum membesar
4. Difficult conversation templates — template untuk percakapan sulit
5. Appreciation exercises — cara mengekspresikan apresiasi secara rutin
6. Weekly communication ritual — ritual komunikasi mingguan untuk hubungan

Dalam Bahasa Indonesia yang hangat dan empatik.`,
      quickChips: [
        { label: 'I-Statements', query: 'Ajarkan teknik I-Statements untuk klien dan berikan contoh' },
        { label: 'Conflict De-escalation', query: 'Langkah meredakan konflik yang membesar' },
        { label: 'Appreciation Ritual', query: 'Ritual apresiasi harian/mingguan untuk hubungan klien' },
      ],
    },
    {
      id: 'healing',
      name: 'Healing Guide',
      icon: 'Heart',
      description: 'Panduan proses healing dan rebuilding trust',
      systemPrompt: `Kamu adalah AI therapist-coach untuk relationship healing. Buat panduan healing yang gentle dan bertahap.

Info Klien:
Nama: {{clientName}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}

Buat:
1. Self-compassion practice — latihan kasih sayang pada diri sendiri
2. Boundary setting framework — cara menetapkan batasan yang sehat
3. Trust rebuilding steps — langkah membangun kembali kepercayaan
4. Forgiveness exercise — proses memaafkan (bukan melupakan)
5. Self-love affirmations — afirmasi untuk membangun self-worth
6. Recovery milestones — milestone untuk mengukur progress healing

Sangat empatik, gentle, dan supportive. Dalam Bahasa Indonesia.`,
      quickChips: [
        { label: 'Boundary Setting', query: 'Panduan menetapkan batasan sehat untuk klien' },
        { label: 'Self-Compassion', query: 'Latihan self-compassion yang bisa dilakukan setiap hari' },
        { label: 'Trust Rebuilding', query: 'Langkah membangun kembali kepercayaan dalam hubungan' },
      ],
    },
    {
      id: 'progress',
      name: 'Relationship Progress',
      icon: 'TrendingUp',
      description: 'Monitor progress hubungan dan adjust strategi coaching',
      systemPrompt: `Kamu adalah AI relationship coach. Review progress klien dalam membangun hubungan yang lebih sehat.

Info Klien:
Nama: {{clientName}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}
Fase Saat Ini: {{currentPhase}}
Total Sesi: {{totalSessions}}
Progress: {{progressPercent}}%

Buat laporan yang mencakup:
1. Progress assessment — seberapa jauh perbaikan yang terjadi?
2. Shift positif — perubahan pola yang sudah terlihat
3. Challenges persisting — area yang masih sulit
4. Strategy penyesuaian — adjust apa yang perlu dilakukan
5. Next relationship goals — target relasional berikutnya
6. Relationship maintenance tips — cara mempertahankan hubungan sehat

Tone: empati, encouraging, celebrating small wins. Dalam Bahasa Indonesia.`,
      quickChips: [
        { label: 'Relationship Check-in', query: 'Pertanyaan check-in untuk memantau health relationship' },
        { label: 'Maintenance Tips', query: 'Tips mempertahankan hubungan sehat jangka panjang' },
        { label: 'Next Phase', query: 'Apakah klien siap maju ke fase berikutnya?' },
      ],
    },
  ],
};

export default relationship;
