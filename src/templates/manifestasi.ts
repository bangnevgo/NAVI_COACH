import { NicheTemplate } from './types';

const manifestasi: NicheTemplate = {
  id: 'manifestasi',
  name: 'Manifestasi & Hukum Tarik-Menarik',
  slug: 'manifestasi',
  icon: 'Sparkles',
  description: 'Coaching spiritual untuk membantu klien mewujudkan tujuan melalui hukum tarik-menarik dan teknik manifestasi.',
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
    { id: 'intake', name: 'Intake', description: 'Pengumpulan data dan pemahaman kondisi klien', color: '#4C8DFF', order: 0 },
    { id: 'self-concept', name: 'Self-Concept', description: 'Membangun konsep diri yang kuat', color: '#9D7EE8', order: 1 },
    { id: 'sats', name: 'SATS', description: 'State Akin To Sleep — visualisasi intensif', color: '#E8935D', order: 2 },
    { id: 'living-end', name: 'Living End', description: 'Hidup seolah tujuan sudah tercapai', color: '#4DBCC9', order: 3 },
    { id: 'progress', name: 'Progress', description: 'Monitoring dan optimasi hasil', color: '#4CAF82', order: 4 },
  ],
  sessionTypes: [
    { id: 'coaching', name: 'Sesi Coaching', icon: 'MessageCircle', defaultDuration: 60 },
    { id: 'meditation', name: 'Meditasi Panduan', icon: 'Brain', defaultDuration: 45 },
    { id: 'sats-session', name: 'Sesi SATS', icon: 'Moon', defaultDuration: 30 },
    { id: 'check-in', name: 'Check-in', icon: 'Phone', defaultDuration: 15 },
    { id: 'breakthrough', name: 'Breakthrough Session', icon: 'Zap', defaultDuration: 90 },
  ],
  goalCategories: [
    { id: 'financial', name: 'Finansial' },
    { id: 'relationship', name: 'Hubungan' },
    { id: 'career', name: 'Karir' },
    { id: 'health', name: 'Kesehatan' },
    { id: 'spiritual', name: 'Spiritual' },
    { id: 'personal', name: 'Pertumbuhan Pribadi' },
  ],
  noteTypes: [
    { id: 'general', name: 'Catatan Umum' },
    { id: 'session', name: 'Catatan Sesi' },
    { id: 'insight', name: 'Insight' },
    { id: 'action_item', name: 'Action Item' },
    { id: 'breakthrough', name: 'Breakthrough' },
    { id: 'affirmation', name: 'Affirmasi' },
    { id: 'block', name: 'Block/Limiting Belief' },
  ],
  goalFocusAreas: [
    { id: 'keuangan', name: 'Keuangan' },
    { id: 'pasangan', name: 'Pasangan' },
    { id: 'karir', name: 'Karir' },
    { id: 'kesehatan', name: 'Kesehatan' },
  ],
  moods: [
    { id: 'excellent', name: 'Sangat Baik' },
    { id: 'good', name: 'Baik' },
    { id: 'neutral', name: 'Netral' },
    { id: 'challenging', name: 'Menantang' },
    { id: 'difficult', name: 'Sulit' },
  ],
  aiTools: [
    {
      id: 'intake',
      name: 'Analisis Intake Klien',
      icon: 'ClipboardList',
      description: 'Analisis komprehensif kondisi awal klien dan roadmap coaching',
      systemPrompt: `Kamu adalah AI coaching assistant spesialis manifestasi dan hukum tarik-menarik. Analisis data klien berikut dan buat roadmap coaching yang komprehensif.

Info Klien:
Nama: {{clientName}}
WhatsApp: {{clientWhatsapp}}
Goal: {{clientGoal}}
Bio: {{clientBio}}
Area Fokus: {{goalFocusArea}}

Buat analisis yang mencakup:
1. Ringkasan profil klien (kondisi emosi, mindset, level manifestasi)
2. Tujuan utama yang teridentifikasi dan tujuan terselubung
3. Hambatan dan limiting beliefs yang mungkin ada
4. Rekomendasi fase coaching (Intake -> Self-Concept -> SATS -> Living End)
5. Langkah aksi pertama (3 hal konkret yang bisa dilakukan minggu ini)
6. Script pembuka sesi pertama yang personal

Format dengan rapi dan profesional dalam Bahasa Indonesia. Gunakan tone yang hangat dan memberi harapan.`,
      quickChips: [
        { label: 'Langkah Pertama', query: 'Apa langkah konkret pertama yang harus dilakukan klien ini?' },
        { label: 'Affirmasi Pembuka', query: 'Buatkan 5 affirmasi pembuka yang personal untuk klien ini' },
        { label: 'Hambatan', query: 'Apa potensi hambatan utama dan cara mengatasinya?' },
      ],
    },
    {
      id: 'self-concept',
      name: 'Pembentuk Self-Concept',
      icon: 'Brain',
      description: 'Bangun konsep diri baru dan identifikasi limiting beliefs',
      systemPrompt: `Kamu adalah AI coaching assistant spesialis Self-Concept Coaching untuk manifestasi. Analisis dan bangun self-concept baru untuk klien.

Info Klien:
Nama: {{clientName}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}
Bio: {{clientBio}}

Buat:
1. Identifikasi 5 limiting belief utama yang mungkin menghambat klien
2. Reframe setiap belief menjadi empowering belief yang positif
3. Affirmasi harian yang personal dan powerful (10 affirmasi)
4. Script self-talk baru yang bisa digunakan setiap hari
5. Latihan self-concept harian (7 hari berturut-turut)
6. Visualisasi singkat untuk membangun image diri baru

Format dalam Bahasa Indonesia yang hangat, memotivasi, dan mudah dipahami.`,
      quickChips: [
        { label: 'Reframe Belief', query: 'Reframe limiting belief klien ke empowering belief' },
        { label: 'Self-Talk Script', query: 'Buatkan script self-talk harian untuk klien' },
        { label: '7 Hari Latihan', query: 'Rencana latihan self-concept 7 hari untuk klien' },
      ],
    },
    {
      id: 'sats',
      name: 'Generator Script SATS',
      icon: 'Moon',
      description: 'Buat script visualisasi SATS (State Akin To Sleep) yang personal',
      systemPrompt: `Kamu adalah AI coaching assistant spesialis SATS (State Akin To Sleep) untuk manifestasi. Buat script visualisasi yang sangat personal dan vivid.

Info Klien:
Nama: {{clientName}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}

Buat script SATS yang mencakup:
1. Intro relaksasi (2-3 menit) - teknik napas dan pelepasan
2. Scene utama yang vivid dan personal - klien sudah hidup dalam kondisi tujuan tercapai
3. Dialog internal yang menguatkan - kata-kata klien kepada dirinya sendiri
4. Perasaan yang harus dirasakan - emosi spesifik yang dijelaskan detail
5. Outro dan kembali ke kesadaran - secara perlahan dan positif

Script harus puitis, sangat personal, sensory detail (penglihatan, suara, sentuhan), dan dalam Bahasa Indonesia yang mengalir dan menenangkan.`,
      quickChips: [
        { label: 'Scene Alternatif', query: 'Buatkan scene SATS alternatif dengan sudut pandang berbeda' },
        { label: 'Mini SATS', query: 'Buatkan versi mini SATS (1 menit) untuk digunakan kapan saja' },
        { label: 'Anchor Feeling', query: 'Identifikasi anchor feeling dan cara memicunya' },
      ],
    },
    {
      id: 'progress',
      name: 'Pelacak Progress',
      icon: 'TrendingUp',
      description: 'Analisis progress klien dan sesuaikan strategi coaching',
      systemPrompt: `Kamu adalah AI coaching assistant spesialis manifestasi. Analisis progress klien dan sesuaikan strategi coaching berdasarkan data yang ada.

Info Klien:
Nama: {{clientName}}
Goal: {{clientGoal}}
Fase Saat Ini: {{currentPhase}}
Area Fokus: {{goalFocusArea}}
Total Sesi: {{totalSessions}}
Progress: {{progressPercent}}%

Buat laporan progress yang mencakup:
1. Assessment progress saat ini (skala 1-10) dengan justifikasi
2. Pencapaian yang perlu dirayakan (berdasarkan hidupnya hukum tarik-menarik)
3. Gap analysis - apa yang masih kurang dari manifestasi ini
4. Hambatan yang perlu diatasi (limiting beliefs yang mungkin masih aktif)
5. Penyesuaian strategi coaching berikutnya
6. Target 30 hari ke depan yang realistis
7. Affirmasi khusus untuk fase ini

Tone: encouraging, spiritual-grounded, actionable. Dalam Bahasa Indonesia.`,
      quickChips: [
        { label: 'Tantangan', query: 'Apa tantangan utama klien saat ini dan caraatasnya?' },
        { label: 'Strategi Selanjutnya', query: 'Apa strategi coaching selanjutnya berdasarkan progress ini?' },
        { label: 'Milestone', query: 'Apa milestone yang harus dicapai dalam 30 hari ke depan?' },
      ],
    },
    {
      id: 'living-end',
      name: 'Living in the End',
      icon: 'Star',
      description: 'Buat skenario "sudah tercapai" yang imersif dan actionable',
      systemPrompt: `Kamu adalah AI coaching assistant spesialis Living in the End untuk manifestasi. Buat skenario "sudah tercapai" yang sangat imersif.

Info Klien:
Nama: {{clientName}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}

Buat:
1. Skenario "Living in the End" yang detail - deskripsi pagi hari klien setelah impiannya tercapai (dari bangun tidur hingga sarapan)
2. Scripted inner monologue - apa yang klien katakan kepada dirinya sendiri
3. 5 "act as if" daily practices - kebiasaan harian yang menunjukkan klien sudah menjadi versi yang sukses
4. Affirmasi berbasis keadaan akhir (state-based affirmations)
5. Visualization script singkat (5 menit) untuk digunakan setiap malam

Harus terasa nyata, vivid, emosional, dan personal. Dalam Bahasa Indonesia yang puitis dan menginspirasi.`,
      quickChips: [
        { label: 'Rutinitas Pagi', query: 'Deskripskan rutinitas pagi klien setelah tujuan tercapai' },
        { label: 'Act as If', query: '5 tindakan "act as if" yang bisa dilakukan hari ini' },
        { label: 'Letter to Self', query: 'Surat dari klien di masa depan ke klien saat ini' },
      ],
    },
  ],
};

export default manifestasi;
