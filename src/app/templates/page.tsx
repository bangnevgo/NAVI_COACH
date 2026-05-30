'use client';

import React, { useState } from 'react';
import { useTemplate, useSetTemplate } from '@/components/template-provider';
import { getTemplateList, type NicheTemplate } from '@/templates';
import { Sidebar } from '@/components/sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { BookOpen, Check, ChevronRight, Palette, Zap, MessageCircle, Target } from 'lucide-react';

export default function TemplatesPage() {
  const template = useTemplate();
  const setTemplateId = useSetTemplate();
  const t = template.terminology;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<NicheTemplate | null>(null);
  const allTemplates = getTemplateList();

  return (
    <div style={styles.layout}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpenAITools={() => {}} />
      <main style={styles.main}>
        <div style={styles.topbar}>
          <div style={styles.topbarLeft}>
            <button style={styles.menuBtn} onClick={() => setSidebarOpen(true)} aria-label="Menu">
              <BookOpen size={20} />
            </button>
            <div>
              <h1 style={styles.topbarTitle}>Templates</h1>
              <p style={styles.topbarSub}>Pilih dan kelola niche template coaching</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <div style={styles.content}>
          <div style={styles.activeBanner}>
            <div style={styles.bannerLeft}>
              <div style={{ ...styles.bannerIcon, background: template.phases[0]?.color || '#5B9FFF' }}>
                <Palette size={20} color="#fff" />
              </div>
              <div>
                <div style={styles.bannerTitle}>Template Aktif: {template.name}</div>
                <div style={styles.bannerSub}>
                  {template.phases.length} fase · {template.sessionTypes.length} tipe sesi · {template.aiTools.length} AI tools · {template.goalFocusAreas.length} area fokus
                </div>
              </div>
            </div>
          </div>

          <div style={styles.grid}>
            {allTemplates.map((tmpl) => {
              const isActive = tmpl.id === template.id;
              return (
                <div
                  key={tmpl.id}
                  style={{
                    ...styles.card,
                    borderColor: isActive ? (tmpl.phases[0]?.color || '#5B9FFF') : 'var(--border-primary)',
                    background: isActive ? 'rgba(91, 159, 255, 0.04)' : 'var(--surface-primary)',
                  }}
                  onClick={() => setSelectedTemplate(selectedTemplate?.id === tmpl.id ? null : tmpl)}
                >
                  <div style={styles.cardTop}>
                    <div style={{ ...styles.cardIcon, background: tmpl.phases[0]?.color || '#5B9FFF' }}>
                      {tmpl.name.charAt(0)}
                    </div>
                    <div style={styles.cardMeta}>
                      <div style={styles.cardName}>{tmpl.name}</div>
                      {isActive && (
                        <span style={{ ...styles.activeBadge, background: tmpl.phases[0]?.color || '#5B9FFF' }}>
                          <Check size={10} /> Aktif
                        </span>
                      )}
                    </div>
                  </div>
                  <p style={styles.cardDesc}>{tmpl.description}</p>
                  <div style={styles.cardStats}>
                    <span style={styles.statChip}><Palette size={11} /> {tmpl.phases.length} fase</span>
                    <span style={styles.statChip}><MessageCircle size={11} /> {tmpl.sessionTypes.length} sesi</span>
                    <span style={styles.statChip}><Zap size={11} /> {tmpl.aiTools.length} AI</span>
                    <span style={styles.statChip}><Target size={11} /> {tmpl.goalFocusAreas.length} fokus</span>
                  </div>
                  <div style={styles.phaseRow}>
                    {tmpl.phases.slice(0, 5).map((p) => (
                      <span key={p.id} style={{ ...styles.phaseChip, background: `${p.color}18`, color: p.color, borderColor: `${p.color}40` }}>
                        {p.name}
                      </span>
                    ))}
                    {tmpl.phases.length > 5 && <span style={styles.phaseMore}>+{tmpl.phases.length - 5}</span>}
                  </div>
                  {!isActive && (
                    <button
                      style={styles.useBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        setTemplateId(tmpl.id);
                      }}
                    >
                      Gunakan Template
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {selectedTemplate && (
            <div style={styles.detailCard}>
              <div style={styles.detailHeader}>
                <h3 style={styles.detailTitle}>{selectedTemplate.name}</h3>
                <button style={styles.detailClose} onClick={() => setSelectedTemplate(null)}>Tutup</button>
              </div>
              <p style={styles.detailDesc}>{selectedTemplate.description}</p>

              <div style={styles.detailGrid}>
                <div style={styles.detailSection}>
                  <h4 style={styles.detailSectionTitle}>Fase ({selectedTemplate.phases.length})</h4>
                  {selectedTemplate.phases.map((p) => (
                    <div key={p.id} style={styles.detailRow}>
                      <span style={{ ...styles.detailDot, background: p.color }} />
                      <span style={styles.detailName}>{p.name}</span>
                      <span style={styles.detailInfo}>{p.description}</span>
                    </div>
                  ))}
                </div>
                <div style={styles.detailSection}>
                  <h4 style={styles.detailSectionTitle}>Tipe Sesi ({selectedTemplate.sessionTypes.length})</h4>
                  {selectedTemplate.sessionTypes.map((s) => (
                    <div key={s.id} style={styles.detailRow}>
                      <span style={styles.detailName}>{s.name}</span>
                      <span style={styles.detailInfo}>{s.defaultDuration} menit</span>
                    </div>
                  ))}
                </div>
                <div style={styles.detailSection}>
                  <h4 style={styles.detailSectionTitle}>AI Tools ({selectedTemplate.aiTools.length})</h4>
                  {selectedTemplate.aiTools.map((tool) => (
                    <div key={tool.id} style={styles.detailRow}>
                      <span style={styles.detailName}>{tool.name}</span>
                      <span style={styles.detailInfo}>{tool.description}</span>
                    </div>
                  ))}
                </div>
                <div style={styles.detailSection}>
                  <h4 style={styles.detailSectionTitle}>Area Fokus ({selectedTemplate.goalFocusAreas.length})</h4>
                  {selectedTemplate.goalFocusAreas.map((a) => (
                    <div key={a.id} style={styles.detailRow}>
                      <span style={styles.detailName}>{a.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
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
  activeBanner: { background: 'linear-gradient(135deg, rgba(91,159,255,0.08), rgba(76,175,130,0.08))', border: '1px solid rgba(91,159,255,0.2)', borderRadius: 16, padding: '20px 24px', marginBottom: 24 },
  bannerLeft: { display: 'flex', alignItems: 'center', gap: 16 },
  bannerIcon: { width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  bannerTitle: { fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' },
  bannerSub: { fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16, marginBottom: 24 },
  card: { border: '2px solid', borderRadius: 16, padding: 20, cursor: 'pointer', transition: 'all 0.15s' },
  cardTop: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 },
  cardIcon: { width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 700, flexShrink: 0 },
  cardMeta: { flex: 1, display: 'flex', alignItems: 'center', gap: 8 },
  cardName: { fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' },
  activeBadge: { display: 'inline-flex', alignItems: 'center', gap: 3, padding: '3px 8px', borderRadius: 12, color: '#fff', fontSize: 11, fontWeight: 600 },
  cardDesc: { fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 12px 0' },
  cardStats: { display: 'flex', flexWrap: 'wrap' as const, gap: 6, marginBottom: 12 },
  statChip: { display: 'inline-flex', alignItems: 'center', gap: 3, padding: '3px 8px', background: 'var(--surface-tertiary)', borderRadius: 6, fontSize: 11, color: 'var(--text-secondary)' },
  phaseRow: { display: 'flex', flexWrap: 'wrap' as const, gap: 6, marginBottom: 12 },
  phaseChip: { border: '1px solid', borderRadius: 14, padding: '2px 8px', fontSize: 11, fontWeight: 500 },
  phaseMore: { fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 500 },
  useBtn: { width: '100%', padding: '10px', background: '#5B9FFF', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' },
  detailCard: { background: 'var(--surface-primary)', border: '1px solid var(--border-primary)', borderRadius: 16, padding: 24 },
  detailHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  detailTitle: { fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', margin: 0 },
  detailClose: { padding: '6px 14px', border: '1px solid var(--border-primary)', borderRadius: 8, fontSize: 13, background: 'var(--surface-primary)', color: 'var(--text-primary)', cursor: 'pointer' },
  detailDesc: { fontSize: 14, color: 'var(--text-secondary)', margin: '0 0 20px 0', lineHeight: 1.5 },
  detailGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 20 },
  detailSection: {},
  detailSectionTitle: { fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 10px 0', paddingBottom: 8, borderBottom: '1px solid var(--border-primary)' },
  detailRow: { display: 'flex', alignItems: 'baseline', gap: 8, padding: '5px 0', borderBottom: '1px solid var(--border-very-subtle)' },
  detailDot: { width: 8, height: 8, borderRadius: '50%', flexShrink: 0 },
  detailName: { fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' },
  detailInfo: { fontSize: 12, color: 'var(--text-tertiary)', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const },
};
