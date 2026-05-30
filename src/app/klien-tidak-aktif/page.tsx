'use client';

import React, { useState, useEffect } from 'react';
import { useTemplate } from '@/components/template-provider';
import { BRAND } from '@/lib/branding';
import { Sidebar } from '@/components/sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { Archive, Search, UserCheck } from 'lucide-react';
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

export default function KlienTidakAktifPage() {
  const template = useTemplate();
  const t = template.terminology;
  const [clients, setClients] = useState<ClientType[]>([]);
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch('/api/clients?status=inactive')
      .then((r) => r.json())
      .then((data) => {
        const inactive = Array.isArray(data)
          ? data.filter((c: ClientType) => c.status === 'inactive')
          : [];
        setClients(inactive);
      })
      .catch(console.error);
  }, []);

  const filtered = clients.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || (c.goal && c.goal.toLowerCase().includes(q));
  });

  const reactivateClient = (id: string) => {
    fetch(`/api/clients/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'active' }),
    })
      .then((r) => r.json())
      .then(() => {
        setClients((prev) => prev.filter((c) => c.id !== id));
      })
      .catch(console.error);
  };

  return (
    <div style={styles.layout}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpenAITools={() => {}} />
      <main style={styles.main}>
        <div style={styles.topbar}>
          <div style={styles.topbarLeft}>
            <button style={styles.menuBtn} onClick={() => setSidebarOpen(true)} aria-label="Menu">
              <Archive size={20} />
            </button>
            <div>
              <h1 style={styles.topbarTitle}>{t.clientInactive}</h1>
              <p style={styles.topbarSub}>Daftar {t.clientPlural.toLowerCase()} yang tidak aktif</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <div style={styles.searchRow}>
          <input
            type="text"
            placeholder={`Cari ${t.clientPlural.toLowerCase()} tidak aktif...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {filtered.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}><Archive size={48} strokeWidth={1.2} /></div>
            <h3 style={styles.emptyTitle}>Tidak ada {t.clientPlural.toLowerCase()} tidak aktif</h3>
            <p style={styles.emptyDesc}>
              {search
                ? `Tidak ditemukan ${t.clientPlural.toLowerCase()} yang cocok dengan pencarian`
                : `Semua ${t.clientPlural.toLowerCase()} sedang aktif`}
            </p>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map((client) => {
              const phase = template.phases.find((p) => p.id === client.phase || p.name === client.phase);
              return (
                <div key={client.id} style={styles.card}>
                  <div style={styles.cardTop}>
                    <div style={{ ...styles.avatar, background: phase?.color || '#F17F7F' }}>
                      {client.name.charAt(0).toUpperCase()}
                    </div>
                    <div style={styles.cardMeta}>
                      <div style={styles.cardName}>{client.name}</div>
                      <div style={{ ...styles.badge, color: '#F17F7F', background: 'rgba(241,127,127,0.12)' }}>
                        Tidak Aktif
                      </div>
                    </div>
                  </div>
                  <div style={styles.cardBody}>
                    <div style={styles.cardGoal}>{client.goal || '-'}</div>
                  </div>
                  <div style={styles.cardFooter}>
                    <span style={styles.timeAgo}>Terakhir aktif: {timeAgo(client.updatedAt)}</span>
                    <button style={styles.reactivateBtn} onClick={() => reactivateClient(client.id)}>
                      <UserCheck size={14} /> Aktifkan Kembali
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  layout: { display: 'flex', minHeight: '100vh', background: 'var(--surface-secondary)', fontFamily: "'DM Sans', -apple-system, sans-serif" },
  main: { flex: 1, padding: 24, maxWidth: 1200, margin: '0 auto', width: '100%' },
  topbar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: 'var(--surface-primary)', borderBottom: '1px solid var(--border-primary)', marginBottom: 24 },
  topbarLeft: { display: 'flex', alignItems: 'center', gap: 16 },
  topbarTitle: { fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', margin: 0 },
  topbarSub: { fontSize: 13, color: 'var(--text-secondary)', margin: '2px 0 0 0' },
  menuBtn: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: '8px', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  searchRow: { display: 'flex', gap: 12, marginBottom: 24 },
  searchInput: { flex: 1, padding: '10px 16px', border: '1px solid var(--border-secondary)', borderRadius: 10, fontSize: 14, background: 'var(--input-bg)', color: 'var(--text-primary)', outline: 'none' },
  emptyState: { textAlign: 'center' as const, padding: '80px 24px', background: 'var(--surface-primary)', borderRadius: 16, border: '1px solid var(--border-primary)' },
  emptyIcon: { fontSize: 48, marginBottom: 16, color: 'var(--text-tertiary)' },
  emptyTitle: { fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px 0' },
  emptyDesc: { fontSize: 14, color: 'var(--text-secondary)', margin: 0 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 },
  card: { background: 'var(--surface-primary)', border: '1px solid var(--border-primary)', borderRadius: 14, padding: 20, transition: 'transform 0.15s, box-shadow 0.15s' },
  cardTop: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 },
  avatar: { width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 700, flexShrink: 0 },
  cardMeta: { flex: 1, minWidth: 0 },
  cardName: { fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' },
  badge: { display: 'inline-block', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, marginTop: 4 },
  cardBody: { marginBottom: 16 },
  cardGoal: { fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 },
  cardFooter: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  timeAgo: { fontSize: 12, color: 'var(--text-tertiary)' },
  reactivateBtn: { display: 'inline-flex', alignItems: 'center', gap: 4, padding: '6px 12px', background: 'rgba(76,175,130,0.12)', color: '#4CAF82', border: '1px solid rgba(76,175,130,0.2)', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' },
};
