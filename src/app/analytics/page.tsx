'use client';

import React, { useState, useEffect } from 'react';
import { useTemplate } from '@/components/template-provider';
import { Sidebar } from '@/components/sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { AIAssistantPanel } from '@/components/ai-assistant-panel';
import { BarChart3, TrendingUp, Users, Target, Clock, Award } from 'lucide-react';

interface AnalyticsData {
  stats: {
    total: number;
    active: number;
    onProgress: number;
    completed: number;
    inactive: number;
    totalSessions: number;
    avgProgress: number;
  };
  phaseDist: Array<{ name: string; value: number }>;
}

export default function AnalyticsPage() {
  const template = useTemplate();
  const t = template.terminology;
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiToolsOpen, setAiToolsOpen] = useState(false);

  useEffect(() => {
    const { getDemoStats, getDemoPhaseDistribution, isDemoMode } = require('@/lib/demo-data');
    if (isDemoMode()) {
      setData({ stats: getDemoStats(), phaseDist: getDemoPhaseDistribution() });
    } else {
      fetch('/api/analytics')
        .then((r) => r.json())
        .then(setData)
        .catch(console.error);
    }
  }, []);

  const stats = data?.stats || { total: 0, active: 0, onProgress: 0, completed: 0, inactive: 0, totalSessions: 0, avgProgress: 0 };
  const phaseDist = data?.phaseDist || [];

  const statusData = [
    { label: 'Aktif', value: stats.active, color: '#4CAF82', bg: 'rgba(76,175,130,0.12)' },
    { label: 'On Progress', value: stats.onProgress, color: '#5B9FFF', bg: 'rgba(91,159,255,0.12)' },
    { label: 'Selesai', value: stats.completed, color: '#B49AF3', bg: 'rgba(180,154,243,0.12)' },
    { label: 'Tidak Aktif', value: stats.inactive, color: '#F17F7F', bg: 'rgba(241,127,127,0.12)' },
  ];

  const maxPhaseValue = Math.max(...phaseDist.map((p) => p.value), 1);

  return (
    <div style={styles.layout}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpenAITools={() => setAiToolsOpen(true)} />
      <main style={styles.main}>
        <div style={styles.topbar}>
          <div style={styles.topbarLeft}>
            <button style={styles.menuBtn} onClick={() => setSidebarOpen(true)} aria-label="Menu">
              <BarChart3 size={20} />
            </button>
            <div>
              <h1 style={styles.topbarTitle}>Analytics</h1>
              <p style={styles.topbarSub}>Analisis data {t.clientPlural.toLowerCase()} dan coaching</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <div style={styles.content}>
          <div style={styles.statsRow}>
            <div style={styles.statCard}>
              <div style={styles.statIconWrap}><Users size={20} color="#5B9FFF" /></div>
              <div style={styles.statValue}>{stats.total}</div>
              <div style={styles.statLabel}>Total {t.clientPlural}</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIconWrap}><Target size={20} color="#4CAF82" /></div>
              <div style={styles.statValue}>{stats.avgProgress}%</div>
              <div style={styles.statLabel}>Rata-rata Progress</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIconWrap}><Clock size={20} color="#E8935D" /></div>
              <div style={styles.statValue}>{stats.totalSessions}</div>
              <div style={styles.statLabel}>Total {t.sessionPlural}</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIconWrap}><Award size={20} color="#B49AF3" /></div>
              <div style={styles.statValue}>{stats.completed}</div>
              <div style={styles.statLabel}>{t.goalPlural} Tercapai</div>
            </div>
          </div>

          <div style={styles.grid2col}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Distribusi Status</h3>
              <p style={styles.cardSub}>Berdasarkan status {t.clientPlural.toLowerCase()}</p>
              <div style={styles.barChart}>
                {statusData.map((item) => {
                  const pct = stats.total > 0 ? (item.value / stats.total) * 100 : 0;
                  return (
                    <div key={item.label} style={styles.barRow}>
                      <div style={styles.barLabel}>
                        <span style={{ ...styles.barDot, background: item.color }} />
                        <span>{item.label}</span>
                      </div>
                      <div style={styles.barTrack}>
                        <div style={{ ...styles.barFill, width: `${pct}%`, background: item.color }} />
                      </div>
                      <span style={styles.barValue}>{item.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Distribusi {t.phase}</h3>
              <p style={styles.cardSub}>Berdasarkan {t.phase.toLowerCase()} aktif</p>
              <div style={styles.barChart}>
                {phaseDist.length === 0 ? (
                  <p style={styles.emptyText}>Belum ada data {t.phase.toLowerCase()}</p>
                ) : (
                  phaseDist.map((item) => {
                    const phase = template.phases.find((p) => p.name === item.name);
                    const pct = maxPhaseValue > 0 ? (item.value / maxPhaseValue) * 100 : 0;
                    return (
                      <div key={item.name} style={styles.barRow}>
                        <div style={styles.barLabel}>
                          <span style={{ ...styles.barDot, background: phase?.color || '#5B9FFF' }} />
                          <span>{item.name}</span>
                        </div>
                        <div style={styles.barTrack}>
                          <div style={{ ...styles.barFill, width: `${pct}%`, background: phase?.color || '#5B9FFF' }} />
                        </div>
                        <span style={styles.barValue}>{item.value}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Ringkasan Aktivitas</h3>
            <p style={styles.cardSub}>Gambaran umum aktivitas coaching</p>
            <div style={styles.summaryGrid}>
              <div style={styles.summaryItem}>
                <div style={styles.summaryValue}>{stats.active}</div>
                <div style={styles.summaryLabel}>{t.clientPlural} Aktif</div>
                <div style={styles.summaryPct}>{stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}%</div>
              </div>
              <div style={styles.summaryItem}>
                <div style={styles.summaryValue}>{stats.onProgress}</div>
                <div style={styles.summaryLabel}>On Progress</div>
                <div style={styles.summaryPct}>{stats.total > 0 ? Math.round((stats.onProgress / stats.total) * 100) : 0}%</div>
              </div>
              <div style={styles.summaryItem}>
                <div style={styles.summaryValue}>{stats.completed}</div>
                <div style={styles.summaryLabel}>Selesai</div>
                <div style={styles.summaryPct}>{stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%</div>
              </div>
              <div style={styles.summaryItem}>
                <div style={styles.summaryValue}>{stats.inactive}</div>
                <div style={styles.summaryLabel}>Tidak Aktif</div>
                <div style={styles.summaryPct}>{stats.total > 0 ? Math.round((stats.inactive / stats.total) * 100) : 0}%</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AIAssistantPanel isOpen={aiToolsOpen} onClose={() => setAiToolsOpen(false)} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  layout: { display: 'flex', minHeight: '100vh', background: 'var(--surface-secondary)', fontFamily: "'DM Sans', -apple-system, sans-serif" },
  main: { flex: 1, display: 'flex', flexDirection: 'column' as const },
  topbar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: 'var(--surface-primary)', borderBottom: '1px solid var(--border-primary)' },
  topbarLeft: { display: 'flex', alignItems: 'center', gap: 16 },
  topbarTitle: { fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', margin: 0 },
  topbarSub: { fontSize: 13, color: 'var(--text-secondary)', margin: '2px 0 0 0' },
  menuBtn: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: '8px', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  content: { flex: 1, padding: 24, maxWidth: 1200, margin: '0 auto', width: '100%' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 24 },
  statCard: { background: 'var(--surface-primary)', border: '1px solid var(--border-primary)', borderRadius: 14, padding: 20, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', textAlign: 'center' as const },
  statIconWrap: { width: 44, height: 44, borderRadius: 12, background: 'var(--surface-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  statValue: { fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 },
  statLabel: { fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 },
  grid2col: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: 20, marginBottom: 24 },
  card: { background: 'var(--surface-primary)', border: '1px solid var(--border-primary)', borderRadius: 16, padding: 24 },
  cardTitle: { fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px 0' },
  cardSub: { fontSize: 13, color: 'var(--text-secondary)', margin: '0 0 20px 0' },
  barChart: { display: 'flex', flexDirection: 'column' as const, gap: 14 },
  barRow: { display: 'flex', alignItems: 'center', gap: 12 },
  barLabel: { fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8, minWidth: 110 },
  barDot: { width: 10, height: 10, borderRadius: '50%', flexShrink: 0 },
  barTrack: { flex: 1, height: 10, background: 'var(--surface-tertiary)', borderRadius: 5, overflow: 'hidden' as const },
  barFill: { height: '100%', borderRadius: 5, transition: 'width 0.5s ease' },
  barValue: { fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', minWidth: 30, textAlign: 'right' as const },
  emptyText: { fontSize: 13, color: 'var(--text-tertiary)', textAlign: 'center' as const, padding: '24px 0' },
  summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 },
  summaryItem: { background: 'var(--surface-tertiary)', borderRadius: 12, padding: 20, textAlign: 'center' as const },
  summaryValue: { fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 },
  summaryLabel: { fontSize: 13, color: 'var(--text-secondary)', marginTop: 4, marginBottom: 8 },
  summaryPct: { fontSize: 12, fontWeight: 600, color: '#5B9FFF', background: 'rgba(91,159,255,0.1)', padding: '2px 8px', borderRadius: 10, display: 'inline-block' },
};
