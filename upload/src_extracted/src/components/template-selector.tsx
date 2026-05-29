'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { getTemplateList, type NicheTemplate } from '@/templates';
import { Check, ChevronRight, Settings } from 'lucide-react';

interface TemplateSelectorProps {
  selectedId?: string;
  onSelect?: (template: NicheTemplate) => void;
}

export function TemplateSelector({ selectedId, onSelect }: TemplateSelectorProps) {
  const router = useRouter();
  const templates = getTemplateList();

  const handleSelect = (template: NicheTemplate) => {
    if (onSelect) {
      onSelect(template);
      return;
    }
    if (typeof window !== 'undefined') localStorage.setItem('coachflo_active_template', template.id);
    router.push('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Pilih Niche Coaching Anda</h1>
        <p style={styles.subtitle}>
          Template menentukan fase, tipe sesai, tools AI, dan terminologi yang digunakan di dashboard Anda.
          Bisa diubah kapan saja di pengaturan.
        </p>
      </div>

      <div style={styles.grid}>
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => handleSelect(t)}
            style={{
              ...styles.card,
              ...(selectedId === t.id ? styles.cardSelected : {}),
            }}
          >
            <div style={styles.cardTop}>
              <div
                style={{
                  ...styles.iconCircle,
                  background: t.phases[0]?.color ?? '#4C8DFF',
                }}
              >
                <Settings size={24} color="#fff" />
              </div>
              {selectedId === t.id && (
                <div style={styles.checkBadge}>
                  <Check size={14} color="#fff" />
                </div>
              )}
            </div>
            <h3 style={styles.cardTitle}>{t.name}</h3>
            <p style={styles.cardDesc}>{t.description}</p>
            <div style={styles.cardFooter}>
              <span style={styles.phasesCount}>{t.phases.length} fase</span>
              <ChevronRight size={16} color="#666" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 800,
    margin: '0 auto',
    padding: '48px 24px',
    fontFamily: "'DM Sans', -apple-system, sans-serif",
  },
  header: {
    textAlign: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1a1a2e',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    maxWidth: 540,
    margin: '0 auto',
    lineHeight: 1.5,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 16,
  },
  card: {
    background: '#fff',
    border: '2px solid #e8e8ef',
    borderRadius: 16,
    padding: 24,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'left',
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 8,
  },
  cardSelected: {
    borderColor: '#5B9FFF',
    boxShadow: '0 0 0 3px rgba(91, 159, 255, 0.15)',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBadge: {
    background: '#4CAF82',
    width: 24,
    height: 24,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#1a1a2e',
    margin: 0,
  },
  cardDesc: {
    fontSize: 13,
    color: '#666',
    lineHeight: 1.4,
    margin: 0,
    flex: 1,
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 12,
    borderTop: '1px solid #e8e8ef',
  },
  phasesCount: {
    fontSize: 12,
    color: '#999',
    fontWeight: 500,
  },
};
