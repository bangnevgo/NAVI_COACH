'use client';

import React, { useState } from 'react';
import { useTemplate, useSetTemplate } from '@/components/template-provider';
import { TemplateSelector } from '@/components/template-selector';
import { getTemplateList, type NicheTemplate, type TemplateId } from '@/templates';
import { BRAND } from '@/lib/branding';
import {
  ArrowLeft, Check, Info, Palette, Zap,
  MessageCircle, Target, BookOpen, ChevronRight,
} from 'lucide-react';

function TemplateDetailCard({ template, isActive }: { template: NicheTemplate; isActive: boolean }) {
  return (
    <div style={{
      ...styles.detailCard,
      borderColor: isActive ? (template.phases[0]?.color || '#5B9FFF') : '#e8e8ef',
      borderLeft: isActive ? `4px solid ${template.phases[0]?.color || '#5B9FFF'}` : '4px solid transparent',
    }}>
      <div style={styles.detailTop}>
        <h3 style={styles.detailName}>{template.name}</h3>
        {isActive && (
          <span style={{ ...styles.activeBadge, background: template.phases[0]?.color || '#5B9FFF' }}>
            <Check size={12} /> Aktif
          </span>
        )}
      </div>
      <p style={styles.detailDesc}>{template.description}</p>
      <div style={styles.detailMeta}>
        <span style={styles.metaChip}>
          <Palette size={12} /> {template.phases.length} fase
        </span>
        <span style={styles.metaChip}>
          <MessageCircle size={12} /> {template.sessionTypes.length} tipe sesi
        </span>
        <span style={styles.metaChip}>
          <Zap size={12} /> {template.aiTools.length} AI tools
        </span>
        <span style={styles.metaChip}>
          <Target size={12} /> {template.goalFocusAreas.length} area fokus
        </span>
      </div>
      <div style={styles.phaseRow}>
        {template.phases.map((p) => (
          <span key={p.id} style={{ ...styles.phaseChip, background: `${p.color}18`, color: p.color, borderColor: `${p.color}40` }}>
            {p.name}
          </span>
        ))}
      </div>
      <div style={styles.aiToolsRow}>
        {template.aiTools.map((tool) => (
          <div key={tool.id} style={styles.aiToolChip}>
            <span style={styles.aiToolName}>{tool.name}</span>
            <span style={styles.aiToolDesc}>{tool.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PengaturanPage() {
  const template = useTemplate();
  const setTemplateId = useSetTemplate();
  const t = template.terminology;
  const [view, setView] = useState<'info' | 'switch'>('info');
  const allTemplates = getTemplateList();

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <a href="/" style={styles.backBtn}>
          <ArrowLeft size={18} />
        </a>
        <div>
          <h1 style={styles.title}>Pengaturan</h1>
          <p style={styles.subtitle}>Kelola template dan preferensi coaching</p>
        </div>
      </div>

      <div style={styles.sections}>
        {/* Template Section */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionTitle}>
              <Palette size={18} style={{ color: '#5B9FFF' }} />
              Template Coaching
            </div>
            <button
              style={{
                ...styles.switchBtn,
                background: view === 'switch' ? template.phases[0]?.color || '#5B9FFF' : 'transparent',
                color: view === 'switch' ? '#fff' : '#5B9FFF',
                borderColor: template.phases[0]?.color || '#5B9FFF',
              }}
              onClick={() => setView(view === 'switch' ? 'info' : 'switch')}
            >
              {view === 'switch' ? 'Selesai' : 'Ganti Template'}
            </button>
          </div>

          {view === 'switch' ? (
            <div style={styles.switchView}>
              <div style={styles.warningBanner}>
                <Info size={16} />
                <span>Mengganti template akan mengubah fase, tipe sesi, tools AI, dan terminologi di seluruh dashboard.</span>
              </div>
              <div style={styles.templateGrid}>
                {allTemplates.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    style={{
                      ...styles.templateCard,
                      borderColor: tmpl.id === template.id ? (tmpl.phases[0]?.color || '#5B9FFF') : '#e8e8ef',
                      background: tmpl.id === template.id ? 'rgba(91, 159, 255, 0.04)' : '#fff',
                    }}
                    onClick={() => {
                      setTemplateId(tmpl.id);
                      setView('info');
                    }}
                  >
                    <div style={styles.templateCardTop}>
                      <div style={{ ...styles.templateIcon, background: tmpl.phases[0]?.color || '#5B9FFF' }}>
                        <Check size={18} color="#fff" style={{ opacity: tmpl.id === template.id ? 1 : 0 }} />
                      </div>
                      <div style={styles.templateCardMeta}>
                        <div style={styles.templateCardName}>{tmpl.name}</div>
                        <div style={styles.templateCardCounts}>
                          {tmpl.phases.length} fase &middot; {tmpl.aiTools.length} tools AI
                        </div>
                      </div>
                    </div>
                    <p style={styles.templateCardDesc}>{tmpl.description}</p>
                    <div style={styles.templateCardFooter}>
                      <div style={styles.templatePhases}>
                        {tmpl.phases.slice(0, 4).map((p) => (
                          <span
                            key={p.id}
                            style={{
                              ...styles.miniPhase,
                              background: p.color,
                            }}
                          />
                        ))}
                        {tmpl.phases.length > 4 && (
                          <span style={styles.miniPhasePlus}>+{tmpl.phases.length - 4}</span>
                        )}
                      </div>
                      <ChevronRight size={16} color="#999" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <TemplateDetailCard template={template} isActive />
          )}
        </section>

        {/* Template Details Section */}
        <section style={styles.section}>
          <div style={styles.sectionTitle}>
            <BookOpen size={18} style={{ color: '#5B9FFF' }} />
            Detail Template Aktif
          </div>
          <div style={styles.tablesGrid}>
            {/* Terminology */}
            <div style={styles.tableCard}>
              <h4 style={styles.tableTitle}>Terminologi</h4>
              {Object.entries(t).map(([key, value]) => (
                <div key={key} style={styles.tableRow}>
                  <span style={styles.tableKey}>{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                  <span style={styles.tableVal}>{value}</span>
                </div>
              ))}
            </div>
            {/* Session Types */}
            <div style={styles.tableCard}>
              <h4 style={styles.tableTitle}>Tipe Sesi ({template.sessionTypes.length})</h4>
              {template.sessionTypes.map((st) => (
                <div key={st.id} style={styles.tableRow}>
                  <span style={styles.tableKey}>{st.name}</span>
                  <span style={styles.tableVal}>{st.defaultDuration} menit</span>
                </div>
              ))}
            </div>
            {/* Goal Focus Areas */}
            <div style={styles.tableCard}>
              <h4 style={styles.tableTitle}>Area Fokus ({template.goalFocusAreas.length})</h4>
              {template.goalFocusAreas.map((a) => (
                <div key={a.id} style={styles.tableRow}>
                  <span style={styles.tableKey}>{a.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Branding Info */}
        <section style={styles.section}>
          <div style={styles.sectionTitle}>
            <Info size={18} style={{ color: '#5B9FFF' }} />
            Tentang
          </div>
          <div style={styles.aboutCard}>
            <div style={styles.aboutRow}>
              <span style={styles.aboutLabel}>Platform</span>
              <span style={styles.aboutVal}>{BRAND.fullName}</span>
            </div>
            <div style={styles.aboutRow}>
              <span style={styles.aboutLabel}>Versi</span>
              <span style={styles.aboutVal}>{BRAND.version}</span>
            </div>
            <div style={styles.aboutRow}>
              <span style={styles.aboutLabel}>Template</span>
              <span style={styles.aboutVal}>{template.name} v{template.version}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 800,
    margin: '0 auto',
    padding: '24px',
    fontFamily: "'DM Sans', -apple-system, sans-serif",
    minHeight: '100vh',
    background: '#f5f6fa',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: '#fff',
    border: '1px solid #e8e8ef',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    color: '#333',
    cursor: 'pointer',
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1a1a2e',
    margin: 0,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    margin: '2px 0 0 0',
  },
  sections: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 20,
  },
  section: {
    background: '#fff',
    border: '1px solid #e8e8ef',
    borderRadius: 16,
    padding: 24,
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#1a1a2e',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 0,
  },
  switchBtn: {
    border: '1.5px solid',
    borderRadius: 8,
    padding: '6px 14px',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  warningBanner: {
    display: 'flex',
    gap: 10,
    padding: '12px 16px',
    background: 'rgba(255, 180, 0, 0.08)',
    border: '1px solid rgba(255, 180, 0, 0.25)',
    borderRadius: 10,
    fontSize: 13,
    color: '#8a6d00',
    marginBottom: 20,
    lineHeight: 1.5,
  },
  templateGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 12,
  },
  templateCard: {
    border: '2px solid',
    borderRadius: 14,
    padding: 20,
    cursor: 'pointer',
    textAlign: 'left' as const,
    fontFamily: 'inherit',
    transition: 'all 0.15s',
  },
  templateCardTop: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  templateIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  templateCardMeta: {
    flex: 1,
    minWidth: 0,
  },
  templateCardName: {
    fontSize: 15,
    fontWeight: 600,
    color: '#1a1a2e',
  },
  templateCardCounts: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  templateCardDesc: {
    fontSize: 13,
    color: '#666',
    margin: '0 0 12px 0',
    lineHeight: 1.4,
  },
  templateCardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTop: '1px solid #f0f0f5',
  },
  templatePhases: {
    display: 'flex',
    gap: 4,
    alignItems: 'center',
  },
  miniPhase: {
    width: 8,
    height: 8,
    borderRadius: '50%',
  },
  miniPhasePlus: {
    fontSize: 11,
    color: '#999',
    fontWeight: 500,
  },
  detailCard: {
    border: '1px solid',
    borderRadius: 12,
    padding: 20,
  },
  detailTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailName: {
    fontSize: 18,
    fontWeight: 700,
    color: '#1a1a2e',
    margin: 0,
  },
  activeBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '4px 10px',
    borderRadius: 20,
    color: '#fff',
    fontSize: 12,
    fontWeight: 600,
  },
  detailDesc: {
    fontSize: 14,
    color: '#666',
    margin: '0 0 16px 0',
    lineHeight: 1.5,
  },
  detailMeta: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 8,
    marginBottom: 16,
  },
  metaChip: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '4px 10px',
    background: '#f5f6fa',
    borderRadius: 6,
    fontSize: 12,
    color: '#666',
  },
  phaseRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 6,
    marginBottom: 16,
  },
  phaseChip: {
    border: '1px solid',
    borderRadius: 16,
    padding: '3px 10px',
    fontSize: 12,
    fontWeight: 500,
  },
  aiToolsRow: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 6,
  },
  aiToolChip: {
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '8px 12px',
    background: '#f8f9fc',
    borderRadius: 8,
    gap: 2,
  },
  aiToolName: {
    fontSize: 13,
    fontWeight: 600,
    color: '#333',
  },
  aiToolDesc: {
    fontSize: 12,
    color: '#999',
  },
  tablesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 12,
  },
  tableCard: {
    border: '1px solid #e8e8ef',
    borderRadius: 10,
    padding: 16,
  },
  tableTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: '#333',
    margin: '0 0 12px 0',
    paddingBottom: 8,
    borderBottom: '1px solid #e8e8ef',
  },
  tableRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '6px 0',
    borderBottom: '1px solid #f5f5f8',
  },
  tableKey: {
    fontSize: 12,
    color: '#666',
    textTransform: 'capitalize' as const,
  },
  tableVal: {
    fontSize: 12,
    fontWeight: 600,
    color: '#333',
  },
  aboutCard: {
    border: '1px solid #e8e8ef',
    borderRadius: 10,
    padding: 16,
  },
  aboutRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #f5f5f8',
  },
  aboutLabel: {
    fontSize: 13,
    color: '#666',
  },
  aboutVal: {
    fontSize: 13,
    fontWeight: 600,
    color: '#333',
  },
};
