import { NicheTemplate } from './types';

const career: NicheTemplate = {
  id: 'career',
  name: 'Karir & Development',
  slug: 'career',
  icon: 'Rocket',
  description: 'Career coaching untuk transisi karir, skill development, dan pertumbuhan profesional.',
  version: '1.0',
  terminology: {
    client: 'Klien',
    session: 'Sesi',
    coach: 'Coach',
    phase: 'Tahap',
    goal: 'Target Karir',
    note: 'Catatan',
    clientInactive: 'Tidak Aktif',
    clientPlural: 'Klien',
    sessionPlural: 'Sesi',
    goalPlural: 'Target',
    notePlural: 'Catatan',
  },
  phases: [
    { id: 'exploration', name: 'Exploration', description: 'Eksplorasi aspirasi, nilai, dan kekuatan klien', color: '#4C8DFF', order: 0 },
    { id: 'clarity', name: 'Clarity', description: 'Memperjelas tujuan karir dan arah pengembangan', color: '#9D7EE8', order: 1 },
    { id: 'planning', name: 'Career Planning', description: 'Perencanaan langkah-langkah karir yang strategis', color: '#E8935D', order: 2 },
    { id: 'action', name: 'Action & Execution', description: 'Implementasi rencana dan skill building', color: '#4DBCC9', order: 3 },
    { id: 'transition', name: 'Transition', description: 'Transisi karir dan optimalisasi posisi baru', color: '#4CAF82', order: 4 },
  ],
  sessionTypes: [
    { id: 'clarity', name: 'Clarity Session', icon: 'Lightbulb', defaultDuration: 90 },
    { id: 'coaching', name: 'Career Coaching', icon: 'MessageCircle', defaultDuration: 60 },
    { id: 'review', name: 'Progress Review', icon: 'BarChart3', defaultDuration: 30 },
    { id: 'interview', name: 'Interview Prep', icon: 'Mic', defaultDuration: 45 },
    { id: 'strategy', name: 'Strategy Session', icon: 'Target', defaultDuration: 60 },
  ],
  goalCategories: [
    { id: 'transition', name: 'Transisi Karir' },
    { id: 'promotion', name: 'Promosi & Advance' },
    { id: 'skill', name: 'Skill Development' },
    { id: 'personal_brand', name: 'Personal Branding' },
    { id: 'networking', name: 'Networking' },
    { id: 'leadership', name: 'Leadership Growth' },
  ],
  noteTypes: [
    { id: 'general', name: 'Catatan Umum' },
    { id: 'session', name: 'Catatan Sesi' },
    { id: 'insight', name: 'Insight' },
    { id: 'action_item', name: 'Action Item' },
    { id: 'opportunity', name: 'Karir Opportunity' },
    { id: 'skill_gap', name: 'Skill Gap Analysis' },
    { id: 'win', name: 'Career Win' },
  ],
  goalFocusAreas: [
    { id: 'transition', name: 'Transisi Karir' },
    { id: 'advancement', name: 'Promosi & Advancement' },
    { id: 'skill', name: 'Skill & Competency' },
    { id: 'branding', name: 'Personal Brand' },
    { id: 'network', name: 'Network & Connection' },
    { id: 'leadership', name: 'Leadership Development' },
  ],
  moods: [
    { id: 'excited', name: 'Antusias' },
    { id: 'focused', name: 'Fokus' },
    { id: 'neutral', name: 'Netral' },
    { id: 'frustrated', name: 'Frustrasi' },
    { id: 'lost', name: 'Bingung/Stuck' },
  ],
  aiTools: [
    {
      id: 'intake',
      name: 'Career Intake Analysis',
      icon: 'ClipboardList',
      description: 'Analisis profil karir dan aspirasi klien untuk perencanaan development',
      systemPrompt: `Kamu adalah AI career coach profesional. Analisis data klien berikut dan buat rencana career development yang komprehensif.

Info Klien:
Nama: {{clientName}}
Posisi: {{clientJobTitle}}
Perusahaan: {{clientCompany}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}
Bio: {{clientBio}}

Buat analisis yang mencakup:
1. Ringkasan profil karir klien (posisi saat ini, pengalaman, aspirasi)
2. Identifikasi kekuatan utama dan unique value proposition
3. Gap analysis — skill/experience yang dibutuhkan untuk goal
4. 3 target karir untuk 6-12 bulan ke depan
5. Langkah aksi pertama (3 hal konkret minggu ini)
6. Agenda sesi clarity karir

Format profesional dalam Bahasa Indonesia.`,
      quickChips: [
        { label: 'Kekuatan Utama', query: 'Identifikasi kekuatan dan nilai unik klien di karir' },
        { label: 'Gap Analysis', query: 'Gap apa yang harus ditutup klien untuk mencapai tujuannya?' },
        { label: 'Career Path', query: 'Opsi career path yang realistis untuk klien ini' },
      ],
    },
    {
      id: 'clarity',
      name: 'Career Clarity Workshop',
      icon: 'Lightbulb',
      description: 'Bantu klien menemukan clarity atas tujuan karir dan arah development',
      systemPrompt: `Kamu adalah AI career clarity coach. Bantu klien menemukan clarity atas arah karir mereka.

Info Klien:
Nama: {{clientName}}
Posisi: {{clientJobTitle}}
Perusahaan: {{clientCompany}}
Goal: {{clientGoal}}

Buat exercise yang mencakup:
1. Ikigai exercise — temukan intersection antara passion, mission, profession, vocation
2. Values clarification — 5 nilai karir teratas klien
3. Strengths identification — kekuatan yang bisa menjadi competitive advantage
4. Career visioning — gambaran karir ideal 5 tahun ke depan
5. Decision framework — framework untuk membuat keputusan karier
6. Reflection prompts — pertanyaan refleksi untuk sesi berikutnya

Dalam Bahasa Indonesia yang insightful dan memacu pemikiran.`,
      quickChips: [
        { label: 'Ikigai Exercise', query: 'Panduan lengkap Ikigai exercise untuk klien' },
        { label: 'Values Clarification', query: 'Bantu klien mengidentifikasi 5 nilai karir teratasnya' },
        { label: '5 Year Vision', query: 'Visualisasi karir ideal klien 5 tahun ke depan' },
      ],
    },
    {
      id: 'plan',
      name: 'Career Action Planner',
      icon: 'Target',
      description: 'Buat rencana aksi karir terstruktur dan terukur',
      systemPrompt: `Kamu adalah AI career strategist. Buat career action plan yang actionable dan terstruktur.

Info Klien:
Nama: {{clientName}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}
Fase Saat Ini: {{currentPhase}}

Buat:
1. 90-day career action plan — target dan timeline jelas
2. Skill development roadmap — skill apa yang harus dipelajari dan kapan
3. Networking strategy — siapa yang harus didekati dan bagaimana
4. Personal branding action — apa yang harus ditinggalkan secara online/offline
5. Milestone tracker — milestone yang perlu dicapai setiap bulan
6. KPI karir — bagaimana mengukur kemajuan

Dalam Bahasa Indonesia yang langsung-to-the-point dan memotivasi.`,
      quickChips: [
        { label: '30-60-90 Plan', query: 'Rencana aksi 30-60-90 hari untuk karir klien' },
        { label: 'Skill Roadmap', query: 'Roadmap skill development prioritas untuk 6 bulan' },
        { label: 'Networking Plan', query: 'Strategi networking yang actionable untuk klien' },
      ],
    },
    {
      id: 'interview',
      name: 'Interview Prep Coach',
      icon: 'Mic',
      description: 'Persiapan interview dan negosiasi penawaran kerja',
      systemPrompt: `Kamu adalah AI interview coach profesional. Buat panduan interview prep yang komprehensif.

Info Klien:
Nama: {{clientName}}
Posisi: {{clientJobTitle}}
Goal: {{clientGoal}}

Buat:
1. Elevator pitch — ringkasan profil klien dalam 30 detik
2. STAR stories — 5 cerita STAR (Situation, Task, Action, Result) dari pengalaman klien
3. Common interview answers — jawaban untuk 10 pertanyaan interview umum
4. Weakness framing — cara menjawab pertanyaan kelemahan secara positif
5. Questions to ask — 5 pertanyaan cerdas untuk pewawancara
6. Salary negotiation script — framework negosiasi gaji yang efektif

Dalam Bahasa Indonesia yang confident dan profesional.`,
      quickChips: [
        { label: 'Elevator Pitch', query: 'Buat elevator pitch untuk klien berdasarkan pengalamannya' },
        { label: 'STAR Stories', query: 'Cerita STAR terbaik dari pengalaman kerja klien' },
        { label: 'Negosiasi', query: 'Strategi dan script negosiasi gaji untuk klien' },
      ],
    },
    {
      id: 'progress',
      name: 'Career Progress Review',
      icon: 'TrendingUp',
      description: 'Review progress karir dan adjust rencana development',
      systemPrompt: `Kamu adalah AI career coach. Review progress karir klien dan berikan rekomendasi penyesuaian.

Info Klien:
Nama: {{clientName}}
Goal: {{clientGoal}}
Area Fokus: {{goalFocusArea}}
Fase Saat Ini: {{currentPhase}}
Total Sesi: {{totalSessions}}
Progress: {{progressPercent}}%

Buat laporan yang mencakup:
1. Progress assessment — seberapa jauh klien dari target karirnya?
2. Skill acquired — skill baru yang sudah dikembangkan
3. Wins & achievements — pencapaian yang perlu diakui
4. Areas needing attention — area yang stagnan atau perlu perhatian
5. Strategy adjustment — penyesuaian rencana yang diperlukan
6. Next quarter target — target kuartal berikutnya

Tone: encouraging, honest, actionable. Dalam Bahasa Indonesia.`,
      quickChips: [
        { label: 'Career Audit', query: 'Audit komprehensif progress karir klien saat ini' },
        { label: 'Next Move', query: 'Rekomendasi langkah klien dalam 90 hari ke depan' },
        { label: 'Skill Update', query: 'Skill apa yang perlu dipelajari untuk stay competitive?' },
      ],
    },
  ],
};

export default career;
