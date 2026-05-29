import { NicheTemplate } from './types';

const health: NicheTemplate = {
  id: 'health',
  name: 'Kesehatan & Wellness',
  slug: 'health',
  icon: 'Heart',
  description: 'Coaching kesehatan holistik untuk gaya hidup sehat, nutrisi, dan keseimbangan.',
  version: '1.0',
  terminology: {
    client: 'Klien',
    session: 'Sesi',
    coach: 'Coach',
    phase: 'Tahap',
    goal: 'Target Kesehatan',
    note: 'Catatan',
    clientInactive: 'Tidak Aktif',
    clientPlural: 'Klien',
    sessionPlural: 'Sesi',
    goalPlural: 'Target',
    notePlural: 'Catatan',
  },
  phases: [
    { id: 'intake', name: 'Intake & Consultation', description: 'Konsultasi awal dan pemahaman kondisi klien', color: '#4C8DFF', order: 0 },
    { id: 'assessment', name: 'Health Assessment', description: 'Evaluasi kondisi kesehatan dan gaya hidup', color: '#9D7EE8', order: 1 },
    { id: 'planning', name: 'Plan Design', description: 'Perencanaan program kesehatan personal', color: '#E8935D', order: 2 },
    { id: 'active', name: 'Active Program', description: 'Pelaksanaan program dan monitoring', color: '#4DBCC9', order: 3 },
    { id: 'maintenance', name: 'Maintenance & Sustain', description: 'Membangun kebiasaan jangka panjang', color: '#4CAF82', order: 4 },
  ],
  sessionTypes: [
    { id: 'consultation', name: 'Konsultasi Kesehatan', icon: 'Stethoscope', defaultDuration: 60 },
    { id: 'coaching', name: 'Wellness Coaching', icon: 'MessageCircle', defaultDuration: 45 },
    { id: 'review', name: 'Progress Check', icon: 'Activity', defaultDuration: 30 },
    { id: 'education', name: 'Health Education', icon: 'BookOpen', defaultDuration: 45 },
    { id: 'crisis', name: 'Support Session', icon: 'Heart', defaultDuration: 30 },
  ],
  goalCategories: [
    { id: 'weight', name: 'Weight Management' },
    { id: 'fitness', name: 'Fitness & Exercise' },
    { id: 'nutrition', name: 'Nutrisi & Diet' },
    { id: 'mental', name: 'Kesehatan Mental' },
    { id: 'sleep', name: 'Kualitas Tidur' },
    { id: 'lifestyle', name: 'Gaya Hidup' },
  ],
  noteTypes: [
    { id: 'general', name: 'Catatan Umum' },
    { id: 'session', name: 'Catatan Sesi' },
    { id: 'insight', name: 'Insight' },
    { id: 'action_item', name: 'Action Item' },
    { id: 'symptom', name: 'Gejala/Keluhan' },
    { id: 'habit', name: 'Habit Tracker' },
    { id: 'nutrition', name: 'Catatan Nutrisi' },
  ],
  goalFocusAreas: [
    { id: 'weight', name: 'Weight Management' },
    { id: 'fitness', name: 'Fitness & Exercise' },
    { id: 'nutrition', name: 'Nutrisi' },
    { id: 'mental', name: 'Kesehatan Mental' },
    { id: 'sleep', name: 'Kualitas Tidur' },
    { id: 'energy', name: 'Energi & Vitalitas' },
  ],
  moods: [
    { id: 'energized', name: 'Penuh Energi' },
    { id: 'balanced', name: 'Seimbang' },
    { id: 'neutral', name: 'Netral' },
    { id: 'tired', name: 'Lelah' },
    { id: 'unwell', name: 'Tidak Enak Badan' },
  ],
  aiTools: [
    {
      id: 'intake',
      name: 'Health Intake Analysis',
      icon: 'ClipboardList',
      description: 'Analisis kondisi kesehatan awal dan riwayat gaya hidup klien',
      systemPrompt: `Kamu adalah AI health & wellness coach holistik. Analisis data klien berikut dan buat rencana coaching kesehatan yang komprehensif.

Info Klien:
Nama: {{clientName}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}
Bio: {{clientBio}}

Buat analisis yang mencakup:
1. Ringkasan kondisi kesehatan klien (berdasarkan info yang tersedia)
2. Identifikasi 3 area kesehatan yang perlu perhatian utama
3. Kemungkinan faktor lifestyle yang berdampak
4. Rekomendasi fase program (Intake -> Assessment -> Plan -> Active -> Maintenance)
5. 3 langkah aksi pertama (realistis dan mudah dimulai)
6. Goals setting awal yang SMART

Format rapi dalam Bahasa Indonesia yang empatik dan professional.`,
      quickChips: [
        { label: 'Analisis Gaya Hidup', query: 'Analisis potensi masalah gaya hidup klien dan rekomendasi perbaikan' },
        { label: 'Target SMART', query: 'Buatkan 3 target SMART untuk klien ini' },
        { label: 'Quick Habits', query: '5 kebiasaan sehat yang bisa dimulai minggu ini' },
      ],
    },
    {
      id: 'assessment',
      name: 'Wellness Assessment',
      icon: 'Activity',
      description: 'Evaluasi komprehensif aspek kesehatan dan gaya hidup',
      systemPrompt: `Kamu adalah AI wellness coach. Buat assessment komprehensif untuk klien.

Info Klien:
Nama: {{clientName}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}
Fase Saat Ini: {{currentPhase}}

Buat:
1. Health Wheel Assessment — skor 1-10 untuk 6 area kesehatan (fisik, mental, nutrisi, tidur, stres, aktivitas)
2. Priority area — area mana yang paling urgent untuk diperbaiki
3. Root cause analysis — potensi penyebab dari ketidakseimbangan
4. Recommendations — saran konkret untuk setiap area
5. 30-day assessment plan — cara mengukur progress

Dalam Bahasa Indonesia yang supportif dan professional.`,
      quickChips: [
        { label: 'Health Score', query: 'Buat skor kesehatan komprehensif untuk klien' },
        { label: 'Root Cause', query: 'Identifikasi akar masalah kesehatan utama klien' },
        { label: 'Action Plan', query: 'Rencana aksi 30 hari untuk kesehatan klien' },
      ],
    },
    {
      id: 'plan',
      name: 'Program Designer',
      icon: 'CalendarDays',
      description: 'Rancang program kesehatan personal yang terstruktur',
      systemPrompt: `Kamu adalah AI wellness program designer. Buat program kesehatan personal yang komprehensif dan realistis.

Info Klien:
Nama: {{clientName}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}
Fase Saat Ini: {{currentPhase}}

Buat program 12 minggu yang mencakup:
1. Weekly theme — tema setiap minggu (12 tema)
2. Key actions — 3 aksi utama per minggu
3. Habit tracking — kebiasaan yang harus dibangun dan dilacak
4. Nutrition guidelines — panduan nutrisi sesuai area fokus
5. Exercise recommendations — rekomendasi aktivitas fisik
6. Self-check reminders — reminder untuk evaluasi diri

Program harus bertahap, achievable, dan disesuaikan dengan kondisi klien. Dalam Bahasa Indonesia.`,
      quickChips: [
        { label: 'Weekly Plan', query: 'Rencana detail untuk 4 minggu pertama' },
        { label: 'Habit Stack', query: 'Buat habit stacking yang cocok untuk gaya hidup klien' },
        { label: 'Meal Framework', query: 'Framework makan sehat yang praktis untuk klien' },
      ],
    },
    {
      id: 'progress',
      name: 'Progress Tracker',
      icon: 'TrendingUp',
      description: 'Monitoring progress kesehatan dan penyesuaian program',
      systemPrompt: `Kamu adalah AI health coach. Analisis progress kesehatan klien dan berikan rekomendasi penyesuaian.

Info Klien:
Nama: {{clientName}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}
Fase Saat Ini: {{currentPhase}}
Total Sesi: {{totalSessions}}
Progress: {{progressPercent}}%

Buat laporan yang mencakup:
1. Progress assessment (skala 1-10) — seberapa jauh klien dari target?
2. Wins & improvements — perubahan positif yang terjadi
3. Areas needing attention — area yang belum menunjukkan improvement
4. Program adjustment — penyesuaian program yang diperlukan
5. Next targets — target konkret 30 hari ke depan
6. Encouragement — kata-kata motivasi yang personal

Tone: empati, encouraging, professional. Dalam Bahasa Indonesia.`,
      quickChips: [
        { label: 'Program Review', query: 'Review program berjalan dan rekomendasi penyesuaian' },
        { label: 'Motivasi', query: 'Pesan motivasi personal untuk klien berdasarkan progress-nya' },
        { label: 'Next Phase', query: 'Kapan klien siap maju ke fase berikutnya?' },
      ],
    },
    {
      id: 'education',
      name: 'Health Education',
      icon: 'BookOpen',
      description: 'Materi edukasi kesehatan sesuai area fokus klien',
      systemPrompt: `Kamu adalah AI health educator. Buat materi edukasi kesehatan yang mudah dipahami dan actionable.

Info Klien:
Nama: {{clientName}}
Area Fokus: {{goalFocusArea}}
Goal: {{clientGoal}}

Buat materi edukasi yang mencakup:
1. Core concept — konsep utama terkait area fokus klien (dijelaskan sederhana)
2. Why it matters — mengapa hal ini penting untuk kesehatan klien
3. Common mistakes — kesalahan umum yang sering dilakukan
4. Best practices — praktik terbaik yang bisa langsung diterapkan
5. Action items — 5 hal konkret yang bisa dilakukan setelah membaca
6. Resources — rekomendasi bacaan/video untuk pendalaman

Materi harus evidence-based, mudah dipahami non-medis, dalam Bahasa Indonesia.`,
      quickChips: [
        { label: 'Materi Dasar', query: 'Edukasi dasar tentang area fokus klien yang mudah dipahami' },
        { label: 'Myth Buster', query: '5 mitos umum tentang area fokus klien dan fakta yang benar' },
        { label: 'FAQ', query: 'Pertanyaan yang sering diajukan tentang kondisi/goal klien' },
      ],
    },
  ],
};

export default health;
