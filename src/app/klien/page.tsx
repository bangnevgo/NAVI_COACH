'use client';

import React, { useState, useEffect } from 'react';
import { useTemplate } from '@/components/template-provider';
import { BRAND } from '@/lib/branding';
import { Sidebar } from '@/components/sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import type { Client as ClientType } from '@/lib/types';

function timeAgo(dateStr: string): string {
  if (!dateStr) return '-';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Baru saja';
  if (mins < 60) return `${mins} menit lalu`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} jam lalu`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days} hari lalu`;
  const months = Math.floor(days / 30);
  return `${months} bulan lalu`;
}

function statusLabel(s: string) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    active: { label: 'Aktif', color: '#4CAF82', bg: 'rgba(76,175,130,0.12)' },
    on_progress: { label: 'On Progress', color: '#5B9FFF', bg: 'rgba(91,159,255,0.12)' },
    completed: { label: 'Selesai', color: '#B49AF3', bg: 'rgba(180,154,243,0.12)' },
    inactive: { label: 'Tidak Aktif', color: '#F17F7F', bg: 'rgba(241,127,127,0.12)' },
  };
  return map[s] || { label: s, color: '#888', bg: 'rgba(136,136,136,0.12)' };
}

export default function KlienPage() {
  const template = useTemplate();
  const t = template.terminology;
  const [clients, setClients] = useState<ClientType[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [phaseFilter, setPhaseFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [goalInput, setGoalInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [waInput, setWaInput] = useState('');

  useEffect(() => {
    fetch('/api/clients').then((r) => r.json()).then(setClients).catch(console.error);
  }, []);

  const filtered = clients.filter((c) => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (phaseFilter !== 'all' && c.phase !== phaseFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return c.name.toLowerCase().includes(q) || (c.goal && c.goal.toLowerCase().includes(q));
    }
    return true;
  });

  const phaseMap = new Map<string, number>();
  clients.forEach((c) => phaseMap.set(c.phase, (phaseMap.get(c.phase) || 0) + 1));

  const addClient = () => {
    if (!nameInput.trim()) return;
    fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: nameInput,
        goal: goalInput,
        email: emailInput,
        whatsapp: waInput,
        phase: template.phases[0]?.id || '',
        goalFocusArea: template.goalFocusAreas[0]?.id || null,
      }),
    })
      .then((r) => r.json())
      .then((c) => {
        setClients((prev) => [c, ...prev]);
        setNameInput('');
        setGoalInput('');
        setEmailInput('');
        setWaInput('');
        setShowAddModal(false);
      })
      .catch(console.error);
  };

  return (
    <div style={styles.layout}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpenAITools={() => setAiModalOpen(true)} />
      <main style={styles.main}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>{t.clientPlural}</h1>
            <p style={styles.subtitle}>Kelola dan pantau progress {t.clientPlural.toLowerCase()} Anda</p>
          </div>
          <div style={styles.headerRight}>
            <ThemeToggle />
            <button style={{ ...styles.addBtn, background: template.phases[0]?.color || '#5B9FFF' }} onClick={() => setShowAddModal(true)}>
              + Tambah {t.client}
            </button>
          </div>
        </div>

        <div style={styles.phaseBar}>
          {template.phases.map((p) => (
            <button
              key={p.id}
              style={{
                ...styles.phaseChip,
                background: phaseFilter === p.id ? p.color : 'transparent',
                color: phaseFilter === p.id ? '#fff' : p.color,
                borderColor: p.color,
              }}
              onClick={() => setPhaseFilter(phaseFilter === p.id ? 'all' : p.id)}
            >
              {p.name} ({phaseMap.get(p.name) || 0})
            </button>
          ))}
        </div>

        <div style={styles.searchRow}>
          <input
            type="text"
            placeholder={`Cari ${t.clientPlural.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <div style={styles.filterGroup}>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={styles.select}>
              <option value="all">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="on_progress">On Progress</option>
              <option value="completed">Selesai</option>
              <option value="inactive">Tidak Aktif</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📋</div>
            <h3 style={styles.emptyTitle}>Belum ada {t.clientPlural.toLowerCase()}</h3>
            <p style={styles.emptyDesc}>Mulai menambahkan {t.client.toLowerCase()} pertama Anda</p>
            <button style={{ ...styles.emptyBtn, background: template.phases[0]?.color || '#5B9FFF' }} onClick={() => setShowAddModal(true)}>
              + Tambah {t.client} Pertama
            </button>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map((client) => {
              const status = statusLabel(client.status);
              const phase = template.phases.find((p) => p.id === client.phase || p.name === client.phase);
              return (
                <div key={client.id} style={styles.card}>
                  <div style={styles.cardTop}>
                    <div style={{ ...styles.avatar, background: phase?.color || '#5B9FFF' }}>
                      {client.name.charAt(0).toUpperCase()}
                    </div>
                    <div style={styles.cardMeta}>
                      <div style={styles.cardName}>{client.name}</div>
                      <div style={{ ...styles.badge, color: status.color, background: status.bg }}>
                        {status.label}
                      </div>
                    </div>
                  </div>
                  <div style={styles.cardBody}>
                    <div style={styles.cardGoal}>{client.goal || '-'}</div>
                    {client.goalFocusArea && (
                      <div style={{ ...styles.areaTag, borderColor: phase?.color || '#5B9FFF', color: phase?.color || '#5B9FFF' }}>
                        {client.goalFocusArea}
                      </div>
                    )}
                  </div>
                  <div style={styles.cardFooter}>
                    <div style={styles.progressBar}>
                      <div
                        style={{
                          ...styles.progressFill,
                          width: `${client.progress}%`,
                          background: phase?.color || '#5B9FFF',
                        }}
                      />
                    </div>
                    <span style={styles.progressText}>{client.progress}%</span>
                    <span style={styles.timeAgo}>{timeAgo(client.createdAt)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {showAddModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Tambah {t.client}</h2>
            <div style={styles.modalBody}>
              <label style={styles.label}>Nama *</label>
              <input value={nameInput} onChange={(e) => setNameInput(e.target.value)} style={styles.input} placeholder="Nama lengkap" />
              <label style={styles.label}>{t.goal}</label>
              <input value={goalInput} onChange={(e) => setGoalInput(e.target.value)} style={styles.input} placeholder={`${t.goal} utama...`} />
              <label style={styles.label}>Email</label>
              <input value={emailInput} onChange={(e) => setEmailInput(e.target.value)} style={styles.input} placeholder="email@contoh.com" />
              <label style={styles.label}>WhatsApp</label>
              <input value={waInput} onChange={(e) => setWaInput(e.target.value)} style={styles.input} placeholder="081234567890" />
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.cancelBtn} onClick={() => setShowAddModal(false)}>Batal</button>
              <button style={styles.saveBtn} onClick={addClient}>Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  layout: { display: 'flex', minHeight: '100vh', background: 'var(--surface-secondary)', fontFamily: "'DM Sans', -apple-system, sans-serif" },
  main: { flex: 1, padding: 24, maxWidth: 1200, margin: '0 auto', width: '100%' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  headerRight: { display: 'flex', alignItems: 'center', gap: 12 },
  title: { fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', margin: 0 },
  subtitle: { fontSize: 14, color: 'var(--text-secondary)', margin: '4px 0 0 0' },
  addBtn: { color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  phaseBar: { display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto' as const, paddingBottom: 4 },
  phaseChip: { border: '1.5px solid', borderRadius: 20, padding: '6px 14px', fontSize: 13, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' as const, transition: 'all 0.15s' },
  searchRow: { display: 'flex', gap: 12, marginBottom: 24 },
  searchInput: { flex: 1, padding: '10px 16px', border: '1px solid var(--border-secondary)', borderRadius: 10, fontSize: 14, background: 'var(--input-bg)', color: 'var(--text-primary)', outline: 'none' },
  select: { padding: '10px 16px', border: '1px solid var(--border-secondary)', borderRadius: 10, fontSize: 14, background: 'var(--input-bg)', color: 'var(--text-primary)', outline: 'none' },
  filterGroup: { display: 'flex', gap: 8 },
  emptyState: { textAlign: 'center' as const, padding: '80px 24px', background: 'var(--surface-primary)', borderRadius: 16, border: '1px solid var(--border-primary)' },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px 0' },
  emptyDesc: { fontSize: 14, color: 'var(--text-secondary)', margin: '0 0 24px 0' },
  emptyBtn: { color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 },
  card: { background: 'var(--surface-primary)', border: '1px solid var(--border-primary)', borderRadius: 14, padding: 20, transition: 'transform 0.15s, box-shadow 0.15s', cursor: 'pointer' },
  cardTop: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 },
  avatar: { width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 700, flexShrink: 0 },
  cardMeta: { flex: 1, minWidth: 0 },
  cardName: { fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' },
  badge: { display: 'inline-block', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, marginTop: 4 },
  cardBody: { marginBottom: 16 },
  cardGoal: { fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 },
  areaTag: { display: 'inline-block', border: '1px solid', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 500 },
  cardFooter: { display: 'flex', alignItems: 'center', gap: 8 },
  progressBar: { flex: 1, height: 6, background: 'var(--border-primary)', borderRadius: 3, overflow: 'hidden' as const },
  progressFill: { height: '100%', borderRadius: 3, transition: 'width 0.3s' },
  progressText: { fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', flexShrink: 0 },
  timeAgo: { fontSize: 11, color: 'var(--text-tertiary)', flexShrink: 0 },
  modalOverlay: { position: 'fixed', inset: 0, background: 'var(--overlay-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' },
  modal: { background: 'var(--surface-elevated)', borderRadius: 16, padding: 28, width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' },
  modalTitle: { fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 20px 0' },
  modalBody: { display: 'flex', flexDirection: 'column' as const, gap: 12 },
  label: { fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' },
  input: { padding: '10px 14px', border: '1px solid var(--border-secondary)', borderRadius: 8, fontSize: 14, outline: 'none', fontFamily: 'inherit', background: 'var(--input-bg)', color: 'var(--text-primary)' },
  modalFooter: { display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24 },
  cancelBtn: { padding: '10px 20px', border: '1px solid var(--border-primary)', borderRadius: 8, fontSize: 14, background: 'var(--surface-primary)', color: 'var(--text-primary)', cursor: 'pointer' },
  saveBtn: { padding: '10px 20px', border: 'none', borderRadius: 8, fontSize: 14, background: '#5B9FFF', color: '#fff', fontWeight: 600, cursor: 'pointer' },
};
