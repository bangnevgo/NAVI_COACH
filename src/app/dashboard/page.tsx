'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTemplate } from '@/components/template-provider';
import { type NicheTemplate } from '@/templates/types';
import {
  Users, UserCheck, CheckCircle, Archive,
  TrendingUp, Target, BarChart3, Plus, Menu, Moon, Sun,
  CalendarDays, Clock, Sparkles, ChevronRight, Activity,
  AlertCircle, Award, Zap, Eye, MessageCircle, ExternalLink,
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { BRAND } from '@/lib/branding';
import { Sidebar } from '@/components/sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { AIAssistantPanel } from '@/components/ai-assistant-panel';
import {
  DEMO_CLIENTS, getDemoStats, getDemoPhaseDistribution,
  getDemoUpcomingSessions, getDemoRecentActivity, isDemoMode,
} from '@/lib/demo-data';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  trend?: string;
}

function StatCard({ label, value, icon, color, bgColor, trend }: StatCardProps) {
  return (
    <div style={{ ...styles.statCard, background: 'var(--surface-primary)', borderColor: 'var(--border-primary)' }}>
      <div style={{ ...styles.statIcon, background: bgColor }}>
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<LucideProps>, { size: 20, color }) : icon}
      </div>
      <div style={styles.statInfo}>
        <div style={styles.statValue}>{value}</div>
        <div style={styles.statLabel}>{label}</div>
        {trend && <div style={{ ...styles.statTrend, color: '#4CAF82' }}>{trend}</div>}
      </div>
    </div>
  );
}

interface PhaseCardProps {
  phase: { id: string; name: string; color: string; description: string };
  count: number;
  template: NicheTemplate;
}

function PhaseCard({ phase, count, template }: PhaseCardProps) {
  return (
    <div style={{ ...styles.phaseCard, borderLeft: `4px solid ${phase.color}`, background: 'var(--surface-primary)', borderColor: 'var(--border-primary)' }}>
      <div style={styles.phaseInfo}>
        <div style={styles.phaseName}>{phase.name}</div>
        <div style={styles.phaseDesc}>{phase.description}</div>
      </div>
      <div style={{ ...styles.phaseCount, color: phase.color }}>
        {count}
      </div>
    </div>
  );
}

function DemoBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div style={styles.demoBanner}>
      <div style={styles.demoBannerInner}>
        <div style={styles.demoBannerLeft}>
          <div style={styles.demoBadge}>
            <Sparkles size={14} />
            <span>MODE DEMO</span>
          </div>
          <p style={styles.demoBannerText}>
            Anda sedang menjelajahi <strong>COACHFLO</strong> dengan data sampel. Semua klien & data di sini adalah contoh untuk menunjukkan fitur platform.
          </p>
        </div>
        <div style={styles.demoBannerActions}>
          <button style={styles.demoDismissBtn} onClick={() => setVisible(false)}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

function UpcomingSessionCard({ session }: { session: { id: string; clientName: string; date: string; type: string; phase: string } }) {
  const date = new Date(session.date);
  const dayName = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'][date.getDay()];
  const time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

  return (
    <div style={styles.upcomingCard}>
      <div style={styles.upcomingDate}>
        <div style={styles.upcomingDay}>{dayName}</div>
        <div style={styles.upcomingNum}>{date.getDate()}</div>
      </div>
      <div style={styles.upcomingInfo}>
        <div style={styles.upcomingName}>{session.clientName}</div>
        <div style={styles.upcomingMeta}>
          <Clock size={11} />
          <span>{time} • {session.type}</span>
        </div>
      </div>
      <div style={styles.upcomingPhase}>{session.phase}</div>
    </div>
  );
}

function ActivityCard({ activity }: { activity: { id: string; type: string; title: string; description: string; time: string; clientName: string } }) {
  const iconMap: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
    achievement: { icon: <Award size={16} />, color: '#4CAF82', bg: 'rgba(76,175,130,0.12)' },
    milestone: { icon: <Zap size={16} />, color: '#B49AF3', bg: 'rgba(180,154,243,0.12)' },
    insight: { icon: <Eye size={16} />, color: '#5B9FFF', bg: 'rgba(91,159,255,0.12)' },
    warning: { icon: <AlertCircle size={16} />, color: '#E86B6B', bg: 'rgba(232,107,107,0.12)' },
  };
  const config = iconMap[activity.type] || iconMap.insight;

  return (
    <div style={{ ...styles.activityCard, borderLeftColor: config.color }}>
      <div style={{ ...styles.activityIcon, background: config.bg, color: config.color }}>
        {config.icon}
      </div>
      <div style={styles.activityContent}>
        <div style={styles.activityTitle}>{activity.title}</div>
        <div style={styles.activityDesc}>{activity.description}</div>
        <div style={styles.activityTime}>{activity.time}</div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const template = useTemplate();
  const t = template.terminology;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiToolsOpen, setAiToolsOpen] = useState(false);

  // Use demo data
  const stats = getDemoStats();
  const phaseDist = getDemoPhaseDistribution();
  const upcomingSessions = getDemoUpcomingSessions();
  const recentActivity = getDemoRecentActivity();
  const demo = isDemoMode();

  const phaseCounts = template.phases.map((phase) => ({
    phase,
    count: phaseDist.find(p => p.name === phase.name)?.value || 0,
  }));

  return (
    <div style={styles.layout}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpenAITools={() => setAiToolsOpen(true)} />
      <main style={styles.main}>
        <div style={styles.topbar}>
          <div style={styles.topbarLeft}>
            <button style={styles.menuBtn} onClick={() => setSidebarOpen(true)} aria-label="Menu">
              <Menu size={20} />
            </button>
            <div>
              <h1 style={styles.topbarTitle}>Dashboard</h1>
              <p style={styles.topbarSub}>Ringkasan {t.clientPlural.toLowerCase()} dan coaching</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
        <div style={styles.container}>
          {/* Demo Banner */}
          {demo && <DemoBanner />}

          {/* Stats Grid */}
          <div style={styles.statsGrid}>
            <StatCard
              label={`Total ${t.clientPlural}`}
              value={stats.total}
              icon={<Users />}
              color="#5B9FFF"
              bgColor="rgba(91, 159, 255, 0.12)"
              trend="+3 bulan ini"
            />
            <StatCard
              label={`${t.clientPlural} Aktif`}
              value={stats.active}
              icon={<UserCheck />}
              color="#4CAF82"
              bgColor="rgba(76, 175, 130, 0.12)"
              trend="2 baru"
            />
            <StatCard
              label={`${t.goalPlural} Tercapai`}
              value={stats.completed}
              icon={<CheckCircle />}
              color="#B49AF3"
              bgColor="rgba(180, 154, 243, 0.12)"
            />
            <StatCard
              label={t.clientInactive}
              value={stats.inactive}
              icon={<Archive />}
              color="#F17F7F"
              bgColor="rgba(241, 127, 127, 0.12)"
            />
            <StatCard
              label={`Total ${t.sessionPlural}`}
              value={stats.totalSessions}
              icon={<Target />}
              color="#E8935D"
              bgColor="rgba(232, 147, 93, 0.12)"
            />
            <StatCard
              label="Rata-rata Progress"
              value={`${stats.avgProgress}%`}
              icon={<TrendingUp />}
              color="#4DBCC9"
              bgColor="rgba(77, 188, 201, 0.12)"
              trend="+12% minggu ini"
            />
          </div>

          {/* Two Column Layout */}
          <div style={styles.twoColumn}>
            {/* Left Column - Phase Distribution + Template */}
            <div style={styles.leftColumn}>
              {/* Phase Distribution */}
              <div style={styles.phaseSection}>
                <div style={styles.sectionHeader}>
                  <h3 style={styles.sectionTitle}>Distribusi {t.phase}</h3>
                  <span style={styles.sectionSub}>Berdasarkan {t.phase.toLowerCase()} aktif</span>
                </div>
                <div style={styles.phaseGrid}>
                  {phaseCounts.map(({ phase, count }) => (
                    <PhaseCard key={phase.id} phase={phase} count={count || 0} template={template} />
                  ))}
                </div>
              </div>

              {/* Template Info */}
              <div style={styles.templateInfo}>
                <div style={styles.templateInfoInner}>
                  <div style={{ ...styles.templateBadge, background: template.phases[0]?.color || '#4C8DFF' }}>
                    {template.name}
                  </div>
                  <div style={styles.templateDetails}>
                    <div style={styles.templateStat}>{template.phases.length} {t.phase.toLowerCase()}</div>
                    <div style={styles.templateStat}>{template.sessionTypes.length} tipe sesi</div>
                    <div style={styles.templateStat}>{template.aiTools.length} tools AI</div>
                    <div style={styles.templateStat}>{template.goalFocusAreas.length} area fokus</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Upcoming + Activity */}
            <div style={styles.rightColumn}>
              {/* Upcoming Sessions */}
              <div style={styles.upcomingSection}>
                <div style={styles.sectionHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CalendarDays size={16} style={{ color: 'var(--fluent-blue)' }} />
                    <h3 style={styles.sectionTitle}>Jadwal Mendatang</h3>
                  </div>
                  <Link href="/jadwal/" style={styles.sectionLink}>
                    Lihat Semua
                    <ChevronRight size={14} />
                  </Link>
                </div>
                <div style={styles.upcomingList}>
                  {upcomingSessions.map((s) => (
                    <UpcomingSessionCard key={s.id} session={s} />
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div style={styles.activitySection}>
                <div style={styles.sectionHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Activity size={16} style={{ color: 'var(--fluent-purple)' }} />
                    <h3 style={styles.sectionTitle}>Aktivitas Terkini</h3>
                  </div>
                </div>
                <div style={styles.activityList}>
                  {recentActivity.map((a) => (
                    <ActivityCard key={a.id} activity={a} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={styles.quickActions}>
            <h3 style={styles.quickActionsTitle}>Aksi Cepat</h3>
            <div style={styles.quickActionsGrid}>
              <Link href="/klien/" style={{ ...styles.quickActionBtn, borderColor: 'rgba(91,159,255,0.2)' }}>
                <div style={{ ...styles.quickActionIcon, background: 'rgba(91,159,255,0.12)', color: '#5B9FFF' }}>
                  <Users size={20} />
                </div>
                <span style={styles.quickActionLabel}>Kelola Klien</span>
              </Link>
              <button onClick={() => setAiToolsOpen(true)} style={{ ...styles.quickActionBtn, borderColor: 'rgba(180,154,243,0.2)' }}>
                <div style={{ ...styles.quickActionIcon, background: 'rgba(180,154,243,0.12)', color: '#B49AF3' }}>
                  <Sparkles size={20} />
                </div>
                <span style={styles.quickActionLabel}>AI Assistant</span>
              </button>
              <Link href="/analytics/" style={{ ...styles.quickActionBtn, borderColor: 'rgba(76,175,130,0.2)' }}>
                <div style={{ ...styles.quickActionIcon, background: 'rgba(76,175,130,0.12)', color: '#4CAF82' }}>
                  <BarChart3 size={20} />
                </div>
                <span style={styles.quickActionLabel}>Analytics</span>
              </Link>
              <Link href="/jadwal/" style={{ ...styles.quickActionBtn, borderColor: 'rgba(232,147,93,0.2)' }}>
                <div style={{ ...styles.quickActionIcon, background: 'rgba(232,147,93,0.12)', color: '#E8935D' }}>
                  <CalendarDays size={20} />
                </div>
                <span style={styles.quickActionLabel}>Jadwal</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <AIAssistantPanel isOpen={aiToolsOpen} onClose={() => setAiToolsOpen(false)} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  layout: {
    display: 'flex',
    minHeight: '100dvh',
    background: 'var(--surface-secondary)',
    fontFamily: "'DM Sans', -apple-system, sans-serif",
  },
  main: {
    flex: 1,
    minHeight: '100dvh',
    display: 'flex',
    flexDirection: 'column' as const,
    overflowX: 'hidden',
  },
  topbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    background: 'var(--surface-primary)',
    borderBottom: '1px solid var(--border-primary)',
  },
  topbarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  topbarTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: 'var(--text-primary)',
    margin: 0,
  },
  topbarSub: {
    fontSize: 13,
    color: 'var(--text-secondary)',
    margin: '2px 0 0 0',
  },
  menuBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-primary)',
    padding: '8px',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '24px',
    fontFamily: "'DM Sans', -apple-system, sans-serif",
    width: '100%',
  },

  // Demo Banner
  demoBanner: {
    background: 'linear-gradient(135deg, rgba(91,159,255,0.08), rgba(180,154,243,0.08))',
    border: '1px solid rgba(91,159,255,0.2)',
    borderRadius: 16,
    padding: '16px 20px',
    marginBottom: 24,
  },
  demoBannerInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  demoBannerLeft: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  demoBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '4px 10px',
    background: 'linear-gradient(135deg, var(--fluent-blue), var(--fluent-purple))',
    borderRadius: 6,
    color: '#fff',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.5px',
    flexShrink: 0,
    whiteSpace: 'nowrap' as const,
  },
  demoBannerText: {
    fontSize: 13,
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
    margin: 0,
  },
  demoBannerActions: {
    display: 'flex',
    gap: 8,
    flexShrink: 0,
  },
  demoDismissBtn: {
    padding: '6px 14px',
    borderRadius: 8,
    border: '1px solid var(--border-primary)',
    background: 'var(--surface-primary)',
    color: 'var(--text-secondary)',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.15s',
  },

  // Stats
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: 16,
    marginBottom: 28,
  },
  statCard: {
    border: '1px solid',
    borderRadius: 12,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    transition: 'transform 0.15s, box-shadow 0.15s',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  statInfo: {
    minWidth: 0,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 700,
    color: 'var(--text-primary)',
    lineHeight: 1.2,
  },
  statLabel: {
    fontSize: 13,
    color: 'var(--text-secondary)',
    marginTop: 2,
  },
  statTrend: {
    fontSize: 11,
    fontWeight: 600,
    marginTop: 2,
  },

  // Two Column
  twoColumn: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 24,
    marginBottom: 28,
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 20,
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 20,
  },

  // Phases
  phaseSection: {},
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: 'var(--text-primary)',
    margin: 0,
  },
  sectionSub: {
    fontSize: 12,
    color: 'var(--text-tertiary)',
  },
  sectionLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--fluent-blue)',
    textDecoration: 'none',
  },
  phaseGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 10,
  },
  phaseCard: {
    border: '1px solid',
    borderLeft: '4px solid',
    borderRadius: 10,
    padding: '14px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phaseInfo: {
    flex: 1,
    minWidth: 0,
  },
  phaseName: {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  phaseDesc: {
    fontSize: 11,
    color: 'var(--text-secondary)',
    marginTop: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  phaseCount: {
    fontSize: 24,
    fontWeight: 700,
    flexShrink: 0,
    marginLeft: 12,
  },

  // Template
  templateInfo: {
    background: 'var(--surface-primary)',
    border: '1px solid var(--border-primary)',
    borderRadius: 12,
    padding: 16,
  },
  templateInfoInner: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  templateBadge: {
    padding: '8px 14px',
    borderRadius: 8,
    color: '#fff',
    fontSize: 12,
    fontWeight: 600,
    flexShrink: 0,
  },
  templateDetails: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap' as const,
  },
  templateStat: {
    fontSize: 12,
    color: 'var(--text-secondary)',
    padding: '4px 10px',
    background: 'var(--surface-tertiary)',
    borderRadius: 6,
  },

  // Upcoming Sessions
  upcomingSection: {
    background: 'var(--surface-primary)',
    border: '1px solid var(--border-primary)',
    borderRadius: 12,
    padding: 20,
  },
  upcomingList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 8,
  },
  upcomingCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 12px',
    borderRadius: 10,
    background: 'var(--surface-secondary)',
    border: '1px solid var(--border-subtle)',
  },
  upcomingDate: {
    width: 44,
    height: 44,
    borderRadius: 10,
    background: 'linear-gradient(135deg, var(--fluent-blue), var(--fluent-purple))',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    flexShrink: 0,
  },
  upcomingDay: {
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: '0.5px',
    textTransform: 'uppercase' as const,
    opacity: 0.8,
  },
  upcomingNum: {
    fontSize: 16,
    fontWeight: 800,
    lineHeight: 1,
  },
  upcomingInfo: {
    flex: 1,
    minWidth: 0,
  },
  upcomingName: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  upcomingMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 11,
    color: 'var(--text-tertiary)',
    marginTop: 2,
  },
  upcomingPhase: {
    fontSize: 10,
    fontWeight: 600,
    padding: '3px 8px',
    borderRadius: 4,
    background: 'rgba(91,159,255,0.1)',
    color: 'var(--fluent-blue)',
  },

  // Activity
  activitySection: {
    background: 'var(--surface-primary)',
    border: '1px solid var(--border-primary)',
    borderRadius: 12,
    padding: 20,
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 8,
  },
  activityCard: {
    display: 'flex',
    gap: 12,
    padding: '10px 12px',
    borderRadius: 10,
    background: 'var(--surface-secondary)',
    border: '1px solid var(--border-subtle)',
    borderLeft: '3px solid',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  activityContent: {
    flex: 1,
    minWidth: 0,
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  activityDesc: {
    fontSize: 11,
    color: 'var(--text-secondary)',
    marginTop: 2,
    lineHeight: 1.4,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  activityTime: {
    fontSize: 10,
    color: 'var(--text-tertiary)',
    marginTop: 4,
  },

  // Quick Actions
  quickActions: {
    marginBottom: 24,
  },
  quickActionsTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: 'var(--text-primary)',
    margin: '0 0 12px 0',
  },
  quickActionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 12,
  },
  quickActionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '14px 16px',
    borderRadius: 12,
    background: 'var(--surface-primary)',
    border: '1px solid',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.15s',
    fontFamily: 'inherit',
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  quickActionLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
};
