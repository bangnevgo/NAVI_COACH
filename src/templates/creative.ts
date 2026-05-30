import { NicheTemplate } from './types';

const creative: NicheTemplate = {
  id: 'creative',
  name: 'Kreativitas & Life Design',
  slug: 'creative',
  icon: 'Palette',
  description: 'Coaching untuk creative professionals dan life design — temukan passion dan rancang hidup ideal.',
  version: '1.0',
  terminology: {
    client: 'Klien',
    session: 'Sesi',
    coach: 'Coach',
    phase: 'Tahap',
    goal: 'Tujuan Hidup',
    note: 'Catatan',
    clientInactive: 'Tidak Aktif',
    clientPlural: 'Klien',
    sessionPlural: 'Sesi',
    goalPlural: 'Tujuan',
    notePlural: 'Catatan',
  },
  phases: [
    { id: 'dream', name: 'Dream & Discover', description: 'Mimpi besar — eksplorasi kemungkinan tanpa batas', color: '#4C8DFF', order: 0 },
    { id: 'design', name: 'Life Design', description: 'Merancang hidup yang selaras dengan nilai dan passion', color: '#9D7EE8', order: 1 },
    { id: 'build', name: 'Build & Create', description: 'Membangun fondasi dan memulai kreasi', color: '#E8935D', order: 2 },
    { id: 'launch', name: 'Launch & Share', description: 'Meluncurkan karya dan membangun audiens', color: '#4DBCC9', order: 3 },
    { id: 'sustain', name: 'Sustain & Evolve', description: 'Mempertahankan momentum dan terus berevolusi', color: '#4CAF82', order: 4 },
  ],
  sessionTypes: [
    { id: 'vision', name: 'Vision Workshop', icon: 'Eye', defaultDuration: 120 },
    { id: 'coaching', name: 'Life Coaching', icon: 'MessageCircle', defaultDuration: 60 },
    { id: 'check-in', name: 'Creative Check-in', icon: 'Palette', defaultDuration: 30 },
    { id: 'accountability', name: 'Accountability Session', icon: 'Target', defaultDuration: 45 },
    { id: 'brainstorm', name: 'Brainstorm & Ideation', icon: 'Lightbulb', defaultDuration: 60 },
  ],
  goalCategories: [
    { id: 'creative', name: 'Proyek Kreatif' },
    { id: 'career', name: 'Karir & Profession' },
    { id: 'lifestyle', name: 'Lifestyle Design' },
    { id: 'impact', name: 'Dampak & Kontribusi' },
    { id: 'freedom', name: 'Kebebasan & Fleksibilitas' },
    { id: 'expression', name: 'Ekspresi & Authenticity' },
  ],
  noteTypes: [
    { id: 'general', name: 'Catatan Umum' },
    { id: 'session', name: 'Catatan Sesi' },
    { id: 'insight', name: 'Insight' },
    { id: 'action_item', name: 'Action Item' },
    { id: 'idea', name: 'Ide & Inspirasi' },
    { id: 'project', name: 'Update Proyek' },
    { id: 'win', name: 'Creative Win' },
  ],
  goalFocusAreas: [
    { id: 'artistic', name: 'Seni & Ekspresi' },
    { id: 'writing', name: 'Menulis & Konten' },
    { id: 'entrepreneurship', name: 'Kreativitas Bisnis' },
    { id: 'lifestyle', name: 'Desain Hidup' },
    { id: 'social', name: 'Dampak Sosial' },
    { id: 'personal', name: 'Authentic Self' },
  ],
  moods: [
    { id: 'inspired', name: 'Terinspirasi' },
    { id: 'flow', name: 'Dalam Flow' },
    { id: 'neutral', name: 'Netral' },
    { id: 'blocked', name: 'Creative Block' },
    { id: 'overwhelmed', name: 'Overwhelm' },
  ],
  aiTools: [
    {
      id: 'intake',
      name: 'Creative Life Intake',
      icon: 'ClipboardList',
      description: 'Analisis aspirasi kreatif dan life design vision klien',
      systemPrompt: `Kamu adalah AI life design & creativity coach. Analisis data klien berikut dan buat rencana coaching yang inspiratif.

Info Klien:
Nama: {{clientName}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}
Bio: {{clientBio}}

Buat analisis yang mencakup:
1. Ringkasan creative profile klien — passion, aspirasi, block
2. Life assessment — sejauh mana klien hidup sesuai dengan authentic self-nya
3. Creative strengths identifikasi — kekuatan kreatif unik klien
4. 3 area prioritas life design
5. Langkah eksplorasi pertama (3 hal kreatif untuk dicoba minggu ini)
6. Vision board exercise — panduan membuat vision board pribadi

Format inspirational dan creative dalam Bahasa Indonesia.`,
      quickChips: [
        { label: 'Passion Audit', query: 'Bantu klien mengidentifikasi passion sejati dan perbedaan dengan hobi' },
        { label: 'Fear Inventory', query: 'Identifikasi ketakutan kreatif utama klien dan cara mengatasinya' },
        { label: 'Experiment Ideas', query: '5 eksperimen kecil yang bisa dicoba minggu ini untuk menemukan passion' },
      ],
    },
    {
      id: 'design',
      name: 'Life Design Workshop',
      icon: 'Compass',
      description: 'Workshop mendesain ulang hidup sesuai nilai dan passion',
      systemPrompt: `Kamu adalah AI life design coach. Pandu klien melalui exercise life design yang terstruktur.

Info Klien:
Nama: {{clientName}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}

Buat exercise yang mencakup:
1. Values card sort — 10 nilai hidup, klien harus pick top 5
2. Energy audit — aktivitas yang memberi vs menguras energi
3. Good Life visions — 3 versi hidup ideal (masing-masing 250 kata)
4. Prototype life — 3 life prototype untuk di-test (3 bulan masing-masing)
5. Constraints mapping — batasan nyata vs batasan yang dikarang
6. Next 90-day experiment — eksperimen hidup realistis untuk dijalankan

Dalam Bahasa Indonesia yang memacu kreativitas dan refleksi mendalam.`,
      quickChips: [
        { label: 'Odyssey Plan', query: 'Tiga versi Odyssey Plan (3 hidup berbeda 5 tahun ke depan)' },
        { label: 'Energy Audit', query: 'Template audit energi — aktivitas vs energi level klien' },
        { label: 'Prototype Life', query: '3 life prototype yang bisa di-test dalam 90 hari' },
      ],
    },
    {
      id: 'creative-block',
      name: 'Creative Block Buster',
      icon: 'Zap',
      description: 'Atasi creative block dan bangun kembali inspirasi',
      systemPrompt: `Kamu adalah AI creativity coach. Bantu klien mengatasi creative block dan membangun sistem kreatif yang sustainable.

Info Klien:
Nama: {{clientName}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}

Buat yang mencakup:
1. Root cause analysis — kenapa creative block terjadi (fear, perfectionism, burnout, dll)
2. Unblocking exercises — 5 latihan membuka blokade kreatif
3. Creative routine design — rutinitas harian yang mendukung flow state
4. Accountability system — cara membangun sistem pertanggungjawaban kreatif
5. Inspiration sources — sumber inspirasi sesuai area fokus klien
6. Anti-burnout practices — cara mencegah kreativitas habis terbakar

Dalam Bahasa Indonesia yang encouraging dan langsung memicu action.`,
      quickChips: [
        { label: 'Root Cause', query: 'Apa penyebab utama creative block klien dan cara mengatasinya?' },
        { label: 'Routine Builder', query: 'Rutinitas kreatif harian yang sustainable untuk klien' },
        { label: 'Accountability', query: 'Sistem accountability untuk menjaga produktivitas kreatif' },
      ],
    },
    {
      id: 'progress',
      name: 'Creative Progress Review',
      icon: 'TrendingUp',
      description: 'Review kemajuan kreatif dan penyesuaian life design',
      systemPrompt: `Kamu adalah AI life design coach. Review progress klien dalam mencapai tujuan hidup kreatif.

Info Klien:
Nama: {{clientName}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}
Fase Saat Ini: {{currentPhase}}
Total Sesi: {{totalSessions}}
Progress: {{progressPercent}}%

Buat laporan yang mencakup:
1. Creative progress assessment — seberapa jauh klien dari visi hidupnya?
2. Creative output review — karya/proyek yang sudah dihasilkan
3. Alignment check — sejauh mana klien hidup sesuai authentic self
4. Pivot points — apakah ada area perlu diubah direction?
5. Next creative challenge — tantangan kreatif untuk 30 hari ke depan
6. Celebration — hal yang perlu dirayakan, sekecil apapun

Tone: celebratory, reflective, forward-looking. Dalam Bahasa Indonesia.`,
      quickChips: [
        { label: 'Alignment Check', query: 'Cek apakah klien sudah hidup sesuai authentic self-nya' },
        { label: 'Next Challenge', query: 'Tantangan kreatif menarik untuk 30 hari ke depan' },
        { label: 'Celebration', query: 'Hal-hal yang sudah dicapai klien yang pantas dirayakan' },
      ],
    },
  ],
};

export default creative;
