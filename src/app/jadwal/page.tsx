'use client';

import React, { useState, useEffect } from 'react';
import { useTemplate } from '@/components/template-provider';
import { Sidebar } from '@/components/sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { AIAssistantPanel } from '@/components/ai-assistant-panel';
import { CalendarDays, Clock, Plus, ChevronLeft, ChevronRight, Video, Phone, MapPin } from 'lucide-react';
import type { Client as ClientType } from '@/lib/types';

interface SessionData {
  id: string;
  clientId: string;
  clientName: string;
  type: string;
  title: string;
  date: string;
  duration: number;
  mood?: string | null;
}

const DAYS_ID = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const MONTHS_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function JadwalPage() {
  const template = useTemplate();
  const t = template.terminology;
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [clients, setClients] = useState<ClientType[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [aiToolsOpen, setAiToolsOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  useEffect(() => {
    fetch('/api/sessions')
      .then((r) => r.json())
      .then(setSessions)
      .catch(console.error);
    fetch('/api/clients')
      .then((r) => r.json())
      .then(setClients)
      .catch(console.error);
  }, []);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const today = new Date();

  const sessionsForDate = (dateStr: string) =>
    sessions.filter((s) => s.date && s.date.startsWith(dateStr));

  const selectedDateStr = selectedDate;
  const selectedSessions = selectedDateStr ? sessionsForDate(selectedDateStr) : [];

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  const typeIcon = (type: string) => {
    const l = type.toLowerCase();
    if (l.includes('video') || l.includes('zoom')) return <Video size={14} />;
    if (l.includes('phone') || l.includes('telepon') || l.includes('wa')) return <Phone size={14} />;
    return <MapPin size={14} />;
  };

  const upcomingSessions = sessions
    .filter((s) => new Date(s.date) >= new Date(today.getFullYear(), today.getMonth(), today.getDate()))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div style={styles.layout}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpenAITools={() => setAiToolsOpen(true)} />
      <main style={styles.main}>
        <div style={styles.topbar}>
          <div style={styles.topbarLeft}>
            <button style={styles.menuBtn} onClick={() => setSidebarOpen(true)} aria-label="Menu">
              <CalendarDays size={20} />
            </button>
            <div>
              <h1 style={styles.topbarTitle}>Jadwal</h1>
              <p style={styles.topbarSub}>Kelola jadwal {t.sessionPlural.toLowerCase()} coaching</p>
            </div>
          </div>
          <div style={styles.topbarRight}>
            <ThemeToggle />
            <button style={styles.addBtn} onClick={() => setShowAddModal(true)}>
              <Plus size={16} /> Tambah {t.session}
            </button>
          </div>
        </div>

        <div style={styles.content}>
          <div style={styles.calendarSection}>
            <div style={styles.calendarCard}>
              <div style={styles.calendarHeader}>
                <button style={styles.navBtn} onClick={prevMonth}><ChevronLeft size={20} /></button>
                <h2 style={styles.calendarTitle}>{MONTHS_ID[month]} {year}</h2>
                <button style={styles.navBtn} onClick={nextMonth}><ChevronRight size={20} /></button>
              </div>

              <div style={styles.calendarGrid}>
                {DAYS_ID.map((day) => (
                  <div key={day} style={styles.dayHeader}>{day}</div>
                ))}
                {calendarDays.map((day, i) => {
                  if (day === null) return <div key={`empty-${i}`} style={styles.dayCell} />;
                  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const daySessions = sessionsForDate(dateStr);
                  const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                  const isSelected = selectedDateStr === dateStr;

                  return (
                    <button
                      key={dateStr}
                      onClick={() => setSelectedDate(dateStr)}
                      style={{
                        ...styles.dayCell,
                        background: isSelected ? 'rgba(91, 159, 255, 0.15)' : isToday ? 'rgba(91, 159, 255, 0.08)' : 'transparent',
                        borderColor: isSelected ? '#5B9FFF' : isToday ? 'rgba(91, 159, 255, 0.3)' : 'transparent',
                        fontWeight: isToday ? 700 : 400,
                      }}
                    >
                      <span style={{ color: isToday ? '#5B9FFF' : 'var(--text-primary)' }}>{day}</span>
                      {daySessions.length > 0 && (
                        <div style={styles.dayDots}>
                          {daySessions.slice(0, 3).map((_, idx) => (
                            <span key={idx} style={styles.dayDot} />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={styles.sideSection}>
            {selectedDateStr && (
              <div style={styles.selectedDateCard}>
                <h3 style={styles.selectedDateTitle}>
                  {t.sessionPlural} - {new Date(selectedDateStr + 'T00:00:00').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </h3>
                {selectedSessions.length === 0 ? (
                  <p style={styles.noSessions}>Tidak ada {t.sessionPlural.toLowerCase()} pada tanggal ini</p>
                ) : (
                  <div style={styles.sessionList}>
                    {selectedSessions.map((session) => (
                      <div key={session.id} style={styles.sessionItem}>
                        <div style={styles.sessionTime}>
                          <Clock size={14} />
                          {session.date.includes('T') ? new Date(session.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '—'}
                          <span style={styles.sessionDuration}>{session.duration} menit</span>
                        </div>
                        <div style={styles.sessionInfo}>
                          <div style={styles.sessionTitle}>{session.title}</div>
                          <div style={styles.sessionClient}>
                            {typeIcon(session.type)}
                            {session.clientName}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div style={styles.upcomingCard}>
              <h3 style={styles.upcomingTitle}>{t.sessionPlural} Mendatang</h3>
              {upcomingSessions.length === 0 ? (
                <p style={styles.noSessions}>Tidak ada {t.sessionPlural.toLowerCase()} mendatang</p>
              ) : (
                <div style={styles.sessionList}>
                  {upcomingSessions.map((session) => (
                    <div key={session.id} style={styles.sessionItem}>
                      <div style={styles.sessionTime}>
                        <Clock size={14} />
                        {new Date(session.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </div>
                      <div style={styles.sessionInfo}>
                        <div style={styles.sessionTitle}>{session.title}</div>
                        <div style={styles.sessionClient}>
                          {typeIcon(session.type)}
                          {session.clientName}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {showAddModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Tambah {t.session}</h2>
            <p style={styles.modalSub}>Fitur tambah {t.session.toLowerCase()} akan segera hadir</p>
            <div style={styles.modalFooter}>
              <button style={styles.closeBtn} onClick={() => setShowAddModal(false)}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      <AIAssistantPanel isOpen={aiToolsOpen} onClose={() => setAiToolsOpen(false)} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  layout: { display: 'flex', minHeight: '100vh', background: 'var(--surface-secondary)', fontFamily: "'DM Sans', -apple-system, sans-serif" },
  main: { flex: 1, display: 'flex', flexDirection: 'column' as const },
  topbar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: 'var(--surface-primary)', borderBottom: '1px solid var(--border-primary)' },
  topbarLeft: { display: 'flex', alignItems: 'center', gap: 16 },
  topbarRight: { display: 'flex', alignItems: 'center', gap: 12 },
  topbarTitle: { fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', margin: 0 },
  topbarSub: { fontSize: 13, color: 'var(--text-secondary)', margin: '2px 0 0 0' },
  menuBtn: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: '8px', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  addBtn: { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: '#5B9FFF', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer' },
  content: { flex: 1, padding: 24, display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, maxWidth: 1200, margin: '0 auto', width: '100%' },
  calendarSection: { display: 'flex', flexDirection: 'column' as const },
  calendarCard: { background: 'var(--surface-primary)', border: '1px solid var(--border-primary)', borderRadius: 16, padding: 24 },
  calendarHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  calendarTitle: { fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', margin: 0 },
  navBtn: { background: 'var(--surface-tertiary)', border: '1px solid var(--border-primary)', borderRadius: 8, padding: '8px', cursor: 'pointer', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  calendarGrid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 },
  dayHeader: { textAlign: 'center' as const, fontSize: 12, fontWeight: 700, color: 'var(--text-tertiary)', padding: '8px 0', textTransform: 'uppercase' as const },
  dayCell: { aspectRatio: '1', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', borderRadius: 10, border: '1.5px solid transparent', cursor: 'pointer', fontSize: 14, background: 'transparent', fontFamily: 'inherit', gap: 4, transition: 'all 0.15s' },
  dayDots: { display: 'flex', gap: 3 },
  dayDot: { width: 5, height: 5, borderRadius: '50%', background: '#5B9FFF' },
  sideSection: { display: 'flex', flexDirection: 'column' as const, gap: 16 },
  selectedDateCard: { background: 'var(--surface-primary)', border: '1px solid var(--border-primary)', borderRadius: 16, padding: 20 },
  selectedDateTitle: { fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 16px 0' },
  upcomingCard: { background: 'var(--surface-primary)', border: '1px solid var(--border-primary)', borderRadius: 16, padding: 20 },
  upcomingTitle: { fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 16px 0' },
  noSessions: { fontSize: 13, color: 'var(--text-tertiary)', margin: 0, textAlign: 'center' as const, padding: '16px 0' },
  sessionList: { display: 'flex', flexDirection: 'column' as const, gap: 10 },
  sessionItem: { display: 'flex', gap: 12, padding: '10px 12px', background: 'var(--surface-tertiary)', borderRadius: 10, alignItems: 'flex-start' },
  sessionTime: { fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' as const, minWidth: 80 },
  sessionDuration: { fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 400 },
  sessionInfo: { flex: 1, minWidth: 0 },
  sessionTitle: { fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 },
  sessionClient: { fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 },
  modalOverlay: { position: 'fixed', inset: 0, background: 'var(--overlay-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' },
  modal: { background: 'var(--surface-elevated)', borderRadius: 16, padding: 28, width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' },
  modalTitle: { fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 12px 0' },
  modalSub: { fontSize: 14, color: 'var(--text-secondary)', margin: '0 0 24px 0' },
  modalFooter: { display: 'flex', justifyContent: 'flex-end', gap: 10 },
  closeBtn: { padding: '10px 20px', border: '1px solid var(--border-primary)', borderRadius: 8, fontSize: 14, background: 'var(--surface-primary)', color: 'var(--text-primary)', cursor: 'pointer' },
};
