'use client';

import React, { useState, useEffect } from 'react';
import { useTemplate } from '@/components/template-provider';
import { type NicheTemplate } from '@/templates/types';
import {
  Users, UserCheck, CheckCircle, Archive,
  TrendingUp, Target, BarChart3, Plus,
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { BRAND } from '@/lib/branding';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

function StatCard({ label, value, icon, color, bgColor }: StatCardProps) {
  return (
    <div style={{ ...styles.statCard, background: '#fff', borderColor: '#e8e8ef' }}>
      <div style={{ ...styles.statIcon, background: bgColor }}>
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<LucideProps>, { size: 20, color }) : icon}
      </div>
      <div style={styles.statInfo}>
        <div style={styles.statValue}>{value}</div>
        <div style={styles.statLabel}>{label}</div>
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
    <div style={{ ...styles.phaseCard, borderLeft: `4px solid ${phase.color}` }}>
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

export default function DashboardPage() {
  const template = useTemplate();
  const t = template.terminology;
  const [stats, setStats] = useState({
    total: 0, active: 0, onProgress: 0, completed: 0, inactive: 0,
    totalSessions: 0, avgProgress: 0,
  });
  const [clients, setClients] = useState<Array<{ phase: string; status: string }>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/analytics')
      .then((r) => r.json())
      .then((data) => {
        if (data.stats) setStats(data.stats);
        if (data.phaseDist) {
          setClients(
            data.phaseDist.flatMap((p: { name: string; value: number }) =>
              Array(p.value).fill({ phase: p.name, status: 'active' })
            )
          );
        }
      })
      .catch(() => {
        setError(null);
      });
  }, []);

  const phaseCounts = template.phases.map((phase) => ({
    phase,
    count: clients.filter((c) => c.phase === phase.name).length,
  }));

  return (
    <div style={styles.container}>
      {typeof window !== 'undefined' && !localStorage.getItem('coachflo_active_template') && (
        <div style={styles.welcomeBanner}>
          <div style={styles.welcomeContent}>
            <div style={styles.welcomeText}>
              <h2 style={styles.welcomeTitle}>Selamat datang di {BRAND.fullName}!</h2>
              <p style={styles.welcomeDesc}>
                Template aktif: <strong style={{ color: template.phases[0]?.color }}>{template.name}</strong>
                {' — '}{t.phase}: {template.phases.map((p) => p.name).join(', ')}
              </p>
            </div>
            <a href="/pengaturan" style={styles.welcomeBtn}>
              <BarChart3 size={16} />
              Ganti Template
            </a>
          </div>
        </div>
      )}

      <div style={styles.statsGrid}>
        <StatCard
          label={`Total ${t.clientPlural}`}
          value={stats.total}
          icon={<Users />}
          color="#5B9FFF"
          bgColor="rgba(91, 159, 255, 0.12)"
        />
        <StatCard
          label={`${t.clientPlural} Aktif`}
          value={stats.active}
          icon={<UserCheck />}
          color="#4CAF82"
          bgColor="rgba(76, 175, 130, 0.12)"
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
        />
      </div>

      {error && <div style={styles.error}>{error}</div>}

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
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '24px 0',
    fontFamily: "'DM Sans', -apple-system, sans-serif",
  },
  welcomeBanner: {
    background: 'linear-gradient(135deg, rgba(91,159,255,0.08), rgba(76,175,130,0.08))',
    border: '1px solid rgba(91,159,255,0.2)',
    borderRadius: 16,
    padding: '20px 24px',
    marginBottom: 24,
  },
  welcomeContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#1a1a2e',
    margin: 0,
  },
  welcomeDesc: {
    fontSize: 14,
    color: '#666',
    margin: '4px 0 0 0',
  },
  welcomeBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 16px',
    background: '#fff',
    border: '1px solid #e8e8ef',
    borderRadius: 8,
    color: '#5B9FFF',
    fontSize: 13,
    fontWeight: 500,
    textDecoration: 'none',
    cursor: 'pointer',
    flexShrink: 0,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: 16,
    marginBottom: 32,
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
    color: '#1a1a2e',
    lineHeight: 1.2,
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  error: {
    padding: '12px 16px',
    background: '#fef2f2',
    border: '1px solid #fcc',
    borderRadius: 8,
    color: '#c00',
    fontSize: 13,
    marginBottom: 24,
  },
  phaseSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#1a1a2e',
    margin: 0,
  },
  sectionSub: {
    fontSize: 13,
    color: '#999',
  },
  phaseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 12,
  },
  phaseCard: {
    background: '#fff',
    border: '1px solid #e8e8ef',
    borderLeft: '4px solid',
    borderRadius: 12,
    padding: 16,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phaseInfo: {
    flex: 1,
    minWidth: 0,
  },
  phaseName: {
    fontSize: 15,
    fontWeight: 600,
    color: '#1a1a2e',
  },
  phaseDesc: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  phaseCount: {
    fontSize: 28,
    fontWeight: 700,
    flexShrink: 0,
    marginLeft: 12,
  },
  templateInfo: {
    background: '#fff',
    border: '1px solid #e8e8ef',
    borderRadius: 12,
    padding: 20,
  },
  templateInfoInner: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },
  templateBadge: {
    padding: '8px 16px',
    borderRadius: 8,
    color: '#fff',
    fontSize: 13,
    fontWeight: 600,
    flexShrink: 0,
  },
  templateDetails: {
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap' as const,
  },
  templateStat: {
    fontSize: 13,
    color: '#666',
    padding: '4px 10px',
    background: '#f5f6fa',
    borderRadius: 6,
  },
};
